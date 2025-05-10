import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));  // Unique filename using UUID
  },
});

// Multer upload configuration
const uploads = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB file size limit
  fileFilter: (req, file, cb) => {
    // Define accepted file types: images and videos
    const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    // If file matches the allowed types, accept it
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      // Reject the file if it's not an image or video
      cb(new Error('Only images and videos are allowed!'));
    }
  },
}).fields([
  { name: 'images', maxCount: 5 },  // Allow up to 5 images or videos
  { name: 'image', maxCount: 1 },   // Allow 1 single image upload
  { name: 'file', maxCount: 5 },    // Allow up to 5 files (images or videos)
  { name: 'file', maxCount: 1 },  // Allow 1 single file (images or videos)
]);

export default uploads;
