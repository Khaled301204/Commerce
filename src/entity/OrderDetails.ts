import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./order";

@Entity()
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Order, order => order.id)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    order_id!: Order;

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product_id: Product;

    @Column({ type: "int", default: 1 })
    quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    unit_price!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
    
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date;
}