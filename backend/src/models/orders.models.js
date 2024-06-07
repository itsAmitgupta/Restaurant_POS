import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);
const orderSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "foodItems",
      },
    ],
    quantity: [
      {
        type: Number,
      },
    ],
    notes: [
      {
        type: String,
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
    },
    discount: {
      type: Number,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    readystatus: {
      type: String,
      enum: ["ready", "notready"],
      default: "notready",
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "DiningTables",
    },
    orderType: {
      type: String,
      required: true,
      enum: ["dine in", "to go", "delivery"],
    },
  },
  { timestamps: true }
);
orderSchema.plugin(autoIncrement);

export const Order = mongoose.model("Orders", orderSchema);
