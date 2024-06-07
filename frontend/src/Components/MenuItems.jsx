import { useContext, useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useApi } from "../Context/Context";

export default function MenuItems({ MenuData, setMenuData }) {
  const { foodArray, categories, setCategories } = useApi();
  const Menu = foodArray;
  function filterData(category) {
    if (category === "all") {
      setMenuData(foodArray);
    } else {
      const updateList = Menu.filter((ele) => ele.category?.name === category);
      console.log(category, updateList);
      setMenuData(updateList);
    }
  }

  // useEffect(() => {
  //   fetch("http://localhost:3000/food/getallfood")
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <nav className="my-2 w-full">
        <ul className="flex overflow-x-scroll relative  text-yellow-500">
          <button onClick={() => filterData("all")}>All</button>
          {categories &&
            categories.map((cat) => (
              <button
                key={cat._id}
                className="ms-5"
                onClick={() => filterData(cat.name)}
              >
                {cat.name}
              </button>
            ))}
        </ul>
      </nav>
      <div className="h-[72vh] lg:80vh  overflow-y-scroll">
        <MenuCard menudata={MenuData} />
      </div>
    </>
  );
}
