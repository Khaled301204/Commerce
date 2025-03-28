import { Router } from 'express'
import CartController from '../Controller/CartController'
const router = Router()

router.get('/', CartController.getCart);
router.post('/', CartController.addCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id',CartController.deleteUser);

export default router