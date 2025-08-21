// src/utils/TokenUtils.js
import { secureTokenStorage } from './SecurityUtils.js';

// Legacy functions for backward compatibility
export const saveTokens = (access, refresh) => {
  try {
    secureTokenStorage.setAccessToken(access);
    secureTokenStorage.setRefreshToken(refresh);
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

export const getAccessToken = () => {
  try {
    return secureTokenStorage.getAccessToken();
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getRefreshToken = () => {
  try {
    return secureTokenStorage.getRefreshToken();
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

export const removeTokens = () => {
  try {
    secureTokenStorage.removeTokens();
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};

// Export the secure storage directly for new code
export { secureTokenStorage };
