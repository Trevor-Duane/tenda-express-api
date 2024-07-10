import express from "express";
import { login, register, updateProfileImage } from "../controllers/User.js";
// import upload from "../middlewares/uploadMiddleware.js";
import upload from "../middlewares/imageMiddleware.js";
import { requestPasswordReset, resetPassword } from "../controllers/Passwords.js";

const userRoutes = express.Router();

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/register', upload.single('profile_image'), updateProfileImage)

//Password Rest
userRoutes.post('/password-reset', requestPasswordReset)
userRoutes.post('/reset-password', resetPassword)


export default userRoutes;