import Recipe from "../models/recipes.js";
import multer from "multer";
import { Item, Store } from "../models/index.js"

export const createRecipeItem = async (req, res) => {
        const {store_id, product_id, usage_amount, uom} = req.body;

        console.log(req.body, 'request body')
        
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