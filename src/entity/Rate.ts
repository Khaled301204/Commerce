import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product_id: Product;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id!: User;

  @Column()
  rate!: number;

  @Column({ default: null })
  comment!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
}