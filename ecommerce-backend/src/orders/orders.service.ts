import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdatePaymentDto, PaymentStatus } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Repository, DataSource } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly dataSource: DataSource,
    ) { }

    private transformOrder(order: Order): Order {
        if (order.orderItems) {
            order.orderItems.forEach(item => {
                if (item.product && item.product.image) {
                    const cleanPath = item.product.image.replace(/\\/g, '/');
                    const filename = cleanPath.split('/').pop();
                    const baseUrl = 'http://localhost:3000'; // Should ideally be from ConfigService
                    item.product.image = `${baseUrl}/uploads/${filename}`;
                }
            });
        }
        return order;
    }

    async create(createOrderDto: CreateOrderDto, user: User) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { items, shippingAddress } = createOrderDto;
            const orderItems: OrderItem[] = [];
            let totalAmount = 0;

            for (const item of items) {
                // Lock the product row to prevent race conditions
                const product = await queryRunner.manager.createQueryBuilder(Product, 'product')
                    .setLock('pessimistic_write')
                    .where('product.id = :id', { id: item.productId })
                    .getOne();

                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                }

                if (product.quantity < item.quantity) {
                    throw new BadRequestException(`Insufficient stock for product ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`);
                }

                // Deduct stock
                product.quantity -= item.quantity;
                await queryRunner.manager.save(product);

                const orderItem = new OrderItem();
                orderItem.product = product;
                orderItem.quantity = item.quantity;
                orderItem.price = product.price;
                orderItem.size = item.size;
                orderItem.color = item.color;

                orderItems.push(orderItem);
                totalAmount += Number(product.price) * item.quantity;
            }

            const order = new Order();
            order.user = { id: user.id } as User; // safe assignment
            order.shippingAddress = shippingAddress;
            order.status = OrderStatus.PENDING;
            order.totalAmount = totalAmount;
            order.orderItems = orderItems;

            const savedOrder = await queryRunner.manager.save(Order, order);

            await queryRunner.commitTransaction();

            // Fetch the order with relations to return complete data
            // We can't reuse savedOrder directly effectively because we want the populated relations structure
            // But queryRunner is released. We can just return savedOrder or fetch again.
            // Fetching again is safer for consistent response.
            return this.transformOrder(savedOrder);
        } catch (err) {
            console.error('Error creating order:', err); // Log the error for debugging
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() {
        const orders = await this.orderRepository.find({
            relations: ['orderItems', 'orderItems.product', 'user'],
            order: { createdAt: 'DESC' }
        });
        return orders.map(order => this.transformOrder(order));
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderItems', 'orderItems.product', 'user']
        });
        if (!order) throw new NotFoundException('Order not found');
        return this.transformOrder(order);
    }

    async updatePaymentStatus(updatePaymentDto: UpdatePaymentDto) {
        const { orderId, transactionId, status } = updatePaymentDto;
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const order = await queryRunner.manager.findOne(Order, {
                where: { id: orderId },
                relations: ['orderItems', 'orderItems.product'] // Need products to revert stock if needed
            });

            if (!order) {
                throw new NotFoundException(`Order with ID ${orderId} not found`);
            }

            // If already processed, prevent double update?
            // Assuming simplified logic: just update.

            order.transactionId = transactionId;

            if (status === PaymentStatus.FAILURE) {
                if (order.status !== OrderStatus.CANCELLED) {
                    order.status = OrderStatus.CANCELLED;

                    // Revert stock
                    for (const item of order.orderItems) {
                        const product = await queryRunner.manager.createQueryBuilder(Product, 'product')
                            .setLock('pessimistic_write')
                            .where('product.id = :id', { id: item.product.id })
                            .getOne();

                        if (product) {
                            product.quantity += item.quantity;
                            await queryRunner.manager.save(product);
                        }
                    }
                }
            } else if (status === PaymentStatus.SUCCESS) {
                if (order.status !== OrderStatus.COMPLETED) {
                    order.status = OrderStatus.COMPLETED; // Or PAID if we had it
                }
            }

            await queryRunner.manager.save(Order, order);
            await queryRunner.commitTransaction();

            return this.transformOrder(order);
        } catch (err) {
            console.error('Error updating payment status:', err);
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
