import { uploadFile } from "../services/storageService.js";
import { v4 as uuid } from "uuid";
import foodModel from "../models/foodModel.js";

export const addFoodItem = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const fileName = `${uuid()}.${req.file.mimetype.split("/")[1]}`;
        const fileUploadResult = await uploadFile(req.file.buffer, fileName);
      

       const foodItem = await foodModel.create({
           name: req.body.name,
           description: req.body.description,
           video: fileUploadResult.url,
           foodPartner: req.foodPartner._id
       });
       
       res.status(201).json({
              message: "Food item added successfully",
                food: foodItem
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getFoodItems = async (req, res) => {
    const foodItems = await foodModel.find({})
    res.status(200).json({ "Food Items fetched successfully" :
        foodItems
     });
};