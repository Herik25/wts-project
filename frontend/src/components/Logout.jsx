import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync, selectLoggedInUser } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);

  useEffect(() => {
    dispatch(logOutAsync());
    window.location.reload();
  }, []);

  return (
    <>
      {!user && <Navigate to="/" replace={true}></Navigate>}
      <Home />
    </>
  );
}

export default Logout;
