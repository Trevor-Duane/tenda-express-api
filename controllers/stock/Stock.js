import db from "../../config/database.js";
import Stock from "../../models/stock/stock.js"
import StockMovement from "../../models/stock/stock_movements.js";
// Endpoint to log the stock movement



export const transferStock = async (req, res) => {
    const { stock_item, from_stock_id, to_stock_id, movement_type, quantity, section } = req.body;
  
    // Validate inputs
    if (!from_stock_id || !to_stock_id || !quantity || !movement_type) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Start a transaction
      const result = await db.transaction(async (t) => {
        // Check if the from_stock_id has enough stock
        const fromStock = await Stock.findOne({ where: { id: from_stock_id }, transaction: t });
        if (!fromStock || fromStock.portions_in_stock < quantity) {
          throw new Error('Not enough stock available for transfer');
        }
  
        // Create a new stock movement entry
        const newMovement = await StockMovement.create({
          stock_item,
          from_stock_id,
          to_stock_id,
          movement_type,
          quantity,
          section,
        }, { transaction: t });
  
        // Handle stock quantity updates
        if (movement_type === 'transfer') {
          // Reduce stock from "from_stock_id"
          await Stock.decrement('portions_in_stock', { by: quantity, where: { id: from_stock_id }, transaction: t });
          // Add stock to "to_stock_id"
          await Stock.increment('portions_in_stock', { by: quantity, where: { id: to_stock_id }, transaction: t });
        } else if (movement_type === 'in') {
          // Add stock to "to_stock_id"
          await Stock.increment('portions_in_stock', { by: quantity, where: { id: to_stock_id }, transaction: t });
        } else if (movement_type === 'out') {
          // Reduce stock from "from_stock_id"
          await Stock.decrement('portions_in_stock', { by: quantity, where: { id: from_stock_id }, transaction: t });
        }
  
        return newMovement;
      });
  
      res.json({ message: 'Stock movement logged successfully', movement: result });
    } catch (error) {
      console.error('Error logging stock movement:', error);
      res.status(500).json({ error: error.message || 'Error logging stock movement' });
    }
  };
  
  