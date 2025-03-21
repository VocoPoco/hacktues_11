import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";

// Page imports
import HomePage from "../pages/HomePage/HomePage.jsx";
import FreelancersPage from "../pages/FreelancersPage/freelancersPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/notFoundPage.jsx";
import LogInPage from "../pages/AuthPage/LogInPage";
import SignUpPage from "../pages/AuthPage/SignUpPage";
import CreateProject from "../pages/CreateProject/createProject.jsx";
import ProjectsList from "../pages/ProjectsList/projectsList.jsx";
import ProjectDetail from "../pages/ProjectDetail/projectDetail.jsx";

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
    { path: "/freelancers", component: FreelancersPage },
    { path: "/login", component: LogInPage },
    { path: "/signup", component: SignUpPage },
    { path: "/create-project", component: CreateProject },
    { path: "/projects", component: ProjectsList },
    { path: "/project/:id", component: ProjectDetail },
  ];

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
        style={{ top: "80px", zIndex: 9999 }}
        toastStyle={{
          background: "#f9f9f9",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "4px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      />

      <div key={location.pathname}>
        <Routes location={location}>
          {routes.map(({ path, component: Component }) => {
            if (path === "/" || path === "/login" || path === "/signup") {
              return <Route key={path} path={path} element={<Component />} />;
            }
            return (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <Navbar isTransparent={path === "/"} />
                    <div style={{ paddingTop: "80px" }}>
                      <Component />
                    </div>
                    <Footer />
                  </>
                }
              />
            );
          })}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <>
                  <Navbar />
                  <div style={{ paddingTop: "80px" }}>
                    <Routes>
                      <Route path="dashboard" element={<div>Admin Dashboard</div>} />
                      <Route path="create-a-product" element={<div>Create a Product</div>} />
                    </Routes>
                  </div>
                  <Footer />
                </>
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
