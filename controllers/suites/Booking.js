import suitesBookings from "../../models/suites/booking.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
import { sendBookingNotificationEmail } from "./EmailNotification.js";

//Create a suites booking
export const createSuitesBooking = async (req, res) => {
    const { dateIn, dateOut, guests, room, first_name, last_name, phone, email } = req.body;

    try {
        //validate the request body
        if(!dateIn || !dateOut || !guests || !room || !first_name || !last_name || !phone || !email) {
            return res.status(400).json({sucess: false, error: true, message: "All fields are required"})
        }

        //create booking
        const newBooking = await suitesBookings.create({
            dateIn,
            dateOut,
            guests,
            room,
            first_name,
            last_name,
            phone,
            email
        });
        //send an email to admin
        await sendBookingNotificationEmail(newBooking)
        //respond with the create booking
        return res.status(201).json({ data: newBooking, success: true, message: "Your booking at Tenda Suites has been successfully submitted. We look forward to hosting you!" })
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, error: true, message: "Oops! Something went wrong while submitting your booking. Please try again or contact us for assistance." });
    }
}

//Return an already created booking with a certain ID
export const getSuiteBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await suitesBookings.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error("Error Fetching Booking by ID:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Oops! Something is broken",
    });
  }
};


//Return all created bookings
export const getSuitesBooking = async (req, res) => {
  try {
    const bookings = await suitesBookings.findAll();

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Currently no bookings available.",
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    console.error("Error Fetching Bookings:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Oops! Something went wrong while fetching the bookings. Please try again or contact us for assistance."
    });
  }
};