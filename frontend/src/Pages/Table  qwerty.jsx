import { useEffect, useState } from "react";
import { useApi } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

export default function Table() {
  const { TablesArray, setCustomersArray, setTablesArray, fetcher } = useApi();

  useEffect(() => {
    fetcher("http://localhost:3000/customer/getCustomers", setCustomersArray);
    fetcher("http://localhost:3000/api/table", setTablesArray);
    const fetchInterval = setInterval(() => {
      fetcher("http://localhost:3000/customer/getCustomers", setCustomersArray);
      fetcher("http://localhost:3000/api/table", setTablesArray);
    }, 60000);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <div className=" bg-gray-900 w-full relative ">
      <div className="grid grid-cols-3 lg:grid-cols-4 items-center gap-4 align-middle p-4">
        {TablesArray &&
          TablesArray?.map((table) => (
            <TableItem key={table._id} table={table} />
          ))}
      </div>
    </div>
  );
}

function TableItem({ table }) {
  const [open, setIsOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);

  const { tableno, capacity, status, order, _id } = table;

  // const randomColor = () => {
  //   var x = "#";
  //   for (let index = 0; index < 6; index++) {
  //     const str = "0123456789abcdef";
  //     const random = Math.floor(Math.random() * 15);
  //     const element = str[random];
  //     x += element;
  //   }
  //   // console.log(x) ;
  //   return x;
  // };
  // const color = status === "Vacant" ? randomColor() : "";

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        //   style={{ backgroundColor: color }}
        className={`rounded-lg flex flex-col justify-center my-3 items-center mx-auto w-full h-40 lg:w-full lg:h-56 ${
          status !== "Booked" ? "bg-green-600" : "bg-red-400"
        }  `}
      >
        <div className="text-white text-xl">Table : {tableno}</div>
        <div className="text-white text-xl">Capacity : {capacity}</div>
        <div className="text-white text-xl">
          Status : {status} {status === "Vacant" ? "⭐" : "❌"}
        </div>
      </div>
      {open && status === "Vacant" && (
        <div className="fixed inset-0 flex flex-col bg-opacity-50 bg-black justify-center items-center w-full h-full p-4 text-white">
          <div className="rounded-lg  space-y-5 bg-gray-900 ">
            <div className="flex justify-center mt-3 rounded-lg">
              <button
                onClick={() => setNewOpen(true)}
                className=" p-2 ms-3 w-1/3 bg-slate-600 hover:bg-black rounded-lg"
              >
                New{" "}
              </button>
              <button
                onClick={() => setNewOpen(false)}
                className=" p-2 ms-3 w-1/3 bg-slate-600 hover:bg-black rounded-lg"
              >
                Existing
              </button>
            </div>
            {newOpen ? (
              <NewCustomerForm _id={_id} />
            ) : (
              <ExistingForm _id={_id} />
            )}
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              console.log("cross button", open);
            }}
            className="bg-red-500 rounded-lg p-2"
          >
            Close <span className="text-white font-bold"> X</span>
          </button>
        </div>
      )}
      {open && status === "Booked" && (
        <div className="fixed inset-0 flex flex-col space-y-14 bg-opacity-60 bg-black justify-center items-center w-full h-full p-4 text-white">
          <div className="bg-gray-900 grid space-y-3 p-6 rounded-lg">
            <Link to={`/POS/?id=${order}`} className="text-2xl ">
              Edit Menu
              <span className=" text-white p-2 rounded-lg">↗️</span>
            </Link>
            <Link to={`/orders/?_id=${order}`} className="text-2xl ">
              Go to Orders
              <span className=" text-white p-2 rounded-lg">↗️</span>
            </Link>
            <button
              className="bg-red-500 rounded-lg p-2"
              onClick={() => {
                setIsOpen(false);
                console.log("cross button", open);
              }}
            >
              Close <span className="text-white font-bold"> X</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ExistingForm({ _id }) {
  const [selectedId, setSelectedId] = useState(0);
  const { customersArray } = useApi();

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const doc = await fetch(`http://localhost:3000/api/createTable`, {
      method: "POST",
      body: JSON.stringify({ customer: selectedId, table: _id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/POS/?id=${data.orders[0]}`);
      });
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      className="w-80 h-auto p-4 space-y-4 flex flex-col justify-center rounded-lg text-black "
    >
      <select
        name=""
        id=""
        onChange={(e) => setSelectedId((frmr) => (frmr = e.target.value))}
        className="h-full w-5/6 bg-slate-700 text-white mx-auto focus:outline-none rounded-lg p-2"
      >
        {customersArray.map((cust) => (
          <option
            key={cust._id}
            className="h-1/2 bg-black text-white border-none"
            value={cust._id}
          >
            {cust.customerName}
          </option>
        ))}
      </select>
      <Link className="mx-auto w-2/5 " to={`/POS`}>
        <button className="bg-green-500 rounded-lg p-3">Select Menu</button>
      </Link>
    </form>
  );
}

function NewCustomerForm() {
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customerName: customerName,
      contact: contact,
      address: address,
    };
    console.log(JSON.stringify(data));
    const doc = await fetch(`http://localhost:3000/customer/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const changeSetter = (change, setFunction) => {
    setFunction((ch) => (ch = change));
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      action=""
      className="flex flex-col justify-center items-center text-center gap-2 p-5 rounded-xl bg-gray-900 text-white"
    >
      <div className="w-full">
        <label htmlFor="">Customer Name :</label>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => changeSetter(e.target.value, setCustomerName)}
          placeholder="Enter Name"
          className=" w-4/5 p-3 text-black text-xs   rounded-lg border-2 "
        />
      </div>
      <div className="w-full">
        <label htmlFor="">Contact :</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Contact"
          onChange={(e) => changeSetter(e.target.value, setContact)}
          className=" w-4/5 p-3 text-black text-sm rounded-lg border-2 "
        />
      </div>
      <div className="w-full">
        <label htmlFor="">Address :</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Address"
          onChange={(e) => changeSetter(e.target.value, setAddress)}
          className="w-4/5 p-3 text-black text-sm rounded-lg border-2 mb-4"
        />
      </div>
      <div className="w-full">
        <button className="bg-slate-600 text-white rounded-lg  p-3">
          Sign Up
        </button>
      </div>
    </form>
  );
}
