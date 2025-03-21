import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";


import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import GoBackButton from "../components/GoBackButton/goBackButton";

// Page imports
import HomePage from "../pages/HomePage/HomePage.jsx";
import FreelancersPage from "../pages/FreelancersPage/freelancersPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/notFoundPage.jsx";
import LogInPage from "../pages/AuthPage/LogInPage";
import SignUpPage from "../pages/AuthPage/SignUpPage";
import CreateProject from "../pages/CreateProject/createProject.jsx";
import ProjectDetail from "../pages/ProjectDetail/projectDetail.jsx";
import AllProjects from "../pages/AllProjectsPage/allProjects.jsx";

const App = () => {
  // const location = useLocation();
  const isHomePage = location.pathname === "/";
  const {isAuthenticated} = useAuth();
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
      <BrowserRouter>
      <Navbar isTransparent={isHomePage} />
      <Routes>
      <Route 
          path="/" 
          element={isAuthenticated ? <CreateProject/> : <HomePage/>} 
        />
         <Route 
          path="/login" 
          element={isAuthenticated ? <CreateProject/> : <LogInPage/>} 
        />
         <Route 
          path="/signup" 
          element={isAuthenticated ? <CreateProject/> : <SignUpPage/>} 
        />
        <Route
          path="/freelancers"
          element={isAuthenticated ? <FreelancersPage /> : <LogInPage/>}
        />
        <Route
          path="/create-project"
          element={isAuthenticated ? <CreateProject/> :<LogInPage/>}
        />

        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
      </BrowserRouter>
      
    </>
  );
};

export default App;
