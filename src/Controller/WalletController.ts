import { Params } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Response } from "express";
import { AppDataSource } from "../dbConfig/data-source";
const jwt = require('jsonwebtoken');

const jwtSecret = 'your-secret-key';

class WalletController {

    static getWallet =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const WalletRepository = AppDataSource.getRepository("Wallet");
        const Wallets = await WalletRepository.find();
        response.json(Wallets);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static addWallet =  async ( request: any, response: Response ): Promise<void> => {
        try{
            const WalletRepository = AppDataSource.getRepository("Wallet");
            const savedWallet = await WalletRepository.save(request.body);
            // await WalletRepository.update(savedWallet.id, {token: token});
            response.send({Wallet: savedWallet});
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static updateWallet =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const WalletRepository = AppDataSource.getRepository("Wallet");
        await WalletRepository.update(request.Params.id, request.body)
        const UpdatedWallet=  WalletRepository.findOne({ where: { id: request.params.id } })
        response.json(UpdatedWallet);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
    
    static deleteWallet =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const WalletRepository = AppDataSource.getRepository("Wallet");
        const Wallet = await WalletRepository.findOne({ where: { id: request.params.id } });
        if (!Wallet){
            response.status(404).send("Product not found");
        }
        else{
        await WalletRepository.remove(Wallet);
        }
        response.json({ message: "Wallet deleted successfully." });
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

}

export default WalletController;