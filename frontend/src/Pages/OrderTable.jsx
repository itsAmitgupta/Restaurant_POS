import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../Context/TableContextProvider";

function OrderTable() {
  const { order, setOrder } = useContext(TableContext);
  const [newOrder, setNewOrder] = useState([]);
  console.log(order);
  // useEffect(()=>{
  //     const updatedList = order.filter((data)=>data.paymentstatus == 'pending')
  //     setNewOrder(updatedList)
  // },[])
  // console.log(newOrder)
  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="w-full text-2xl font-bold text-white p-2">Orders</div>
      <div className="h-[90%] overflow-y-scroll">
        {order
          .filter((data) => data.paymentstatus === "pending")
          .map((data) => {
            return <SingleOrder key={data._id} order={data} />;
          })}
      </div>
    </div>
  );
}

const SingleOrder = ({ order }) => {
  const dateObject = new Date(order.createdAt);
  const hour = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    order && (
      <div>
        <div className=" bg-gray-700 m-2 w-3/4 text-white rounded p-1 cursor-pointer">
          <div className="mt-2 shadow-2xl">
            <div className="flex justify-between">
              <span className="font-bold text-xl">Order {order._id}</span>
              <span className="text-light">{formattedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">
                Table no.{" "}
                {order.table.tableno}
              </span>
              <span className="text-md font-semibold">
                {order.customer.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={`rounded-lg p-1 ${
                  order.readystatus == "ready"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                } text-white`}
              >
                {order.readystatus == "ready" ? "Ready" : "Pending"}
              </span>
              <div className="flex gap-2">
                <span className="text-md font-bold">
                  {order.totalamount}Rs.{" "}
                </span>
                <span className="rounded-lg p-1 bg-gray-950 text-white">
                  {order.orderType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderTable;
