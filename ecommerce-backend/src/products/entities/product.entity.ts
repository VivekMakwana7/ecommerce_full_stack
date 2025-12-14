import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal')
    price: number;

    @Column("text", { array: true })
    color: string[];

    @Column("text", { array: true })
    size: string[];

    @Column()
    quantity: number;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => Category, { eager: true, nullable: false })
    category: Category;

    @ManyToOne(() => Category, { eager: true, nullable: false })
    subCategory: Category;
}
