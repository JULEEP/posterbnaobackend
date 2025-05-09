import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));  // Unique filename using UUID
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);  // Accept the file
    } else {
      cb(new Error('Only images and videos are allowed!'));  // Reject the file
    }
  },
}).fields([
  { name: 'images', maxCount: 5 },  // Allow up to 5 images or videos
  { name: 'image', maxCount: 1 },   // Allow 1 single image upload
]);

export default uploads;
