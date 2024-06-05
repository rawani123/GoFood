import express from 'express';
import { myOrderData, orderData } from '../controller/food.controller.js';

const router = express.Router();

router.post('/order-data',orderData)

router.post('/myorder-data',myOrderData)

export default router;