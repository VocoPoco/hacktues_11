import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { HomeLayouts, PricingLayouts, GenerateLayouts, DashboardLayouts, HeaderLayouts, FooterLayouts } from './index';
import { IconPencil, IconGrid, IconClipboard, IconFolder, IconKey, IconUserPlus, IconLogOut, IconEye, IconPalette, IconDownload } from '../../components/Navbar/NavIcons';
import ExportManager from './ExportManager';

// Lock Icon Component
const LockIcon = ({ isLocked, onClick, className = "" }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      try {
        onClick();
      } catch (error) {
        console.error('Lock icon click error:', error);
      }
    }
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-lg transition-all duration-200 ${className} ${
        isLocked 
          ? 'bg-slate-700 text-white hover:bg-slate-600' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
      title={isLocked ? "Unlock Section" : "Lock Section"}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isLocked ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        )}
      </svg>
    </button>
  );
};

const LandingPageLayout = ({ 
  lockedSections = {}, 
  onToggleLock, 
  rerollSection,
  currentSectionIndices = {},
  onSectionClick,
  onSectionChange
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const [error, setError] = useState(null);
  const [showExportManager, setShowExportManager] = useState(false);
  const [layoutData, setLayoutData] = useState({});
  const sectionRefs = useRef({});
  const scrollTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  const sections = useMemo(() => ({
    home: HomeLayouts,
    pricing: PricingLayouts,
    generate: GenerateLayouts,
    dashboard: DashboardLayouts,
    headers: HeaderLayouts,
    footers: FooterLayouts,
  }), []);

  const getCurrentComponent = useCallback((sectionKey) => {
    try {
      const sectionArray = sections[sectionKey];
      if (!sectionArray || !Array.isArray(sectionArray)) {
        console.warn(`Section array not found or invalid for key: ${sectionKey}`);
        return null;
      }
      const currentIndex = currentSectionIndices[sectionKey] || 0;
      const component = sectionArray[currentIndex];
      if (!component) {
        console.warn(`Component not found at index ${currentIndex} for section: ${sectionKey}`);
        return null;
      }
      return component;
    } catch (error) {
      console.error('Error getting current component:', error);
      return null;
    }
  }, [sections, currentSectionIndices]);

  const navigationItems = useMemo(() => [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'pricing', label: 'Pricing', icon: '💰' },
    { key: 'generate', label: 'Generate', icon: '⚡' },
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'headers', label: 'Headers', icon: '📋' },
    { key: 'footers', label: 'Footers', icon: '📄' },
  ], []);

  // Handle section navigation from sidebar
  const handleSectionClick = useCallback((sectionKey) => {
    if (!isMountedRef.current || isScrolling || activeSection === sectionKey) {
      return; // Prevent loops and unnecessary calls
    }
    
    console.log('Section click:', sectionKey, 'isScrolling:', isScrolling, 'activeSection:', activeSection);
    
    try {
      setActiveSection(sectionKey);
      setIsScrolling(true);
      setError(null);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Scroll to section
      const targetRef = sectionRefs.current[sectionKey];
      if (targetRef) {
        console.log('Scrolling to section:', sectionKey);
        targetRef.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        console.log('Target ref not found for section:', sectionKey);
        setError(`Section "${sectionKey}" not found`);
      }
      
      // Reset scrolling state after animation
      scrollTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setIsScrolling(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error handling section click:', error);
      setError('Failed to navigate to section');
      setIsScrolling(false);
    }
  }, [isScrolling, activeSection]);

  // Listen for section clicks from sidebar
  useEffect(() => {
    if (onSectionClick && isMountedRef.current) {
      onSectionClick(handleSectionClick);
    }
  }, [onSectionClick, handleSectionClick]);

  // Update parent component when active section changes
  useEffect(() => {
    if (onSectionChange && isMountedRef.current) {
      try {
        onSectionChange(activeSection);
      } catch (error) {
        console.error('Error updating parent section:', error);
      }
    }
  }, [activeSection, onSectionChange]);

  // Debug logging for lock functionality
  useEffect(() => {
    if (isMountedRef.current) {
      console.log('Locked sections:', lockedSections);
      console.log('Current section indices:', currentSectionIndices);
    }
  }, [lockedSections, currentSectionIndices]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setError(null);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleToggleLock = useCallback((sectionKey) => {
    if (onToggleLock) {
      try {
        onToggleLock(sectionKey);
      } catch (error) {
        console.error('Error toggling lock:', error);
        setError('Failed to toggle section lock');
      }
    }
  }, [onToggleLock]);

  const handleRerollSection = useCallback((sectionKey) => {
    if (rerollSection) {
      try {
        rerollSection(sectionKey);
      } catch (error) {
        console.error('Error rerolling section:', error);
        setError('Failed to regenerate section');
      }
    }
  }, [rerollSection]);

  const handleExport = useCallback(() => {
    try {
      // Collect layout data from all sections
      const exportData = {
        sections: navigationItems.map(item => ({
          key: item.key,
          label: item.label,
          component: getCurrentComponent(item.key),
          locked: lockedSections[item.key] || false,
          currentIndex: currentSectionIndices[item.key] || 0
        })),
        customizations: {}, // This would be populated with actual customizations
        metadata: {
          generated: new Date().toISOString(),
          totalSections: navigationItems.length,
          lockedSections: Object.keys(lockedSections).filter(key => lockedSections[key]).length
        }
      };
      
      setLayoutData(exportData);
      setShowExportManager(true);
    } catch (error) {
      console.error('Error preparing export data:', error);
    }
  }, [navigationItems, lockedSections, currentSectionIndices, getCurrentComponent]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
            Error Loading Layout
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            {error}
          </p>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Header with Export Button */}
            <div className="fixed top-4 right-4 z-40">
            <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                title="Export Layout"
            >
                <IconDownload className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
            </button>
            </div>

            {/* Single Page Landing Layout */}
            <main className="w-full">
            {navigationItems.map((item) => {
                const Component = getCurrentComponent(item.key);
                return (
                <section
                    key={item.key}
                    ref={(el) => {
                    if (el) sectionRefs.current[item.key] = el;
                    }}
                    id={`section-${item.key}`}
                    className="min-h-screen flex items-center justify-center p-12"
                >
                    <div className="w-full max-w-7xl">
                    {/* Section Header with Controls */}
                    <div className="mb-12 flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                        <h2 className="text-4xl font-playfair font-bold text-slate-800 dark:text-slate-200 capitalize">
                            {item.label}
                        </h2>
                        <div className="flex items-center space-x-3">
                            <LockIcon
                            isLocked={lockedSections[item.key] || false}
                            onClick={() => handleToggleLock(item.key)}
                            />
                            {!lockedSections[item.key] && (
                            <button
                                onClick={() => handleRerollSection(item.key)}
                                className="px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Regenerate
                            </button>
                            )}
                        </div>
                        </div>
                    </div>

                    {/* Section Content */}
                    {item.key === 'headers' || item.key === 'footers' ? (
                        <div className="relative min-h-[300px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-lg">
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center font-medium">
                            {item.key === 'headers' ? 'Header Preview' : 'Footer Preview'}
                        </div>
                        {Component ? (
                            <React.Suspense fallback={
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto mb-4"></div>
                                <p className="text-slate-600 dark:text-slate-400">Loading component...</p>
                            </div>
                            }>
                            <div className={`transform ${item.key === 'headers' ? 'scale-90 origin-top' : 'scale-75 origin-top'} bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-xl`}>
                                {item.key === 'headers' ? (
                                <div className="relative">
                                    <Component isVisible={true} colors={{}} />
                                    <div className="h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900 pointer-events-none"></div>
                                </div>
                                ) : (
                                <Component colors={{}} />
                                )}
                            </div>
                            </React.Suspense>
                        ) : (
                            <div className="text-center py-12">
                            <p className="text-slate-600 dark:text-slate-400">Section content not available</p>
                            </div>
                        )}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-8">
                            {Component ? (
                            <React.Suspense fallback={
                                <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto mb-4"></div>
                                <p className="text-slate-600 dark:text-slate-400">Loading component...</p>
                                </div>
                            }>
                                <Component />
                            </React.Suspense>
                            ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-600 dark:text-slate-400">Section content not available</p>
                            </div>
                            )}
                        </div>
                        </div>
                    )}
                    </div>
                </section>
                );
            })}
            </main>
        </div>

        {/* Export Manager Modal */}
        {showExportManager && (
            <ExportManager
            layoutData={layoutData}
            customizations={{}}
            onClose={() => setShowExportManager(false)}
            onExport={(format, data) => {
                console.log('Exporting:', format, data);
                setShowExportManager(false);
            }}
            />
        )}
    </>
  );
};

export default LandingPageLayout;
