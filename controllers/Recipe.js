import Recipe from "../models/recipes.js";
import multer from "multer";
import { Item, Store } from "../models/index.js"
import StoreLog from "../models/store_logs.js";
import Sales from "../models/sales.js";

export const createRecipeItem = async (req, res) => {
        const {store_id, product_id, usage_amount, uom} = req.body;

    try{
        
        //Validate the request body
        if(!store_id || !product_id || !usage_amount || !uom) {
            return res.status(400).json({ error: "All fields are required"})
        }
        //Create new item
        const newItem = await Recipe.create({
            store_id,
            product_id,
            usage_amount,
            uom
        });
        //Respond with the created item
        console.log(newItem)
        return res.status(201).json({success: true, message:"Item Added"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            include: [{
                model: Item,
                attributes: ['id', 'item_name', 'item_price', 'item_image', 'item_rating', 'item_description', 'item_status']
            }]
            
        });
        return res.status(200).json({ success: true, data: recipes });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchRecipesByProductId = async (req, res) => {
    const productId = req.params.id;

    try {
        // const budget = await Budget.findOne({ where: { id: budgetId } });
        const recipes = await Recipe.findAll({
            where: { product_id: productId },
            include: [
              {
                model: Store, // Assuming you have a Store model associated with Recipe
                attributes: ['item_name', 'amount_in_store'], // Specify the Store attributes you want to include
              },
              {
                model: Item,
                attributes: ['item_price', 'item_description']
              }
            ],
          })

        res.json({
            data: recipes,
        });
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
    }
}

export const populateStoreLogs = async (req, res) => {
    const { kot, out_date, product_id, username, qty } = req.body; // Simplified the input fields
    try {
        // Validate the request body
        if (!kot || !out_date || !product_id || !username || !qty) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Fetch recipes for the provided product ID, including store data
        const recipes = await Recipe.findAll({
            where: { product_id: product_id },
            include: [
                {
                  model: Store,
                  attributes: ['item_name', 'amount_in_store', 'uom', 'section'], 
                },
                {
                  model: Item,
                  attributes: ['item_name', 'item_price']
                }
              ],
        });

        console.log("store logs recipes", recipes)

        // Loop through the fetched recipes
        for (const recipe of recipes) {

            const { amount_in_store, item_name, uom, section} = recipe.store; 
            const { item_name: product_name, item_price } = recipe.item

            // Multiply the usage_amount by the quantity (qty)
            const total_usage_amount = recipe.usage_amount * qty;

            // Calculate the amount left in store
            const leftin_store = amount_in_store - total_usage_amount;

            // Update the store amount in the store table
            await Store.update(
                { amount_in_store: leftin_store },
                { where: { item_name: item_name } } // Update the specific store item
            );

            // Create a log for the stock out
            await StoreLog.create({
                kot,
                out_date,
                quantity: qty,
                item_name,
                product_id,
                product_name: product_name,
                section: section, 
                usage_amount: total_usage_amount,
                uom: uom,
                leftin_store,
                username
            });
            //calculate the total sales amount
            const total_sale_amount = item_price * qty

            //populate the sales table
            await Sales.create({
                kot,
                sale_date,
                item_name: product_name,
                item_price,
                quantity: qty,
                amount: total_sale_amount

            })   
        }

        // Respond with a success message
        return res.status(201).json({ message: "Store logs populated successfully." });
    } catch (error) {
        console.error("Error populating store logs:", error);
        return res.status(500).json({ message: error.message });
    }
};

// export const populateStoreLogs = async (req, res) => {
//     const { kot, out_date, product_id, username, qty } = req.body; // Simplified the input fields
//     try {
//         // Validate the request body
//         if (!kot || !out_date || !product_id || !username || !qty) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Fetch recipes for the provided product ID, including store data
//         const recipes = await Recipe.findAll({
//             where: { product_id: product_id },
//             include: [
//                 {
//                   model: Store,
//                   attributes: ['item_name', 'amount_in_store', 'uom', 'section'], 
//                 },
//                 {
//                   model: Item,
//                   attributes: ['item_name']
//                 }
//               ],
//         });

//         console.log("store logs recipes", recipes)

//         // Loop through the fetched recipes
//         for (const recipe of recipes) {

//             const { amount_in_store, item_name, uom, section} = recipe.store; 

//             console.log("reciepe-------->store", recipe.store)
//             const { item_name: product_name } = recipe.item

//             console.log("item-------->store", recipe.item)
            
//             // Calculate the amount left in store
//             const leftin_store = amount_in_store - recipe.usage_amount;

//             // Update the store amount in the store table
//             await Store.update(
//                 { amount_in_store: leftin_store },
//                 { where: { item_name: item_name } } // Update the specific store item
//             );

//             // Create a log for the stock out
//             await StoreLog.create({
//                 kot,
//                 out_date,
//                 item_name,
//                 product_id,
//                 product_name: product_name, // Assuming this is accessible from recipe
//                 section: section, // Assuming this is accessible from recipe
//                 usage_amount: recipe.usage_amount,
//                 uom: uom,
//                 leftin_store,
//                 username
//             });
//         }

//         // Respond with a success message
//         return res.status(201).json({ message: "Store logs populated successfully." });
//     } catch (error) {
//         console.error("Error populating store logs:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };
