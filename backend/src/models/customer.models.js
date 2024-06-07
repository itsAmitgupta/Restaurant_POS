import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    customerName: {
      type: "String",
      required: "true",
      trim: true,
    },
    address: {
      type: "string",
      required: true,
      trim: true,
    },
    contact: {
      type: "Number",
      required: true,
    },
    orders: [
      {
        type: Number,
        ref: "Orders",
      },
    ],
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customers", customerSchema);
