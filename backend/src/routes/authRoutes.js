import express from 'express';
import { registerUser, loginUser, logoutUser} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

export default router;