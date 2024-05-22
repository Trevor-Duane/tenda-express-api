import Item from "../models/item.js";
import multer from "multer";

export const createItem = async (req, res) => {
    try{
        const {item_name, subcategory_id, item_price, item_rating, item_description} = req.body;
        const item_image = req.file ? req.file.path : null;

        //Validate the request body
        if(!item_name || !subcategory_id || !item_price || !item_rating || !item_description || !item_image) {
            return res.status(400).json({ error: "All fields are required"})
        }

        //Create new item
        const newItem = await Item.create({
            item_name,
            subcategory_id,
            item_price,
            item_rating,
            item_description,
            item_image
        });

        //Respond with the created item
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllItems = async (req, res) => {
    try{
        const items = await Item.findAll();
        res.status(200).json(items)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}