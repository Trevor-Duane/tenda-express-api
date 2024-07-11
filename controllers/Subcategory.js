import Subcategory from "../models/subcategory.js";
import { Item } from "../models/index.js"
import multer from "multer";

export const createSubcategory = async (req, res) => {
    const {category_id, subcategory_name} = req.body;

    try {
        // //Validate the request body
        // if (!subcategory_name || !category_id) {
        //     return res.status(400).json({ message: "All fields are required" })
        // }

        //Create new catgeory
        const newSubcategory = await Subcategory.create({
            subcategory_name,
            category_id
        });

        //Respond with the created catgeory
        await newSubcategory.save();
        res.status(201).json({ success: true, message: "Subcategory Created" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const editSubategory = async (req, res) => {
    const { subcategory_name } = req.body;
    try {
        const subcategory = await Subcategory.findOne({ where: { id: req.params.id } })
        if (subcategory) {
            if (subcategory_name !== undefined) subcategory.subcategory_name = subcategory_name;
            await subcategory.save();
            await subcategory.reload();
            return res.status(200).json(subcategory);
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the category' });
    }
};

export const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll({
            include: {
                model: Item,
                attributes: ['id']
            },
        })
        return res.status(200).json({success: true, data: subcategories})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};
export const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findOne({ 
            where: { id: req.params.id },
            include: {
                model: Item,
                attributes: ['id', 'item_name', 'item_price', 'item_image', 'item_rating', 'item_description', 'item_status']
            }
         });

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        return res.status(200).json({data: [subcategory]});
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory doesn't exist" });
        }
        await subcategory.destroy();
        return res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the subcategory" });
    }
};
