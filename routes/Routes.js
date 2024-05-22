import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { archiveCategory, createCategory, editCategory, getCategories, getCategoryById } from "../controllers/Category.js";
import { createSubcategory, getSubcategories } from "../controllers/Subcategory.js";
import { createItem, getAllItems } from "../controllers/Item.js";
import { createAddon, getAllAddons } from "../controllers/Addon.js";
import { getAllFeedbacks, submitFeedback } from "../controllers/Feedback.js";
import { addAddress, getAllAddresses } from "../controllers/Address.js";
import { getPayments, storePayment } from "../controllers/Payment.js";

const Routes = express.Router();

//category routes
Routes.post('/add-category', upload.single('category_image'), createCategory)
Routes.get('/categories', getCategories)
Routes.get('/category/:id', getCategoryById)
Routes.post('/edit-category/:id', editCategory)
Routes.post('/archive-category/:id', archiveCategory)

//Subcategories
Routes.post('/add-subcategory', createSubcategory)
Routes.get('/subcategories', getSubcategories)

//Items
Routes.post('/add-item', upload.single('item_image'), createItem)
Routes.get('/items', getAllItems)

//Addons
Routes.post('/add-addon', upload.single('addon_image'), createAddon)
Routes.get('/addons', getAllAddons)

//Feedback
Routes.post('/submit-feedback', submitFeedback)
Routes.get('/feedbacks', getAllFeedbacks)

//Addresses
Routes.post('/add-address', addAddress)
Routes.get('/address/:user_id', getAllAddresses)

//Payments
Routes.post('payment', storePayment)
Routes.get('payments', getPayments)

//Password Rest
Routes.post('/request-password-reset')
Routes.post('/reset-password')



export default Routes;