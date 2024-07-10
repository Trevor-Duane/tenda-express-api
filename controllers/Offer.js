import Offer from "../models/offer.js";
import multer from "multer";


export const createOffer = async (req, res) => {
    const { offer_title, offer_body, offer_date } = req.body;
    const offer_cover = req.file ? req.file.path : null;
    try {
        //Validate the request body
        if (!offer_title || !offer_body || !offer_date || !offer_cover) {
            return res.status(400).json({ error: "All fields are require" })
        }

        //Create new offer
        const newOffer = await Offer.create({
            offer_title,
            offer_body,
            offer_date,
            offer_cover
        });

        //Respond with the created offer
        return res.status(201).json({ newOffer })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll()
        return res.json({ offers })
    } catch (error) {
        return res.json({ message: error.message })
    }
};

export const findOfferById = async (req, res, next) => {
    try {

        const offer = await Offer.findOne({ where: { id: req.params.id } });

        if (!offer) {
            return res.status(404).json({ message: `offer not found` });
        }
        return res.status(200).json({ offer })

    } catch (error) {
        return res.status(500).json({ error: "Server error" })
    }
}


export const editOffer = async (req, res) => {
    const { offer_title, offer_body, offer_date } = req.body;
    const offer_cover = req.file ? req.file.path : null;

    try {
        const offer = await Offer.findOne({ where: { id: req.params.id } })
        if (offer) {
            if (offer_title !== undefined) offer.offer_title = offer_title;
            if (offer_body !== undefined) offer.offer_body = offer_body;
            if (offer_date !== undefined) offer.offer_date = offer_date;
            if (offer_cover !== undefined) offer.offer_cover = offer_cover;
            await offer.save();
            await offer.reload();
            return res.status(200).json({ offer });
        } else {
            return res.status(404).json({ error: 'Offer not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the Offer' });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: "Offer doesn't exist" });
        }
        await offer.destroy();
        return res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the offer" });
    }
};

