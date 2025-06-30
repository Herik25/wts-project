import React from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      {/* <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/34ad8a15340989.5628fae2842b3.jpg" alt="pageNoFound" className='h-screen w-screen overflow-hidden' />
      <a className=' absolute bottom-64 right-[29%]' href="/"><img src="/returnToMainLand.png" alt="button" /></a> */}
      <Navbar />
      <div className=" w-full flex flex-col items-center font-Montserrat mt-40">
        <div className=" text-[100px] font-bold text-[#424242]">404</div>
        <span className=" text-2xl text-[#424242] font-bold">OH SNAP !</span>
        <div className=" text-lg text-[#424242] font-bold mt-6 pb-6 border-b-[#ccc] border-b-[1px]">
          The page you are looking for doesn't exist.
        </div>
        <span className=" text-base text-[#424242] font-bold  mt-6">
          Maybe you’ll find it in one of these categories:
        </span>
        <div className=" grid grid-cols-3 gap-x-24 mt-10">
          <span>Men</span>
          <Link to='/men-tshirts' className=" underline text-[#67d2d2]">Tshirts</Link>
          <Link to='/men-joggers' className=" underline text-[#67d2d2]">Joggers</Link>
          <div>&nbsp; &nbsp;</div>
          <Link to='/men-shorts' className=" underline text-[#67d2d2] ">Shorts</Link>
          <Link to='/men-vests' className=" underline text-[#67d2d2] ">vests</Link>
        </div>
        <div className="grid grid-cols-3 gap-x-24 mt-8">
          <span>Women</span>
          <Link to='/women-tshirts' className=" underline text-[#67d2d2]">Tshirts</Link>
          <Link to='/women-joggers' className=" underline text-[#67d2d2]">Joggers</Link>
          <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
          <Link to='/women-tops' className=" underline text-[#67d2d2] ">Tops</Link>
          <Link to='/women-dresses' className=" underline text-[#67d2d2]">Dresses</Link>
        </div>
        <div className="grid grid-cols-3 gap-x-16 mt-8">
          <span>Eplore</span>
          <Link to='/all-products' className=" underline text-[#67d2d2]">All Fashion</Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
