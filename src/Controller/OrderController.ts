import { Request, Response } from 'express';
import { AppDataSource } from "../dbConfig/data-source";
import { OrderState } from '../entity/order';

class OrderController {
    static async getOrders(request:any, response: Response) {
        try {
            console.log(request.user)
            const orderRepository = AppDataSource.getRepository("Order");
            const orders = await orderRepository.find();
            response.json(orders);
        } catch (error) {
            response.status(500).json({ message: error });
        }
    }

    static async getOrderById(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const order = await orderRepository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['OrderDetails', 'OrderDetails.product']
            });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async placeOrder ( request: any, response: Response ): Promise<any> {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const OrderDetailsRepository = AppDataSource.getRepository("order_details");
            const CartRepository = AppDataSource.getRepository("cart");
            const CartItemRepository = AppDataSource.getRepository("cart_items");

            const cart = await CartRepository.findOne({where:{user_id:request.user.id}});
            const OrderItems = await CartItemRepository.find({where:{cart_id:cart?.id}, relations:["product_id"]});

            if(!OrderItems){
                response.json({message:"No items in your cart"})
                return;
            }
            else{
            const totalPrice = OrderItems.reduce((total, item) => {
                return total += (item.total_item_price * item.quantity); 
            }, 0);
            

            const Order =  orderRepository.create({user_id:request.user.id ,total_price:totalPrice, state:OrderState.PROCESSING})
            await orderRepository.save(Order);
            

            const OrderProducts = OrderItems.forEach(async (item)=>{
               const data =  OrderDetailsRepository.create({order_id:Order.id,product_id:item.product_id.id, quantity:item.quantity, unit_price:item.total_item_price/item.quantity })
               await OrderDetailsRepository.save(data)
               await CartItemRepository.softRemove({id:item.id})
            })


            return response.json({message:"Order Placed successfully",totalPrice, OrderItems })

        }
         } catch (error) {
             response.status(500).json({ message: error });
        }

    // static async updateOrderStatus(req: Request, res: Response) {
    //     try {
    //         const orderRepository = AppDataSource.getRepository("Order");
    //         const order = await orderRepository.findOneBy({ id: parseInt(req.params.id) });

    //         if (!order) {
    //             return res.status(404).json({ message: "Order not found" });
    //         }

    //         const updatedOrder = await orderRepository.save({
    //             ...order,
    //             state: req.body.state
    //         });

    //         res.json({
    //             message: "Order status updated successfully",
    //             order: updatedOrder
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: error });
    //     }
    // }

    // static async deleteOrder(req: Request, res: Response) {
    //     try {
    //         const orderRepository = AppDataSource.getRepository("Order");
    //         const order = await orderRepository.findOneBy({ id: parseInt(req.params.id) });

    //         if (!order) {
    //             return res.status(404).json({ message: "Order not found" });
    //         }

    //         await orderRepository.softDelete(req.params.id);
    //         res.json({ message: "Order deleted successfully" });
    //     } catch (error) {
    //         res.status(500).json({ message: error });
    //     }
     }
}

export default OrderController;