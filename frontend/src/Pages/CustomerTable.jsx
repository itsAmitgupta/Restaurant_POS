import React, { useState, useContext, useEffect, useRef } from "react";
import { TableContext } from "../Context/TableContextProvider";
import DataTable from "react-data-table-component";
import Navbar from "../Components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";

function CustomerTable() {
    const { customer } = useContext(TableContext);
    const [customerList, setCustomerList] = useState([]);
    useEffect(() => {
      setCustomerList(customer);
    }, [customer]);
    // console.log(order)
    console.log(customerList);
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
        name: "Customer Name",
        selector: (row) => row.customerName,
      },
      {
        name: "Address",
        selector: (row) => row.address,
        sortable: true,
      },
      {
        name: "Phone number",
        selector: (row) => row.contact,
      },
      {
        name: "No. of time Visited",
        selector: (row) => row.orders.length,
        sortable:true
      },
      {
        name: "Actions",
        cell: (row) => <DropdownCell row={row} />,
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
            title="Customer List"
            columns={columns}
            data={customerList}
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


  const DropdownCell = ({ row }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    const deletHandler = (id) => {
      const confirm = window.confirm(
        "Are you sure you want to delete the Customer name: " + row.customerName
      );
      if (confirm) {
        axios
          .delete(`http://localhost:3000/customer/deleteCustomer/${id}`)
          .then((res) => {
            console.log(res);
            // setOrderList(res)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
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
            <button className="hover:text-white" 
            onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <EditOrder edit={edit} setEdit={setEdit} row={row} />
            <button
              className="hover:text-white"
              onClick={() => deletHandler(row._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const EditOrder =({ edit, setEdit, row }) => {
    const [data,updateData] = useState({
      customerName:row.customerName,
      address:row.address,
      contact:row.contact
    })
    // console.log(row)
      const updateOrder = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.put(`http://localhost:3000/customer/updateCustomer/${row._id}`, {
              ...data
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(response.data); // Handle the response accordingly
          } catch (error) {
            console.error('Error updating order:', error);
          }
          setEdit(false)
      }
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
                Update Customer
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
                <div className="gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Customer name
                    </label>
                    <input
                      className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                      type="text"
                      value={data.customerName}
                      onChange={(e)=>{updateData({...data , customerName:e.target.value})}}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                      type="text"
                      value={data.address}
                      onChange={(e)=>{updateData({...data , address:e.target.value})}}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-600"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    //   type="text"
                      type="tel"
                      value={data.contact}
                      onChange={(e)=>{updateData({...data , contact:e.target.value})}}
                    />
                  </div>
                </div>
  
                <div className="mt-3 w-full">
                  <button type="submit" className="w-full font-semibold text-lg h-8 bg-gray-900 text-white rounded">
                    Update
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  export default CustomerTable