import { Router } from 'express';
import OrderController from '../Controller/OrderController';
import verifyToken from '../MiddelWares/Auth';

const router = Router();


router.get('/',verifyToken, OrderController.getOrders);

// router.get('/:id', OrderController.getOrderById);

router.post('/',verifyToken, OrderController.placeOrder);

// router.patch('/:id/status', OrderController.updateOrderStatus);

// router.delete('/:id', OrderController.deleteOrder);

export default router;