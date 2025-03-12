import React from "react";
import { FaTrello } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-footer h-28 w-full">
      <div className="flex justify-between items-center h-16 bg-footer text-white ">
        <div className="text-3xl bg-footer text-white flex gap-2 justify-around items-center ml-4">
          <FaTrello className="text-2xl" />
          <h1 className="text-xl font-bold">Trello Clone</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold">About Us</h1>
        </div>
        <div className="flex justify-center items-center gap-5 mr-10">
          <FaFacebook className="text-2xl" />
          <FaGoogle className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <hr className="text-white w-[98%]" />
      </div>
      <div className="text-white text-center  mt-4 ">
        <p>© 2021 Trello Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

<div>
  <p>© 2021 Trello Clone. All rights reserved.</p>
</div>;

// absolute bottom-0