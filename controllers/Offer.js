import Offer from "../models/offer.js";
import multer from "multer";


export const createOffer = async (req, res) => {
    try{
        const {offer_title, offer_body, offer_date} = req.body;
        const offer_cover = req.file ? req.file.path : null;

        //Validate the request body
        if(!offer_title || !offer_body || !offer_date || !offer_cover) {
            return res.status(400).json({ error: "All fields are require"})
        }

        //Create new offer
        const newOffer = await Offer.create({
            offer_title,
            offer_body,
            offer_date,
            offer_cover
        });

        //Respond with the created offer
        res.status(201).json(newOffer)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll()
        res.json(offers)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateOfferById = async (req, res) => {
    try{
        const offerId = parseInt(req.params.id);

        const {offer_title, offer_body, offer_date} = req.body;

        //find post by ID
        const offer = await Offer.findByPk(offerId)

        //if the post doesnt exist, return a 404 error
        if(!offer) {
            return res.status(404).json({ error: 'offer not found'});
        }

        offer.offer_title = offer_title;
        offer.offer_body = offer_body;
        offer.offer_date = offer_date;

        
        //Delete the offer
        await offer.save();
        //Send a success reponse
        res.status(200).json({ message: 'Offer updated successfully', offer});
    
    } catch (err) {
        //handle errors
        console.error(err);
        res.status(500).json({ error: 'Server error' })
    }
}
export const deleteOfferById = async (req, res) => {
    try{
        const offerId = parseInt(req.params.id);
    
        //find post by ID
        const offer = await Offer.findByPk(offerId)

        //if the post doesnt exist, return a 404 error
        if(!offer) {
            return res.status(404).json({ error: 'offer not found'});
        }
        await offer.destroy(); //Delete the offer
        const offers = await Offer.findAll() // Get all the remaining offers
        res.status(200).json({ message: 'Offer deleted successfully', offers});  //Send a success reponse
    
    } catch (err) {
        //handle errors
        console.error(err);
        res.status(500).json({ error: 'Server error' })
    }
}

export const findByPk = async (req, res, next) => {
    try {
    
        const offer = await Offer.findOne({ where: { id: req.params.id } });

        if(!offer) {
            res.status(404).json({message: `offer with ${offer_id} not found`});
        }
        res.status(200).json({offer})

    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}