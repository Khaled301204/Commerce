import { Response } from "express";
import { AppDataSource } from "../dbConfig/data-source";
const jwt = require('jsonwebtoken');

class CartController {

    static getCart =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const CartRepository = AppDataSource.getRepository("cart");
        const Cart = await CartRepository.find();
        response.json(Cart);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
    
    static addCart =  async ( request: any, response: Response ): Promise<void> => {
        try{
            const CartRepository = AppDataSource.getRepository("cart");
            const savedCArt = await CartRepository.save(request.body);
            response.send({ cart:savedCArt});
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static updateCart =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const CartRepository = AppDataSource.getRepository("cart");
        const Cart= await CartRepository.findOne(request.params.id)
        const updatedCart= await CartRepository.save(request.body);
        response.json(updatedCart);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
    
    static deleteUser =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const CartRepository = AppDataSource.getRepository("cart");
        await CartRepository.delete(request.body);
        response.json({ message: "Cart deleted successfully." });
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    

}

export default CartController;