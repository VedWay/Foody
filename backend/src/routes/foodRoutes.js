import express from 'express';
import { addFoodItem, getFoodItems, updateFoodItem, deleteFoodItem } from '../controllers/foodControllers.js';
import { authFoodPartnerMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import foodModel from '../models/foodModel.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();


router.get('/all', authUserMiddleware, async(req, res) => {
    try {
    const foods = await foodModel.find().populate('foodPartner', 'restaurantName');
    res.status(200).json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//api/food/add
router.post('/add', authFoodPartnerMiddleware, upload.single('image') ,addFoodItem);

router.get('/', authFoodPartnerMiddleware, getFoodItems);

router.put('/:id', authFoodPartnerMiddleware, upload.single('image') ,updateFoodItem); 

router.delete('/:id', authFoodPartnerMiddleware, deleteFoodItem);


export default router;