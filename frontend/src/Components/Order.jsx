import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../Context/Context";
import { TableContext } from "../Context/TableContextProvider";

export default function Order() {
  const [orderType, setOrderType] = useState("dine");
  const { tempOrderArray, orderArray, setOrderArray, setTempOrderArray } =
    useApi();
    const {setRefresh} = useContext(TableContext);
  const [total, setTotal] = useState(0);
  const [disc, setdisc] = useState(5);
  const { id } = useParams();

  //buggy use effect
  // useEffect(() => {
  //   console.log("ran");
  //   fetch(`http://localhost:3000/api/getOrder/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTempOrderArray({
  //         items: data.data.items,
  //         quantity: data.data.quantity,
  //         notes: data.data.notes,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const ttl = tempOrderArray.items
      ? tempOrderArray.items
          .map((item, i) => {
            const x = item.price * tempOrderArray.quantity[i];
            return x;
          })
          .reduce((sum, item) => sum + item, 0)
      : 0;
    setTotal(ttl);
    setdisc(tempOrderArray.discount);
    setOrderType(tempOrderArray.orderType);
  }, [tempOrderArray]);

  const handlePlaceOrder = () => {
    fetch(`http://localhost:3000/api/editOrder/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...tempOrderArray,
        totalamount: total,
        orderType: orderType,
        discount: disc,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Order placed");
          setRefresh({});
          console.log(data);
        }
      })
      .catch((err) => {
        toast.error(
          err.message === "Failed to fetch"
            ? "Check Connection and try again!"
            : ""
        );
        console.error(err);
      });
    // toast.success("Order Placed");
  };

  return (
    <div className="w-1/3 h-[100vh] bg-gray-900 space-y-2 text-white p-5 float-right">
      <ToastContainer />
      <div className="text-lg font-bold ">Order #{id}</div>
      <div className="btn-container w-full ">
        <button
          onClick={() => setOrderType("dine")}
          className={`${
            orderType === "dine" ? "bg-red-500" : "bg-gray-500"
          }  p-1 w-auto mx-auto outline-neutral-200 rounded-lg my-2 me-2`}
        >
          Dine in
        </button>
        <button
          onClick={() => setOrderType("to go")}
          className={` ${
            orderType === "to go" ? "bg-red-500" : "bg-gray-500"
          } p-1 w-auto mx-auto outline-neutral-200 rounded-lg my-2 me-2`}
        >
          To Go
        </button>
        <button
          disabled
          onClick={() => setOrderType("delivery")}
          className={` ${
            orderType === "delivery" ? "bg-red-500" : "bg-gray-500"
          } p-1 w-auto mx-auto outline-neutral-200 rounded-lg my-2 me-2`}
        >
          Delivery
        </button>
      </div>

      {/* heading */}
      <div className="flex w-full pb-2 ">
        <div className="flex justify-between w-4/5 ">
          <h2>Item</h2>
          <h2>Qnty</h2>
        </div>
        <div className="w-1/5 flex justify-end">Price</div>
      </div>

      {/* food item container */}
      <div className="h-3/5 border-t-2 border-gray-600 border-b-2 overflow-y-scroll ">
        {tempOrderArray?.items &&
          tempOrderArray.items.map((item, i) => (
            <FoodItem
              key={item._id}
              itr={i}
              orderArray={orderArray}
              setTempOrderArray={setTempOrderArray}
              tempOrderArray={tempOrderArray}
              item={item}
            />
          ))}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between pb-2">
          <h3 className="text-sm text-gray-300">Discount</h3>
          <input
            type="text"
            value={disc}
            placeholder="discount"
            onFocus={(e) => e.target.select()}
            onChange={(e) => setdisc(e.target.value)}
            className="w-1/6 text-end text-sm bg-transparent text-gray-200 focus:outline-none"
          />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm text-gray-300">Sub Total</h3>
          <h3 className="text-sm text-gray-300">{total}</h3>
        </div>
        {tempOrderArray.readystatus == "ready" ? (
          <button disabled className="w-full bg-gray-500 rounded-lg p-2">
            Order Ready
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-red-500 rounded-lg p-2"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}

function FoodItem({ item, setTempOrderArray, itr, tempOrderArray }) {
  const { _id, name, price } = item;
  const [qnty, setQnty] = useState(tempOrderArray.quantity[itr]);
  const [inpNot, setinpNote] = useState(tempOrderArray.notes[itr]);

  const handleChange = (e, setFunc) => {
    if (!isNaN(Number(e.target.value))) {
      setFunc(Number(e.target.value));
    }
  };

  useEffect(() => {
    // if (qnty) {
    //   handleDelete(_id);
    // }
    const updatedQ = tempOrderArray.quantity;
    updatedQ[itr] = qnty;
    const updateN = tempOrderArray.notes;
    updateN[itr] = inpNot;
    setTempOrderArray({
      ...tempOrderArray,
      quantity: updatedQ,
      notes: updateN,
    });
  }, [inpNot, qnty]);

  // useEffect(() => {
  //   if (qnty == 0) {
  //     handleDelete(_id);
  //   }
  //   if (qnty >= 1 || notes.length > 0 || qnty === "") {
  //     const newArray = tempOrderArray.map((obj) =>
  //       obj._id === id ? { ...obj, qty: Number(qnty), notes: inpNot } : obj
  //     );
  //     setTempOrderArray((arr) => (arr = newArray));
  //   }
  // }, [qnty, inpNot]);

  const handleDelete = (id) => {
    const updatedArr = tempOrderArray.items.filter((o) => o._id !== id);
    tempOrderArray.quantity.splice(itr, 1);
    tempOrderArray.notes.splice(itr, 1);
    setTempOrderArray({ ...tempOrderArray, items: updatedArr });
    toast("Item removed");
  };

  return (
    <>
      {/* order card */}
      <div className="order-card p-2 rounded-lg shadow-lg space-y-3">
        <div className="flex w-full">
          <div className="w-4/5 flex justify-between">
            <h2 className="text-base">{name}</h2>
            <input
              type="text"
              value={qnty}
              placeholder="quantity"
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleChange(e, setQnty)}
              className="w-1/6 text-end text-sm bg-transparent text-gray-200 focus:outline-none"
            />
          </div>
          <div className="w-1/5 flex justify-end text-sm text-gray-200">
            {price * tempOrderArray.quantity[itr]}
          </div>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={inpNot}
            onChange={(e) => setinpNote(e.target.value)}
            className="bg-gray-800 w-4/5 p-1 text-xs rounded-lg focus:outline-none"
            placeholder="Enter Note if any"
          />
          <button
            onClick={() => handleDelete(_id)}
            className="w-1/5 flex justify-end"
          >
            <MdDeleteOutline size={32} className="text-red-500" />
          </button>
        </div>
      </div>
    </>
  );
}
