import React from "react";
import Navbar from "../navbar/Navbar";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

function MyAccount() {
  return (
    <div className=" font-Montserrat">
      <Navbar />
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48 mb-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-2 mt-24">
          My Account
        </h1>
        <div className="h-[2px] w-[100px] bg-yellow-400"></div>
      </div>
      <div className="mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 justify-around border-b-[1px] border-b-[#979797] border-opacity-30 pb-4 md:mx-8 lg:mx-32 xl:mx-48">
        <Link
          to="/myorders"
          className="p-3 border-r-[1px] border-r-[#979797] border-opacity-30 cursor-pointer"
        >
          <div className=" flex items-center">
            <span className=" font-bold text-base">My Orders</span>
            <BsChevronRight className=" text-[#737373] ml-4" />
          </div>
          <span className=" text-xs text-[#181818] opacity-70  max-w-[180px]">
            View, modify and track orders
          </span>
        </Link>
        <div className=" p-3 border-r-[1px] border-r-[#979797] border-opacity-30 cursor-not-allowed">
          <div className=" flex items-center">
            <span className=" font-bold text-base">My Payments</span>
            <BsChevronRight className=" text-[#737373] ml-4" />
          </div>
          <span className=" text-xs text-[#181818] opacity-70 max-w-[200px]">
            View and modify payment methods
          </span>
        </div>
        <div className=" p-3 border-r-[1px] border-r-[#979797] border-opacity-30  cursor-not-allowed">
          <div className=" flex items-center">
            <span className=" font-bold text-base">My Wallet</span>
            <span className=" font-bold text-xs text-[#20a437] ml-2 max-w-[180px]">
              Rs. 0
            </span>
            <BsChevronRight className=" text-[#737373] ml-2" />
          </div>
          <span className=" text-xs text-[#181818] opacity-70">
            Bewakoof Wallet History and redeemed gift cards
          </span>
        </div>
        <Link
          to="/myaddresses"
          className=" p-3 border-r-[1px] border-r-[#979797] border-opacity-30 cursor-pointer"
        >
          <div className=" flex items-center">
            <span className=" font-bold text-base">My Addresses</span>
            <BsChevronRight className=" text-[#737373] ml-4" />
          </div>
          <span className=" text-xs text-[#181818] opacity-70 max-w-[200px] ">
            Edit, add or remove addresses
          </span>
        </Link>
        <Link to="/myprofile">
          <div className=" p-3 border-opacity-30 cursor-pointer">
            <div className=" flex items-center">
              <span className=" font-bold text-base">My profile</span>
              <BsChevronRight className=" text-[#737373] ml-4" />
            </div>
            <span className=" text-xs text-[#181818] opacity-70  max-w-[200px]">
              Edit personal info, change password
            </span>
          </div>
        </Link>
      </div>
      <div className=" flex items-center py-28 mx-2 md:mx-8 lg:mx-32 xl:mx-48">
        <div className="max-w-[350px]">
          <div className=" text-xl font-bold opacity-90 text-[#747474]">
            Buy something to get personalised recommendations.
          </div>
          <div className=" mt-10 text-white font-Montserrat text-sm font-bold ">
            <Link
              to="/"
              className=" rounded-sm border-[1px] border-[#51cccc] px-4 py-2 bg-white text-[#51cccc]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className=" ml-8">
          <img
            src="https://images.bewakoof.com/web/empty-account-1530180452.png"
            alt="recomendation"
          />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
