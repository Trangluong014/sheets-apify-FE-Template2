import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import CheckoutCompletedPage from "../pages/CheckoutCompletedPage";
import CheckoutPage from "../pages/CheckoutPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import RegisterPage from "../pages/RegisterPage";

function Router() {
  return (
    <Routes>
      <Route path="/:websiteId" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/:websiteId/home" element={<HomePage />} />
        <Route path="/:websiteId/products/:rowIndex" element={<DetailPage />} />
        <Route path="/:websiteId/checkout" element={<CheckoutPage />} />
        <Route
          path="/:websiteId/checkout/completed"
          element={<CheckoutCompletedPage />}
        />
        <Route path="/:websiteId/orders" element={<OrderPage />} />
      </Route>
      <Route path="/:websiteId" element={<BlankLayout />}>
        <Route path="/:websiteId/login" element={<LoginPage />} />
        <Route path="/:websiteId/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
