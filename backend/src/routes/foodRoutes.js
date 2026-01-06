import express from 'express';
import { addFoodItem, getFoodItems } from '../controllers/foodControllers.js';
import { authFoodPartnerMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})
//api/food/add
router.post('/add', authFoodPartnerMiddleware, upload.single('video'), addFoodItem);

router.get('/', authUserMiddleware, getFoodItems);
export default router;