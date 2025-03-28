import { Router } from "express";
import RateController from "../Controller/RateController";
const router = Router();

router.get("/", RateController.getRate);
router.post("/", RateController.addRate);
router.put("/:id", RateController.updateRate);
router.delete("/:id", RateController.deleteRate);

export default router;
