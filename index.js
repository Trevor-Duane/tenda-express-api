import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import mainRoutes from './routes/mainRoutes.js';

dotenv.config()


const app = express()

//Resolve directory and file paths
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory


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
// app.use(
//     cors({
//         origin: '*',
//         allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//         methods: ["GET", "POST", "DELETE", "PATCH"],
//         optionsSuccessStatus: 200

//     })
// );
app.use(cors());
app.use(cookieParser());
// app.use("/images", express.static(path.dirname(__dirname, 'public/uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// app.use("/images", express.static('uploads'))
app.use("/images", express.static('public/uploads'))

//Routes
app.use('/auth',userRoutes)
app.use('/api', mainRoutes)

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
});

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', ()=> console.log(`TendaExpress Server listening on port ${PORT}!`))