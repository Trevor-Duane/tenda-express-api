import Payment from "../models/payment";

export const storePayment = async (req, res) => {
    try {
        const { order_id, user_id, amount, payment_method, transaction_id, status, payment_date } = req.body;

        if (!order_id || !user_id || !amount || !payment_method || !transaction_id || !status || !payment_date) {
            return res.status(400).json({ error: "All fields are require" })
        }

        const payment = await Payment.create({
            order_id,
            user_id,
            amount,
            payment_method,
            transaction_id,
            status,
            payment_date
        })
        res.status(201).json(payment)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}
