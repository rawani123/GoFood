import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
    try {
        const { name, email, password,location} = req.body;
        if(!name || !email || !password || !location){
            return res.status(400).json({message: "All input is required"});
        }

        const userExists = await User.findOne({ email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword,location });
        await user.save();
        return res.status(201).json({ data: user });
    } catch (error) {
        console.log("Error in creating user: ", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export { createUser };