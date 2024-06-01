import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
        const db = connection.connection.db;
        const fetchData = await db.collection("food").find({}).toArray();
        console.log(fetchData);
    } catch (err) {
        console.log("Error in connecting database or fetching data");
        console.log(`Error: ${err.message}`);
    }
}

export default connectDB;