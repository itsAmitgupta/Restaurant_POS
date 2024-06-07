import { mongoose } from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodCategories",
    },
    availability: {
      type: Boolean,
      default: true,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export const Items = mongoose.model("foodItems", itemsSchema);
