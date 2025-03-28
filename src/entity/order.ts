import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { OrderDetails } from "./OrderDetails";

export enum OrderState {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id!: User;

    @Column({ type: "decimal"})
    total_price!: number;

    @Column({
        type: "enum",
        enum: OrderState,
        default: OrderState.PENDING
    })
    state!: OrderState;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
    
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date;

    @OneToMany(() => OrderDetails, orderDetails => orderDetails.order_id)
    orderDetails: OrderDetails[];
}