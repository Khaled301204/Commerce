import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.id)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart_id: number;

  @ManyToOne(() =>Product, (product) => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product_id: Product;

  @Column({ type: 'decimal' })
  total_item_price!: number;

  @Column({ type: 'decimal' ,default:1})
  quantity!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

}