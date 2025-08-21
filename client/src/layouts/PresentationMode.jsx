import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { HomeLayouts, PricingLayouts, GenerateLayouts, DashboardLayouts, HeaderLayouts, FooterLayouts } from './index';

// Exit Button Component
const ExitButton = ({ onExit }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onExit) {
      try {
        onExit();
      } catch (error) {
        console.error('Exit button click error:', error);
      }
    }
  }, [onExit]);

  return (
    <button
      onClick={handleClick}
      className="fixed top-6 left-6 z-50 bg-slate-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg hover:bg-slate-700/90 transition-all duration-200 group"
      title="Exit Presentation Mode"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

// Progress Indicator
const ProgressIndicator = ({ currentSection, totalSections }) => (
  <div className="fixed top-6 right-6 z-50 bg-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Section {currentSection} of {totalSections}</span>
      <div className="flex gap-1">
        {Array.from({ length: totalSections }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i < currentSection ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);

const PresentationMode = ({ 
  lockedSections = {}, 
  onToggleLock, 
  rerollSection,
  currentSectionIndices = {},
  onExit
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);
  const sectionRefs = useRef({});
  const isMountedRef = useRef(true);

  const sections = useMemo(() => [
    { key: 'home', name: 'Home', components: HomeLayouts, icon: '🏠' },
    { key: 'pricing', name: 'Pricing', components: PricingLayouts, icon: '💰' },
    { key: 'generate', name: 'Generate', components: GenerateLayouts, icon: '⚡' },
    { key: 'dashboard', name: 'Dashboard', components: DashboardLayouts, icon: '📊' },
    { key: 'headers', name: 'Headers', components: HeaderLayouts, icon: '📋' },
    { key: 'footers', name: 'Footers', components: FooterLayouts, icon: '📄' },
  ], []);

  const getCurrentComponent = useCallback((sectionKey) => {
    try {
      const sectionArray = sections.find(s => s.key === sectionKey)?.components;
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

  const handleSectionChange = useCallback((direction) => {
    if (!isMountedRef.current || isTransitioning) {
      return; // Prevent loops and unnecessary calls
    }
    
    try {
      setIsTransitioning(true);
      setError(null);
      
      const newIndex = direction === 'next' 
        ? Math.min(currentSectionIndex + 1, sections.length - 1)
        : Math.max(currentSectionIndex - 1, 0);
      
      setCurrentSectionIndex(newIndex);
      
      setTimeout(() => {
        if (isMountedRef.current) {
          setIsTransitioning(false);
        }
      }, 500);
    } catch (error) {
      console.error('Error changing section:', error);
      setError('Failed to change section');
      setIsTransitioning(false);
    }
  }, [currentSectionIndex, sections.length, isTransitioning]);

  const handleKeyPress = useCallback((e) => {
    if (!isMountedRef.current) return;
    
    try {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleSectionChange('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSectionChange('prev');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (onExit) {
          onExit();
        }
      }
    } catch (error) {
      console.error('Error handling key press:', error);
      setError('Failed to handle keyboard input');
    }
  }, [handleSectionChange, onExit]);

  useEffect(() => {
    try {
      window.addEventListener('keydown', handleKeyPress);
    } catch (error) {
      console.error('Error adding keydown listener:', error);
    }

    return () => {
      try {
        window.removeEventListener('keydown', handleKeyPress);
      } catch (error) {
        console.error('Error removing keydown listener:', error);
      }
    };
  }, [handleKeyPress]);

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

  const currentSection = sections[currentSectionIndex];
  const Component = getCurrentComponent(currentSection?.key);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
            Error in Presentation Mode
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

  if (!currentSection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            No Sections Available
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No sections are available for presentation.
          </p>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Exit Button */}
      <ExitButton onExit={onExit} />
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentSection={currentSectionIndex + 1} 
        totalSections={sections.length} 
      />

      {/* Navigation Arrows */}
      <button
        onClick={() => handleSectionChange('prev')}
        disabled={currentSectionIndex === 0 || isTransitioning}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-slate-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg hover:bg-slate-700/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous Section"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => handleSectionChange('next')}
        disabled={currentSectionIndex === sections.length - 1 || isTransitioning}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 bg-slate-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg hover:bg-slate-700/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next Section"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Section Content */}
      <div className="transition-all duration-500 ease-in-out">
        <section
          ref={(el) => {
            if (el) sectionRefs.current[currentSection.key] = el;
          }}
          className="min-h-screen flex items-center justify-center relative"
        >
          {/* Section Header */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-slate-800/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{currentSection.icon}</span>
                <h2 className="text-lg font-medium">{currentSection.name}</h2>
              </div>
            </div>
          </div>

          {/* Component Display */}
          <div className="w-full max-w-7xl mx-auto px-6 py-24">
            {Component ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <React.Suspense fallback={
                  <div className="text-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading component...</p>
                  </div>
                }>
                  <Component />
                </React.Suspense>
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">{currentSection.icon}</div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  {currentSection.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Component not available
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          <span className="mr-4">← → Navigate</span>
          <span className="mr-4">Space Next</span>
          <span>ESC Exit</span>
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
