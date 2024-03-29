import multer from "multer";
import fs from 'fs'
const storage = multer.diskStorage({
    destination: function (req, file, cb) { fs.mkdirSync('./uploads', { recursive: true }); return cb(null, "uploads") },
    filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname.replace(' ', '-')); },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") cb(null, true)
    else cb(null, false)
};
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter })

export default upload;