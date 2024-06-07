import SideNav from "../Components/SideNav";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <SideNav />
      <Outlet />
    </>
  );
}
