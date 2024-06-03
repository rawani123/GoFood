import express from "express";
import { createUser, loginUser } from "../controller/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("password","password should have minimum 5 characters").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email").isEmail(),
  ],
  loginUser
);

export default router;
