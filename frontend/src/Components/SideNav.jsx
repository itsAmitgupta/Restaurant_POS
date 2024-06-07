import React, { useContext, useState } from "react";
import {
  MdOutlineRestaurantMenu,
  MdTableBar,
} from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiSettings4Line } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { TbBurger, TbReportAnalytics } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { GiAccordion, GiKitchenScale } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { IoFastFood } from "react-icons/io5";
import { TableContext } from "../Context/TableContextProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const [open, setOpen] = useState(true);
  const {login} = useContext(TableContext)
  const navigate = useNavigate()
  const onLogout = async () =>{
    const response = await axios.get("http://localhost:3000/api/v1/logoutuser")
    console.log(response.data)
    // localStorage.removeItem('userData');
    navigate("/login")
}
  console.log(login)
  return (
    <section className="flex gap-6">
      <div
        className={`bg-gray-800 min-h-screen ${
          open ? "w-44" : "w-16"
        } duration-500  text-white-200 px-4`}
      >
        <div className="py-3 flex justify-end">
          <MdOutlineRestaurantMenu
            size={26}
            className="cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 relative h-screen">
          <Link
            to="/"
            className={`${login.user.role==="Admin"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <MdOutlineDashboard />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Dashboard
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Dashboard
            </h2>
          </Link>
          <Link
            to="/users"
            className={`${login.user.role==="Admin"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <AiOutlineUser />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Users
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Users
            </h2>
          </Link>
          <Link
            to="/kitchen"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager" || login.user.role==="Chef"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <GiKitchenScale />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Kitchen
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Kitchen
            </h2>
          </Link>
          <Link
            to="/POS"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager" || login.user.role==="Waiter"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <TbReportAnalytics />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              POS
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              POS
            </h2>
          </Link>
          <Link
            to="/foodItem"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <IoFastFood />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Foods
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Foods
            </h2>
          </Link>
          <Link
            to="/tables"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager" || login.user.role==="Waiter"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <MdTableBar />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Tables
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Tables
            </h2>
          </Link>
          <Link
            to="/customer"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <BsPeopleFill />{" "}
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Customer
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Customer
            </h2>
          </Link>
          <Link
            to="/orders"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager" || login.user.role==="Waiter" || login.user.role==="Delivery"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <FiShoppingCart />
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Orders
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Orders
            </h2>
          </Link>
          <Link
            to="/orderhistory"
            className={`${login.user.role==="Admin"|| login.user.role==="Manager"?"":"hidden"} mt-0 items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <FaHistory />
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Order History
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Order History
            </h2>
          </Link>
          { login.user.role ==="Admin" &&<AccordionLink open={open} />}
          <button
            onClick={onLogout}
            className={`bottom-[4.5rem] absolute items-center  group text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md `}
          >
            <div>
              <FiLogOut />
            </div>
            <h2
              style={{
                transitionDelay: ` 300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Logout
            </h2>
          </button>
        </div>
      </div>
    </section>
  );
};

function AccordionLink({ open }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="group text-smgap-3.5 font-medium text-white rounded-md ">
      <div
        onClick={() => {
          setIsClicked(!isClicked);
        }}
        className="mt-0 group cursor-pointer text-sm flex gap-3.5 font-medium p-2  hover:bg-[#265073] hover: text-white rounded-md "
      >
        <div>
          <RiSettings4Line />
        </div>
        <div
          style={{
            transitionDelay: ` 300ms`,
          }}
          className={`whitespace-pre flex items-center space-x-4 duration-500 ${
            !open && "opacity-0  translate-x-28 overflow-hidden"
          }`}
        >
          <h6>Setting</h6>{" "}
          <div>
            {isClicked ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
{/* 
        <h2
          className={`${
            open && "hidden"
          } absolute left-48 bg-white font-semibold whitespace-pre text-blue-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
        >
          {name}
        </h2> */}
      </div>

      {isClicked && (
        <div>
          <Link
            to="/general"
            className={`mt-0 ms-7 group text-sm flex gap-3.5 font-medium p-2 ${
              !open && "opacity-0  translate-x-28 overflow-hidden"
            } hover:bg-[#265073] hover: text-white rounded-md `}
          >
            General
          </Link>
          <Link
            to="/tax"
            className={`mt-0 ms-7 group text-sm flex gap-3.5 font-medium p-2 ${
              !open && "opacity-0  translate-x-28 overflow-hidden"
            } hover:bg-[#265073] hover: text-white rounded-md `}
          >
            Tax
          </Link>
          <Link
            to="/discount"
            className={`mt-0 ms-7 group text-sm flex gap-3.5 font-medium p-2 ${
              !open && "opacity-0  translate-x-28 overflow-hidden"
            } hover:bg-[#265073] hover: text-white rounded-md `}
          >
            Discount
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
