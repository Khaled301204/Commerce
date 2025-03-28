import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../dbConfig/data-source";

class ProductController {
    static getProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const products = await productRepository.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error });        }
    };

    static addProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const newProduct = productRepository.create(req.body);
            const savedProduct = await productRepository.save(newProduct);
            res.json({ message: "Product added successfully", product: savedProduct });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    static updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });

            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const updatedProduct = await productRepository.save({ ...product, ...req.body });
            res.json({ message: "Product updated successfully", product: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    static deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });

            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            await productRepository.delete({ id: product.id });
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
}

export default ProductController;
