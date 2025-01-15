import { Sequelize } from "sequelize";
import Store from "../models/store.js";
import StoreLog from "../models/store_logs.js";
import db from "../config/database.js";
import multer from "multer";


export const getStoreItems = async (req, res) => {
    try {
        const store_items = await Store.findAll()
        return res.status(200).json({ success: true, data: store_items })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

// export const generateReports = async (req, res) => {
//     const { reportType, filters } = req.body;

//     let query;
//     switch (reportType) {
//       case 'store':
//         query = 'SELECT id, item_name, section, DATE(updateAt) AS updateAt FROM store';
//         break;
//       case 'sales':
//         query = 'SELECT * FROM sales WHERE date BETWEEN ? AND ?';
//         break;
//       default:
//         return res.status(400).send('Invalid report type');
//     }

//     try {
//       const [rows] = await db.query(query, filters || [], {
//         type: Sequelize.QueryTypes.SELECT
//       });
//       res.json(rows);
//     } catch (error) {
//       res.status(500).send('Error generating report');
//     }
// }

// export const generateReports = async (req, res) => {
//     const { reportType, filters } = req.body;

//     let query;
//     let replacements = [];

//     switch (reportType) {
//         case 'store':
//             query =
//                 'SELECT id, item_name, section, amount_in_store, DATE(updatedAt) AS updatedAt FROM store';
//             break;
//         case 'sales':
//             // query = 'SELECT * FROM sales WHERE date BETWEEN ? AND ?';
//             query = `SELECT 
//                 store_logs.item_name, 
//                 COUNT(store_logs.item_name) AS item_count, 
//                 SUM(store_logs.usage_amount) AS total_usage_amount, 
//                 store_logs.product_name, 
//                 store.amount_in_store
//             FROM 
//                 store_logs
//             JOIN 
//                 store ON store_logs.item_name = store.item_name
//             WHERE 
//                 store_logs.out_date BETWEEN :startDate AND :endDate
//             GROUP BY 
//                 store_logs.item_name, 
//                 store_logs.product_name, 
//                 store.amount_in_store
//         `
//             if (filters.startDate && filters.endDate) {
//                 replacements = [filters.startDate, filters.endDate];
//             } else {
//                 return res.status(400).send('Filters for sales report are missing.');
//             }
//             break;
//         default:
//             return res.status(400).send('Invalid report type');
//     }

//     try {
//         // Execute query with replacements if any
//         const [rows] = await db.query(query, {
//             replacements,
//             type: Sequelize.QueryTypes.SELECT,
//         });

//         // Log the raw data for debugging
//         console.log('Fetched rows:', rows);

//         // Send response
//         res.json(rows);
//     } catch (error) {
//         console.error('Error generating report:', error);
//         res.status(500).send('Error generating report');
//     }
// };

export const generateReports = async (req, res) => {
    const { reportType, startDate, endDate } = req.body;

    console.log("generate report data", reportType, startDate, endDate)

    let query;
    let replacements = {};

    try {
        // Select query based on report type
        switch (reportType) {
            case 'store':
                query = `
                    SELECT 
                        id, 
                        item_name, 
                        section, 
                        amount_in_store, 
                        DATE(updatedAt) AS updatedAt 
                    FROM store`;
                break;

            case 'sales':
                if (!startDate || !endDate) {
                    return res.status(400).json({ message: 'Start and End date filters are required for sales reports.' });
                }

                query = `
                    SELECT 
                        store_logs.item_name, 
                        COUNT(store_logs.item_name) AS item_count, 
                        SUM(store_logs.usage_amount) AS total_usage_amount, 
                        store_logs.product_name, 
                        store.amount_in_store
                    FROM 
                        store_logs
                    JOIN 
                        store ON store_logs.item_name = store.item_name
                    WHERE 
                        store_logs.out_date BETWEEN :startDate AND :endDate
                    GROUP BY 
                        store_logs.item_name, 
                        store_logs.product_name, 
                        store.amount_in_store`;

                replacements = { startDate: startDate, endDate: endDate };
                break;

            case 'sales2':
                if (!startDate || !endDate) {
                    return res.status(400).json({ message: 'Start and End date filters are required for sales reports.' });
                }

                query = `
                        SELECT 
                            store_logs.item_name, 
                            COUNT(store_logs.item_name) AS item_count, 
                            SUM(store_logs.usage_amount) AS total_usage_amount, 
                            store_logs.product_name, 
                            store.amount_in_store,
                            store.out_date,
                            items.item_price,
                            COUNT(store_logs.item_name) * items.item_price AS sales
                        FROM 
                            store_logs
                        JOIN 
                            store ON store_logs.item_name = store.item_name
                        JOIN 
                            items ON store_logs.product_id = items.id
                         WHERE 
                            store_logs.out_date BETWEEN :startDate AND :endDate
                        GROUP BY 
                            store_logs.item_name, 
                            store_logs.product_name, 
                            store.amount_in_store,
                            store.out_date,
                            items.item_price`;

                replacements = { startDate: startDate, endDate: endDate };
                break;

            default:
                return res.status(400).json({ message: 'Invalid report type provided.' });
        }

        // Execute the query with replacements
        const rows = await db.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT,
        });

        // Log rows for debugging
        console.log('Fetched rows:', rows);

        // Return results
        return res.status(200).json(rows);

    } catch (error) {
        console.error('Error generating report:', error);
        return res.status(500).json({ message: 'An error occurred while generating the report.', error });
    }
};



