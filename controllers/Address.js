import Address from "../models/address.js";
import multer from "multer";

export const addAddress = async (req, res) => {
    try{
        const {user_id, address, landmark, address_latitude, address_longitude} = req.body;

        //Validate the request body
        if(!user_id || !address || !landmark || !address_latitude || !address_longitude) {
            return res.status(400).json({ error: "All fields are required"})
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
        res.status(201).json(newAddress)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllAddresses = async (req, res) => {
    try{
        const addresses = await Address.findAll();
        res.status(200).json(addresses)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}