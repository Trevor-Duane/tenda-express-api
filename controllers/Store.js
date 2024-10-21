import Store from "../models/store.js";
import StoreLog from "../models/store_logs.js"
import multer from "multer";


export const getStoreItems = async (req, res) => {
    try {
        const store_items = await Store.findAll()
        return res.status(200).json({success: true, data: store_items})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const populateStoreLogs = async (req, res) => {
    const { out_date, item_name, product_id, product_name, section, usage_amount, uom, leftin_store, username } = req.body;
    try {
        

        //Validate the request body
        if (out_date || item_name || product_id || product_name || section || usage_amount || uom || leftin_store || username) {
            return res.status(400).json({ error: "All fields are require" })
        }

        //Create new offer
        const newLog = await StoreLog.create({
            out_date,
            item_name,
            product_id,
            product_name,
            section,
            usage_amount,
            uom,
            leftin_store,
            username
        });

        //Respond with the newly created order
        return res.status(201).json({newLog})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

}