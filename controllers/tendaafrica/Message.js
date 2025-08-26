import Message from "../../models/tendaafrica/messages.js";
import { TAEmailNotification } from "./TAEmailNotification.js";

export const submitMessage = async (req, res) => {
    try {
        const { name, subject, email, phoneNumber, message } = req.body;
        //Validate the request body
        if (!name || !subject || !email || !phoneNumber || !message) {
            return res.status(400).json({ error: "All fields are required" })
        }

        //Create new message
        const newMessage = await Message.create({
            name,
            subject,
            email,
            phoneNumber,
            message
        });

        //send an email to admin
        await TAEmailNotification(newMessage)

        // Respond with the created message
        return res.status(201).json({
            message: "Message submitted successfully",
            application: newMessage,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        return res.status(200).json({ messages })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
