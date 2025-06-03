import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  HomePage,
  ActivationPage,
  ProfilePage,
  ProductsPage,
  BlueLight,
  CheckoutPage,
  PaymentPage,
  ProductDetailsPage,
  OrderSuccessPage,
  TrackOrderPage,
  OrderDetailsPage,
  EventsPage,
  Apartments,
  Services,
  AppointmentForm,
  WhyUs,
  Careers,
  BlogPage,
} from "./routes/Routes";

import {
  SellerActivationPage,
  ShopAllBlogs,
  ShopAllBookings,
  ShopAllCoupouns,
  ShopAllEvents,
  ShopAllMessages,
  ShopAllProducts,
  ShopCreateBlog,
  ShopCreateEvents,
  ShopCreateProduct,
  ShopDashboardPage,
  ShopHomePage,
  ShopOrderDetails,
  ShopSettingsPage,
} from "./routes/ShopRoutes";

import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

import ShopCreatePage from "./pages/ShopCreatePage";
import ShopLoginPage from "./pages/ShopLoginPage";
import ContactPage from "./pages/ContactPage";

import Loader from "./components/Loader/Loader";
import { loadUser } from "./redux/actions/user";
import { loadSeller } from "./redux/actions/seller";
import About from "./pages/About";

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/listings" element={<ProductsPage />} />
        <Route path="/apartment" element={<Apartments />} />
        <Route path="/services" element={<Services />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/blue-light-glasses" element={<BlueLight />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-bookings"
          element={
            <SellerProtectedRoute>
              <ShopAllBookings />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-listings"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-blog"
          element={
            <SellerProtectedRoute>
              <ShopCreateBlog />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-blogs"
          element={
            <SellerProtectedRoute>
              <ShopAllBlogs />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-listing"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopAllMessages />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <>
      <AppContent />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
