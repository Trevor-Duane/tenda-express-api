import transporter from "../middlewares/emailTransporter.js";
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Budget from "../models/budget.js";

// Function to send email notifications
export const RegistrationEmailNotification = async (record) => {

    console.log("----------------record-------------------")
    console.log(record)
    console.log("----------------record-------------------")
    try {
        // Fetch admins from the database
        const users = await db.query("SELECT * FROM users WHERE user_role = 1", {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log('email', users)

        if (!Array.isArray(users) || users.length === 0) {
            console.log("No active users to notify.");
            return;
        }

        // Ensure users are an array and map over it to extract emails
        const emails = users.map(user => user.email);
        console.log('Emails:', emails);  // Log the list of emails


        // Construct email options with HTML body and logo, without attachments
        const mailOptions = {
            from: `"TendaExpress - Verification" <${process.env.EMAIL_USER}>`,
            to: emails.join(", "),  // Join emails as a comma-separated string
            // to: users.map((user) => user.email).join(","),
            subject: `User Verification Code`,
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #000; border: 1px solid #ddd; padding: 20px; border-radius: 10px; max-width: fit-content; margin: 0 auto;">
            <div style="padding: 10px; text-align: center;">
                <!-- Logo -->
                <img height="100" width="120" src="https://tendacafe.com/static/media/logo.b6916735141a9c3da411.png" alt="Logo">
            </div>

            <div style="padding: 20px; background-color: #e2c0f8; border-radius: 10px">
            <div>
              <p>
                New User Registration
              </p>
                <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
            <thead>
                <tr style="background-color: #663399; color: #fff;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Username</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Verification Code</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 10px; border: 1px solid #ddd;">${record.username}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${record.code}</td>
                </tr>
                
            </tbody>
        </table>
        
            <div style="text-align: center; padding: 6px; color: #777; font-size: 12px;">
                <p>&copy; ${new Date().getFullYear()} Tenda Africa LTD. All Rights Reserved.</p>
            </div>
        </div>
    `
        };


        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully!");
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};
