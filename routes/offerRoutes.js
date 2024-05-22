import express from "express";
import { createOffer, deleteOfferById, findByPk, getAllOffers, updateOfferById } from "../controllers/Offer.js";
import upload from "../middlewares/uploadMiddleware.js";

const offerRoutes = express.Router();

offerRoutes.get('/offers', getAllOffers)
offerRoutes.patch('/offer/:id/', updateOfferById)
offerRoutes.delete('/offer/:id/', deleteOfferById)
offerRoutes.get('/offer/:id/', findByPk)
offerRoutes.post('/offer', upload.single('offer_cover'), createOffer)


export default offerRoutes;