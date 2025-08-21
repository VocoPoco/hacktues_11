import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { HomeLayouts, PricingLayouts, GenerateLayouts, DashboardLayouts, HeaderLayouts, FooterLayouts } from './index';
import { IconPencil, IconGrid, IconClipboard, IconFolder, IconKey, IconUserPlus, IconLogOut, IconEye, IconPalette } from '../../components/Navbar/NavIcons';
import ComponentCustomizer from './ComponentCustomizer';

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

const ComponentViewer = ({ 
  lockedSections = {}, 
  onToggleLock, 
  rerollSection,
  currentSectionIndices = {},
  onSectionClick,
  onSectionChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolling, setIsScrolling] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentCustomizations, setComponentCustomizations] = useState({});

  const sections = useMemo(() => ({
    home: { name: 'Home', components: HomeLayouts, icon: '🏠' },
    pricing: { name: 'Pricing', components: PricingLayouts, icon: '💰' },
    generate: { name: 'Generate', components: GenerateLayouts, icon: '⚡' },
    dashboard: { name: 'Dashboard', components: DashboardLayouts, icon: '📊' },
    headers: { name: 'Headers', components: HeaderLayouts, icon: '📋' },
    footers: { name: 'Footers', components: FooterLayouts, icon: '📄' },
  }), []);

  const getCurrentComponent = useCallback((sectionKey, index) => {
    try {
      const sectionArray = sections[sectionKey]?.components;
      if (!sectionArray || !Array.isArray(sectionArray)) {
        console.warn(`Section array not found or invalid for key: ${sectionKey}`);
        return null;
      }
      const component = sectionArray[index] || sectionArray[0];
      if (!component) {
        console.warn(`Component not found at index ${index} for section: ${sectionKey}`);
        return null;
      }
      return component;
    } catch (error) {
      console.error('Error getting current component:', error);
      return null;
    }
  }, [sections]);

  const categories = useMemo(() => [
    { key: 'all', label: 'All Components', icon: '🎨' },
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'pricing', label: 'Pricing', icon: '💰' },
    { key: 'generate', label: 'Generate', icon: '⚡' },
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'headers', label: 'Headers', icon: '📋' },
    { key: 'footers', label: 'Footers', icon: '📄' },
  ], []);

  const handleSectionClick = useCallback((sectionKey) => {
    if (!isMountedRef.current || isScrolling) {
      return; // Prevent loops and unnecessary calls
    }
    
    try {
      setIsScrolling(true);
      setError(null);
      
      if (onSectionClick) {
        onSectionClick(sectionKey);
      }
      
      setTimeout(() => {
        if (isMountedRef.current) {
          setIsScrolling(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error handling section click:', error);
      setError('Failed to navigate to section');
      setIsScrolling(false);
    }
  }, [isScrolling, onSectionClick]);

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

  const handleCategoryChange = useCallback((categoryKey) => {
    try {
      setSelectedCategory(categoryKey);
      setError(null);
    } catch (error) {
      console.error('Error changing category:', error);
      setError('Failed to change category');
    }
  }, []);

  const filteredSections = useMemo(() => {
    try {
      return selectedCategory === 'all' 
        ? Object.entries(sections)
        : Object.entries(sections).filter(([key]) => key === selectedCategory);
    } catch (error) {
      console.error('Error filtering sections:', error);
      return [];
    }
  }, [selectedCategory, sections]);

  const handleCustomize = useCallback((componentKey, component) => {
    try {
      setSelectedComponent({ key: componentKey, component });
      setShowCustomizer(true);
    } catch (error) {
      console.error('Error opening customizer:', error);
    }
  }, []);

  const handleCustomization = useCallback((customizations) => {
    try {
      setComponentCustomizations(prev => ({
        ...prev,
        [selectedComponent.key]: customizations
      }));
    } catch (error) {
      console.error('Error applying customizations:', error);
    }
  }, [selectedComponent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
            Error Loading Component Viewer
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold text-slate-800 dark:text-slate-200 mb-4">
              Component Library
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              View and manage all available layout components
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSections.map((sectionData) => {
              const Component = getCurrentComponent(sectionData.key);
              const customizations = componentCustomizations[sectionData.key];
              
              return (
                <div key={sectionData.key} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {/* Component Header */}
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {sectionData.label}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCustomize(sectionData.key, Component)}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          title="Customize Component"
                        >
                          <IconPalette className="w-4 h-4" />
                        </button>
                        <LockIcon
                          isLocked={lockedSections[sectionData.key] || false}
                          onClick={() => handleToggleLock(sectionData.key)}
                        />
                        {!lockedSections[sectionData.key] && (
                          <button
                            onClick={() => handleRerollSection(sectionData.key)}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            Regenerate
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Component Info */}
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <p>Variants: {sectionData.components?.length || 0}</p>
                      <p>Current: {currentSectionIndices[sectionData.key] + 1}</p>
                    </div>
                  </div>

                  {/* Component Preview */}
                  <div className="p-6">
                    {Component ? (
                      <React.Suspense fallback={
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto mb-4"></div>
                          <p className="text-slate-600 dark:text-slate-400">Loading component...</p>
                        </div>
                      }>
                        <div style={{
                          fontFamily: customizations?.fonts?.family,
                          '--primary-color': customizations?.colors?.primary,
                          '--secondary-color': customizations?.colors?.secondary,
                          '--accent-color': customizations?.colors?.accent,
                          '--padding': `${customizations?.spacing?.padding || 16}px`,
                          '--margin': `${customizations?.spacing?.margin || 16}px`,
                          '--gap': `${customizations?.spacing?.gap || 16}px`,
                          '--border-radius': `${customizations?.spacing?.borderRadius || 8}px`,
                        }}>
                          <Component customizations={customizations} />
                        </div>
                      </React.Suspense>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-600 dark:text-slate-400">Component not available</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Component Customizer Modal */}
      {showCustomizer && selectedComponent && (
        <ComponentCustomizer
          component={selectedComponent.component}
          onCustomize={handleCustomization}
          onClose={() => setShowCustomizer(false)}
          defaultColors={{
            primary: '#475569',
            secondary: '#64748b',
            accent: '#334155'
          }}
          defaultFonts={{
            family: 'Inter, sans-serif',
            heading: 24,
            subheading: 18,
            body: 16,
            caption: 14
          }}
          defaultSpacing={{
            padding: 16,
            margin: 16,
            gap: 16,
            borderRadius: 8
          }}
        />
      )}
    </>
  );
};

export default ComponentViewer;
