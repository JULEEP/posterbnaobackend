import express from 'express';
import { 
    registerUser,
     loginUser, 
     getUser, 
     updateUser,
     createProfile, 
     editProfile, 
     getProfile,
     sendSms,
     sendBirthdayWishes,
     checkUserBirthday,
     postStory,
     getAllStories,
     getUserStories
    } from '../Controller/UserController.js'; // Import UserController
import uploads from '../config/uploadConfig.js';
const router = express.Router();

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);
// Get user details (GET)
router.get('/get-user/:userId', getUser);  // Adding a middleware to verify JWT token

// Update user details (PUT)
router.put('/update-user/:id', updateUser);  // Adding a middleware to verify JWT token
// Create a new profile with Form Data (including profile image)
router.post('/create-profile/:id', createProfile);  // Profile creation with userId in params

// Edit the user profile by userId
router.put('/edit-profile/:id', editProfile);  // Profile editing by userId

// Get the user profile by userId
router.get('/get-profile/:id', getProfile);  // Get profile by userId
router.post('/send-sms', sendSms);
router.get('/send-birthday-wishes', sendBirthdayWishes);
router.get('/check-birthday/:userId', checkUserBirthday);
router.post('/post/:userId', uploads, postStory);
router.get('/getAllStories', getAllStories);
router.get('/getUserStories/:userId', getUserStories);










export default router;
