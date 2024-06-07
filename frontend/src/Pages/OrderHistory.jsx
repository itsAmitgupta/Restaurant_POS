import React, { useState, useContext, useEffect, useRef } from "react";
import { TableContext } from "../Context/TableContextProvider";
import DataTable from "react-data-table-component";
import Navbar from "../Components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function OrderHistory() {
  const { order,setRefresh } = useContext(TableContext);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    setOrderList(order);
  }, [order]);
  // console.log(order)
  console.log(orderList);
  const columns = [
    {
      name: "Date",
      selector: (row) => {
        const createdAt = row.createdAt;
        const dateObject = new Date(createdAt);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const hour = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const formattedTime = `${year}-${month}-${day} ${hour
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        return (
          <div>
            <p>{formattedTime}</p>
          </div>
        );
      },
    },
    {
      name: "Order_Id",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer.customerName,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalamount,
      sortable: true,
    },
    {
      name: "OrderType",
      selector: (row) => row.orderType,
    },
    {
      name: "Payment Status",
      cell: (row) => {
        return row.paymentstatus === "completed" ? (
          <div>
            <button
              className="w-[70px] h-[30px] rounded-md bg-green-500 text-white hover:font-bold"
              onClick={() => {
                alert(`you want to edit ${row._id}`);
              }}
            >
              Completed
            </button>
          </div>
        ) : (
          <div>
            <button
              className="w-[70px] h-[30px] rounded-md bg-yellow-500 text-gray-800 hover:font-bold"
              onClick={() => {
                alert(`you want to edit ${row._id}`);
              }}
            >
              Pending
            </button>
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => <DropdownCell row={row} setRefresh={setRefresh} />,
    },
  ];

  const customStyle = {
    rows: {
      style: {
        backgroundColor: "rgb(31 41 55)",
        color: "white",
      },
    },
    headCells: {
      style: {
        backgroundColor: "rgb(3 7 18)",
        color: "white",
      },
    },
    cells: {
      style: {
        borderStyle: "solid",
        borderColor: "rgb(107 114 128)",
        borderWidth: "1px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "rgb(75 85 99)",
        color: "white",
      },
    },
    paginationButton: {
      style: {
        color: "white", // Text color of pagination buttons
        backgroundColor: "white", // Background color of pagination buttons
      },
    },
    header: {
      style: {
        backgroundColor: "rgb(75 85 99)",
        color: "white",
      },
    },
  };
  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-700">
      <div className="w-full">
        <Navbar />
      </div>
      <div>
        <DataTable
          title="Order History"
          columns={columns}
          data={orderList}
          highlightOnHover
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          customStyles={customStyle}
        />
      </div>
    </div>
  );
}

const DropdownCell = ({ row,setRefresh }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const printRef = useRef();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const deletHandler = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete the order no. " + id
    );
    if (confirm) {
      axios
        .delete(`http://localhost:3000/api/deleteorder/${id}`)
        .then((res) => {
          console.log(res);
          // setOrderList(res)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <div className="relative">
      <button
        className="flex border border-blue-600 p-1"
        onClick={toggleDropdown}
      >
        Actions
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute flex flex-col w-[100px] z-20 bg-blue-500 hover:bg-slate-600 border rounded shadow-md p-1">
          <button className="hover:text-white" onClick={() => setEdit(true)}>
            Edit
          </button>
          <EditOrder edit={edit} setEdit={setEdit} row={row} setRefresh={setRefresh} />
          <button
            className="hover:text-white"
            onClick={() => deletHandler(row._id)}
          >
            Delete
          </button>
          <button className="hover:text-white" onClick={() => handlePrint(row)}>
            Print Receipt
          </button>
          <div style={{ display: "none" }}>
            <div ref={printRef}>
              <Receipt row={row} />
            </div>
          </div>
          <button
            className="hover:text-white"
            onClick={() => setShowModal(true)}
          >
            order details
          </button>
          <Modal showModal={showModal} setShowModal={setShowModal} row={row} />
        </div>
      )}
    </div>
  );
};

const Modal = ({ showModal, setShowModal, row }) => {
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${showModal ? "visible bg-black/20" : "invisible"}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-white w-[500px] rounded-xl shadow p-6 transition-all
          ${showModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <div>
            <span className="font-bold text-2xl">Order Details</span>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              <ImCross />
            </button>
          </div>
          <div>
            <p className="font-bold text-lg text-gray-700 underline">
              Order No. {row._id}
            </p>
            <p className="font-semibold text-md text-gray-700">
              Customer Name: {row.customer.customerName}
            </p>
          </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-900 underline">
              Ordered Item
            </p>
            <ul>
              {row.items.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex mt-2">
            <p className="font-semibold text-gray-900">Total Amount:</p>
            <p>{row.totalamount}Rs.</p>
          </div>
          <div className="flex mt-2">
            <p className="font-semibold text-gray-900">Order Type-</p>
            <p>{row.orderType}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Receipt = ({ row }) => {
  return (
    <div className="p-5">
      <h1 className="flex justify-center font-medium text-3xl">
        My Restuarant{" "}
      </h1>
      <div className="flex w-full pb-2 ">
        <div className="flex justify-between w-4/5 ">
          <h2 className="text-xl font-medium">Customer name :{row.customer.customerName}</h2>
          <h2 className="text-xl font-medium">Qnty</h2>
        </div>
        <div className="w-1/5 flex justify-end text-xl font-medium">Price</div>
      </div>
      {/* {orderArray.map((odr) => ( */}
      <div className="flex w-full">
        <div className="w-4/5 flex justify-between">
          <h2 className="text-base">{row.orderType}</h2>
          <p>{row.customerName}</p>
        </div>
        <div className="w-1/5 flex justify-end text-sm text-black-300">
          {/* {odr.price * odr.qty} */} order
        </div>
      </div>
      {/* <div className="flex justify-between border-t border-dashed border-black">
        <h3 className="text-sm text-black-300">Items</h3>
        <h3 className="text-sm text-black-300">Price</h3> */}
        <table className="flex justify-between flex-col border-t border-dashed border-black">
          <tr className="w-full flex justify-between">
          <th className="text-sm text-black-300">Items</th>
          <th className="text-sm text-black-300" >Price</th>
          </tr>
          {
            row.items.map((item)=><tr className="w-full flex justify-between">
              <td className="text-sm text-black-300">{item.name}</td>
              <td className="text-sm text-black-300">{item.price}</td>
            </tr>)
          }
        </table>
      {/* </div> */}
      {/* ))} */}
      <div className="flex justify-between border-y border-dashed border-black">
        <h3 className="text-sm text-black-300">Sub Total</h3>
        <h3 className="text-sm text-black-300">{row.totalamount}</h3>
      </div>
      <p className="text-center">Thank you, visit again 😊</p>
    </div>
  );
};
const EditOrder = ({ edit, setEdit, row ,setRefresh}) => {
  const [data, updateData] = useState({
    customerName: row.customer.customerName,
    totalamount: row.totalamount,
    orderType: row.orderType,
    paymentstatus: row.paymentstatus,
    readystatus: row.readystatus,
  });
  // console.log(row)
  const updateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/editOrder/${row._id}`,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Handle the response accordingly
      setRefresh(response.data);
      toast.success("Order Updated Successfully!", {
        position: "top-right"
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
    setEdit(false);
  };
  return (
    <>
      <div
        onClick={() => setEdit(false)}
        className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${edit ? "visible bg-black/20" : "invisible"}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-white w-[500px] h-50% rounded-xl shadow p-6 transition-all
          ${edit ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <div className="text-center">
            <span className="font-bold text-2xl text-center underline">
              Update Order
            </span>
            <button
              onClick={() => setEdit(false)}
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              <ImCross />
            </button>
          </div>
          <form action="" onSubmit={updateOrder}>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    Customer name <span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="text"
                    value={data.customerName}
                    onChange={(e) => {
                      updateData({ ...data, customerName: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    Order Type <span className="text-red-500">*</span>{" "}
                  </label>
                  <select
                    value={data.orderType}
                    onChange={(e) => {
                      updateData({ ...data, orderType: e.target.value });
                    }}
                    className="w-3/4 h-8 rounded text-gray-900 font-xl py-[5px] outline-none border focus:border-green-600 border-gray-400"
                  >
                    {/* <option value={data.orderType} selected>
                      Order Type
                    </option> */}
                    <option value="dine in">Dine in</option>
                    <option value="to go">To go</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Payment Status
                  </label>
                  <select
                    value={data.paymentstatus}
                    onChange={(e) => {
                      updateData({ ...data, paymentstatus: e.target.value });
                    }}
                    className="w-3/4 h-8 rounded font-xl py-[5px] text-gray-900 outline-none border focus:border-green-600 border-gray-400"
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Order Status
                  </label>
                  <select
                    value={data.readystatus}
                    onChange={(e) => {
                      updateData({ ...data, readystatus: e.target.value });
                    }}
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                  >
                    <option value="ready">Ready</option>
                    <option value="notready">Not Ready</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Total amount
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="text"
                    value={data.totalamount}
                    onChange={(e) => {
                      updateData({ ...data, totalamount: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 w-full">
                <button
                  type="submit"
                  className="w-full font-semibold text-lg h-8 bg-gray-900 text-white rounded"
                >
                  Update
                </button>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default OrderHistory;
