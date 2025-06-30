import React, { useEffect } from "react";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import MenProducts from "./pages/MenProducts";
import WomenProducts from "./pages/WomenProducts";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductListPage from "./pages/AdminProductListPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductForm from "./features/admin/components/AdminProductForm";
import AdminProductEditForm from "./features/admin/components/AdminProductEditForm";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Logout from "./components/Logout";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductEditForm />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/all-products",
    element: <Products />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/all-products/productdetail/:id",
    element: <ProductDetail />,
  },
  {
    path: "/men-products",
    element: <MenProducts />,
  },
  {
    path: "/women-products",
    element: <WomenProducts />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return <div>{userChecked && <RouterProvider router={router} />}</div>;
}

export default App;
