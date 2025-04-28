// config/uploadConfig.js
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  // Folder where images/videos will be saved
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));  // Unique file name
    }
});

// Multer configuration
const uploads = multer({
    storage: storage,
    limits: { fileSize: 10000000 },  // 10MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only images and videos are allowed!');
        }
    }
}).single('file');  // Expecting a single file upload

export default uploads;
