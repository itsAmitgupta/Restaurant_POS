import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TableContextProvider from "./Context/TableContextProvider.jsx";
import Login1 from "./Pages/Login2.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
    // <Login1 />
     <TableContextProvider>    
    <App />
   </TableContextProvider>
);