import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ open, setOpen, user }) {
  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto relative w-screen max-w-[250px]">
            <div className="flex h-full flex-col overflow-y-scroll bg-[#f7f7f7] py-6 shadow-xl">
              <div className=" flex justify-between px-4 pb-4 sm:px-6 border-b-[#ccc] border-b-[1px]">
                <div className="text-base font-semibold leading-6 text-gray-900">
                  {user === null || user.message === "Unauthorized" ? (
                    <span>Hello, Guest</span>
                  ) : (
                    <span>Hello, Shopper</span>
                  )}
                </div>
                <button
                  type="button"
                  className=" rounded-md text-[#000] hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="relative my-3 flex-1 sm:px-6">
                <div className=" text-[#adabab] px-4 mb-3 text-xs font-bold">
                  SHOP IN
                </div>
                <div className="flex flex-col text-sm font-bold px-4 bg-white">
                  <Link
                    to="/men-products"
                    className=" flex items-center justify-between my-3"
                  >
                    <span className=" font-Montserrat">Men</span>
                    <div className=" bg-slate-200 rounded-full">
                      <img
                        src="https://images.bewakoof.com/nav_menu/Circle-icon-men--1--1684748735.png"
                        className=" h-8 w-8"
                        alt="MenImg"
                      />
                    </div>
                  </Link>
                  <Link
                    to="/women-products"
                    className=" flex items-center justify-between my-3"
                  >
                    <span className=" font-Montserrat">Women</span>
                    <div className=" bg-slate-200 rounded-full">
                      <img
                        src="https://images.bewakoof.com/nav_menu/Circle-icon-women--1--1684748736.png"
                        className=" h-8 w-8"
                        alt="WomenImg"
                      />
                    </div>
                  </Link>
                  <Link
                    to="/all-products"
                    className=" flex items-center justify-between my-3"
                  >
                    <span className=" font-Montserrat">All Fahsion</span>
                    <div className=" bg-slate-200 rounded-full">
                      <img
                        src="https://images.bewakoof.com/nav_menu/Circle-icon-specials-1684824538.png"
                        className=" h-8 w-8"
                        alt="StarImg"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" h-screen mb-8">
                <div className=" text-[#adabab] px-4 my-2 text-xs font-bold">
                  User Profile
                </div>
                <div className="flex flex-col text-xs font-bold px-4">
                  <Link
                    to="/myaccount"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/myorders"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/myprofile"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    My Profile
                  </Link>
                </div>
                <div className=" text-[#adabab] px-4 my-2 text-xs font-bold">
                  My Info
                </div>
                <div className="flex flex-col text-xs font-bold px-4">
                  <Link
                    to="/"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/myaddresses"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    My Addresses
                  </Link>
                </div>
                <div className=" text-[#adabab] px-4 my-2 text-xs font-bold">
                  About Us
                </div>
                <div className="flex flex-col text-xs font-bold px-4">
                  <Link
                    to="/aboutus"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    Our Story
                  </Link>
                </div>
                <div className="flex flex-col text-xs font-bold px-4">
                  <Link
                    to="/terms"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    Terms & Condition
                  </Link>
                </div>
                <div className="flex flex-col text-xs font-bold px-4">
                  <Link
                    to="/privacy-policy"
                    className="flex items-center my-4 font-Montserrat"
                  >
                    Privacy Policies
                  </Link>
                </div>
              </div>
              {user === null || user.message === "Unauthorized" ? (
                <Link
                  to="/login"
                  className="fixed bottom-0 w-full bg-white py-4 px-4 font-Montserrat font-bold text-sm"
                >
                  LOG IN
                </Link>
              ) : (
                <Link
                  to="/logout"
                  className="fixed bottom-0 w-full bg-white py-4 px-4 font-Montserrat font-bold text-sm"
                >
                  LOG OUT
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
