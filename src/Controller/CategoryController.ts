import { Params } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Response } from "express";
import { AppDataSource } from "../dbConfig/data-source";

class CategoryController {

    static getCategory =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const categoryRepository = AppDataSource.getRepository("category");
        console.log(request.user.role);
        const category = await categoryRepository.find();
        response.json(category);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static getCategoryById =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const categoryRepository = AppDataSource.getRepository("category");
        const category = await categoryRepository.findOne({where:{id:request.Params.id}});
        response.json(category);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static addCategory =  async ( request: any, response: Response ): Promise<void> => {
        try{
            const categoryRepository = AppDataSource.getRepository("category");
            const savedCategory = await categoryRepository.save(request.body);
            response.send({category: savedCategory});
        } catch(error){
            response.status(500).json({ message: error });
        }
    };

    static updateCategory =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const categoryRepository = AppDataSource.getRepository("category");
        const category = await categoryRepository.findOne(request.params.id)
        const updatedCategory = await categoryRepository.save(request.body);
        response.json(updatedCategory);
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
    
    static deleteCategory =  async ( request: any, response: Response ): Promise<void> => {
        try{
        const categoryRepository = AppDataSource.getRepository("category");
        await categoryRepository.delete(request.body);
        response.json({ message: "category deleted successfully." });
        } catch(error){
            response.status(500).json({ message: error });
        }
    };
}

export default CategoryController;