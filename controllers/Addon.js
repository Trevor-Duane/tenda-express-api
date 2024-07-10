import Addon from "../models/addon.js";
import multer from "multer";

export const createAddon = async (req, res) => {
    const { addon_name, item_id, addon_price, addon_rating, addon_description } = req.body;
    const addon_image = req.file ? req.file.path : null;
    try {
        //Validate the request body
        if (!addon_name || !item_id || !addon_price || !addon_rating || !addon_description || !addon_image) {
            return res.status(400).json({ error: "All fields are required" })
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
        return res.status(201).json({ newAddon })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllAddons = async (req, res) => {
    try {
        const addons = await Addon.findAll();
        return res.status(200).json({ addons })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const editAddon = async (req, res) => {
    const { addon_name, item_id, addon_price, addon_rating, addon_description } = req.body;
    const addon_image = req.file ? req.file.path : null;
    try {
        const addon = await Addon.findOne({ where: { id: req.params.id } })
        if (item) {
            if (addon_name !== undefined) addon.addon_name = addon_name;
            if (item_id !== undefined) addon.item_id = item_id;
            if (addon_price !== undefined) addon.addon_price = addon_price;
            if (addon_rating !== undefined) addon.addon_rating = addon_rating;
            if (addon_description !== undefined) addon.addon_description = addon_description;
            if (addon_image !== undefined) addon.addon_image = addon_image;
            await addon.save();
            await addon.reload();
            return res.status(200).json({ addon });
        } else {
            return res.status(404).json({ error: 'Addon not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the addon' });
    }
};

export const getAddonById = async (req, res) => {
    try {
        const addon = await Addon.findOne({ where: { id: req.params.id } });

        if (!addon) {
            return res.status(404).json({ message: "Addon not found" });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const deleteAddon = async (req, res) => {
    try {
        const addon = await Addon.findByPk(req.params.id);
        if (!addon) {
            return res.status(404).json({ message: "Addon doesn't exist" });
        }
        await addon.destroy();
        return res.status(200).json({ message: "Addon deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the addon" });
    }
};