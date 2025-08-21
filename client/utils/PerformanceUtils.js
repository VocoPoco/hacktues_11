// Performance monitoring and optimization utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
  }

  // Start timing an operation
  startTimer(operationName) {
    if (!this.isEnabled) return;
    
    const startTime = performance.now();
    this.metrics.set(operationName, { startTime, endTime: null, duration: null });
    
    return () => this.endTimer(operationName);
  }

  // End timing an operation
  endTimer(operationName) {
    if (!this.isEnabled) return;
    
    const metric = this.metrics.get(operationName);
    if (!metric) return;
    
    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    // Log if duration is significant
    if (metric.duration > 100) {
      console.warn(`Performance: ${operationName} took ${metric.duration.toFixed(2)}ms`);
    }
    
    return metric.duration;
  }

  // Measure render performance
  measureRender(componentName, renderFn) {
    if (!this.isEnabled) return renderFn();
    
    const stopTimer = this.startTimer(`render_${componentName}`);
    const result = renderFn();
    stopTimer();
    
    return result;
  }

  // Monitor memory usage
  getMemoryUsage() {
    if (!this.isEnabled || !performance.memory) return null;
    
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
  }

  // Monitor long tasks
  observeLongTasks(callback) {
    if (!this.isEnabled || !window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            callback(entry);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', observer);
    } catch (error) {
      console.error('Error setting up long task observer:', error);
    }
  }

  // Monitor layout shifts
  observeLayoutShifts(callback) {
    if (!this.isEnabled || !window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.value > 0.1) { // Layout shifts greater than 0.1
            callback(entry);
          }
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('layout-shift', observer);
    } catch (error) {
      console.error('Error setting up layout shift observer:', error);
    }
  }

  // Monitor first input delay
  observeFirstInput(callback) {
    if (!this.isEnabled || !window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback(entry);
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.set('first-input', observer);
    } catch (error) {
      console.error('Error setting up first input observer:', error);
    }
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Get performance report
  getReport() {
    if (!this.isEnabled) return null;
    
    const report = {
      metrics: Object.fromEntries(this.metrics),
      memory: this.getMemoryUsage(),
      navigation: performance.getEntriesByType('navigation')[0]
    };
    
    return report;
  }
}

// Debounce utility for performance optimization
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

// Throttle utility for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility
export const lazyLoad = (importFn, fallback = null) => {
  const LazyComponent = React.lazy(importFn);
  
  return function LazyWrapper(props) {
    return (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
};

// Memoization utility with size limit
export const memoizeWithLimit = (fn, limit = 100) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Virtual scrolling utility
export const createVirtualScroller = (itemHeight, containerHeight, items) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const totalHeight = items.length * itemHeight;
  
  return {
    getVisibleRange: (scrollTop) => {
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.min(startIndex + visibleCount, items.length);
      
      return {
        startIndex,
        endIndex,
        visibleItems: items.slice(startIndex, endIndex),
        offsetY: startIndex * itemHeight
      };
    },
    
    totalHeight,
    itemHeight
  };
};

// Image optimization utility
export const optimizeImage = (src, options = {}) => {
  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;
  
  // In a real app, you would use an image optimization service
  // For now, we'll just return the original src
  return src;
};

// Bundle size monitoring
export const getBundleSize = () => {
  if (!this.isEnabled) return null;
  
  const entries = performance.getEntriesByType('resource');
  const jsFiles = entries.filter(entry => entry.name.endsWith('.js'));
  
  return jsFiles.reduce((total, file) => total + file.transferSize, 0);
};

// Create global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

// Export utilities and monitor
export {
  performanceMonitor,
  debounce,
  throttle,
  lazyLoad,
  memoizeWithLimit,
  createVirtualScroller,
  optimizeImage,
  getBundleSize
};

export default performanceMonitor;



