import Item from "../models/item.js";
import { Subcategory, Recipe, Store } from "../models/index.js"
import fs from 'fs'
import multer from "multer";

export const createItem = async (req, res) => {
    const { item_name, subcategory_id, item_price, item_rating, item_description } = req.body;
    // const item_image = req.file ? req.file.path : null;
    const item_image = `${req.file.filename}`;
    try {

        //Validate the request body
        if (!item_name || !subcategory_id || !item_price || !item_rating || !item_description || !item_image) {
            return res.status(400).json({ error: "All fields are required" })
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
        return res.status(201).json({ success: true, message: "Item Added" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll(
            {
                include: [
                {
                    model: Subcategory,
                    attributes: ['id', 'subcategory_name']
                },
                {
                    model: Recipe,
                    attributes: ['id', "usage_amount", "uom"],
                    include: {
                        model: Store,
                        attributes: ['id', "amount_in_store"]
                    }
                }
                    ]
            });
        res.status(200).json({ success: true, data: items })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const editItem = async (req, res) => {
    const { item_name, subcategory_id, item_price, item_rating, item_description } = req.body;
    const item_image = req.file ? req.file.path : null;
    try {
        const item = await Item.findOne({ where: { id: req.params.id } })
        if (item) {
            if (item_name !== undefined) item.item_name = item_name;
            if (subcategory_id !== undefined) item.subcategory_id = subcategory_id;
            if (item_price !== undefined) item.item_price = item_price;
            if (item_rating !== undefined) item.item_rating = item_rating;
            if (item_description !== undefined) item.item_description = item_description;
            if (item_image !== undefined) item.item_image = item_image;
            await item.save();
            await item.reload();
            return res.status(200).json(item);
        } else {
            return res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the item' });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findOne({ where: { id: req.params.id } });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

// export const deleteItem = async (req, res) => {
//     try {
//         const item = await Item.findByPk(req.params.id);
//         fs.unlink(`uploads/${item.image}`, () => {})
//         if (!item) {
//             return res.status(404).json({ message: "Item doesn't exist" });
//         }
//         await item.destroy();
//         return res.status(200).json({ message: "Item removed" });
//     } catch (error) {
//         return res.status(500).json({ error: "An error occurred while deleting the item" });
//     }
// };

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.body.id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item doesn't exist" });
        }

        fs.unlink(`public/uploads/${item.item_image}`, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });

        await item.destroy();
        res.status(200).json({ success: true, message: "Item removed" });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the item" });
    }
};