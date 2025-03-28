import { Router } from 'express'
import CartItemController from '../Controller/CartItemController'
import verifyToken from '../MiddelWares/Auth';
const router = Router()

router.get('/', verifyToken, CartItemController.getCartItem);
router.post('/', verifyToken, CartItemController.addCartItem);
router.post('/decrease', verifyToken, CartItemController.decrease);
router.delete('/:id', verifyToken, CartItemController.deleteCartItem);

export default router