import { useAuth } from "../context/AuthContext";
import { FaTrello } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@mui/material";
import BasicMenu from "./sideMenu";
import TemporaryDrawer from "./Sidebar";


const Navbar = () => {
    const { user, login, logout } = useAuth();


    return (
        <nav className="p-4 flex justify-between bg-gray-800 text-white">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Trello Clone</h1>
                <FaTrello className="text-2xl" />
            </div>


            <div>

                {user ? (

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold">Add Board</h2>
                            <IoAddSharp />
                        </div>
                        <BasicMenu userImage={user?.photoURL} />

                    </div>

                ) : (

                    <>
                        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer> */}
                        {/* <Drawer /> */}
                        {/* <TemporaryDrawer /> */}
                        <Button variant="outlined" size="" onClick={login} className="bg-gray-500 px-4 py-2 rounded flex items-center gap-2">
                            Login
                            <FaGoogle className=" text-slate-300" />
                        </Button>
                    </>

                )}
            </div>

        </nav>
    );
};

export default Navbar;
