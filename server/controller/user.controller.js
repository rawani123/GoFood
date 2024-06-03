import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() ,success : false});
        }
        
        const { name, email, password,location} = req.body;
        if(!name || !email || !password || !location){
            return res.status(400).json({message: "All input is required",success : false});
        }

        const userExists = await User.findOne({ email});
        if(userExists){
            return res.status(400).json({message: "User already exists",success : false});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const user = new User({ name, email, password: hashedPassword,location });
        await user.save();
        return res.status(201).json({data: user ,success : true});
    } catch (error) {
        console.log("Error in creating user: ", error.message);
        return res.status(500).json({ error: error.message ,success : false});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All input is required",success : false});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist",success : false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(200).json({message: "Invalid credentials",success : false});  
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: "1d"});
        return res.status(200).json({success : true,token});
    } catch (error) {
        console.log("Error in login user: ", error.message);
        return res.status(500).json({ error: error.message,success : false});
    }
}

export { createUser, loginUser};