import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/database.js';
import offerRoutes from './routes/offerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Routes from './routes/Routes.js';

dotenv.config()


const app = express()

//Resolve directory and file paths
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


//Database connection
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

connectDB();

//Middlewares
app.use(
    cors({
        credentials:true,
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST", "DELETE", "PATCH"]

    })
);
app.use(cookieParser());
app.use(express.static(path.dirname(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api',userRoutes )
app.use('/api',offerRoutes)
app.use('/api',orderRoutes)
app.use('/api', Routes)

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`TendaExpress Server listening on port ${PORT}!`))