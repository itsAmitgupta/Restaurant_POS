import { CiSearch } from "react-icons/ci";
import MenuItems from "./MenuItems";
import { useContext, useEffect, useState } from "react";
import { useApi } from "../Context/Context";

export default function Selection() {
  const { foodArray, setFoodArray, setCategories } = useApi();
  const [MenuData, setMenuData] = useState(foodArray);
  const [searchQ, setSearchQ] = useState("");

  const handleSearch = (e) => {
    setSearchQ(e.target.value);
  };

  useEffect(() => {
    // try {
    // console.log(foodArray[0].category.name);
    const searchedArray =
      searchQ.length > 0
        ? foodArray.filter((food) => {
            console.log(food);
            return `${food.name}`.toLowerCase().includes(searchQ);
          })
        : foodArray;
    setMenuData(searchedArray);
    // } catch (err) {
    //   console.error(err);
    // }

    return () => {
      setMenuData(foodArray);
    };
  }, [searchQ]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    fetch("http://localhost:3000/item/getallitem", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        isMounted && setFoodArray(data.data);
        isMounted && setMenuData(data.data);
      })
      .catch((err) => console.log(err));
    fetch("http://localhost:3000/food/getallfood")
      .then((res) => res.json())
      .then((data) => isMounted && setCategories(data.data))
      .catch((err) => console.log(err));
    return () => {
      // isMounted = false;
      // controller.abort();
    };
  }, []);
  // const [currTime, setCurrentTime] = useState("");

  // useEffect(() => {
  //   const date = new Date();
  //   const timer = setInterval(() => {
  //     setCurrentTime(
  //       `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  //     );
  //   }, 1100);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [currTime]);

  return (
    <div className="w-2/3 h-[100vh] float-left bg-gray-900 text-white p-5 ">
      <h1 className="font-extrabold text-2xl ">Restaurant POS</h1>
      <div className="mt-2 h-10  ">
        {/* <strong className="font-light">{currTime}</strong> */}

        <div className="inbuttonne-block float-right bg-black p-1 border rounded-lg">
          <button className="left-6 ">
            <CiSearch />
          </button>
          <input
            onChange={(e) => handleSearch(e)}
            className="bg-black text-white outline-none ml-0.5"
            type="search"
            name="search-food"
            id="search-food"
            placeholder="Search for Food"
          />
        </div>
      </div>
      <div className="w-full">
        <MenuItems setMenuData={setMenuData} MenuData={MenuData} />
      </div>
    </div>
  );
}
