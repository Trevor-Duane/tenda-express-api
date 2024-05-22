import Category from "../models/category.js";
import multer from "multer";


export const createCategory = async (req, res) => {
    try{
        const {category_name, category_description} = req.body;
        const category_image = req.file ? req.file.path : null;

        //Validate the request body
        if(!category_name || !category_description) {
            return res.status(400).json({ error: "All fields are required"})
        }

        //Create new catgeory
        const newCategory = await Category.create({
            category_name,
            category_description,
            category_image
        });

        //Respond with the created category
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const editCategory = async (req, res) => {};
export const archiveCategory = async (req, res) => {};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
export const getCategoryById = async (req, res) => {};