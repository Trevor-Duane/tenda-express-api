import transporter from "../middlewares/emailTransporter.js";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

export const sendBookingNotificationEmail = async (booking) => {
    try {
        // Fetch admin users/emails from DB (adjust query as needed)
        const users = await db.query("SELECT * FROM users WHERE role = 'admin'", {
            type: Sequelize.QueryTypes.SELECT,
        });

        if (!Array.isArray(users) || users.length === 0) {
            console.log("No admin users found to notify.");
            return;
        }

        const emails = ["namugera@gmail.com", "trevorkayiira@gmail.com"];

        const mailOptions = {
            from: `"Tenda Suites Booking" <${process.env.EMAIL_USER}>`,
            to: emails.join(", "),
            subject: `New Booking from ${booking.first_name} ${booking.last_name}`,
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px 0;">
            <table align="center" role="presentation" style="width: 600px; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                <tr>
                <td style="padding: 20px; text-align: center; background-color: #000000; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <img src="https://tendasuites.com/img/logo.png" alt="Tenda Suites Logo" width="140" style="display: block; margin: 0 auto;" />
                </td>
                </tr>

                <tr>
                <td style="padding: 30px 40px;">
                    <h2 style="color: #333333; font-weight: 700; margin-bottom: 15px;">New Booking Notification</h2>
                    <p style="font-size: 16px; color: #555555; line-height: 1.5;">
                    You have received a new booking at <strong>Tenda Suites</strong>. Below are the details:
                    </p>

                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 25px;">
                    <tbody>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; width: 150px; color: #444;">Guest Name</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">
                            ${booking.first_name} ${booking.last_name}
                        </td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Room</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.room}</td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Number of Guests</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.guests}</td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Phone</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.phone}</td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Email</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.email}</td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Check-In Date</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.dateIn}</td>
                        </tr>
                        <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Check-Out Date</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #555;">${booking.dateOut}</td>
                        </tr>
                    </tbody>
                    </table>

                    <p style="margin-top: 30px; font-size: 14px; color: #888; text-align: center;">
                    &copy; ${new Date().getFullYear()} Tenda Africa LTD. All rights reserved.
                    </p>
                </td>
                </tr>
            </table>
            </div>
  `,
        };


        await transporter.sendMail(mailOptions);
        console.log("Booking notification email sent successfully!");
    } catch (error) {
        console.error("Error sending booking notification email:", error);
    }
};
