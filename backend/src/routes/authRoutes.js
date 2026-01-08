import express from 'express';
import { registerUser, loginUser, logoutUser, registerfoodPartner, loginfoodPartner, logoutfoodPartner} from '../controllers/authControllers.js';


const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

router.post('/partner/register', registerfoodPartner);
router.post('/partner/login', loginfoodPartner);
router.post('/partner/logout', logoutfoodPartner);

export default router;