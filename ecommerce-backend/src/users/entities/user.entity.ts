import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password?: string; // Optional for now if we want to support social login later, but mandatory for email/pass

    @Column()
    name: string;

    @Column({ nullable: true })
    number: string;

    @Column({ default: 'user' })
    role: string;
}
