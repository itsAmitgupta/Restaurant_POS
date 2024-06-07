import dotenv from "dotenv";
import express from "express"
import cors from 'cors'
import mongoose from 'mongoose'
import router from "./routes/Order.routes.js";
import userRouter from "./routes/user.routes.js"
import customerRouter from "./routes/customer.routes.js"
import foodRouter from "./routes/foodCategory.routes.js"
import itemRouter from "./routes/item.routes.js"
import cookieParser from "cookie-parser"
const app = express()

dotenv.config({
  path: "./.env",
});
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded())

const PORT = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.error("Error connecting to MongoDB:", err));

  app.use('/api',router)
  app.use('/api/v1',userRouter)
  app.use('/customer',customerRouter)
  app.use('/item',itemRouter)
  app.use('/food',foodRouter)