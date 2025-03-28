
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";
import { OrderDetails } from "./OrderDetails";
import { Category } from "./Category";
import { Rate } from "./Rate";
import { CartItems } from "./CartItems";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: User;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category_id: Category;

    @Column({ type: 'varchar', length: 100 })
    name: string;
    
    @Column({ type: 'decimal' })
    price: number;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product_id)
    orderDetails: OrderDetails[];

    @OneToMany(() => CartItems, (cartItems) => cartItems.product_id)
    cartItems: CartItems[];

    @OneToMany(() => Rate, (rate) => rate.product_id)
    rate: Rate[];
    
} 