export const getStoreLogItems = async (req, res) => {
    try {
        const store_log_items = await StoreLog.findAll({
            order: [['out_date', 'DESC']],
        })
        return res.status(200).json({ success: true, data: store_log_items })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};


export const calculateStoreLogsSales = async (req, res) => {
    try {
        const stats = await db.query(
            `SELECT 
    store_logs.item_name, 
    COUNT(store_logs.item_name) AS item_count, 
    SUM(store_logs.usage_amount) AS total_usage_amount, 
    store_logs.product_name, 
    store.amount_in_store,
    items.item_price,
    COUNT(store_logs.item_name) * items.item_price AS sales
FROM 
    store_logs
JOIN 
    store ON store_logs.item_name = store.item_name
JOIN 
    items ON store_logs.product_id = items.id
GROUP BY 
    store_logs.item_name, 
    store_logs.product_name, 
    store.amount_in_store,
    items.item_price`, {
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ data: stats })
    } catch (error) {
        console.error("Error fetching stats")
    }
}
export const getStoreLogStats = async (req, res) => {
    try {
        const stats = await db.query(
            `SELECT store_logs.item_name, COUNT(store_logs.item_name) AS item_count, SUM(store_logs.usage_amount) As total_usage_amount, store_logs.product_name, store.amount_in_store
             FROM store_logs
             JOIN store ON store_logs.item_name = store.item_name
             GROUP BY store_logs.item_name, store_logs.product_name, store.amount_in_store`, {
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ data: stats })
    } catch (error) {
        console.error("Error fetching stats")
    }
}

export const getItemStats = async (req, res) => {
    const { item_name } = req.body;

    console.log("This is the item name:", item_name);
    try {
        const stats = await db.query(
            `SELECT store_logs.item_name, COUNT(store_logs.item_name) AS item_count, SUM(store_logs.usage_amount) AS total_usage_amount, store_logs.product_name, store.amount_in_store
             FROM store_logs
             JOIN store ON store_logs.item_name = store.item_name
             WHERE store_logs.item_name = :item_name 
             GROUP BY store_logs.item_name, store_logs.product_name, store.amount_in_store`,
            {
                replacements: { item_name },
                type: Sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error fetching item stats:", error);
        res.status(500).json({ error: "Error fetching stats" });
    }
}

export const getStoreLogStatsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        // Base query
        const query = `
            SELECT 
                store_logs.item_name, 
                COUNT(store_logs.item_name) AS item_count, 
                SUM(store_logs.usage_amount) AS total_usage_amount, 
                store_logs.product_name, 
                store.amount_in_store
            FROM 
                store_logs
            JOIN 
                store ON store_logs.item_name = store.item_name
            WHERE 
                store_logs.out_date BETWEEN :startDate AND :endDate
            GROUP BY 
                store_logs.item_name, 
                store_logs.product_name, 
                store.amount_in_store
        `;

        const stats = await db.query(query, {
            replacements: { startDate, endDate },
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Error fetching stats" });
    }
};

export const getStoreLogStatsFilter = async (req, res) => {
    const { startDate, endDate, item_name, product_name, singleDate } = req.body; // Extract filter parameters

    try {
        // Initialize the base query and parameters
        let query = `
            SELECT 
                store_logs.item_name, 
                COUNT(store_logs.item_name) AS item_count, 
                SUM(store_logs.usage_amount) AS total_usage_amount, 
                store_logs.product_name, 
                store.amount_in_store
            FROM 
                store_logs
            JOIN 
                store ON store_logs.item_name = store.item_name
            WHERE 
                1 = 1`;

        // Initialize replacements object for parameterized query
        const replacements = {};

        // Add filters based on provided parameters
        if (startDate && endDate) {
            query += ` AND store_logs.out_date BETWEEN :startDate AND :endDate`;
            replacements.startDate = startDate;
            replacements.endDate = endDate;
        }

        if (item_name) {
            query += ` AND store_logs.item_name = :item_name`;
            replacements.item_name = item_name;
        }

        if (product_name) {
            query += ` AND store_logs.product_name = :product_name`;
            replacements.product_name = product_name;
        }

        if (singleDate) {
            query += ` AND store_logs.out_date = :singleDate`;
            replacements.singleDate = singleDate;
        }

        // Grouping results
        query += ` GROUP BY 
                store_logs.item_name, 
                store_logs.product_name, 
                store.amount_in_store`;

        // Execute the query
        const stats = await db.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Error fetching stats" });
    }
};

export const calculateStoreLogsSalesFilter = async (req, res) => {
    const { startDate, endDate, item_name, product_name, singleDate } = req.body; // Extract filter parameters

    try {
        // Initialize the base query and parameters
        let query = `
            SELECT 
                store_logs.item_name, 
                COUNT(store_logs.item_name) AS item_count, 
                SUM(store_logs.usage_amount) AS total_usage_amount, 
                store_logs.product_name, 
                store.amount_in_store,
                items.item_price,
                COUNT(store_logs.item_name) * items.item_price AS sales
            FROM 
                store_logs
            JOIN 
                store ON store_logs.item_name = store.item_name
            JOIN 
                items ON store_logs.product_id = items.id
            WHERE 
                1 = 1`; // Base condition to simplify adding more conditions

        // Initialize replacements object for parameterized query
        const replacements = {};

        // Add filters based on provided parameters
        if (startDate && endDate) {
            query += ` AND store_logs.out_date BETWEEN :startDate AND :endDate`;
            replacements.startDate = startDate;
            replacements.endDate = endDate;
        }

        if (item_name) {
            query += ` AND store_logs.item_name = :item_name`;
            replacements.item_name = item_name;
        }

        if (product_name) {
            query += ` AND store_logs.product_name = :product_name`;
            replacements.product_name = product_name;
        }

        if (singleDate) {
            query += ` AND store_logs.out_date = :singleDate`;
            replacements.singleDate = singleDate;
        }

        // Grouping results
        query += ` GROUP BY 
                store_logs.item_name, 
                store_logs.product_name, 
                store.amount_in_store, 
                items.item_price`;

        // Execute the query
        const stats = await db.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Error fetching stats" });
    }
};







