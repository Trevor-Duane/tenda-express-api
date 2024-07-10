// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// const serverFolderPath = path.join(__dirname, '../public/uploads')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, serverFolderPath);
//         // cb(null, 'public/uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// export default upload;
