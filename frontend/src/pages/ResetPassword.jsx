import React from "react";
import Navbar from "../navbar/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  resetPasswordtAsync,
  selectLoggedInUser,
  selectPasswordReset,
  selectPasswordResetStatus,
} from "../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const passwordReset = useSelector(selectPasswordReset);
  const passwordResetStatus = useSelector(selectPasswordResetStatus);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {email && token ? (
        <>
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
                    Reset Password
                  </div>
                  <span className=" font-Montserrat font-bold text-sm text-[#a0a0a0] md:text-base lg:text-lg">
                    Thanks for being the part of Tribe "SYN
                    <sup className=" text-[12px]">®</sup>!"
                  </span>
                </div>
                <form
                  className=" flex flex-col p-8 items-center max-w-[400px] w-full"
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    dispatch(
                      resetPasswordtAsync({
                        email,
                        token,
                        password: data.password,
                      })
                    );
                  })}
                >
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
                      placeholder="new password"
                      className="  border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
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
                          value === formValues.password ||
                          "Passwords do not match",
                      })}
                      id="confirmPassword"
                      placeholder="confirm new password"
                      className="  border-gray-400 rounded-md outline-none text-lg font-Montserrat p-4 w-full md:text-xl"
                    />
                    {errors.confirmPassword && (
                      <p className=" text-rose-500 text-xs mt-1 ml-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    {passwordReset && (
                      <p className=" text-green-500 text-xs mt-1 ml-2 text-left">
                        Password Changed!
                      </p>
                    )}
                  </div>

                  {passwordReset === "laoding" ? (
                    <button className=" w-full px-10 py-5 rounded-md text-white text-lg font-semibold bg-[#007aff]">
                      <div className=" mx-auto border-4 rounded-full border-l-transparent w-[36px] h-[36px] border-white animate-spin"></div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      value="submit"
                      className=" w-full px-10 py-5 rounded-md text-white text-lg font-semibold bg-[#007aff]"
                    >
                      Reset Password
                    </button>
                  )}
                </form>
                <div className=" absolute bottom-4 font-Montserrat text-xs text-gray-400 max-w-[400px] md:relative">
                  <p>
                    By creating an account or logging in, you agree with
                    Bewakoof®'s{" "}
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
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
}

export default ResetPassword;
