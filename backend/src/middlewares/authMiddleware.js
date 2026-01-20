import foodpartnerModel from "../models/foodpartnerModel.js";
import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken';

// Example of how your backend should check the token
export const authFoodPartnerMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No valid token provided' });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Use the ID from the decoded token to find the partner
        const foodPartner = await foodpartnerModel.findById(decoded.id);
        if (!foodPartner) return res.status(401).json({ message: 'Partner not found' });

        req.foodPartner = foodPartner;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

// backend/src/middlewares/authMiddleware.js

export const authUserMiddleware = (req, res, next) => {
  try {
    console.log("Headers:", req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
