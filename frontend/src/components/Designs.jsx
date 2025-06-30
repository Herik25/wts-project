import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Designs() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

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
    <div>
      <h1 className="font-Krala font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl py-3 sm:py-5">
        Designs of the Week
      </h1>
      {isMobile ? (
        <div className=" flex w-full">
          <img
            onClick={() => navigate("men-products")}
            className=" w-[50%] cursor-pointer"
            src="https://images.bewakoof.com/uploads/grid/app/DOTW-Split-banner-Msite-Men--24--1707196209.jpg"
          />
          <img
            onClick={() => navigate("women-products")}
            className=" w-[50%] cursor-pointer"
            src="https://images.bewakoof.com/uploads/grid/app/DOTW-Split-banner-Msite-Women--24--1707196208.jpg"
          />
        </div>
      ) : (
        <div className=" flex w-full">
          <img
            onClick={() => navigate("men-products")}
            className=" w-[50%] cursor-pointer"
            src="https://images.bewakoof.com/uploads/grid/app/DOTW-Split-banner-Desktop-Men--26--1707196209.jpg"
          />
          <img
            onClick={() => navigate("women-products")}
            className=" w-[50%] cursor-pointer"
            src="https://images.bewakoof.com/uploads/grid/app/DOTW-Split-banner-Desktop-Women--25--1707196209.jpg"
          />
        </div>
      )}
      {/* <img
        className=" w-full"
        src="https://images.bewakoof.com/uploads/grid/app/Blockbuster-flat-70-Off-desktop-deal-banner-1699032711.jpg"
      /> */}
    </div>
  );
}

export default Designs;
