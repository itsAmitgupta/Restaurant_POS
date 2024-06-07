import { Items } from "../models/items.models.js";
// create new Items
const Item = async (req, res) => {
  try {
    let data = req.body;

    let item = await Items.create(data);

    res.status(200).json({ status: true, data: item });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: false, message: "this is catch" });
  }
};

const createMany = async (req, res) => {
  try {
    let data = req.body;

    let item = await Items.insertMany(data);

    res.status(200).json({ status: true, data: item });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: false, message: "this is catch" });
  }
};

//get all food item
const getAllItem = async (req, res) => {
  try {
    const allData = await Items.find({}).populate("category");
    if (!allData) {
      res.status(404);
      throw new Error("Their is no such food item");
    }
    res.status(200).json({
      status: true,
      data: allData,
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

//get a single food item by ID
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await Items.findById(id).populate("category");
    if (!singleData) {
      res.status(404);
      throw new Error("No such Id match");
    }
    res.status(200).json({
      status: true,
      data: singleData,
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

const upadteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const seachItem = await Items.findByIdAndUpdate(id, req.body);
    if (!seachItem) {
      res.status(404);
      throw new Error("please add Id");
    }

    const updateItem = await Items.findById(id);
    res.status(200).json({ status: true, data: updateItem });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const seachItem = await Items.findByIdAndDelete(req.params.id);
    if (!seachItem) {
      res.status(404);
      throw new Error("please add ID");
    }
    res.status(200).json({ status: true, message: "delete success" });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};
export default {
  getAllItem,
  createMany,
  getItem,
  upadteItem,
  deleteItem,
  Item,
};
