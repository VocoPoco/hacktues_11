import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { IconDownload, IconShare, IconCode, IconFileText, IconLink, IconCopy, IconCheck } from '../../components/Navbar/NavIcons';

const ExportManager = ({ 
  layoutData, 
  customizations = {}, 
  onClose, 
  onExport 
}) => {
  const [exportFormat, setExportFormat] = useState('html');
  const [includeCustomizations, setIncludeCustomizations] = useState(true);
  const [exportOptions, setExportOptions] = useState({
    minify: false,
    includeComments: true,
    includeSourceMaps: false,
    responsive: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  const exportFormats = [
    { id: 'html', label: 'HTML + CSS', icon: IconFileText, description: 'Static HTML with embedded styles' },
    { id: 'react', label: 'React Component', icon: IconCode, description: 'Reusable React component' },
    { id: 'css', label: 'CSS Only', icon: IconFileText, description: 'Standalone CSS stylesheet' },
    { id: 'json', label: 'JSON Config', icon: IconCode, description: 'Configuration data for reuse' }
  ];

  // Generate export code
  const generateExportCode = useCallback(async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!isMountedRef.current) return;

      let code = '';
      
      switch (exportFormat) {
        case 'html':
          code = generateHTMLCode();
          break;
        case 'react':
          code = generateReactCode();
          break;
        case 'css':
          code = generateCSSCode();
          break;
        case 'json':
          code = generateJSONCode();
          break;
        default:
          throw new Error('Unsupported export format');
      }

      setGeneratedCode(code);
    } catch (error) {
      console.error('Error generating export code:', error);
      setError('Failed to generate export code. Please try again.');
    } finally {
      if (isMountedRef.current) {
        setIsGenerating(false);
      }
    }
  }, [exportFormat, layoutData, customizations, includeCustomizations, exportOptions]);

  // Generate HTML code
  const generateHTMLCode = useCallback(() => {
    const { minify, includeComments } = exportOptions;
    
    let code = '';
    
    if (includeComments) {
      code += `<!-- FREELENS Layout Export\n`;
      code += `Generated: ${new Date().toISOString()}\n`;
      code += `Format: HTML + CSS\n`;
      code += `-->\n\n`;
    }

    code += `<!DOCTYPE html>\n`;
    code += `<html lang="en">\n`;
    code += `<head>\n`;
    code += `  <meta charset="UTF-8">\n`;
    code += `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    code += `  <title>FREELENS Layout</title>\n`;
    code += `  <style>\n`;
    
    // Add customizations as CSS variables
    if (includeCustomizations && customizations.colors) {
      code += `    :root {\n`;
      Object.entries(customizations.colors).forEach(([key, value]) => {
        code += `      --${key}-color: ${value};\n`;
      });
      code += `    }\n\n`;
    }

    // Add responsive styles
    if (exportOptions.responsive) {
      code += `    @media (max-width: 768px) {\n`;
      code += `      .container { padding: 1rem; }\n`;
      code += `    }\n\n`;
    }

    code += `  </style>\n`;
    code += `</head>\n`;
    code += `<body>\n`;
    code += `  <div class="freelens-layout">\n`;
    
    // Add layout content
    if (layoutData) {
      code += `    ${layoutData.html || '<!-- Layout content -->'}\n`;
    }
    
    code += `  </div>\n`;
    code += `</body>\n`;
    code += `</html>`;

    return minify ? code.replace(/\s+/g, ' ').trim() : code;
  }, [layoutData, customizations, includeCustomizations, exportOptions]);

  // Generate React code
  const generateReactCode = useCallback(() => {
    const { minify, includeComments } = exportOptions;
    
    let code = '';
    
    if (includeComments) {
      code += `// FREELENS Layout Export\n`;
      code += `// Generated: ${new Date().toISOString()}\n`;
      code += `// Format: React Component\n\n`;
    }

    code += `import React from 'react';\n\n`;
    
    if (includeCustomizations) {
      code += `const customizations = ${JSON.stringify(customizations, null, 2)};\n\n`;
    }

    code += `const FreelensLayout = ({ customizations: propsCustomizations }) => {\n`;
    code += `  const finalCustomizations = propsCustomizations || customizations;\n\n`;
    code += `  return (\n`;
    code += `    <div className="freelens-layout">\n`;
    
    if (layoutData) {
      code += `      ${layoutData.jsx || '// Layout content'}\n`;
    }
    
    code += `    </div>\n`;
    code += `  );\n`;
    code += `};\n\n`;
    code += `export default FreelensLayout;`;

    return minify ? code.replace(/\s+/g, ' ').trim() : code;
  }, [layoutData, customizations, includeCustomizations, exportOptions]);

  // Generate CSS code
  const generateCSSCode = useCallback(() => {
    const { minify, includeComments } = exportOptions;
    
    let code = '';
    
    if (includeComments) {
      code += `/* FREELENS Layout Export\n`;
      code += `Generated: ${new Date().toISOString()}\n`;
      code += `Format: CSS Only\n`;
      code += `*/\n\n`;
    }

    // Add customizations as CSS variables
    if (includeCustomizations && customizations.colors) {
      code += `:root {\n`;
      Object.entries(customizations.colors).forEach(([key, value]) => {
        code += `  --${key}-color: ${value};\n`;
      });
      code += `}\n\n`;
    }

    // Add responsive styles
    if (exportOptions.responsive) {
      code += `@media (max-width: 768px) {\n`;
      code += `  .container { padding: 1rem; }\n`;
      code += `}\n\n`;
    }

    // Add layout styles
    if (layoutData && layoutData.css) {
      code += layoutData.css;
    }

    return minify ? code.replace(/\s+/g, ' ').trim() : code;
  }, [layoutData, customizations, includeCustomizations, exportOptions]);

  // Generate JSON code
  const generateJSONCode = useCallback(() => {
    const exportData = {
      layout: layoutData,
      customizations: includeCustomizations ? customizations : {},
      metadata: {
        generated: new Date().toISOString(),
        version: '1.0.0',
        source: 'FREELENS'
      }
    };

    return JSON.stringify(exportData, null, 2);
  }, [layoutData, customizations, includeCustomizations]);

  // Generate share link
  const generateShareLink = useCallback(async () => {
    try {
      const shareData = {
        layout: layoutData,
        customizations: includeCustomizations ? customizations : {},
        timestamp: Date.now()
      };

      // In a real implementation, this would save to a database
      // For now, we'll create a base64 encoded data URL
      const encodedData = btoa(JSON.stringify(shareData));
      const link = `${window.location.origin}/shared/${encodedData}`;
      
      setShareLink(link);
    } catch (error) {
      console.error('Error generating share link:', error);
      setError('Failed to generate share link. Please try again.');
    }
  }, [layoutData, customizations, includeCustomizations]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setError('Failed to copy to clipboard. Please try again.');
    }
  }, []);

  // Download file
  const downloadFile = useCallback((content, filename) => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file. Please try again.');
    }
  }, []);

  // Handle export
  const handleExport = useCallback(() => {
    if (generatedCode) {
      const filename = `freelens-layout.${exportFormat === 'react' ? 'jsx' : exportFormat}`;
      downloadFile(generatedCode, filename);
    }
  }, [generatedCode, exportFormat, downloadFile]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (exportFormat) {
      generateExportCode();
    }
  }, [exportFormat, generateExportCode]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Export & Share Layout
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-80 border-r border-slate-200 dark:border-slate-700 p-6 overflow-y-auto">
            {/* Export Format */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Export Format
              </h3>
              <div className="space-y-3">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      exportFormat === format.id
                        ? 'border-slate-700 dark:border-slate-300 bg-slate-100 dark:bg-slate-800'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <format.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {format.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {format.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Options
              </h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeCustomizations}
                    onChange={(e) => setIncludeCustomizations(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Include customizations
                  </span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.minify}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, minify: e.target.checked }))}
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Minify code
                  </span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeComments}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeComments: e.target.checked }))}
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Include comments
                  </span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.responsive}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, responsive: e.target.checked }))}
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Include responsive styles
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleExport}
                disabled={isGenerating || !generatedCode}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IconDownload className="w-4 h-4" />
                <span>Download {exportFormat.toUpperCase()}</span>
              </button>
              
              <button
                onClick={generateShareLink}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <IconShare className="w-4 h-4" />
                <span>Generate Share Link</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 flex flex-col">
            {/* Share Link */}
            {shareLink && (
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  Share Link
                </h3>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  />
                  <button
                    onClick={() => copyToClipboard(shareLink)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Code Preview */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Generated Code
                </h3>
                <button
                  onClick={() => copyToClipboard(generatedCode)}
                  className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <IconCopy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Generating code...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
              ) : (
                <pre className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm text-slate-700 dark:text-slate-300">
                  <code>{generatedCode}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportManager;
