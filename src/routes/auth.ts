import express from 'express';
import AuthController from '../controllers/Auth';
const router: express.Router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.authenticateUser);
router.post('/sendRecoverMail', AuthController.sendRecovermail); 


export default router;
