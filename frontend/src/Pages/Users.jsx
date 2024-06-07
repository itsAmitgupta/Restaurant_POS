import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import DataTable from "react-data-table-component";
import { TableContext } from "../Context/TableContextProvider";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Users() {
  const { user, setUser,setRefresh } = useContext(TableContext);
  const [adduser, setAdduser] = useState(false);
  // const [id,setId]=useState(0);
  const columns = [
    {
      name: "#",
      selector: (row,index) =>index+1,
      sortable:(row)=> true,
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    // {
    //   name: "Status",
    //   cell: (row) => {
    //     return row.status === "Active" ? (
    //       <div>
    //         <button
    //           className="w-[70px] h-[30px] rounded-md bg-green-500 text-white"
    //           onClick={() => {
    //             alert(`you want to edit ${row.id}`);
    //           }}
    //         >
    //           Active
    //         </button>
    //       </div>
    //     ) : (
    //       <div>
    //         <button
    //           className="w-[70px] h-[30px] rounded-md bg-red-500 text-black"
    //           onClick={() => {
    //             alert(`you want to edit ${row.id}`);
    //           }}
    //         >
    //           notActive
    //         </button>
    //       </div>
    //     );
    //   },
    // },
    {
      name: "Actions",
      cell: (row) => <DropdownCell user={user} setUser={setUser} row={row}  setRefresh={setRefresh} />,
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
          title="Users"
          columns={columns}
          data={user}
          highlightOnHover
          pagination
          actions={
            <button
              className="bg-gray-700 text-white w-24 hover:bg-gray-900 h-8 text-md"
              onClick={() => setAdduser(true)}
            >
              AddUser
            </button>
          }
          fixedHeader
          fixedHeaderScrollHeight="400px"
          customStyles={customStyle}
        />
      <AddUser adduser={adduser} setAdduser={setAdduser} row={user} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

const DropdownCell = ({ row, user, setUser ,setRefresh}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const deletHandler = (row) => {
    const confirm = window.confirm(
      "Are you sure you want to delete the User " + row.name
    );
    if (confirm) {
      axios
        .delete(`http://localhost:3000/api/v1/deleteUser/${row._id}`)
        .then((res) => {
          console.log(res);
          toast.success("User deleted Successfully");
          setRefresh({})
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
        <div className="absolute flex flex-col w-[70px] z-20 bg-blue-500 hover:bg-slate-600 border rounded shadow-md p-1">
          <button
            className="hover:text-white"
            onClick={() => {
              alert(`you want to edit ${row._id}`);
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-white"
            onClick={() => deletHandler(row)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const AddUser = ({adduser, setAdduser, setRefresh,row}) => {
  const [data,addData]= useState({
    username:"",
    name:"",
    email:"",
    password:"",
    role:""
  })

  const AddNewUser = async(e)=>{
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/registeruser`,
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
        toast.success("User added succesfully");
        setRefresh({});
      } catch (error) {
        console.error("Error updating order:", error);
      }
      // console.log({...data})
      addData(
        {
          username:"",
          name:"",
          email:"",
          password:"",
          role:""
        }
      )
      setAdduser(false)
  }
  return (
    <>
    <div
      onClick={() => setAdduser(false)}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50
        ${adduser ? "visible bg-black/20" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white w-[500px] h-50% rounded-xl shadow p-6 transition-all
          ${adduser ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="text-center">
          <span className="font-bold text-2xl text-center underline">
            Add New User
          </span>
          <button
            onClick={() => setAdduser(false)}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <ImCross />
          </button>
        </div>
        <form action="" onSubmit={AddNewUser}>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    Username <span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="text"
                    value={data.username}
                    onChange={(e) => {
                      addData({ ...data, username: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="text"
                    value={data.name}
                    onChange={(e) => {
                      addData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="email"
                    value={data.email}
                    onChange={(e) => {
                      addData({ ...data, email: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                      addData({ ...data, password: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    User Role <span className="text-red-500">*</span>{" "}
                  </label>
                  <select
                    value={data.role}
                    onChange={(e) => {
                      addData({ ...data, role: e.target.value });
                    }}
                    className="w-3/4 h-8 rounded text-gray-900 font-xl py-[5px] outline-none border focus:border-green-600 border-gray-400"
                  >
                    <option value="" disabled selected>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 w-full">
                <button
                  type="submit"
                  className="w-full font-semibold text-lg h-8 bg-gray-900 text-white rounded"
                >
                  Add User
                </button>{" "}
              </div>
            </div>
          </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};
export default Users;
