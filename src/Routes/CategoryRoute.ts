import { Router } from 'express'
import CategoryController from '../Controller/CategoryController'
import verifyToken from '../MiddelWares/Auth';
const router = Router()

router.get('/',verifyToken, CategoryController.getCategory);

router.post('/',verifyToken, CategoryController.addCategory);

router.put('/:id',verifyToken, CategoryController.updateCategory);

router.delete('/:id',verifyToken, CategoryController.deleteCategory

    
);

export default router