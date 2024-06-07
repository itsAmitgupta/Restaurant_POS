import express from "express"
import { RegisterUser, loginUser, logoutUser, getAllUser, deleteUser} from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/registeruser", RegisterUser)
router.post("/loginuser", loginUser)
router.get("/logoutuser", logoutUser)
router.get("/getUser", getAllUser)
router.delete("/deleteUser/:id",deleteUser)

export default router