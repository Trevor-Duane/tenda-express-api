import Order from "../models/order.js";

export const createOrder = async (req, res) => {
    const { user_id, username, mobile, order_status, order_type, payment_mode, payment_status, order_items, order_total, delivery_latitude, delivery_longitude, delivery_fee } = req.body;
    try {
        

        //Validate the request body
        // if (!user_id || !username || !mobile || !order_status || !order_type || !payment_mode || !payment_status || !order_items || !order_total || !delivery_latitude || !delivery_longitude || !delivery_fee) {
        //     return res.status(400).json({ error: "All fields are require" })
        // }

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
        return res.status(201).json({newOrder})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()
        return res.status(200).json({success: true, data: orders})
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const getOrderByPk = async (req, res) => {
    try {
        const order = await Order.findOne({ where: { id: req.params.id } });

        if (!order) {
            return res.status(404).json({ message: `order not found` });
        }
        return res.status(200).json({ order })

    } catch (error) {
        return res.status(500).json({ error: "Server error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.body.id)

        if(order) {
            order.order_status = req.body.status
            await order.save()
            res.json({success: true, message: "Status Updated"})
        } else {
            res.json({success: false, message: "Item Not Found"})
        }
    } catch (error) {
        res.json({success: false, message: error})    
    }
}