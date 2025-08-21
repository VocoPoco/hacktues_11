// App.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import ErrorBoundary from "../components/ErrorBoundary";

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
  LandingPageLayout,
  ComponentViewer,
  PresentationMode,
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

const getRandomIndex = (key) => {
  try {
    return Math.floor(Math.random() * (layoutSets[key]?.length || 1));
  } catch (error) {
    console.error('Error getting random index:', error);
    return 0;
  }
};

function useLayoutSwitcher() {
  const [locked, setLocked] = useState({});
  const [overrides, setOverrides] = useState({});
  const [seed, setSeed] = useState(0);
  const [sectionIndices, setSectionIndices] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getLayout = useCallback((key) => {
    try {
      const idx = locked[key] ?? overrides[key] ?? getRandomIndex(key);
      return layoutSets[key]?.[idx] || null;
    } catch (error) {
      console.error('Error getting layout:', error);
      return null;
    }
  }, [locked, overrides]);



  const overrideLayout = useCallback((key, index) => {
    setOverrides((prev) => ({ ...prev, [key]: index }));
  }, []);

  const rerollLayouts = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setSeed(Math.random());
    setTimeout(() => setIsLoading(false), 100);
  }, [isLoading]);

  const rerollSection = useCallback((sectionKey, specificIndex = null) => {
    if (isLoading) return;
    setIsLoading(true);
    
    setSectionIndices((prev) => ({
      ...prev,
      [sectionKey]: specificIndex !== null ? specificIndex : getRandomIndex(sectionKey)
    }));
    
    setTimeout(() => setIsLoading(false), 100);
  }, [isLoading]);

  const toggleSectionLock = useCallback((sectionKey) => {
    if (isLoading) return;
    
    console.log('Toggling lock for section:', sectionKey, 'Current indices:', sectionIndices);
    setLocked((prev) => {
      const currentIndex = sectionIndices[sectionKey] || 0;
      const newLocked = prev[sectionKey] ? null : currentIndex;
      console.log('Setting lock for', sectionKey, 'to:', newLocked);
      return {
        ...prev,
        [sectionKey]: newLocked
      };
    });
  }, [sectionIndices, isLoading]);

  return { 
    getLayout, 
    overrideLayout, 
    locked, 
    rerollLayouts, 
    rerollSection,
    toggleSectionLock,
    sectionIndices,
    seed,
    isLoading
  };
}

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading, error: authError } = useAuth();
  const { 
    getLayout, 
    locked, 
    rerollLayouts, 
    rerollSection,
    toggleSectionLock,
    sectionIndices,
    seed,
    isLoading
  } = useLayoutSwitcher();
  const isVisible = useScrollVisibility();
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef(null);

  const [generatorMode, setGeneratorMode] = useState(() => {
    try {
      return localStorage.getItem("generatorMode") === "true";
    } catch (error) {
      console.error('Error reading generatorMode from localStorage:', error);
      return false;
    }
  });

  const [sidebarLocked, setSidebarLocked] = useState(() => {
    try {
      return localStorage.getItem("sidebarLocked") === "true";
    } catch (error) {
      console.error('Error reading sidebarLocked from localStorage:', error);
      return false;
    }
  });

  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sectionClickHandler, setSectionClickHandler] = useState(null);
  const [showComponentViewer, setShowComponentViewer] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSectionProgress, setShowSectionProgress] = useState(false);
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] = useState(true);
  const [showPresentationMode, setShowPresentationMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleSidebarHover = (event) => {
      if (!sidebarLocked) {
        setSidebarHovered(event.detail.hovered);
      }
    };

    window.addEventListener('sidebarHover', handleSidebarHover);
    return () => {
      window.removeEventListener('sidebarHover', handleSidebarHover);
    };
  }, [sidebarLocked]);

  const toggleGeneratorMode = useCallback(() => {
    setGeneratorMode((prev) => {
      const newMode = !prev;
      try {
        localStorage.setItem("generatorMode", newMode.toString());
      } catch (error) {
        console.error('Error saving generatorMode to localStorage:', error);
      }
      navigate("/");
      return newMode;
    });
  }, [navigate]);

  const toggleSidebarLock = useCallback(() => {
    setSidebarLocked((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem("sidebarLocked", newState.toString());
      } catch (error) {
        console.error('Error saving sidebarLocked to localStorage:', error);
      }
      return newState;
    });
  }, []);

  const handleSidebarMouseEnter = useCallback(() => {
    if (!sidebarLocked) {
      setSidebarHovered(true);
    }
  }, [sidebarLocked]);

  const handleSidebarMouseLeave = useCallback(() => {
    if (!sidebarLocked) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setSidebarHovered(false);
      }, 100);
    }
  }, [sidebarLocked]);

  const currentMode = generatorMode ? "generate" : null;
  // In Business mode, hide sidebar by default, only show when locked or hovered
  // In other modes, show sidebar when locked or hovered
  const sidebarVisible = sidebarLocked || sidebarHovered;

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
    [getLayout]
  );

  // Enhanced keyboard shortcuts
  const handleKeyPress = useCallback((e) => {
    if (!keyboardShortcutsEnabled) return;
    
    try {
      // Ctrl/Cmd + K to toggle generator mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleGeneratorMode();
      }
      
      // Ctrl/Cmd + L to toggle sidebar lock
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggleSidebarLock();
      }
      
      // Ctrl/Cmd + V to toggle component viewer
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        setShowComponentViewer(prev => !prev);
      }
      
      // Ctrl/Cmd + P to toggle presentation mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setShowPresentationMode(prev => !prev);
      }
      
      // Escape to exit modes
      if (e.key === 'Escape') {
        if (showComponentViewer) {
          setShowComponentViewer(false);
        } else if (showPresentationMode) {
          setShowPresentationMode(false);
        }
      }
    } catch (error) {
      console.error('Error handling keyboard shortcut:', error);
    }
  }, [keyboardShortcutsEnabled, toggleGeneratorMode, toggleSidebarLock, showComponentViewer, showPresentationMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Section progress calculation
  const sectionProgress = useMemo(() => {
    if (!generatorMode) return null;
    
    const totalSections = Object.keys(layoutComponents).length;
    const lockedSections = Object.values(locked).filter(Boolean).length;
    const progress = (lockedSections / totalSections) * 100;
    
    return {
      total: totalSections,
      locked: lockedSections,
      unlocked: totalSections - lockedSections,
      percentage: Math.round(progress)
    };
  }, [generatorMode, locked, layoutComponents]);

  if (isAuthLoading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
            Authentication Error
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            {authError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarVisible ? "ml-0 md:ml-64" : "ml-0"
      } pl-4 pr-6 py-6 bg-bg-primary text-text-primary`}
    >
      {/* Hover area for sidebar */}
      {/* Show hover area when sidebar is not locked */}
      {!sidebarLocked && (
        <div 
          className="fixed top-0 left-0 w-4 h-full z-30"
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              if (!sidebarHovered) {
                setSidebarHovered(false);
              }
            }, 150);
          }}
        />
      )}

      {/* Business Mode Hover Indicator */}
      {generatorMode && !sidebarLocked && (
        <div className="business-mode-hover-indicator" />
      )}

      {/* Section Progress Indicator */}
      {generatorMode && showSectionProgress && sectionProgress && (
        <div className="fixed top-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 z-50">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Sections Progress
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {sectionProgress.locked}/{sectionProgress.total} locked
              </div>
            </div>
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-slate-700 dark:text-slate-300"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${sectionProgress.percentage}, 100`}
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {sectionProgress.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {generatorMode && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 z-50">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <div className="font-medium mb-1">Keyboard Shortcuts:</div>
            <div>Ctrl+K: Toggle Mode</div>
            <div>Ctrl+L: Lock Sidebar</div>
            <div>Ctrl+V: Component Viewer</div>
            <div>Ctrl+P: Presentation Mode</div>
            <div>ESC: Exit Modes</div>
          </div>
        </div>
      )}

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

      <Navbar
        mode={currentMode}
        toggleGeneratorMode={toggleGeneratorMode}
        sidebarVisible={sidebarVisible}
        sidebarLocked={sidebarLocked}
        toggleSidebarLock={toggleSidebarLock}
        onSectionClick={sectionClickHandler}
        onToggleComponentViewer={() => setShowComponentViewer(!showComponentViewer)}
        showComponentViewer={showComponentViewer}
        activeSection={activeSection}
        onToggleProgress={() => setShowSectionProgress(prev => !prev)}
      />

      {currentMode === "generate" && (
        <div className="fixed top-24 right-6 z-50">
          <button
            className={`accent-button font-cormorant ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={rerollLayouts}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      <main className={location.pathname === "/" ? "" : "mt-16"}>
        <Routes>
          <Route
            path="/"
            element={
              generatorMode ? (
                showComponentViewer ? (
                  <ErrorBoundary>
                    <ComponentViewer
                      lockedSections={locked}
                      onToggleLock={toggleSectionLock}
                      rerollSection={rerollSection}
                      currentSectionIndices={sectionIndices}
                      onSectionClick={setSectionClickHandler}
                      onSectionChange={setActiveSection}
                    />
                  </ErrorBoundary>
                ) : (
                  <ErrorBoundary>
                    <LandingPageLayout
                      lockedSections={locked}
                      onToggleLock={toggleSectionLock}
                      rerollSection={rerollSection}
                      currentSectionIndices={sectionIndices}
                      onSectionClick={setSectionClickHandler}
                      onSectionChange={setActiveSection}
                    />
                  </ErrorBoundary>
                )
              ) : isAuthenticated ? (
                <ErrorBoundary>
                  <MainPage />
                </ErrorBoundary>
              ) : (
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
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
                <ErrorBoundary>
                  <layoutComponents.PricingComponent />
                </ErrorBoundary>
              )
            }
          />
          <Route
            path="/generate"
            element={
              layoutComponents.GenerateComponent && (
                <ErrorBoundary>
                  <layoutComponents.GenerateComponent />
                </ErrorBoundary>
              )
            }
          />
          <Route
            path="/custom"
            element={
              layoutComponents.CustomComponent && (
                <ErrorBoundary>
                  <layoutComponents.CustomComponent />
                </ErrorBoundary>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              layoutComponents.DashboardComponent && (
                <ErrorBoundary>
                  <layoutComponents.DashboardComponent />
                </ErrorBoundary>
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
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
