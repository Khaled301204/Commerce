import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { Cart } from "../entity/Cart";
import { Wallet } from "../entity/wallet";
import { Rate } from "../entity/Rate";
import { Category } from "../entity/Category";
import { Order } from "../entity/order";
import * as dotenv from "dotenv";
import { CartItems } from "../entity/CartItems";
import { OrderDetails } from "../entity/OrderDetails";

dotenv.config();  
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Product, Rate, Cart, Wallet,Category, Order, CartItems, OrderDetails],
  migrations: [],
  subscribers: [],
  
}); 


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization");
  });
