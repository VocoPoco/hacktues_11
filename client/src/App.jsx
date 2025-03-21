// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
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
import ProjectDetail from "../pages/ProjectDetail/projectDetail.jsx";
import AllProjects from "../pages/AllProjectsPage/allProjects.jsx"

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
    { path: "/projects", component: AllProjects },
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
            // Do not wrap HomePage, LogInPage, and SignUpPage with Navbar and Footer.
            if (path === "/" || path === "/login" || path === "/signup") {
              return <Route key={path} path={path} element={<Component />} />;
            }
            return (
              <Route
                key={path}
                path={path}
                element={
                  <main>
                    <Navbar isTransparent={path === "/"} />
                    <Component />
                    <Footer />
                  </main>
                }
              />
            );
          })}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <main>
                  <Navbar />
                  <Routes>
                    <Route path="dashboard" element={<div>Admin Dashboard</div>} />
                    <Route path="create-a-product" element={<div>Create a Product</div>} />
                  </Routes>
                  <Footer />
                </main>
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
