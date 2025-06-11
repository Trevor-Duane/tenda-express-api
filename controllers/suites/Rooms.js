import suitesRooms from "../../models/suites/room.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";


export const createRoom = async (req, res) => {
    const { name, rate, size, capacity, bed, description } = req.body;

    try {
        //validate the request body
        if (!name || !rate || !size || !capacity || !bed || !description) {
            return res.status(400).json({ sucess: false, error: true, message: "All fields are required" })
        }

        //create a new room
        const newRoom = await suitesRooms.create({
            name,
            rate,
            size,
            capacity,
            bed,
            description
        });

        //respond with the created room
        return res.status(201).json({ data: newRoom, success: true, message: "Your room has been created" })
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ success: false, error: true, message: "Oops! Something went wrong, room not created" });
    }
}

//Return a specific room from the database
export const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const room = await suitesRooms.findByPk(id);

      if (!room) {
        return res.status(404).json({
          success: false,
          message: `No room found with ID: ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: room
      });
    }

  } catch (error) {
    console.error("Error Fetching Room:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Oops! Something is broken"
    });
  }
};

//Return all the rooms in the database
export const getRooms = async (req, res) => {
    try {
        const rooms = await suitesRooms.findAll();

        if (rooms.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Currently no rooms in database.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            data: rooms
        });

    } catch (error) {
        console.error("Error Fetching Rooms:", error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Oops! Something went wrong while fetching the rooms. Please try again or contact us for assistance."
        });
    }
};

//Update room details
export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, rate, size, capacity, bed, description } = req.body;

  try {
    const room = await suitesRooms.findByPk(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: `No room found with ID: ${id}`
      });
    }
    //update the room fields (only if values are provided)
    room.name = name ?? room.name;
    room.rate = rate ?? room.rate;
    room.size = size ?? room.size;
    room.capacity = capacity ?? room.capacity;
    room.bed = bed ?? room.bed;
    room.description = description ?? room.description;

    //Save the updated room
    await room.save();

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room
    });

  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Oops! Something went wrong while updating the room."
    });
  }
};
