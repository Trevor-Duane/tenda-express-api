import Budget from "../../models/budget.js";
import BudgetDraft from "../../models/budget_drafts.js";
import budgetDetail from "../../models/budget_detail.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";


export const createBudget = async (req, res) => {
    const { budget_head, from_date, to_date, budget_total, created_by, remarks } = req.body;

    console.log("createbudget", budget_head, from_date, to_date, budget_total, created_by, remarks)

    try {
        // Raw SQL Insert Query with Sequelize
        const newBudget = await db.query(
            "INSERT INTO budget (budget_head, from_date, to_date, budget_total, created_by, remarks) VALUES (?, ?, ?, ?, ?, ?)",
            {
                replacements: [budget_head, from_date, to_date, budget_total, created_by, remarks],
                type: Sequelize.QueryTypes.INSERT
            }
        );
        /// Fetch the inserted budget id
        const [budgetId] = await db.query("SELECT LAST_INSERT_ID() as id", {
            type: Sequelize.QueryTypes.SELECT
        });

        // Log the new budget response
        console.log("This is a create budget response", budgetId.id);
        res.status(200).json({ budget: budgetId.id });
    } catch (error) {
        console.error("Error creating budget:", error);
        res.status(500).json({ success: false, message: "Error creating budget." });
    }
}

export const createBudgetDetails = async (req, res) => {
    const { details } = req.body;

    console.log("these are the budget details", details)

    try {
        const detailPromises = details.map((detail) =>
            db.query(
                "INSERT INTO budget_detail (budget_id, item_name, uom, quantity, unit_price, total, section) VALUES (?, ?, ?, ?, ?, ?, ?)",
                {
                    replacements: [
                        detail.budget_id,
                        detail.item_name,
                        detail.uom,
                        detail.quantity,
                        detail.unit_price,
                        detail.total,
                        detail.section
                    ],
                    type: Sequelize.QueryTypes.INSERT
                }
            )
        );

        await Promise.all(detailPromises);

        res.status(200).json({ success: true, message: "Budget details created successfully." });
    } catch (error) {
        console.error("Error creating budget details:", error);
        res.status(500).json({ success: false, message: "Error creating budget details." });
    }
}

export const getBudgets = async (req, res) => {
    try {
        const items = await Budget.findAll();
        return res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error("Error fetching budgets:", error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getDraftBudgets = async (req, res) => {
    try {
        const items = await BudgetDraft.findAll();
        return res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error("Error fetching budgets:", error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getBudgetsDetails = async (req, res) => {
    console.log(req.params.id)
    try {
        const budget_details = await budgetDetail.findAll({ where: { budget_id: req.params.id } })
        if (!budget_details) {
            return res.status(404).json({ message: 'Budget is empty' })
        }
        return res.status(200).json({ data: budget_details })
    } catch (error) {
        return res.status(500).json({ error: "Server error..." })
    }

};

export const updateBudgetStatus = async (req, res) => {
    try {
        const budget = await Budget.findByPk(req.body.id)

        if (budget) {
            budget.budget_status = req.body.budget_status
            await budget.save()
            res.json({ success: true, message: "Budget Status Updated" })
        } else {
            res.json({ success: false, message: "Budget Not Found" })
        }
    } catch (error) {
        res.json({ success: false, message: error })
    }
}

export const fetchBudgetWithDetailsById = async (req, res) => {
    const budgetId = req.params.id;

    try {
        const budget = await Budget.findOne({ where: { id: budgetId } });
        const budgetItems = await budgetDetail.findAll({ where: { budget_id: budgetId } });

        res.json({
            budget,
            items: budgetItems,
        });
    } catch (error) {
        console.error("Error fetching budget:", error);
        res.status(500).json({ error: "Error fetching budget" });
    }
}

export const updateDraftBudgetDetails = async (req, res) => {
    const budgetId = req.params.id;
    const { budget_head, from_date, to_date, budget_total, created_by, remarks, details } = req.body;

    try {
        console.log("details is not iterable", details)
        // Update budget table details
        await BudgetDraft.update(
            {
                budget_head: budget_head,
                from_date: from_date,
                to_date: to_date,
                budget_total: budget_total,
                created_by: created_by,
                remarks: remarks
            }, { where: { id: budgetId } });

        // Update or replace items in the budget
        // for (const section of Object.keys(details)) {
            for (const item of details) {
                // Check if the item already exists
                const existingItem = await budgetDetail.findOne({
                    where: { budget_id: budgetId, item_name: item.item_name },
                });

                if (existingItem) {
                    // Update the existing item
                    await budgetDetail.update(
                        { quantity: item.quantity,
                            uom: item.uom,
                            unit_price: item.unit_price,
                            total: item.total,
                            section: item.section
                         },
                        { where: { id: existingItem.id } }
                    );
                } else {
                    // Create new item
                    await budgetDetail.create({
                        budget_id: budgetId,
                        item_name: item.item_name,
                        uom: item.uom,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total: item.total,
                        section: item.section,
                    });
                }
            }
        // }

        res.json({ message: "Budget updated successfully" });
    } catch (error) {
        console.error("Error updating budget:", error);
        res.status(500).json({ error: "Error updating budget" });
    }
}
