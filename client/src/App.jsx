// App.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";
import { useScrollVisibility } from "./hooks/useScrollVisibility";

// Components
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";

// Pages
import HomePage from "../pages/HomePage/HomePage.jsx";
import FreelancersPage from "../pages/FreelancersPage/freelancersPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/notFoundPage.jsx";
import LogInPage from "../pages/AuthPage/LogInPage";
import SignUpPage from "../pages/AuthPage/SignUpPage";
import CreateProject from "../pages/CreateProject/createProject.jsx";
import ProjectDetail from "../pages/ProjectDetail/projectDetail.jsx";
import AllProjects from "../pages/AllProjectsPage/allProjects.jsx";
import MainPage from "../pages/MainPage/mainpage.jsx";
import Subtasks from "../pages/SubtasksPage/subtasksPage.jsx";

// Layouts
import {
  HomeLayouts,
  PricingLayouts,
  GenerateLayouts,
  CustomLayouts,
  DashboardLayouts,
  HeaderLayouts,
  FooterLayouts,
} from "./layouts";

const layoutSets = {
  home: HomeLayouts,
  pricing: PricingLayouts,
  generate: GenerateLayouts,
  custom: CustomLayouts,
  dashboard: DashboardLayouts,
  headers: HeaderLayouts,
  footers: FooterLayouts,
};

const getRandomIndex = (key) =>
  Math.floor(Math.random() * layoutSets[key].length);

function useLayoutSwitcher() {
  const [locked, setLocked] = useState({});
  const [overrides, setOverrides] = useState({});
  const [seed, setSeed] = useState(0);

  const getLayout = (key) => {
    const idx = locked[key] ?? overrides[key] ?? getRandomIndex(key);
    return layoutSets[key][idx];
  };

  const lockLayout = (key, index) =>
    setLocked((prev) => ({ ...prev, [key]: index }));
  const overrideLayout = (key, index) =>
    setOverrides((prev) => ({ ...prev, [key]: index }));
  const rerollLayouts = () => setSeed(Math.random());

  return { getLayout, lockLayout, overrideLayout, locked, rerollLayouts, seed };
}

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading } = useAuth();
  const { getLayout, locked, rerollLayouts, lockLayout, seed } =
    useLayoutSwitcher();
  const isVisible = useScrollVisibility();
  const [isMounted, setIsMounted] = useState(false);

  const [generatorMode, setGeneratorMode] = useState(() => {
    return localStorage.getItem("generatorMode") === "true";
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleGeneratorMode = () => {
    setGeneratorMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("generatorMode", newMode.toString());
      navigate("/", { replace: true });
      return newMode;
    });
  };

  const currentMode = generatorMode ? "generate" : null;
  const showNavbar = !(generatorMode && !isAuthenticated && location.pathname === "/");

  const layoutComponents = useMemo(
    () => ({
      HomeComponent: getLayout("home"),
      PricingComponent: getLayout("pricing"),
      GenerateComponent: getLayout("generate"),
      CustomComponent: getLayout("custom"),
      DashboardComponent: getLayout("dashboard"),
      HeaderComponent: getLayout("headers"),
      FooterComponent: getLayout("footers"),
    }),
    [locked, seed]
  );

  if (isAuthLoading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
        style={{ top: "80px" }}
        toastStyle={{
          background: "var(--toast-bg)",
          color: "var(--toast-text)",
          border: "1px solid var(--toast-border)",
          borderRadius: "4px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      />

      {currentMode === "generate" && (
        <header>
          {layoutComponents.HeaderComponent && (
            <layoutComponents.HeaderComponent isVisible={isVisible} />
          )}
        </header>
      )}

      {showNavbar && (
        <Navbar
          mode={currentMode}
          lockLayout={lockLayout}
          toggleGeneratorMode={toggleGeneratorMode}
        />
      )}

      {currentMode === "generate" && (
        <div className="fixed top-24 right-6 z-50">
          <button
            className="accent-button font-cormorant"
            onClick={rerollLayouts}
          >
            Generate New Layout
          </button>
        </div>
      )}

      <main className={`flex-grow transition-all duration-300 ${
        showNavbar ? 'mt-16' : ''
      } ${location.pathname === "/" ? "px-4" : "pl-4 pr-6 md:pl-72"} py-6`}>
        <Routes>
          <Route
            path="/"
            element={
              generatorMode ? (
                <div className="h-full">
                  {layoutComponents.HomeComponent && (
                    <layoutComponents.HomeComponent />
                  )}
                </div>
              ) : isAuthenticated ? (
                <MainPage />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <MainPage /> : <LogInPage />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <MainPage /> : <SignUpPage />}
          />
          <Route
            path="/main-page"
            element={isAuthenticated ? <MainPage /> : <LogInPage />}
          />
          <Route
            path="/freelancers"
            element={isAuthenticated ? <FreelancersPage /> : <LogInPage />}
          />
          <Route
            path="/all-projects"
            element={isAuthenticated ? <AllProjects /> : <LogInPage />}
          />
          <Route
            path="/create-project"
            element={isAuthenticated ? <CreateProject /> : <LogInPage />}
          />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/subtasks" element={<Subtasks />} />
          <Route
            path="/pricing"
            element={
              layoutComponents.PricingComponent && (
                <layoutComponents.PricingComponent />
              )
            }
          />
          <Route
            path="/generate"
            element={
              layoutComponents.GenerateComponent && (
                <layoutComponents.GenerateComponent />
              )
            }
          />
          <Route
            path="/custom"
            element={
              layoutComponents.CustomComponent && (
                <layoutComponents.CustomComponent />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              layoutComponents.DashboardComponent && (
                <layoutComponents.DashboardComponent />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {currentMode === "generate" ? (
        <footer>
          {layoutComponents.FooterComponent && (
            <layoutComponents.FooterComponent />
          )}
        </footer>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}