import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <>
        <Navbar />
            <Outlet />
        <h1>Footer</h1>
        </>

    )
}

export default Layout;