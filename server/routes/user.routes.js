import express from "express";
import { createUser } from "../controller/user.controller.js";

const router = express.Router();    

router.post('/creatuser',createUser)


export default router;