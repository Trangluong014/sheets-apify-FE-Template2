import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import CheckoutCompletedPage from "../pages/CheckoutCompletedPage";
import CheckoutPage from "../pages/CheckoutPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<DetailPage />} />
        <Route
          path="checkout"
          element={
            <AuthRequire>
              <CheckoutPage />
            </AuthRequire>
          }
        />
        <Route
          path="checkout/completed"
          element={
            <AuthRequire>
              <CheckoutCompletedPage />
            </AuthRequire>
          }
        />
        <Route
          path="orders"
          element={
            <AuthRequire>
              <OrderPage />
            </AuthRequire>
          }
        />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
