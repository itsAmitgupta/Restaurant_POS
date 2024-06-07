import mongoose, { Schema } from "mongoose";

const foodCategories = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodCategory = mongoose.model("foodCategories", foodCategories);
