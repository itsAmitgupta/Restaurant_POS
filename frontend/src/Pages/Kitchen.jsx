import { useEffect, useState,  useContext } from "react";
import { useApi } from "../Context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableContext } from "../Context/TableContextProvider";
export default function () {
  // const { OrdersArray, setOrdersArray } = useApi();
  const {setRefresh,order, setOrder} = useContext(TableContext);
  const [buttom, setButton] = useState("all");
  const [listenerm, setListener] = useState("");
  const [orderType, setOrderType] = useState("all");

  // useEffect(() => {
  //   console.log("kitchen");
  //   const fetchInt = setInterval(() => {
  //     console.log("interval");
  //     fetch("http://localhost:3000/api/getOrder")
  //       .then((res) => res.json())
  //       .then((data) => setOrdersArray(data.data));
  //   }, 100000);
  //   return () => {
  //     clearInterval(fetchInt);
  //   };
  // }, []);

  const [updatedList, setUpdatedList] = useState([]);
  useEffect(() => {
    if (orderType == "all") {
      setUpdatedList(order);
      setButton(orderType);
    } else {
      console.log("ordertype", orderType, updatedList);
      setUpdatedList(
        order.filter((item) => item.orderType === orderType)
      );
      setListener(Date.now());
    }
  }, [order, orderType]);

  const handleClick = (orderType) => {
    setOrderType(orderType);
    setButton(orderType);
  };

  return (
    <div className="bg-gray-900  text-white w-full ">
      <ToastContainer />
      <header>
        <ul className="flex w-full justify-evenly my-5 ">
          <button
            onClick={() => handleClick("all")}
            className={`"h-[50px] w-[70px] rounded-lg" ${
              buttom == "all" ? "bg-green-500" : "bg-gray-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleClick("dine in")}
            className={`"h-[50px] w-[70px] rounded-lg" ${
              buttom == "dine in" ? "bg-green-500" : "bg-gray-900"
            }`}
          >
            Dine-In
          </button>
          <button
            onClick={() => handleClick("to go")}
            type="button"
            className={`"h-[50px] w-[70px] rounded-lg" ${
              buttom == "to go" ? "bg-green-500" : "bg-gray-900"
            }`}
          >
            Go-to
          </button>
          <button
            onClick={() => handleClick("delivery")}
            type="button"
            className={`"h-[50px] w-[70px] rounded-lg" ${
              buttom == "delivery" ? "bg-green-500" : "bg-gray-900"
            }`}
          >
            Delivery
          </button>
        </ul>
      </header>
      <div className="card-container w-full grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {updatedList
          ?.filter((item) => item.readystatus !== "ready")
          .map((ord) => (
            <KOrder
              key={ord._id}
              listenerm={listenerm}
              setListener={setListener}
              order={ord}
              setRefresh={setRefresh}
            />
          ))}
      </div>
    </div>
  );
}

function KOrder({ order, listenerm, setListener, setRefresh }) {
  const [btn, setBtn] = useState(true);
  const [data, setData] = useState(order.readystatus);
  const handMark = () => {
    toast.success("Order Completed");
    setBtn(!btn);
    setListener(Date.now());
    getUpdate();
  };

  useEffect(() => {
    setData(order.readystatus);
  }, [listenerm]);

  const getUpdate = async (e) => {
    console.log(order._id);
    console.log(typeof order._id);
    await fetch(`http://localhost:3000/api/editOrder/${order._id}`, {
      method: "PUT",
      body: JSON.stringify({ readystatus: "ready" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (data) => 
        {
          console.log(data)
          setRefresh({})
        }
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full h-[50vh] text-start rounded-xl bg-gray-700">
      <header className="">
        <ul className="flex w-full  bg-gray-500 justify-around mb-5 p-3 rounded-t-xl">
          <li>Order no. {order._id}</li>
          <li>{order.orderType} </li>
          <li>table no. {order?.table?.tableno}</li>
        </ul>
      </header>

      <div className="h-3/5 border-t-2 border-gray-600 border-b-2 overflow-y-scroll ">
        <FoodItem order={order} />
      </div>

      <div className=" flex justify-between p-2">
        <div className="">
          Note :<br /> <div className="text-green-500">{order.notes}</div>
        </div>
        <div>
          <button
            onClick={handMark}
            className={`${btn ? "bg-gray-800" : "bg-green-500"} p-2 rounded-xl`}
          >
            {data}
          </button>
        </div>
      </div>
    </div>
  );
}

function FoodItem({ order }) {
  return (
    <div className="item-card p-2 rounded-lg  space-y-5">
      <div className="flex w-full">
        <div className="w-4/5 flex justify-between">
          <h2 className="text-base">
            Name :
            <ul className="text-green-500 py-3">
              {order.items.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </h2>
        </div>
        <div className="w-1/5 flex justify-end text-sm text-gray-200">
          Quantity
          <ul className="text-green-500 py-3">
            <br />
            {order.quantity?.map((qty) => (
              <li>{qty}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}