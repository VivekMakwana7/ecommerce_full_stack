import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true })
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    orderItems: OrderItem[];

    @Column('decimal')
    totalAmount: number;

    @Column({
        type: 'text', // using text for simplicity unless postgres specific enum is preferred, using simple string check or enum type in postgres
        // For simplicity with typeorm and various dbs, simple matching enum usually works well.
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ type: 'text', nullable: true })
    shippingAddress: string;

    @Column({ nullable: true })
    transactionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
