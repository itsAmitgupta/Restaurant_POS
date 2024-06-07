import express from "express";
import {
  getfoodCategories,
  getfoodCategory,
  createCategory,
  deletefoodCategory,
  updatefoodCategory,
  createManyCategory,
} from "../controllers/foodCategory.controller.js";

const router = express.Router();

router.get("/getallfood", getfoodCategories);
router.get("/getfood/:id", getfoodCategory);
router.post("/createfood", createCategory);
router.post("/createMany", createManyCategory);
router.delete("/deletefood/:id", deletefoodCategory);
router.put("/updatefood/:id", updatefoodCategory);

export default router;
