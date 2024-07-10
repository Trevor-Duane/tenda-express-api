import Feedback from "../models/feedback.js";
import multer from "multer";

export const submitFeedback = async (req, res) => {
    try{
        const {customer_id, contact, username, email, order_id, feedback} = req.body;
        //Validate the request body
        if(!customer_id || !contact || !username || !email || !order_id || !feedback) {
            return res.status(400).json({ error: "All fields are required"})
        }

        //Create new feedback
        const newFeedback = await Feedback.create({
            customer_id,
            contact,
            username,
            email,
            order_id,
            feedback
        });

        //Respond with the created feedback
        return res.status(201).json({newFeedback})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAllFeedbacks = async (req, res) => {
    try{
        const feedbacks = await Feedback.findAll();
        return res.status(200).json({feedbacks})
    }
    catch (error) {
        return res.status(500).json({message: error.message})
    }
}