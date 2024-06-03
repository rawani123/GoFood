import express from "express";
import { foodData } from "../controller/food.controller.js";

const router = express.Router();

router.get("/food-data",foodData)




export default router;