import Order from "../models/order.js";

export const createOrder = async (req, res) => {
    try{
        const {user_id, username, mobile, order_status, order_type, payment_mode, payment_status, order_items, order_total, delivery_latitude, delivery_longitude, delivery_fee} = req.body;

        //Validate the request body
        if(!user_id || !username || !mobile || !order_status || !order_type || !payment_mode || !payment_status || !order_items || !order_total || !delivery_latitude || !delivery_longitude || !delivery_fee) {
            return res.status(400).json({ error: "All fields are require"})
        }

        //Create new offer
        const newOrder = await Order.create({
            user_id,
            username,
            mobile,
            order_status,
            order_type,
            payment_mode,
            payment_status,
            order_items,
            order_total,
            delivery_fee,
            delivery_latitude,
            delivery_longitude
        });

        //Respond with the newly created order
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.json(orders)
    } catch (error) {
        res.json({message: error.message})
    }
}