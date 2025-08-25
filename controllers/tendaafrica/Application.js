import Application from "../../models/tendaafrica/applications.js";
import multer from "multer";

export const submitApplication = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, viewedCourse } = req.body;
        //Validate the request body
        if (!fullName || !email || !phoneNumber || !viewedCourse) {
            return res.status(400).json({ error: "All fields are required" })
        }

        //Create new application
        const newApplication = await Application.create({
            fullName,
            email,
            phoneNumber,
            viewedCourse
        });

        // Respond with the created application
        return res.status(201).json({
            message: "Application submitted successfully",
            application: newApplication,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllApplications = async (req, res) => {
    try{
        const applications = await Application.findAll();
        return res.status(200).json({applications})
    }
    catch (error) {
        return res.status(500).json({message: error.message})
    }
}