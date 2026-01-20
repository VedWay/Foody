import { uploadFile } from "../services/storageService.js";
import foodModel from "../models/foodModel.js";

// ADD FOOD
export const addFoodItem = async (req, res) => {
  try {
    const { name, description, price, status, veg } = req.body;

    if (!name || !description || !price || !req.file) {
      return res.status(400).json({
        message: "Name, description, price and image are required",
      });
    }

    // upload image
      const uploadedImage = await uploadFile(
      req.file.buffer,
      `food-${Date.now()}`
    );

    const foodItem = await foodModel.create({
      name,
      description,
      price,
      status: status || "In Stock",
      veg: veg === "true" || veg === true,
      image: uploadedImage.url,
      foodPartner: req.foodPartner._id,
    });


    res.status(201).json({
      message: "Food item added successfully",
      food: foodItem,
    });
  } catch (err) {
    console.error("Add food error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET PARTNER FOOD
export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({
      foodPartner: req.foodPartner._id,
    });
    res.status(200).json(foodItems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE FOOD
export const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      status: req.body.status,
      veg: req.body.veg,
    };

    // if new image uploaded
    if (req.file) {
      const uploadedImage = await uploadFile(
        req.file.buffer,
        "food-items"
      );
      updateData.image = uploadedImage.url;
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE FOOD
export const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
