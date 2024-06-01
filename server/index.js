import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

connectDB();



app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:5000');
});
