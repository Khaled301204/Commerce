import { Router } from 'express'
import ProductController from '../Controller/ProductController'
const router = Router()

router.get('/', ProductController.getProduct);

router.post('/', ProductController.addProduct);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

export default router