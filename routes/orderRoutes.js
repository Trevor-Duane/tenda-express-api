import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { createOffer } from "../controllers/Offer.js";
import { createOrder, getOrders } from "../controllers/Order.js";

const orderRoutes = express.Router();

orderRoutes.post("/orders", createOrder);
orderRoutes.get("/orders", getOrders);

export default orderRoutes;