// src/App.js

import React from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
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
import AllProjects from "../pages/AllProjectsPage/allProjects.jsx";
import MainPage from "../pages/MainPage/mainPage.jsx";
import Subtasks from "../pages/SubtasksPage/subtasksPage.jsx";

const App = () => {
  const location = useLocation();
  const { isAuthenticated, isAuthLoading } = useAuth();
  const isHomePage = location.pathname === "/";

  if (isAuthLoading) return <div>Loading...</div>;

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
      <Navbar isTransparent={isHomePage} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <MainPage /> : <HomePage />} />
        <Route path="/login" element={isAuthenticated ? <MainPage /> : <LogInPage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/signup" element={isAuthenticated ? <MainPage /> : <SignUpPage />} />
        <Route path="/main-page" element={isAuthenticated ? <MainPage /> : <LogInPage />} />
        <Route path="/freelancers" element={isAuthenticated ? <FreelancersPage /> : <LogInPage />} />
        <Route path="/all-projects" element={isAuthenticated ? < AllProjects/> : <LogInPage />} />
        <Route path="/create-project" element={isAuthenticated ? <CreateProject /> : <LogInPage />} />
        <Route path="/subtasks" element={isAuthenticated ? <SubtasksPage /> : <LogIn/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
