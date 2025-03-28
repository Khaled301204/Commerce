import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import { Product } from "./Product";
import { Wallet } from './wallet';
import { Order } from "./order";
import { Cart } from "./Cart";
import { Rate } from "./Rate";


export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MODERATOR = "moderator",
  }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({nullable: true})
  gender!:string;

  @Column({ type: "date", nullable: true })
  birthdate!: Date;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Product, (product) => product.user_id)
  product: Product[];

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];

  @OneToMany(() => Rate, (rate) => rate.user_id)
  rate: Rate;
  
  @OneToOne(() => Wallet, (wallet) => wallet.user_id)
  wallet: Wallet;

  @OneToOne(() => Cart, (cart) => cart.user_id)
  cart: Cart;
}
