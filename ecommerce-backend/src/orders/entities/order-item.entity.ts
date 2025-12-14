import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    size: string;

    @Column({ nullable: true })
    color: string;

    @Column('decimal')
    price: number;
}
