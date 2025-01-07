import Inventory from "../../models/stock/inventory.js"
import Stock from "../../models/stock/stock.js"

export const getInventoryItems = async (req, res) => {
    try {
        const items = await Inventory.findAll()
        return res.status(200).json({ success: true, data: items })
    } catch (error) {
        return res.json({ message: "Server Error" })
    }
}

export const updateInventoryItem = async (req, res) => {
    try {
        const { id } = req.params; // Get the item ID from the request URL
        const updatedData = req.body; // Get updated item data from the request body

        // Find the item by its ID
        const item = await Inventory.findByPk(id); // Replace with your ORM query

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the item with the new data
        await item.update(updatedData);

        return res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ message: "Error updating item", error });
    }
};

// Controller for adding inventory
export const addInventory = async (req, res) => {
    try {
        const { shopping_list_id, item_name, section, uom, quantity_recieved, inventory_date } = req.body;

        // Assuming you have a model for Inventory
        const newInventoryItem = await Inventory.create({
            shopping_list_id,
            inventory_date,
            item_name,
            section,
            uom,
            quantity_recieved
        });

        return res.status(201).json({ success: true, data: newInventoryItem });
    } catch (error) {
        console.error("Error adding inventory:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Controller function to remove an inventory item
export const removeInventoryItem = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the request parameters

    try {
        // Ensure the ID is valid (optional, but recommended)
        if (!itemId) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        // Delete the inventory item from the database
        const result = await Inventory.destroy({
            where: {
                id: itemId,
            },
        });

        // Check if any rows were affected
        if (result === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Send a success response
        return res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const getStockItems = async (req, res) => {
    try {
        const items = await Stock.findAll()
        return res.status(200).json({ success: true, data: items })
    } catch (error) {
        return res.json({ message: "Server Error" })
    }
}

export const updateStockItem = async (req, res) => {
    try {
        const { id } = req.params; // Get the item ID from the request URL
        const updatedData = req.body; // Get updated item data from the request body

        // Find the item by its ID
        const item = await Stock.findByPk(id); // Replace with your ORM query

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the item with the new data
        await item.update(updatedData);

        return res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ message: "Error updating item", error });
    }
};

// Controller for adding stock
export const addStock = async (req, res) => {
    try {
        const { stock_item, uom, portions_in_stock, portion_price, stock_price, reorder_level, section, category, tag } = req.body;

        // Assuming you have a model for Stock
        const newStockItem = await Stock.create({
            stock_item,
            uom,
            portions_in_stock,
            portion_price,
            // stock_price,
            reorder_level,
            section,
            category,
            tag,
        });

        return res.status(201).json({ success: true, data: newStockItem });
    } catch (error) {
        console.error("Error adding stock:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Controller function to remove a stock item
export const removeStockItem = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the request parameters

    try {
        // Ensure the ID is valid (optional, but recommended)
        if (!itemId) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        // Delete the stock item from the database
        const result = await Stock.destroy({
            where: {
                id: itemId,
            },
        });

        // Check if any rows were affected
        if (result === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Send a success response
        return res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};