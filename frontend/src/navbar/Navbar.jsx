import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { AiOutlineUser } from "react-icons/ai";
import { selectUserInfo } from "../features/user/userSlice";
import { FiMenu } from "react-icons/fi";
import MobileMenu from "../components/MobileMenu";
// import { setGender } from "../features/products/ProductSlice";

function Navbar() {
  const [menu, setMenu] = useState("");
  const [userBox, setUserBox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  // const user = useSelector(selectLoggedInUser);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust the breakpoint as needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // check to see mobilescreen

  return (
    <div className="fixed top-0 z-50 w-full bg-white border-b-[1px] border-gray-400">
      {isMobile && <MobileMenu open={open} setOpen={setOpen} user={user} />}
      <div className="flex mt-1 pb-3 h-[55px] w-full items-center justify-between p-2 md:justify-around lg:justify-around">
        <div className="flex items-center">
          <Link to="/" className=" flex items-center">
            <img src="/logo.png" className="h-10 w-10 p-1" alt="Logo" />
            <div className="font-BungeeSpice text-2xl mt-0 pl-2 translate-y-[1px] lg:text-4xl">
              SYN
            </div>
          </Link>
          <div className="pl-20">
            <ul className="hidden items-center list-none text-[#292929] md:flex lg:flex">
              {
                <Link
                  to="/men-products"
                  className={`${
                    window.location.pathname === "/admin" &&
                    user.role === "admin" &&
                    "hidden"
                  }`}
                >
                  <li
                    onMouseOver={() => setMenu("men")}
                    onMouseLeave={() => setMenu("")}
                    className={`flex flex-col justify-center items-center m-3 text-lg font-Montserrat cursor-pointer duration-200 ${
                      menu === "men" && "border-b-4 border-orange-400"
                    }`}
                  >
                    MEN
                  </li>
                </Link>
              }
              <Link
                to="/women-products"
                className={`${
                  window.location.pathname === "/admin" &&
                  user.role === "admin" &&
                  "hidden"
                }`}
              >
                <li
                  onMouseOver={() => setMenu("women")}
                  onMouseLeave={() => setMenu("")}
                  className={` flex flex-col justify-center items-center m-3 text-lg font-Montserrat cursor-pointer duration-200 ${
                    menu === "women" && "border-b-4 border-orange-400"
                  }`}
                >
                  WOMEN
                </li>
              </Link>
              <Link to="/all-products">
                <li
                  onMouseOver={() => setMenu("all")}
                  onMouseLeave={() => setMenu("")}
                  className={` flex flex-col justify-center items-center m-3 text-lg font-Montserrat cursor-pointer duration-200 ${
                    menu === "all" && "border-b-4 border-orange-400"
                  }`}
                >
                  All Fashion
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="relative flex items-center">
          {/* <input
            className=" hidden bg-[#e7e7e7] mr-5 rounded-md w-[250px] border-none outline-none p-2 text-[13px] md:block lg:block"
            placeholder="Search"
          /> */}
          {/* <div className=" hidden bg-[#585858] h-7 w-[1px] md:block lg:block"></div> */}
          <ul className="ml-4 font-poppins flex items-center">
            <li className="pr-2">
              {user === null || user.message === "Unauthorized" ? (
                <Link to="/login">
                  <span className="text-[#4b4b4b] font-Montserrat text-md hover:text-black cursor-pointer font-bold text-sm">
                    Login
                  </span>
                </Link>
              ) : (
                <>
                  <Link to="#">
                    <span
                      onMouseOver={() => setUserBox(true)}
                      onMouseLeave={() => setUserBox(false)}
                      className="text-[#333] font-Montserrat text-md hover:text-black cursor-pointer font-bold text-sm"
                    >
                      <AiOutlineUser className=" h-7 w-7" />
                    </span>
                  </Link>
                  {userBox && (
                    <div
                      onMouseOver={() => setUserBox(true)}
                      onMouseLeave={() => setUserBox(false)}
                      className=" absolute min-w-[200px] bg-white border-[0.1px] border-[#f5f5f5] rounded-md top-0 text-sm translate-x-[-80px] translate-y-8 flex flex-col items-start font-Montserrat"
                    >
                      <div className=" bg-[#f5f5f5] py-4 px-5 w-full cursor-pointer">
                        Hi, {user.role === "admin" ? "Admin" : "Shopper"}
                      </div>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className={`${
                            isMobile ? "hidden" : "block"
                          } hover:bg-[#f5f5f5] py-4 px-5 w-full cursor-pointer`}
                        >
                          Admin
                        </Link>
                      )}
                      <Link
                        to="/logout"
                        className=" hover:bg-[#f5f5f5] py-4 px-5 w-full cursor-pointer"
                      >
                        Log Out
                      </Link>
                    </div>
                  )}
                </>
              )}
            </li>
            <Link to="/">
              <li className="p-1 cursor-pointer border-b-4 duration-200 border-white">
                <BsBag className="text-[26px] cursor-pointer" />
                {/* {items.length > 0 && (
                  <span
                    className={`absolute inline-flex items-center top-4 translate-x-[14px] rounded-full bg-[#fdd835] ${
                      items.length > 9
                        ? " text-[10px] px-[2px] py-0"
                        : "text-[10px] px-[6px] py-[1px]"
                    } font-Montserrat text-black ring-1 ring-inset ring-yellow-600/20`}
                  >
                    {items.length}
                  </span>
                )} */}
              </li>
            </Link>
            <li className=" hidden md:block pl-3">
              <div>
                <img
                  className="h-[35px] w-[35px] rounded-[50%]"
                  src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
                  alt="User avatar"
                />
              </div>
            </li>
            <li className=" pl-2 block md:hidden">
              <div onClick={() => setOpen(true)}>
                <FiMenu className=" h-6 w-6" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
