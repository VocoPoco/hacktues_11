import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ScrollToTop from "../components/ScrollToTop";  // Import ScrollToTop

import HomePage from "../pages/HomePage/HomePage.jsx";
import ServicePage from "../pages/ServicePage/servicePage.jsx";
import NotFoundPage from "../pages/NotFoundPage/notFoundPage.jsx";
import LogInPage from "../pages/AuthPage/LogInPage";
import SignUpPage from "../pages/AuthPage/SignUpPage";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      const userRole = user.role?.trim().toUpperCase();
      setIsAuthorized(["ADMIN", "ROOT_ADMIN"].includes(userRole));
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (isAuthorized === false) return <Navigate to="/" replace />;
  if (isAuthorized) return children;

  return <div>Verifying permissions...</div>;
};

const App = () => {
  const location = useLocation();

  const routes = [
    { path: "/", component: HomePage },
    { path: "/product/:productId", component: ServicePage },
    { path: "/login", component: LogInPage },
    { path: "/signup", component: SignUpPage },
  ];

  const isValidRoute = routes.some((route) =>
    matchPath({ path: route.path, end: true }, location.pathname)
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
        style={{
          top: "120px",
          zIndex: 9999,
        }}
        toastStyle={{
          background: "#f9f9f9",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "500",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      {isValidRoute}  {/* This will ensure the page scrolls to top */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, component: Component }, index) => (
            <Route
              key={path || index}
              path={path}
              element={
                <main>
                  <Navbar />
                  <Component />
                  <Footer />
                </main>
              }
            />
          ))}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Navbar />
                <Routes>
                  <Route path="dashboard" element={<div>Admin Dashboard</div>} />
                  <Route path="create-a-product" element={<div>Create a Product</div>} />
                </Routes>
                <Footer />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </>
  );
};

export default App;
