import React, { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TableContext} from "../Context/TableContextProvider";
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {setLogin} = useContext(TableContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/loginuser",
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setLogin(response.data);
      localStorage.setItem("user",JSON.stringify(response.data.user));
      // console.log("getitem",localStorage.getItem("user"))
      if (response.data.status) {
        navigate("/");
        toast.success("Success Notification !", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error("Error", error.response.data.message);
      toast.error(`${error.response.data.message}`, {
        position: "top-center"
      });
    }
  };
  return (
    <> 
    {/* bg-[#78E3FD] */}
    <div className="w-full h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-2/3 h-2/3 bg-gray-800 text-white shadow-2xl flex justify-between">
        <div
          className="w-[50%] h-full bg-cover opacity-70"
          style={{
            // backgroundImage: `URL('https://webstockreview.net/images/clipart-restaurant-animated-2.jpg')`,
            backgroundImage: `URL('./public/clipart-restaurant-animated-2.jpg')`,
          }}
        ></div>
        <div className="w-[50%] h-full">
          <div className="text-center font-bold text-2xl mt-2 underline ">
            Login/SignIn
          </div>
          <div className="mt-4 text-xl">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-start  mx-4 gap-2 text-center"
            >
              <label htmlFor="email" className="font-semibold ">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="p-1 text-gray-700"
              />
              <label htmlFor="password" className="font-semibold ">
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="p-1 text-gray-700"
              />
              <button
                type="submit"
                className="bg-white p-2 text-gray-800 text-2xl font-semibold my-4 mx-auto w-20 rounded-lg hover:bg-gray-700 hover:text-white"
              >
                Login
              </button>
            </form>
          </div>
          <div className="text-center text-xl font-semibold mt-8">
            <p>copyright &#169; 2024 |All Right Reserved</p>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>

  );
}

export default Login;
