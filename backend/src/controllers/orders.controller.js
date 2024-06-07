import { Order } from "../models/orders.models.js";
import { Customer } from "../models/customer.models.js";
import diningTable from "../models/table.models.js";
import { Items } from "../models/items.models.js";
const createOrder = async (req, res) => {
  try {
    const data = req.body;
    // console.log("data:",data)
    const dataCreated = await Order.create(data);
    const { _id, customer } = dataCreated;
    const updateCustomer = await Customer.findByIdAndUpdate(
      customer,
      { $push: { orders: _id } },
      { new: true }
    );
    // console.log(dataCreated)
    res.status(200).json({ status: true, data: dataCreated });
  } catch (error) {
    console.log("Error while creating data", error.message);
  }
};
const getOrder = async (req, res) => {
  try {
    const data = req.body;
    // console.log("data:",data)
    const dataCreated = await Order.find({}).populate("items customer table");
    // console.log(dataCreated)
    res.status(200).json({ status: true, data: dataCreated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCreated = await Order.findById(id).populate(
      "items customer table"
    );
    res.status(200).json({ status: true, data: dataCreated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // const {paymentstatus} = req.body;
    const update = await Order.findByIdAndUpdate(id, req.body);
    if (!update) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    // if(paymentstatus=="completed"){
    //   await diningTable.findByIdAndUpdate()
    // }
    const updatedOrder = await Order.findById(id);
    res.status(200).json({ status: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleOrderWithPopulate = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("items customer table");
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrderTesting = async (req, res) => {
  try {
    const data = req.body;
    const dataCreated = await Order.create(data);

    const { _id, customer, table } = dataCreated;
    // console.log(_id)
    const updateCustomer = await Customer.findByIdAndUpdate(
      customer,
      { $push: { orders: _id } },
      { new: true }
    );
    const updateTable = await diningTable.findByIdAndUpdate(
      table,
      { $set: { order: _id, status: "Booked" } },
      { new: true }
    );
    console.log(updateCustomer);
    console.log(updateTable);
    res.status(200).json({ status: true, data: dataCreated });
  } catch (error) {
    console.log("Error while creating data", error.message);
  }
};
export const createTable = async (req, res) => {
  try {
    const body = req.body;
    const doc = await diningTable.create(body);
    console.log();
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getSingleOrderWithPopulate = async(req,res) => {
//     try {
//         const {id} = req.params
//         const dataCreated = await Order.findByIdAndUpdate(id).populate("customer")
//         res.status(200).json({status:true, data:dataCreated})
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }

export const updateTable = async (req, res) => {
  try {
    const _id = req.params;
    const body = req.body;
    console.log(body);
    const doc = await diningTable.findOneAndUpdate({ _id }, body, {
      returnOriginal: false,
    });
    res.json(doc);
  } catch (error) {}
};

export const getAllTables = async (req, res) => {
  try {
    const doc = await diningTable.find({});
    res.json({ status: true, data: doc });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createOrder,
  getOrder,
  getSingleOrder,
  editOrder,
  deleteOrder,
  getSingleOrderWithPopulate,
  createOrderTesting,
};
