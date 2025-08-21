// Security utilities for the application

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters and patterns
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
};

// Validate email format
export const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Validate password strength
export const validatePassword = (password) => {
  if (typeof password !== 'string') return false;
  
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar
  };
};

// Secure token storage (using sessionStorage for better security)
export const secureTokenStorage = {
  setAccessToken: (token) => {
    try {
      if (token && typeof token === 'string') {
        sessionStorage.setItem('access_token', token);
      }
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  },
  
  getAccessToken: () => {
    try {
      return sessionStorage.getItem('access_token');
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  },
  
  setRefreshToken: (token) => {
    try {
      if (token && typeof token === 'string') {
        sessionStorage.setItem('refresh_token', token);
      }
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  },
  
  getRefreshToken: () => {
    try {
      return sessionStorage.getItem('refresh_token');
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  },
  
  removeTokens: () => {
    try {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
    } catch (error) {
      console.error('Error removing tokens:', error);
    }
  },
  
  clearAll: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
  }
};

// CSRF token management
export const csrfTokenManager = {
  generateToken: () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },
  
  getStoredToken: () => {
    try {
      return sessionStorage.getItem('csrf_token');
    } catch (error) {
      console.error('Error retrieving CSRF token:', error);
      return null;
    }
  },
  
  setStoredToken: (token) => {
    try {
      if (token && typeof token === 'string') {
        sessionStorage.setItem('csrf_token', token);
      }
    } catch (error) {
      console.error('Error storing CSRF token:', error);
    }
  },
  
  validateToken: (token) => {
    const storedToken = csrfTokenManager.getStoredToken();
    return token && storedToken && token === storedToken;
  }
};

// Rate limiting utility
export const rateLimiter = {
  attempts: new Map(),
  
  checkLimit: (key, maxAttempts = 5, windowMs = 60000) => {
    const now = Date.now();
    const userAttempts = rateLimiter.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(timestamp => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    // Add current attempt
    validAttempts.push(now);
    rateLimiter.attempts.set(key, validAttempts);
    
    return true; // Within rate limit
  },
  
  reset: (key) => {
    rateLimiter.attempts.delete(key);
  },
  
  clear: () => {
    rateLimiter.attempts.clear();
  }
};

// XSS prevention
export const preventXSS = {
  escapeHtml: (text) => {
    if (typeof text !== 'string') return text;
    
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, (m) => map[m]);
  },
  
  sanitizeUrl: (url) => {
    if (typeof url !== 'string') return '';
    
    // Only allow http, https, and relative URLs
    const allowedProtocols = ['http:', 'https:'];
    const urlObj = new URL(url, window.location.origin);
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return '';
    }
    
    return urlObj.toString();
  }
};

// Secure random string generation
export const generateSecureString = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy helper
export const cspHelper = {
  generateNonce: () => {
    return generateSecureString(16);
  },
  
  validateNonce: (nonce) => {
    return typeof nonce === 'string' && nonce.length === 32;
  }
};

// Secure headers for API requests
export const getSecureHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  // Add CSRF token if available
  const csrfToken = csrfTokenManager.getStoredToken();
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }
  
  // Add authorization header if requested and token available
  if (includeAuth) {
    const accessToken = secureTokenStorage.getAccessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  
  return headers;
};

// Validate and sanitize user input
export const validateUserInput = {
  username: (username) => {
    if (typeof username !== 'string') return false;
    
    const sanitized = sanitizeInput(username);
    const minLength = 3;
    const maxLength = 50;
    const validChars = /^[a-zA-Z0-9_-]+$/;
    
    return sanitized.length >= minLength && 
           sanitized.length <= maxLength && 
           validChars.test(sanitized);
  },
  
  projectName: (name) => {
    if (typeof name !== 'string') return false;
    
    const sanitized = sanitizeInput(name);
    const minLength = 1;
    const maxLength = 100;
    
    return sanitized.length >= minLength && sanitized.length <= maxLength;
  },
  
  description: (description) => {
    if (typeof description !== 'string') return false;
    
    const sanitized = sanitizeInput(description);
    const maxLength = 1000;
    
    return sanitized.length <= maxLength;
  }
};

// Secure logout function
export const secureLogout = async () => {
  try {
    // Clear all secure storage
    secureTokenStorage.clearAll();
    csrfTokenManager.setStoredToken(null);
    rateLimiter.clear();
    
    // Clear any sensitive data from localStorage
    const sensitiveKeys = ['username', 'email', 'user'];
    sensitiveKeys.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
      }
    });
    
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during secure logout:', error);
    // Force redirect even if there's an error
    window.location.href = '/login';
  }
};

// Export all utilities
export default {
  sanitizeInput,
  validateEmail,
  validatePassword,
  secureTokenStorage,
  csrfTokenManager,
  rateLimiter,
  preventXSS,
  generateSecureString,
  cspHelper,
  getSecureHeaders,
  validateUserInput,
  secureLogout
};



