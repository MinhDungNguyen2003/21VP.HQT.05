import React, { useState } from "react";

import DropdownProfile from "../components/DropdownProfile";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div className="flex w-full border-b border-solid border-gray justify-evenly items-center h-24">
        <div>Logo</div>
        <div className="flex flex-row gap-[60px] ">
          <div className="text-2xl hover:bg-gray-100 w-[140px] h-14 rounded-xl flex justify-center items-center">
            <Link to="/" >
            Home
            </Link>
          </div>
          <div className="text-2xl hover:bg-gray-100 w-[140px] h-14 rounded-xl flex justify-center items-center">
            <Link to="/contact-us" >
              Contact Us
            </Link>
          </div>
          <div className="text-2xl hover:bg-gray-100 w-[140px] h-14 rounded-xl flex justify-center items-center ">
            <Link to="/service" >
                Services
            </Link>
          </div>
          
          <div className="text-2xl hover:bg-gray-100 w-[140px] h-14 rounded-xl flex justify-center items-center">
            <Link to="/our-dentist" >
              Our Dentists
            </Link>
          </div>
          
          <br />
          <div className="text-2xl text-white font-bold bg-blue-hosta rounded-lg w-[300px] h-12 flex justify-center items-center border-solid border-white hover:bg-dirty-blue">
          <Link to="/book-appointment">
            Book an appointment
          </Link>
          </div>
          
        </div>

        <div className="flex gap-1">
          <div className="relative">
            <button
              className="text-xl font-semibold text-black bg-gray-200 hover:bg-gray-300 cursor-pointer p-1 rounded-[8px] w-40"
              onClick={toggleDropdown}
            >
              Profile
            </button>
            {showDropdown && <DropdownProfile onClose={closeDropdown} />}
          </div>
        </div>
      </div>
    </>
  );
}
