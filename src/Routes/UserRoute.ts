import { Router } from 'express'
import UserController from '../Controller/UserController'
import requestValidate from '../MiddelWares/RequestValidate';
import { AddUser } from '../Request/UserRequest';
const router = Router()

router.get('/', UserController.getUser);

router.post('/', requestValidate(AddUser), UserController.addUser);

router.post('/login', UserController.loginUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);


export default router