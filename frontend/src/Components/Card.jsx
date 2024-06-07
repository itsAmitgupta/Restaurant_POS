import React from "react";
// import { FaShop } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

function Card({title,value,element}) {
  return (
    <div className="w-[300px] h-[120px] shadow-2xl m-5 rounded">
      <div className="w-full h-full text-start px-8">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-800">{title}</p>
            <p className="font-light text-gray-500">${value}</p>
          </div>
          <div className="shadow-lg w-[45px] h-[45px] rounded-full items-center flex justify-center">
            {/* <FaShop size='20' color="#265073"/> */} {element}
          </div>
        </div>
        <div className="flex gap-1 mt-3">
          <FaArrowTrendUp size='20' color="#265073"/>  
          <p>All Time</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
