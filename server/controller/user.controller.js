import User from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        User.create
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}