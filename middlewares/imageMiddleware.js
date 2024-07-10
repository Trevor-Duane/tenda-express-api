import multer from "multer";

//image storage engine
const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})

export default upload;