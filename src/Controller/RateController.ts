import { Response } from "express";
import { AppDataSource } from "../dbConfig/data-source";

class RateController {
  static getRate = async (request: any, response: Response): Promise<void> => {
    try {
      const rateRepository = AppDataSource.getRepository("rate");
      const rates = await rateRepository.find();
      response.json(rates);
    } catch (error) {
      response.status(500).json({ message: error });
    }
  };

  static addRate = async (request: any, response: Response): Promise<void> => {
    try {
      const rateRepository = AppDataSource.getRepository("rate");
      const { userId, productId, rate, comment } = request.body;
      const existingRate = await rateRepository.findOne({
        where: {
          userId: request.body.userId,
          productId: request.body.productId,
        },
      });
      if (existingRate) {
        response.status(400).json({
          message: "You have already rated this product before.",
        });
      }
      const rates = await rateRepository.save(request.body);
      response.json(rates);
    } catch (error) {
      response.status(500).json({ message: error });
    }
  };

  static updateRate = async (
    request: any,
    response: Response
  ): Promise<void> => {
    try {
      const rateRepository = AppDataSource.getRepository("rate");
      const rates = await rateRepository.findOne({
        where: { id: request.params.id },
      });
      const updatedRate = await rateRepository.save({
        ...rates,
        ...request.body,
      });
      response.json(updatedRate);
    } catch (error) {
      response.status(500).json({ message: error });
    }
  };

  static deleteRate = async (
    request: any,
    response: Response
  ): Promise<void> => {
    try {
      const rateRepository = AppDataSource.getRepository("rate");
      const rates = await rateRepository.delete({ id: request.params.id });
      response.json({ message: "Rate deleted successfully." });
    } catch (error) {
      response.status(500).json({ message: error });
    }
  };
}

export default RateController;
