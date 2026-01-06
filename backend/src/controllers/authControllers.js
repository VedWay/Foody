import userModel from "../models/userModels.js";
import foodPartnerModel from "../models/foodpartnerModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

 export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({ email });
    if (isAlreadyRegistered) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName: fullName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server error", error: err.message});
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "Logout successful"});
};  

export const registerfoodPartner = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    
    const isAlreadyRegistered = await foodPartnerModel.findOne({ email });
    if (isAlreadyRegistered) {
      return res.status(400).json({ message: "Food Partner already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name: name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "Food Partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const loginfoodPartner = async (req, res) => {
  try{
      const {email, password} = req.body;

      const foodPartner = await foodPartnerModel.findOne({email});
      if(!foodPartner){
          return res.status(400).json({message: "Food Partner not found"});
      }

      const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
      if(!isPasswordValid){
          return res.status(400).json({message: "Invalid credentials"});
      }
      const token = jwt.sign({id: foodPartner._id}, process.env.JWT_SECRET, {
          expiresIn: "1d"
      });
      res.cookie("token", token);
      
      res.status(200).json({
          message: "Login successful",
          foodPartner: {
              _id: foodPartner._id,
              name: foodPartner.name,
              email: foodPartner.email
          }
      });
  } catch(err){
      console.error(err);
      res.status(500).json({message: "Server error", error: err.message});
  }
};

export const logoutfoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({message: "Logout successful"});
};
