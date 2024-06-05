import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import foodRouter from './routes/food.routes.js';
import OrderRoutes from './routes/Order.routes.js';


dotenv.config();

const app = express();

connectDB();



app.use(express.json());
app.use(morgan('dev'));
app.use(cors())



app.use("/api/users", userRouter);
app.use("/api/food", foodRouter);

app.use("/orders",OrderRoutes)



app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:5000');
});
