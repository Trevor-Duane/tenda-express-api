import Request from "../../models/tendaafrica/requests.js";
import multer from "multer";

export const submitInfoRequest = async (req, res) => {
    try {
        const { fullName, email, viewedCourse, additionalInfo } = req.body;
        //Validate the request body
        if (!fullName || !email || !phoneNumber || !viewedCourse || additionalInfo) {
            return res.status(400).json({ error: "All fields are required" })
        }

        //Create new request
        const newInfoRequest = await Request.create({
            fullName,
            email,
            viewedCourse,
            additionalInfo
        });

        // Respond with the created request
        return res.status(201).json({
            message: "Application submitted successfully",
            application: newInfoRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getAllRequests = async (req, res) => {
    try{
        const requests = await Request.findAll();
        return res.status(200).json({requests})
    }
    catch (error) {
        return res.status(500).json({message: error.message})
    }
}
