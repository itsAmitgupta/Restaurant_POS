import React, { useEffect, useState } from "react";
import axios from "axios";

const TableContext = React.createContext();

const TableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [login , setLogin] = useState(false);
  const [refresh, setRefresh] = useState({});
  // console.log(data);
  // useEffect(()=>{
  //   axios.get('http://localhost:3000/api/getOrder')
  //   .then((response)=>{
  //     // console.log(response.data.data)
  //     setOrder(response.data.data)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  //   },[])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/getOrder");
  //       setOrder(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   const interval = setInterval(fetchData, 10000000);

  //   return () => clearInterval(interval);
  // }, []);
  const userData = localStorage.getItem("user");
  console.log(userData)
  useEffect(()=>{
    const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getOrder");
      setOrder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
},[refresh])
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getUser");
        setUser(response.data.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData()
  },[refresh])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/customer/getCustomers");
        setCustomer(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000000000);

    return () => clearInterval(interval);
  }, []);
console.log(login)
  return (
    <TableContext.Provider
      value={{ data, setData, user, setUser, order, setOrder, customer ,setCustomer,setLogin,login,refresh,setRefresh}}
    >
      {children}
    </TableContext.Provider>
  );
};
export { TableContext };

export default TableContextProvider;
