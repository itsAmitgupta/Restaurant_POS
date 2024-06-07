import Dashboard from "./Pages/Dashboard";
import POS from "./Pages/POS";
import Navbar from "./Pages/Navbar";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ContextProvider } from "./Context/Context";
import Orders from "./Pages/Orders";
import Table from "./Pages/Table";
import General from "./Components/General";
import Taxes from "./Components/Taxes";
import Discount from "./Components/Discount";
import TableContextProvider from "./Context/TableContextProvider";
import Users from "./Pages/Users";
import OrderTable from "./Pages/OrderTable";
import OrderHistory from "./Pages/OrderHistory";
import FoodTable from "./Pages/FoodTable";
import FoodItem from "./Pages/FoodItem";
import Kitchen from "./Pages/Kitchen";
import CustomerTable from "./Pages/CustomerTable";
import Login from "./Pages/Login";
import { useContext } from "react";
import { TableContext } from "./Context/TableContextProvider";
function App() {
  const { login, setLogin } = useContext(TableContext);
  console.log(login);
  // const router = createBrowserRouter([
  //   {
  //     path:"/login",
  //     element:<Login/>
  //   },
  //   {
  //     path: "/",
  //     element: <Navbar />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "/POS/:id",
  //         element: <POS />,
  //       },
  //       {
  //         path: "/POS/",
  //         element: <POS />,
  //       },
  //       {
  //         path: "/orders",
  //         element: <OrderTable />
  //       },
  //       {
  //         path: "/orderhistory",
  //         element: <OrderHistory />,
  //       },
  //       {
  //         path: "/tables",
  //         element: <Table />,
  //       },
  //       {
  //         path: "/users",
  //         element: <Users />,
  //       },
  //       {
  //         path: "/general",
  //         element: <General />,
  //       },
  //       {
  //         path: "/tax",
  //         element: <Taxes />,
  //       },
  //       {
  //         path: "/discount",
  //         element: <Discount />,
  //       },
  //       {
  //         path: "/foodItem",
  //         // element: <FoodTable />,
  //         element: <FoodItem />,
  //       },
  //       {
  //         path: "/kitchen",
  //         element: <Kitchen />,
  //       },
  //       {
  //         path: "/customer",
  //         element: <CustomerTable/>,
  //       },
  //     ],
  //   },
  // ]);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       {
  //         login.status ? (
  //         <>
  //         <Route path='/' element={<Navbar/>}>
  //         <Route path='/dashboard' element={<Dashboard/>}/>
  //         <Route path='/POS/:id' element={<POS/>}/>
  //         <Route path='/POS/' element={<POS/>}/>
  //         <Route path='/orders' element={<OrderTable/>}/>
  //         <Route path='/orderhistory' element={<OrderHistory/>}/>
  //         <Route path='/tables' element={<Table/>}/>
  //         <Route path='/users' element={<Users/>}/>
  //         <Route path='/general' element={<General/>}/>
  //         <Route path='/tax' element={<Taxes/>}/>
  //         <Route path='/discount' element={<Discount/>}/>
  //         <Route path='/foodItem' element={<FoodItem/>}/>
  //         <Route path='/customer' element={<CustomerTable/>}/>
  //         <Route path='/kitchen' element={<Kitchen/>}/>
  //       </Route> </> )
  //       :( <Route path='/login' element={<Login/>} /> )
  //       }
  //     </Route>
  //   )
  // )
  // const Navigate = useNavigate();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            login.status ? (
              login.user.role === "Admin" ? (
                <Navigate to="/dashboard" />
              ) : login.user.role === "Manager" ? (
                <Navigate to="/tables" />
              ) : login.user.role === "Chef" ? (
                <Navigate to="/kitchen" />
              ) : login.user.role === "Waiter" || login.user.role === "Delivery" ? (
                <Navigate to="/orders" />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route path='/' element={login.status && login.user.role === "Admin" ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} /> */}
        {/* <Route path='/' element={login.status && login.user.role === "Manager" ? <Navigate to="/orders" /> : <Navigate to="/login" />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/POS/:id" element={<POS />} />
          <Route path="/POS/" element={<POS />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/users" element={<Users />} />
          <Route path="/general" element={<General />} />
          <Route path="/tax" element={<Taxes />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/foodItem" element={<FoodItem />} />
          <Route path="/customer" element={<CustomerTable />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <div className="flex">
        <ContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
      </div>
    </>
  );
}

export default App;
