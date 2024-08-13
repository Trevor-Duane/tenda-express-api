import express from "express";
// import upload from "../middlewares/uploadMiddleware.js";
import upload from "../middlewares/imageMiddleware.js";
import { createCategory, deleteCategory, editCategory, getCategories, getCategoryById } from "../controllers/Category.js";
import { createSubcategory, deleteSubcategory, getSubcategories, getSubcategoryById } from "../controllers/Subcategory.js";
import { createOrder, getOrderByPk, getOrders, updateStatus } from "../controllers/Order.js";
import { createOffer, deleteOffer, editOffer, findOfferById, getAllOffers } from "../controllers/Offer.js";
import { createItem, getAllItems, deleteItem } from "../controllers/Item.js";
import { createAddon, getAllAddons } from "../controllers/Addon.js";
import { getAllFeedbacks, submitFeedback } from "../controllers/Feedback.js";
import { addAddress, getUserAddresses } from "../controllers/Address.js";
import { getPayments, storePayment } from "../controllers/Payment.js";
import { resetPassword, requestPasswordReset } from "../controllers/Passwords.js";
import { findAllUsers } from "../controllers/User.js";

const mainRoutes = express.Router();

//users
mainRoutes.get('/users', findAllUsers)

//category routes
mainRoutes.post('/add-category', upload.single('category_image'), createCategory)
mainRoutes.get('/categories', getCategories)
mainRoutes.get('/category/:id', getCategoryById)
mainRoutes.patch('/edit-category/:id', editCategory)
mainRoutes.delete('/delete-category/:id', deleteCategory)

//Subcategories
mainRoutes.get('/subcategories', getSubcategories)
mainRoutes.post('/add-subcategory', createSubcategory)
mainRoutes.get('/subcategory/:id', getSubcategoryById)
mainRoutes.delete('/delete-subcategory/:id', deleteSubcategory)


//Items
mainRoutes.post('/add-item', upload.single('item_image'), createItem)
mainRoutes.get('/items', getAllItems)
mainRoutes.post('/remove-item', deleteItem)

//Addons
mainRoutes.post('/add-addon', upload.single('addon_image'), createAddon)
mainRoutes.get('/addons', getAllAddons)

//Feedback
mainRoutes.post('/submit-feedback', submitFeedback)
mainRoutes.get('/feedbacks', getAllFeedbacks)

//Addresses
mainRoutes.post('/add-address', addAddress)
mainRoutes.get('/address/:user_id', getUserAddresses)

//Payments
mainRoutes.post('payment', storePayment)
mainRoutes.get('payments', getPayments)

//Orders
mainRoutes.post("/orders", createOrder);
mainRoutes.get("/orders", getOrders);
mainRoutes.get("/order/:id", getOrderByPk);
mainRoutes.post("/status", updateStatus)

//Offers
mainRoutes.get('/offers', getAllOffers)
mainRoutes.patch('/offer/:id', editOffer)
mainRoutes.delete('/offer/:id', deleteOffer)
mainRoutes.get('/offer/:id/', findOfferById)
mainRoutes.post('/offer', upload.single('offer_cover'), createOffer)



export default mainRoutes;