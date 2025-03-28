import { Router } from 'express'
import WalletController from '../Controller/WalletController'
const router = Router()

router.get('/', WalletController.getWallet);

router.post('/', WalletController.addWallet);

router.put('/:id', WalletController.updateWallet);

router.delete('/:id', WalletController.deleteWallet);

export default router