import express from "express";

const router = express.Router();

import itemController from "../controllers/items.controllers.js";

router.post("/createitem", itemController.Item);
router.post("/createMany", itemController.createMany);
router.get("/getitem/:id", itemController.getItem);
router.get("/getallitem", itemController.getAllItem);
// router.get("/getitem/:id", itemController.findCustomer);
router.put("/updateitem/:id", itemController.upadteItem);
router.delete("/deleteitem/:id", itemController.deleteItem);

export default router;
