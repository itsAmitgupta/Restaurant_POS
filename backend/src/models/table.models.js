import mongoose, { Schema } from "mongoose";

const diningTableSchema = new Schema(
  {
    tableno: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      ref: "Orders",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DiningTables", diningTableSchema);
