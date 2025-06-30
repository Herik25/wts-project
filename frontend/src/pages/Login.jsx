import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { BsFacebook, BsGoogle, BsTelephone } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  loginUserAsync,
  selectError,
  selectLoggedInUser,
} from "../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

function Login() {
  const [forgotPass, setForgotPass] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <div className=" hidden flex-col items-center justify-between mt-[60px] bg-gradient-to-t p-6 from-yellow-100 from-10% to-white to-90% md:flex">
          <div>
            <h1 className=" font-Montserrat font-extrabold text-[30px] m-5">
              Welcome to the world of Super Sayan
              <sup className=" text-[18px]">®</sup>!
            </h1>
          </div>
          <div>
            <img
              src="https://images.bewakoof.com/web/group-19-1617704502.png"
              alt="image"
              className=" h-[200px] w-[100%] px-10 md:h-[300px] lg:h-[400px]"
            />
          </div>
        </div>
        <div className=" md:w-1/2">
          {forgotPass && (
            <ForgotPassword
              forgotPass={forgotPass}
              setForgotPass={setForgotPass}
            />
          )}
          <div className=" flex flex-col items-center justify-evenly py-8 h-screen w-full">
            <div>
              <div className=" font-Montserrat font-bold text-lg text-center p-2 md:text-xl lg:text-2xl">
                Log In / Sign Up
              </div>
              <span className=" font-Montserrat font-bold text-sm text-[#a0a0a0] md:text-base lg:text-lg">
                for Latest trends, exciting offers and everything SYN
                <sup className=" text-[12px]">®</sup>!
              </span>
            </div>
            <form
              className=" flex flex-col p-8 items-center max-w-[400px] w-full"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
              })}
            >
              <div className=" mb-3 w-full">
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is requiured",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not valid",
                    },
                  })}
                  id="email"
                  placeholder="example@example.com"
                  className=" border border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                />
                {errors.email && (
                  <p className=" text-rose-500 text-xs mt-1 ml-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className=" w-full">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  placeholder="password"
                  className="border  border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                />
                {error && (
                  <p className=" text-rose-500 text-xs mt-1 ml-2">
                    {error || error.message}
                  </p>
                )}
              </div>
              <div className=" py-2 w-full flex justify-between">
                <Link
                  to="/signup"
                  className="text-[12px] font-poppins text-[#007aff]"
                >
                  Create New?
                </Link>
                <div
                  onClick={() => setForgotPass(true)}
                  className="text-[12px] font-poppins text-[#007aff] cursor-pointer"
                >
                  Forgot Password?
                </div>
              </div>
              <button
                type="submit"
                value="submit"
                className=" w-full px-10 py-5 rounded-md text-white text-lg font-semibold bg-[#007aff]"
              >
                CONTINUE
              </button>
              <div className=" h-[1px] bg-gray-400 w-full mt-4"></div>
            </form>
            <div className="felx flex-col w-[350px] translate-y-[-50px]">
              <button className=" flex items-center w-full bg-white border-[1px] rounded-md border-gray-400 px-8 py-2 text-lg text-[#5c5c5c] ">
                <span>
                  <BsTelephone className=" mr-3" />
                </span>
                Continue with Mobile Number
              </button>
              <div className=" mt-6 flex justify-between ">
                <button className=" flex items-center bg-white border-[1px] rounded-md border-gray-400 px-8 py-2 text-lg text-[#5c5c5c] ">
                  <span>
                    <BsGoogle className=" mr-3" />
                  </span>
                  Google
                </button>
                <button className=" flex items-center bg-white border-[1px] rounded-md border-gray-400 px-8 py-2 text-lg text-[#5c5c5c] ">
                  <span>
                    <BsFacebook className=" mr-3" />
                  </span>
                  Facebook
                </button>
              </div>
            </div>
            <div className=" absolute bottom-4 font-Montserrat text-xs text-gray-400 max-w-[400px] md:relative">
              <p>
                By creating an account or logging in, you agree with Bewakoof®'s{" "}
                <Link to="/terms" className=" text-blue-400">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className=" text-blue-400">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
