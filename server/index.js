import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/users", userRouter);



app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:5000');
});
