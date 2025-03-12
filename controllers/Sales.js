import db from "../config/database.js";
import Sales from "../models/sales.js";
import Sequelize from "sequelize"; // Import Sequelize

export const getDailySales = async (req, res) => {
    try {
        const sales_data = await db.query(
            `SELECT sale_date AS date, SUM(amount) AS total_amount
            FROM sales
            GROUP BY date
            ORDER BY date ASC
            LIMIT 5;`, {
            type: Sequelize.QueryTypes.SELECT
        });

        // Format to match required structure
        const formattedData = sales_data.map(row => ({
            date: row.date,
            amount: row.total_amount
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const findAllSalesData = async (req, res) => {
    try {
      const sales = await Sales.findAll()
      return res.json({ success: true, data: sales })
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  export const getTotalRevenue = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT SUM(amount) AS total_revenue FROM sales;`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        res.status(200).json({ total_revenue: result[0].total_revenue });
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getTopSellingItems = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT item_name, SUM(amount) AS total_sales
             FROM sales
             GROUP BY item_name
             ORDER BY total_sales DESC
             LIMIT 3;`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching top-selling items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};