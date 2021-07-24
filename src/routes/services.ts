import express from 'express';
import AdminController from '../controllers/Clinet';
const router: express.Router = express.Router();


router.put('/resetpassword', AdminController.resetPassword);

// //look up a single client
// router.get('/lookup', ClientController.lookupClient);

//look up all client
router.get('/lookup/all', AdminController.lookupAllClient);
//delete client
router.delete('/delete', AdminController.deleteClient);

// router.put('/upate/Id', ClientController.updateId);
// router.put('/upate/bankDetails', ClientController.updateBankDetail);
// router.put('/upate/cardDetails', ClientController.updateCarDetails);
// router.put('/upate/balance', ClientController.UpdateAccountBalance);
// router.put('/upate/emailAndTel', ClientController.updateEmailAndTel);
// router.put('/upate/personalDetails', ClientController.updatePersonalDetail);
// router.put('/upate/emailAndPassword', ClientController.updateEmailAndPassword);



export default router;
