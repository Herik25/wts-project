import React from "react";
import Navbar from "../navbar/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  selectLoggedInUser,
} from "../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);

  return (
    <>
      {user && (window.location = "/login")}
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
        <div className=" w-full md:w-1/2">
          <div className=" flex flex-col items-center justify-evenly py-8 h-screen w-full">
            <div>
              <div className=" font-Montserrat font-bold text-lg text-center p-2 md:text-xl lg:text-2xl">
                Sign Up
              </div>
              <span className=" font-Montserrat font-bold text-sm text-[#a0a0a0] md:text-base lg:text-lg">
                Thanks for being the part of Tribe "SYN
                <sup className=" text-[12px]">®</sup>!"
              </span>
            </div>
            <form
              className=" flex flex-col p-8 items-center max-w-[400px] w-full"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
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
                  className="border border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                />
                {errors.email && (
                  <p className=" text-rose-500 text-xs mt-1 ml-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className=" mb-3 w-full">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/gi,
                      message:
                        "7+ characters with at least 1 lowercase, 1 uppercase, and 1 special character",
                    },
                  })}
                  id="password"
                  placeholder="password"
                  className="border  border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                />
                {errors.password && (
                  <p className=" text-rose-500 text-xs mt-1 ml-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className=" mb-5 w-full">
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  id="confirmPassword"
                  placeholder="confirm password"
                  className="border  border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                />
                {errors.confirmPassword && (
                  <p className=" text-rose-500 text-xs mt-1 ml-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                value="submit"
                className=" w-full px-10 py-5 rounded-md text-white text-lg font-semibold bg-[#007aff]"
              >
                CONTINUE
              </button>
            </form>
            <div className=" absolute bottom-4 font-Montserrat text-xs text-gray-400 max-w-[400px] md:relative">
              <p>
                By creating an account or logging in, you agree with Bewakoof®'s{" "}
                <Link href="/terms" className=" text-blue-400">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className=" text-blue-400">
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

export default SignUp;
