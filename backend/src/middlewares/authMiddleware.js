import foodpartnerModel from "../models/foodpartnerModel.js";
import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken';

export const authFoodPartnerMiddleware = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodpartnerModel.findById(decoded.id);
        if(!foodPartner){
            return res.status(401).json({message: "Unauthorized"});
        }

        req.foodPartner = foodPartner;
        next(); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error", error: err.message});
    }
}

export const authUserMiddleware = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }

        req.user = user;
        next(); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error", error: err.message});
    }
}   

