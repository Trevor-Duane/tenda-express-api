import express from "express";
import { register, updateProfileImage } from "../controllers/User.js";
import upload from "../middlewares/uploadMiddleware.js";

const userRoutes = express.Router();

userRoutes.post('/register', register)
userRoutes.post('/register', upload.single('profile_image'), updateProfileImage)


export default userRoutes;