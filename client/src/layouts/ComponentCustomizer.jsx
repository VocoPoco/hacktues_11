import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { IconPencil, IconPalette, IconType, IconArrowsExpand, IconX } from '../../components/Navbar/NavIcons';

const ComponentCustomizer = ({ 
  component, 
  onCustomize, 
  onClose, 
  defaultColors = {},
  defaultFonts = {},
  defaultSpacing = {}
}) => {
  const [customizations, setCustomizations] = useState({
    colors: { ...defaultColors },
    fonts: { ...defaultFonts },
    spacing: { ...defaultSpacing },
    layout: {}
  });
  
  const [activeTab, setActiveTab] = useState('colors');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [customizationHistory, setCustomizationHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isMountedRef = useRef(true);

  // Save customization to history
  const saveToHistory = useCallback((newCustomizations) => {
    try {
      const newHistory = [...customizationHistory.slice(0, historyIndex + 1), newCustomizations];
      setCustomizationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  }, [customizationHistory, historyIndex]);

  // Undo/Redo functionality
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < customizationHistory.length - 1;

  const handleUndo = useCallback(() => {
    try {
      if (canUndo) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCustomizations(customizationHistory[newIndex]);
      }
    } catch (error) {
      console.error('Error undoing:', error);
    }
  }, [canUndo, historyIndex, customizationHistory]);

  const handleRedo = useCallback(() => {
    try {
      if (canRedo) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCustomizations(customizationHistory[newIndex]);
      }
    } catch (error) {
      console.error('Error redoing:', error);
    }
  }, [canRedo, historyIndex, customizationHistory]);

  // Update customizations
  const updateCustomizations = useCallback((updates) => {
    try {
      const newCustomizations = { ...customizations, ...updates };
      setCustomizations(newCustomizations);
      saveToHistory(newCustomizations);
      
      if (onCustomize) {
        onCustomize(newCustomizations);
      }
    } catch (error) {
      console.error('Error updating customizations:', error);
    }
  }, [customizations, onCustomize, saveToHistory]);

  // Color customization
  const ColorCustomizer = () => {
    const colorPresets = [
      { name: 'Professional Slate', colors: { primary: '#475569', secondary: '#64748b', accent: '#334155' } },
      { name: 'Modern Blue', colors: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#1d4ed8' } },
      { name: 'Elegant Purple', colors: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#7c3aed' } },
      { name: 'Warm Orange', colors: { primary: '#f97316', secondary: '#fb923c', accent: '#ea580c' } },
      { name: 'Nature Green', colors: { primary: '#10b981', secondary: '#34d399', accent: '#059669' } }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Color Presets</h3>
          <div className="grid grid-cols-2 gap-3">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateCustomizations({ colors: preset.colors })}
                className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.secondary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Custom Colors</h3>
          <div className="space-y-4">
            {Object.entries(customizations.colors).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize w-20">
                  {key}
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => updateCustomizations({
                    colors: { ...customizations.colors, [key]: e.target.value }
                  })}
                  className="w-12 h-8 rounded border border-slate-300 dark:border-slate-600"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateCustomizations({
                    colors: { ...customizations.colors, [key]: e.target.value }
                  })}
                  className="flex-1 px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  placeholder="#000000"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Font customization
  const FontCustomizer = () => {
    const fontPresets = [
      { name: 'Inter', family: 'Inter, sans-serif', weights: [400, 500, 600, 700] },
      { name: 'Roboto', family: 'Roboto, sans-serif', weights: [400, 500, 700] },
      { name: 'Open Sans', family: 'Open Sans, sans-serif', weights: [400, 600, 700] },
      { name: 'Poppins', family: 'Poppins, sans-serif', weights: [400, 500, 600, 700] },
      { name: 'Montserrat', family: 'Montserrat, sans-serif', weights: [400, 500, 600, 700] }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Font Family</h3>
          <select
            value={customizations.fonts.family || 'Inter, sans-serif'}
            onChange={(e) => updateCustomizations({
              fonts: { ...customizations.fonts, family: e.target.value }
            })}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {fontPresets.map((font) => (
              <option key={font.name} value={font.family}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Font Sizes</h3>
          <div className="space-y-4">
            {['heading', 'subheading', 'body', 'caption'].map((size) => (
              <div key={size} className="flex items-center space-x-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize w-24">
                  {size}
                </label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={customizations.fonts[size] || 16}
                  onChange={(e) => updateCustomizations({
                    fonts: { ...customizations.fonts, [size]: parseInt(e.target.value) }
                  })}
                  className="flex-1"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 w-8">
                  {customizations.fonts[size] || 16}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Spacing customization
  const SpacingCustomizer = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Spacing</h3>
          <div className="space-y-4">
            {['padding', 'margin', 'gap'].map((spacing) => (
              <div key={spacing} className="flex items-center space-x-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize w-20">
                  {spacing}
                </label>
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={customizations.spacing[spacing] || 16}
                  onChange={(e) => updateCustomizations({
                    spacing: { ...customizations.spacing, [spacing]: parseInt(e.target.value) }
                  })}
                  className="flex-1"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 w-8">
                  {customizations.spacing[spacing] || 16}px
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Border Radius</h3>
          <input
            type="range"
            min="0"
            max="24"
            value={customizations.spacing.borderRadius || 8}
            onChange={(e) => updateCustomizations({
              spacing: { ...customizations.spacing, borderRadius: parseInt(e.target.value) }
            })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
            <span>Sharp</span>
            <span>{customizations.spacing.borderRadius || 8}px</span>
            <span>Rounded</span>
          </div>
        </div>
      </div>
    );
  };

  // Preview component with customizations
  const PreviewComponent = useMemo(() => {
    if (!component) return null;

    const style = {
      fontFamily: customizations.fonts.family,
      '--primary-color': customizations.colors.primary,
      '--secondary-color': customizations.colors.secondary,
      '--accent-color': customizations.colors.accent,
      '--padding': `${customizations.spacing.padding || 16}px`,
      '--margin': `${customizations.spacing.margin || 16}px`,
      '--gap': `${customizations.spacing.gap || 16}px`,
      '--border-radius': `${customizations.spacing.borderRadius || 8}px`,
    };

    return (
      <div style={style} className="preview-container">
        {React.createElement(component, { customizations })}
      </div>
    );
  }, [component, customizations]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const tabs = [
    { id: 'colors', label: 'Colors', icon: IconPalette },
    { id: 'fonts', label: 'Typography', icon: IconType },
    { id: 'spacing', label: 'Spacing', icon: IconArrowsExpand }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Component Customizer
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleUndo}
                disabled={!canUndo}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo"
              >
                ↶
              </button>
              <button
                onClick={handleRedo}
                disabled={!canRedo}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo"
              >
                ↷
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          {!isPreviewMode && (
            <div className="w-80 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-slate-800 dark:text-slate-200 border-b-2 border-slate-700 dark:border-slate-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'colors' && <ColorCustomizer />}
                {activeTab === 'fonts' && <FontCustomizer />}
                {activeTab === 'spacing' && <SpacingCustomizer />}
              </div>
            </div>
          )}

          {/* Preview Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-800">
            <div className="p-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                {PreviewComponent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCustomizer;
