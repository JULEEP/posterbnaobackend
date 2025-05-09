import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../Controller/CategoryController.js";
import uploads from "../config/uploadConfig.js";
const router = express.Router();

router.post("/create-cateogry", uploads, createCategory);
router.get("/getall-cateogry", getAllCategories);
router.get("/:id", getSingleCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
