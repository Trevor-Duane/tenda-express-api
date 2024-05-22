import Subcategory from "../models/subcategory.js";
import multer from "multer";

export const createSubcategory = async (req, res) => {
    try{
        const {subcategory_name, category_id} = req.body;

        //Validate the request body
        if(!subcategory_name || !category_id) {
            return res.status(400).json({ error: "All fields are required"})
        }

        //Create new catgeory
        const newSubcategory = await Subcategory.create({
            subcategory_name,
            category_id
        });

        //Respond with the created catgeory
        res.status(201).json(newSubcategory)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const editSubcategory = async (req, res) => {};
export const archiveSubcategory = async (req, res) => {};

export const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll()
        res.status(200).json(subcategories)
    } catch (error) {
        
    }
};
export const getSubcategoryById = async (req, res) => {};