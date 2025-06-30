import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/user/userSlice";
import {
  resetPasswordRequestAsync,
  selectMailSent,
  selectMailStatus,
} from "../features/auth/authSlice";

function ForgotPassword({ forgotPass, setForgotPass }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);
  const mailSent = useSelector(selectMailSent);
  const mailStatus = useSelector(selectMailStatus);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setForgotPass(false);
  };

  return (
    <>
      {forgotPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-500 bg-opacity-75">
          <div className="relative w-[380px] max-w-3xl px-8 pt-4 bg-white shadow-xl transform transition-all">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="relative rounded-md text-black font-bold hover:text-gray-500"
                onClick={closeModal}
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className=" overflow-y-auto">
              <div className=" text-lg leading-6 text-black font-bold font-Montserrat text-center">
                Forgot Password
              </div>
              <div className="mt-4 text-center">
                <div className=" text-sm font-Montserrat opacity-70">
                  Please enter your Email Id to receive
                  <br /> a reset password link
                </div>
                <form
                  onSubmit={handleSubmit((data) => {
                    dispatch(resetPasswordRequestAsync(data.email));
                    // console.log(data);
                  })}
                  className=" mt-12 "
                >
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
                    placeholder="Email Id"
                    className=" w-full font-Montserrat text-sm border-b-[1px] p-0 py-1 border-t-0 border-r-0 border-l-0 border-b-[#ccc] focus:ring-0 focus:border-black outline-none "
                  />
                  {errors.email && (
                    <p className=" text-rose-500 text-xs mt-1 ml-2 text-left">
                      {errors.email.message}
                    </p>
                  )}
                  {mailSent && (
                    <p className=" text-green-500 text-xs mt-1 ml-2 text-left">
                      Mail sent
                    </p>
                  )}
                  <button className=" w-full my-3">
                    {mailStatus === "loading" ? (
                      <div className=" w-full text-white font-Montserrat text-xl font-bold rounded-md py-3 bg-[#42a2a2]">
                        <div className=" mx-auto border-4 rounded-full border-l-transparent w-[36px] h-[36px] border-white animate-spin"></div>
                      </div>
                    ) : (
                      <div className=" w-full text-white font-Montserrat text-xl font-bold rounded-md py-3 bg-[#42a2a2]">
                        Submit
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
