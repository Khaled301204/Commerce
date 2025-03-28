import { Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../dbConfig/data-source";
const jwt = require('jsonwebtoken');


const jwtSecret = 'your-secret-key';

class UserController {

    static getUser =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const userRepository = AppDataSource.getRepository("user");
        const users = await userRepository.find();
        response.json(users);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static addUser =  async ( request: any, response: Response ): Promise<void> => {
        try{
            const userRepository = AppDataSource.getRepository("user");
            const walletRepository = AppDataSource.getRepository("Wallet")
            const cartRepository = AppDataSource.getRepository("cart");
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            request.body.password = hashedPassword;
            const savedUser = await userRepository.save(request.body);
            const token = jwt.sign({ userId: savedUser.id }, jwtSecret, { expiresIn: '1h' });
            const walletData = await walletRepository.save({user_id: savedUser.id})
            const cartData = await cartRepository.save({user_id: savedUser.id})
            response.json({accessToken: token, user: savedUser, wallet: walletData, cart: cartData});
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static updateUser =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const userRepository = AppDataSource.getRepository("user");
        const user = await userRepository.findOne(request.params.id)
        const updatedUser = await userRepository.save(request.body);
        response.json(updatedUser);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
    
    static deleteUser =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const userRepository = AppDataSource.getRepository("user");
        await userRepository.delete(request.body);
        response.json({ message: "User deleted successfully." });
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static loginUser =  async ( request: any, response: Response ): Promise<any> => {
        try{
            const userRepository = AppDataSource.getRepository("user");
            const user = await userRepository.findOne({where: {email: request.body.email}});
            if(!user){
                return response.status(401).json({ message: "Invalid email." });
            }
            const isValid = await bcrypt.compare(request.body.password, user.password);
            if(!isValid){
                return response.status(401).json({ message: "Invalid password." });
            }
            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
            response.json({ token: token, message: "Logged in successfully."});
        } catch(error){
            response.status(500).json({ message: error});
        }
    };
    static WalletController: any;

}

export default UserController;