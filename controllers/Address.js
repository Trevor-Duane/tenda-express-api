import Address from "../models/address.js";
import multer from "multer";

export const addAddress = async (req, res) => {
    try {
        const { user_id, address, landmark, address_latitude, address_longitude } = req.body;
        //Validate the request body
        if (!user_id || !address || !landmark || !address_latitude || !address_longitude) {
            return res.status(400).json({ error: "All fields are required" })
        }
        //Create new address
        const newAddress = await Address.create({
            user_id,
            address,
            landmark,
            address_latitude,
            address_longitude
        });
        //Respond with the created address
        return res.status(201).json({ newAddress })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        return res.status(200).json({ addresses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({ where: { user_id: req.params.user_id } });

        if (!addresses) {
            return res.status(404).json({ message: "No address found" });
        }

        return res.status(200).json({ addresses });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};
export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({ message: "Address doesn't exist" });
        }
        await address.destroy();
        return res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the address" });
    }
};