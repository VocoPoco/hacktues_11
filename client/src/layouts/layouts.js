// src/layouts/layouts.js
import { layoutConfig } from '../../layoutConfig';

const dynamicImports = {
  home: () => import('./HomeLayouts'),
  pricing: () => import('./PricingLayouts'),
  generate: () => import('./GenerateLayouts'),
  // custom: () => import('./CreateProjectLayouts'),
  dashboard: () => import('./DashboardLayouts'),
  headers: () => import('../components/Headers/header'),
  footers: () => import('../components/Footers/footer'),
};

export const loadLayouts = async () => {
  const layoutEntries = await Promise.all(
    Object.entries(layoutConfig).map(async ([key, config]) => {
      try {
        const module = await dynamicImports[key]();
        const components = Array.from({ length: config.count }, (_, i) => {
          const componentName = `${config.componentPrefix}${i + 1}`;
          return module[componentName];
        }).filter(Boolean);
        
        return { [key]: components };
      } catch (error) {
        console.error(`Error loading ${key} layouts:`, error);
        return { [key]: [] };
      }
    })
  );

  return layoutEntries.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};