import express from "express";
import {
    createOrUpdateAboutUs,
    createOrUpdatePrivacyPolicy,
    getAboutUs,
    getAllContactMessages,
    getAllUsers,
    getAllUsersWithSubscribedPlans,
    getPrivacyPolicy,
    submitContactMessage,
    getDashboardData
} from "../Controller/AdminController.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.get('/usersplans', getAllUsersWithSubscribedPlans);
router.post('/privacy-policy', createOrUpdatePrivacyPolicy);
router.get('/getpolicy', getPrivacyPolicy);
router.post('/aboutus', createOrUpdateAboutUs);
router.get('/getaboutus', getAboutUs);
router.post('/contact', submitContactMessage);     // POST /api/contact
router.get('/getcontactus', getAllContactMessages);     // GET /api/contact
router.get('/dashboard', getDashboardData);


export default router;