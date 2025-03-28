import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { CartItems } from "./CartItems";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id!: User;

  @Column({ type: 'decimal', nullable: true })
  total_price!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => CartItems, cartItems => cartItems.cart_id)
  cartItems: CartItems[];

}