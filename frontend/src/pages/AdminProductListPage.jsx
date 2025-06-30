import React from "react";
import Navbar from "../navbar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";

function AdminProductListPage() {
  return (
    <div>
      <Navbar />
      <AdminProductList />
    </div>
  );
}

export default AdminProductListPage;
