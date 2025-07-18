import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller } = useSelector((state) => state.seller);

  if (!isSeller) {
    return <Navigate to="/shop-login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
