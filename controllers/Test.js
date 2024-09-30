import db from "../config/database.js";

export const fetchUsers = async (req, res) => {
    const users = await db.query('SELECT * FROM users');

    res.json({users:users})
}