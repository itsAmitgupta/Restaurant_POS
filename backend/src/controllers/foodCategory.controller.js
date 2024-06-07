import { trusted } from "mongoose";
import { FoodCategory } from "../models/foodCategory.models.js";

// get all foodcategories
export const getfoodCategories = async (req, res) => {
  const allfoodCategories = await FoodCategory.find({}).sort({ createdAt: -1 });

  res.status(200).json({ status: true, data: allfoodCategories });
};

// get a single FoodCategory
export const getfoodCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await FoodCategory.findOne({ _id: id });
    res.status(200).json({ status: true, data: doc });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//create
export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const doc = await FoodCategory.create({ name });
    res.status(200).json({ status: true, data: doc });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createManyCategory = async (req, res) => {
  try {
    const doc = await FoodCategory.insertMany(req.body);
    res.status(200).json({ status: true, data: doc });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete
export const deletefoodCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await FoodCategory.findByIdAndDelete(id);
    res.status(200).json({ status: true, data: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update

export const updatefoodCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFoodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    const updatedFood = await FoodCategory.findById(id);
    res.status(200).json({ status: true, data: updatedFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
