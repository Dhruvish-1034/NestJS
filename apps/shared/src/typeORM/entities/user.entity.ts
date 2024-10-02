import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    age: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}