import { Outlet } from "react-router";
import NavBar from "./src/Components/common/NavBar";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
