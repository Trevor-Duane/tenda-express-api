import shoppingList from "../../models/shopping_list.js"

export const getShoppingItems = async (req, res) => {
    try {
        const items = await shoppingList.findAll()
        return res.status(200).json({ success: true, data: items })
    } catch (error) {
        return res.json({ message: "Server Error" })
    }
}

// Controller function to remove an inventory item
export const removeShopItem = async (req, res) => {
    const itemId = req.params.id; // Get the item ID from the request parameters

    try {
        // Ensure the ID is valid (optional, but recommended)
        if (!itemId) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        // Delete the inventory item from the database
        const result = await shoppingList.destroy({
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

export const updateShopListItem = async (req, res) => {
    try {
        const { id } = req.params; // Get the item ID from the request URL
        const updatedData = req.body; // Get updated item data from the request body

        // Find the item by its ID
        const item = await shoppingList.findByPk(id); // Replace with your ORM query

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

// Controller for adding shoplist item
export const addStock = async (req, res) => {
    try {
        const { item_name, section, uom, unit_price, } = req.body;

        // Assuming you have a model for Stock
        const newShopItem = await shoppingList.create({
            item_name,
            section,
            uom,
            unit_price,
            
        });

        return res.status(201).json({ success: true, data: newShopItem });
    } catch (error) {
        console.error("Error adding stock:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
