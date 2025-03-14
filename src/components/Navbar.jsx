import { useAuth } from "../context/AuthContext";
import { FaTrello } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@mui/material";
import BasicMenu from "./sideMenu";
import TemporaryDrawer from "./Sidebar";
import AddBoard from "./AddBoard";
import { IoClipboardSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  console.log(user?.photoURL);
  return (
    <nav className="p-4 flex justify-between border-b-2 border-gray-200 items-center sticky z-1000">
      <NavLink to="/">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-textLogo">Trello Clone</h1>
          <FaTrello className="text-2xl text-logo" />
        </div>
      </NavLink>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">  <AddBoard /></h2>
              <IoAddSharp />
            </div>

            <NavLink to="/board">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">View Boards</h2>
                <IoClipboardSharp />
              </div>
            </NavLink>

            <BasicMenu userImage={user?.photoURL} />
          </div>
        ) : (
          <>
           
            <Button
              variant="outlined"
              onClick={login}
              className="px-4 h-8 py-3 rounded flex justify-center items-center gap-2"
            >
              Login
              <FaGoogle className=" text-logo " />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
