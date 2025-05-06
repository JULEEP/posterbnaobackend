import express from "express";
import {
    getAllUsers,
    getAllUsersWithSubscribedPlans
} from "../Controller/AdminController.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.get('/usersplans', getAllUsersWithSubscribedPlans);

export default router;