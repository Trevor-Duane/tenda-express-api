// export const getItemStats = async (req, res) => {
//     const { item_name } = req.body;

//     console.log("This is the item name:", item_name);
//     try {
//         const stats = await db.query(
//             `SELECT item_name, COUNT(*) AS item_count, SUM(usage_amount) AS total_usage_amount 
//              FROM store_logs 
//              WHERE item_name = :item_name 
//              GROUP BY item_name`,
//             {
//                 replacements: { item_name },
//                 type: Sequelize.QueryTypes.SELECT
//             }
//         );

//         res.status(200).json({ data: stats });
//     } catch (error) {
//         console.error("Error fetching item stats:", error);
//         res.status(500).json({ error: "Error fetching stats" });
//     }
// };


// export const getItemStats = async(req, res) => {
//     const { item_name } = req.body;

//     console.log("this the item name", item_name)
//     try {
//         const stats = await db.query(`SELECT item_name, COUNT(*) AS item_count, SUM(usage_amount) As total_usage_amount FROM store_logs WHERE item_name = ${item_name} GROUP BY item_name`,{
//             type: Sequelize.QueryTypes.SELECT
//         });
//     } catch (error) {
//         console.error("Error fetching stats")
//     }
// }



// export const populateStoreLogs = async (req, res) => {
//     const { out_date, item_name, product_id, product_name, section, usage_amount, uom, leftin_store, username } = req.body;
//     try {
        

//         //Validate the request body
//         if (out_date || item_name || product_id || product_name || section || usage_amount || uom || leftin_store || username) {
//             return res.status(400).json({ error: "All fields are require" })
//         }

//         //Create new offer
//         const newLog = await StoreLog.create({
//             out_date,
//             item_name,
//             product_id,
//             product_name,
//             section,
//             usage_amount,
//             uom,
//             leftin_store,
//             username
//         });

//         //Respond with the newly created order
//         return res.status(201).json({newLog})
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// };

// unfinished work
// export  const calculateStoreLogsSales = async (req, res) => {
//     try {
//         const stats = await db.query(`SELECT store_logs.item_name, COUNT(store_logs.item_name) AS item_count, SUM(store_logs.usage_amount) As total_usage_amount, store_logs.product_name, store.amount_in_store, items.item_price FROM store_logs JOIN store ON store_logs.item_name = store.item_name JOIN items ON store_logs.product_name = items.item_name GROUP BY store_logs.item_name, store_logs.product_name, store.amount_in_store`,{
//             type: Sequelize.QueryTypes.SELECT
//         });

//         res.status(200).json({data: stats})
//     } catch (error) {
//         console.error("Error fetching stats")
//     }
// }


// export const calculateStoreLogsSales = async (req, res) => {
//     const { product_name, item_name } = req.body; // Extract filter parameters

//     try {
//         // Base query
//         let query = `
//             SELECT 
//                 store_logs.item_name, 
//                 COUNT(store_logs.item_name) AS item_count, 
//                 SUM(store_logs.usage_amount) AS total_usage_amount, 
//                 store_logs.product_name, 
//                 store.amount_in_store,
//                 items.item_price,
//                 COUNT(store_logs.item_name) * items.item_price AS sales
//             FROM 
//                 store_logs
//             JOIN 
//                 store ON store_logs.item_name = store.item_name
//             JOIN 
//                 items ON store_logs.product_id = items.id
//         `;
        
//         // Initialize filter conditions
//         let whereConditions = [];
//         let replacements = {};

//         // Add conditions based on filter inputs
//         if (product_name) {
//             whereConditions.push("store_logs.product_name = :product_name");
//             replacements.product_name = product_name;
//         }

//         if (item_name) {
//             whereConditions.push("store_logs.item_name = :item_name");
//             replacements.item_name = item_name;
//         }

//         // Append where conditions if any exist
//         if (whereConditions.length > 0) {
//             query += " WHERE " + whereConditions.join(" AND ");
//         }

//         query += `
//             GROUP BY 
//                 store_logs.item_name, 
//                 store_logs.product_name, 
//                 store.amount_in_store,
//                 items.item_price
//         `;

//         const stats = await db.query(query, {
//             replacements: replacements,
//             type: Sequelize.QueryTypes.SELECT
//         });

//         res.status(200).json({ data: stats });
//     } catch (error) {
//         console.error("Error fetching stats:", error);
//         res.status(500).json({ error: "Error fetching stats" });
//     }
// };



// mulitplefilters

// export const getStoreLogStats = async (req, res) => {
//     const { startDate, endDate, item_name, product_name, singleDate } = req.body; // Extract filter parameters

//     try {
//         // Initialize the base query and parameters
//         let query = `
//             SELECT 
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
//                 1 = 1`; // Base condition to simplify adding more conditions
        
//         // Initialize replacements object for parameterized query
//         const replacements = {};

//         // Add filters based on provided parameters
//         if (startDate && endDate) {
//             query += ` AND store_logs.out_date BETWEEN :startDate AND :endDate`;
//             replacements.startDate = startDate;
//             replacements.endDate = endDate;
//         }

//         if (item_name) {
//             query += ` AND store_logs.item_name = :item_name`;
//             replacements.item_name = item_name;
//         }

//         if (product_name) {
//             query += ` AND store_logs.product_name = :product_name`;
//             replacements.product_name = product_name;
//         }

//         if (singleDate) {
//             query += ` AND store_logs.out_date = :singleDate`;
//             replacements.singleDate = singleDate;
//         }

//         // Grouping results
//         query += ` GROUP BY 
//                 store_logs.item_name, 
//                 store_logs.product_name, 
//                 store.amount_in_store`;

//         // Execute the query
//         const stats = await db.query(query, {
//             replacements,
//             type: Sequelize.QueryTypes.SELECT
//         });

//         res.status(200).json({ data: stats });
//     } catch (error) {
//         console.error("Error fetching stats:", error);
//         res.status(500).json({ error: "Error fetching stats" });
//     }
// };
