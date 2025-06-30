import React from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../features/user/userSlice";

function MyProfile() {
  const dispatch = useDispatch();

  // const user = useSelector(selectUserInfo);
  const user = {
    "email": "test@test.com",
    "password": "test@1234",
    "role": "admin",
    "addresses": [
      {
        "name": "harsh parmar ",
        "mobileNumber": "8799026842",
        "pincode": "360370",
        "city": "Jetpur",
        "state": "Gujarat",
        "street": "junagadh road",
        "area": "axar park"
      }
    ],
    "id": 1,
    "selectedAddress": {
      "name": "harsh parmar ",
      "mobileNumber": "8799026842",
      "pincode": "360370",
      "city": "Jetpur",
      "state": "Gujarat",
      "street": "junagadh road",
      "area": "axar park"
    }
  }
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className=" font-Montserrat">
      <Navbar />
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-2 mt-24">
          My Profile
        </h1>
        <div className="h-[2px] w-[100px] bg-yellow-400"></div>
      </div>
      <div className=" mx-2 md:mx-8 lg:mx-32 xl:mx-48 max-w-[500px]">
        <form
          className=" flex flex-col w-full"
          onSubmit={handleSubmit((data) => {
            // dispatch()
            reset();
          })}
        >
          <div className=" relative px-2 my-10">
            <label htmlFor="email" className=" absolute text-[10px] text-[#919191] translate-y-[-16px]">E mail</label>
            <input
              type="email"
              {...register("email", {
                required: "E mail is required",
              })}
              id="email"
              placeholder={user.email}
              className=" w-[50%] text-sm border-b-[1px] p-0 border-t-0 border-r-0 border-l-0 border-b-[#ccc] focus:ring-0 focus:border-black outline-none "
            />
          </div>
          <div className=" relative px-2">
            <label htmlFor="password" className=" absolute text-[10px] text-[#919191] translate-y-[-16px]">password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              placeholder="******"
              className=" w-[50%] text-sm border-b-[1px] p-0 border-t-0 border-r-0 border-l-0 border-b-[#ccc] focus:ring-0 focus:border-black outline-none "
            />
          </div>
          <div className=" text-[#51cccc] text-sm mx-2 my-3">
            <span>Change Password</span>
          </div>
          <div className=" flex mt-6 max-w-[80%] gap-5">
            <button
              type="submit"
              value="submit"
              className=" w-full bg-[#51cccc] text-white font-Montserrat py-3 rounded-sm"
            >
              Save Changes
            </button>
            <button
              onClick={() => reset()}
              className=" w-full bg-white text-[#51cccc] font-Montserrat border-[1px] border-[#51cccc] rounded-md"
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
