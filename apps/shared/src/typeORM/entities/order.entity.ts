import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'order'})
export class Order {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    no_of_items: number;

    @Column()
    total_price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}
