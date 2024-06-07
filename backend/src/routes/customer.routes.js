import express from "express";

const router = express.Router();

import customerControllers from "../controllers/customer.controllers.js";

router.post("/create", customerControllers.customer);
router.get("/getCustomers", customerControllers.getctm);
router.get("/getCustomer/:id", customerControllers.findCustomer);
router.put("/updateCustomer/:id", customerControllers.upadteCustomer);
router.delete("/deleteCustomer/:id", customerControllers.deleteCusomer);

export default router;
