import express from "express";
import {
  createOrder,
  getOrder,
  getSingleOrder,
  editOrder,
  deleteOrder,
  getSingleOrderWithPopulate,
  createOrderTesting,
  updateTable,
  getAllTables,
  createTable,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getOrder", getOrder);
router.get("/getOrder/:id", getSingleOrder);
router.put("/editOrder/:id", editOrder);
router.delete("/deleteorder/:id", deleteOrder);
router.get("/getSingle/:id", getSingleOrderWithPopulate);
router.post("/createOrderTest", createOrderTesting);

router.get("/table", getAllTables);
router.get("/table/:_id", updateTable);
router.post("/createTable", createTable);

export default router;
