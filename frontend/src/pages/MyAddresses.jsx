import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function MyAddresses() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressIndex, setAddressIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(updateUserAsync({ ...user, selectedAddress: selectedAddress }));
  }, [selectedAddress]);

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

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handleEdit = (e, index) => {
    e.preventDefault();
    setAddressIndex(index);
    setFormOpen(true);
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setSelectedAddress(null);
    setFormOpen(!formOpen);
  };

  return (
    <div className=" overflow-hidden">
      <div>
        {formOpen && (
          <AddressForm
            open={formOpen}
            setOpen={setFormOpen}
            selectedAddress={selectedAddress}
            addressIndex={addressIndex}
          />
        )}
      </div>
      {isMobile ? (
        <div className=" flex justify-between items-center h-16 bg-white border-b-[2px] border-b-[#f0f0f0] ">
          <div className=" flex items-center ml-2">
            <div
              onClick={() => navigate(-1)}
              className=" p-3 border-[2px] border-[#f0f0f0] rounded-lg shadow cursor-pointer transition ease-in duration-200 hover:shadow-none hover:text-gray-600"
            >
              <ArrowLeftIcon className=" h-5 w-5" />
            </div>
            <span className=" ml-2 text-base text-[#333] font-Montserrat ">
              My Addresses
            </span>
          </div>
          <Link to="/" className=" mr-2">
            <img src="/logo.png" className="h-11 w-11 p-1" alt="Logo" />
          </Link>
        </div>
      ) : (
        <div className="flex mt-1 pb-3 h-12 w-full items-center justify-between p-2 border-b-[1px] border-[#ccc]">
          <Link
            to="/"
            className=" flex items-center md:mx-12 lg:mx-36 xl:mx-52 "
          >
            <img src="/logo.png" className="h-10 w-10 p-1" alt="Logo" />
            <div className="font-BungeeSpice text-2xl mt-0 pl-2 translate-y-[1px] lg:text-4xl">
              SYN
            </div>
          </Link>
          <div className=" flex flex-col items-start md:mx-12 lg:mx-36 xl:mx-52">
            <div className=" text-[10px] font-Montserrat font-bold text-[#333] opacity-50">
              Signed as
            </div>
            <div className="text-md font-karala font-semibold text-[#333]">
              {user?.email}
            </div>
          </div>
        </div>
      )}
      {isMobile ? (
        <div className=" w-full bg-[#f7f7f7]">
          <div className=" bg-white">
            <button
              onClick={(e) => handleAddAddress(e)}
              className=" w-[90%] text-[#42a2a2] font-Montserrat text-sm font-bold rounded-md border-[1px] border-[#42a2a2] p-x3 py-3 bg-white my-4 mx-6"
            >
              ADD ADDRESS
            </button>
          </div>
          <div className=" font-bold text-xs my-4 mx-5 font-Montserrat">
            OTHER ADDRESSES
          </div>
          <form className=" bg-white h-full w-full overflow-hidden">
            <ul role="list" className=" divide-y divide-gray-100 px-4">
              {user.addresses.map((address, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-3">
                  <div className="flex min-w-[95%] gap-x-3">
                    <input
                      onChange={handleAddress}
                      value={index}
                      id="address"
                      name="address"
                      type="radio"
                      className="h-4 w-4 mt-1 border-gray-300 text-black focus:ring-black"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className=" font-bold text-sm leading-6 text-[#333]">
                        {address?.name}
                      </p>
                      <div className="mt-2 truncate text-xs font-medium text-black">
                        <div>
                          {address?.street}, {address?.area}
                        </div>
                        <div>
                          {address?.city}, {address?.state}, {address?.pincode}
                        </div>
                      </div>
                      <div className=" mt-2 text-xs">
                        <div>
                          Mobile:{" "}
                          <span className=" font-bold font-Krala text-[13px]">
                            {address?.mobileNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-between items-center mt-16">
                      <div
                        onClick={(e) => selectedAddress && handleEdit(e, index)}
                        className=" font-Krala font-bold text-sm text-[#42a2a2] cursor-pointer"
                      >
                        EDIT
                      </div>
                      <div className=" w-[2px] bg-[#ccc] h-4 mx-5"></div>
                      <div
                        onClick={(e) => handleRemove(e, index)}
                        className=" font-Krala font-bold text-sm text-[#42a2a2] cursor-pointer"
                      >
                        REMOVE
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/checkout">
              <div
                type="submit"
                value="submit"
                className=" absolute bottom-0 left-0 w-full text-center text-white font-Montserrat text-base font-bold py-3 bg-[#42a2a2]"
              >
                CONFIRM
              </div>
            </Link>
          </form>
        </div>
      ) : (
        <div className=" flex flex-col font-Montserrat mt-12 md:mx-12 lg:mx-36 xl:mx-52">
          <div className=" font-bold text-[16px]">My Addresses</div>
          <div className=" grid grid-cols-[6fr_4fr] gap-5 mt-5">
            <div className=" border-[1px] border-[#ccc] ">
              <div className=" bg-[#f7f7f7] text-[11px] font-bold py-2 px-4">
                OTHER ADDRESSES
              </div>
              <form className=" px-4">
                <ul role="list" className=" divide-y divide-gray-100">
                  {user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-3"
                    >
                      <div className="flex min-w-[95%] gap-x-3">
                        <input
                          onChange={handleAddress}
                          value={index}
                          id="address"
                          name="address"
                          type="radio"
                          className="h-4 w-4 mt-1 border-gray-300 text-black focus:ring-black"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className=" font-bold text-sm leading-6 text-[#333]">
                            {address?.name}
                          </p>
                          <div className="mt-2 truncate text-xs font-medium text-black">
                            <div>
                              {address?.street}, {address?.area}
                            </div>
                            <div>
                              {address?.city}, {address?.state}, {address?.pincode}
                            </div>
                          </div>
                          <div className=" mt-2 text-xs">
                            <div>
                              Mobile:{" "}
                              <span className=" font-bold font-Krala text-[13px]">
                                {address.mobileNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className=" flex justify-between items-center mt-16">
                          <div
                            onClick={(e) =>
                              selectedAddress && handleEdit(e, index)
                            }
                            className=" font-Krala font-bold text-sm text-[#42a2a2] cursor-pointer"
                          >
                            EDIT
                          </div>
                          <div className=" w-[2px] bg-[#ccc] h-4 mx-5"></div>
                          <div
                            onClick={(e) => handleRemove(e, index)}
                            className=" font-Krala font-bold text-sm text-[#42a2a2] cursor-pointer"
                          >
                            REMOVE
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/checkout">
                  <div
                    type="submit"
                    value="submit"
                    className=" w-[50%] text-center text-white font-Montserrat text-base font-bold rounded-md p-x3 py-3 bg-[#42a2a2] my-4 mx-6"
                  >
                    CONFIRM
                  </div>
                </Link>
              </form>
            </div>
            <div>
              <button
                onClick={(e) => handleAddAddress(e)}
                className=" w-full text-[#42a2a2] font-Montserrat text-sm font-bold rounded-md border-[1px] border-[#42a2a2] p-x3 py-3 bg-white my-4 mx-6"
              >
                ADD ADDRESS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAddresses;
