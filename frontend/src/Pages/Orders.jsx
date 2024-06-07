import { useContext } from "react";
import { useApi } from "../Context/Context";

export default function Orders() {
  const { OrdersArray } = useApi();

  return (
    <div className="bg-gray-900 p-5 w-full">
      <div className="bg-gray-800 rounded-t-xl w-full px-6 pt-9 pb-2">
        <h2 className="text-white text-3xl ">Order Report</h2>
        <table className="w-full mt-7 text-left rtl:text-right text-white">
          <thead className="">
            <tr className="flex my-2 text-center justify-between">
              <th className="w-full ps-3 text-start font-medium  text-lg">
                Customer
              </th>
              <th className="w-full font-medium text-lg">Menu</th>
              <th className="w-full font-medium text-lg">Total Payment</th>
              <th className="w-full font-medium text-lg">Payment Status</th>
              <th className="w-full font-medium text-lg">Order Status</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="bg-gray-800 rounded-b-xl mt-1 w-full px-6 pt-2 pb-9">
        <table className="w-full ">
          <tbody>
            {OrdersArray.map((orderItm) => {
              return <TableRow key={orderItm._id} data={orderItm} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Button({ value }) {
  return (
    <button
      className={`rounded-3xl w-24 p-2 bg-opacity-80 ${
        value === "Completed" || value === "Delivered"
          ? "bg-green-600"
          : "bg-orange-500"
      }`}
    >
      {value}
    </button>
  );
}

function TableRow({ data }) {
  const {
    customerName,
    customerId,
    items,
    totalAmount,
    paymentStatus,
    orderStatus,
  } = data;

  const menu = items.map((item) => item.name).toString();

  // console.log(menu.substring(0, 16));
  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <tr
      onClick={() => handleClick(customerId)}
      className="flex my-2 text-center justify-between"
    >
      <td className="flex text-gray-200 w-full items-center">
        <img
          src="images/vanilla.png"
          className="rounded-full w-10"
          alt="profile_img"
        />
        <span>{customerName}</span>
      </td>
      <td className="text-gray-200 flex items-center justify-center w-full">
        {menu.substring(0, 24) + " ..."}
      </td>
      <td className="text-gray-200 flex items-center justify-center w-full">
        ₹{totalAmount}
      </td>
      <td className="text-gray-200 flex items-center justify-center w-full">
        <Button value={paymentStatus} />
      </td>
      <td className="text-gray-200 flex items-center justify-center w-full">
        <Button value={orderStatus} />
      </td>
    </tr>
  );
}

//dummy table data
{
  /* <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Jane Foster</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Paneer Tikka, Sprite
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Thor Odinson</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Lal Maas Handi,Coke
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Christopher Nolan</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                BBQ Lamb,Pesto
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Jane Foster</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Paneer Tikka, Sprite
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Thor Odinson</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Lal Maas Handi,Coke
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Christopher Nolan</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                BBQ Lamb,Pesto
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Jane Foster</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Paneer Tikka, Sprite
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Thor Odinson</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                Lal Maas Handi,Coke
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr>
            <tr
              onClick={() => handleClick()}
              className="flex my-2 text-center justify-between"
            >
              <td className="flex text-gray-200 w-full  items-center">
                <img
                  src="images/vanilla.png"
                  className="rounded-full w-10"
                  alt=""
                  srcset=""
                />
                <span>Christopher Nolan</span>
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                BBQ Lamb,Pesto
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                ₹590
              </td>
              <td className="text-gray-200 flex items-center justify-center w-full">
                <Button value="Completed" />
              </td>
            </tr> */
}
