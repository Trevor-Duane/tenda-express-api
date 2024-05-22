import Addon from "../models/addon.js";
import multer from "multer";

export const createAddon = async (req, res) => {
    try{
        const {addon_name, item_id, addon_price, addon_rating, addon_description} = req.body;
        const addon_image = req.file ? req.file.path : null;

        //Validate the request body
        if(!addon_name || !item_id || !addon_price || !addon_rating || !addon_description || !addon_image) {
            return res.status(400).json({ error: "All fields are required"})
        }

        //Create new addon
        const newAddon = await Addon.create({
            addon_name,
            item_id,
            addon_price,
            addon_rating,
            addon_description,
            addon_image
        });

        //Respond with the created addon
        res.status(201).json(newAddon)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllAddons = async (req, res) => {
    try{
        const addons = await Addon.findAll();
        res.status(200).json(addons)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}