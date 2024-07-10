import Category from "../models/category.js";
import multer from "multer";


export const createCategory = async (req, res) => {
    try {
        const { category_name, category_description } = req.body;
        const category_image = req.file ? req.file.path : null;

        // Validate the request body
        if (!category_name || !category_description) {
            return res.status(400).json({ error: "All fields are required" }); // Added return statement
        }

        // Create new category
        const newCategory = await Category.create({
            category_name,
            category_description,
            category_image
        });

        // Respond with the created category
        res.status(201).json({success: true, message: "New Category"}); // Added return statement
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Added return statement
    }
};
export const editCategory = async (req, res) => {
    const { category_name, category_description, category_image } = req.body;

    try {
        const category = await Category.findOne({ where: { id: req.params.id } })
        if (category) {
            if (category_name !== undefined) category.category_name = category_name;
            if (category_description !== undefined) category.category_description = category_description;
            if (category_image !== undefined) category.category_image = category_image;
            await category.save();
            await category.reload();
            return res.status(200).json(category);
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the category' });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { id: req.params.id } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ category });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category doesn't exist" });
        }
        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the category" });
    }
};
