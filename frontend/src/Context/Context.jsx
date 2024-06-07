import { createContext, useContext, useState } from "react";
import { Menu, order, Orders, Tables } from "../Components/MenuApi";
import { useEffect } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [foodArray, setFoodArray] = useState();
  const [categories, setCategories] = useState();
  const [errMsg, setErrMsg] = useState();
  const [TablesArray, setTablesArray] = useState();
  const [orderArray, setOrderArray] = useState();
  const [tempOrderArray, setTempOrderArray] = useState({});
  const [OrdersArray, setOrdersArray] = useState(Orders);
  const [customersArray, setCustomersArray] = useState();
  const [foodItems, setFoodItems] = useState([]);

  const fetcher = (url, setFunc) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFunc(data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/getOrder")
      .then((res) => res.json())
      .then((data) => setOrdersArray(data.data));
    console.log("contet");
  }, []);

  return (
    <Context.Provider
      value={{
        TablesArray,
        setTablesArray,
        setFoodArray,
        orderArray,
        categories,
        setCategories,
        foodArray,
        foodItems,
        setFoodItems,
        OrdersArray,
        fetcher,
        customersArray,
        setCustomersArray,
        setOrdersArray,
        setOrderArray,
        tempOrderArray,
        errMsg,
        setErrMsg,
        setTempOrderArray,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useApi = () => useContext(Context);