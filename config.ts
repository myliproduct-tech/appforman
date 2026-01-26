/**
 * Central configuration for API communication
 * Links the static frontend (GitHub Pages) with the dynamic backend (Render.com)
 */

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// In development, we use relative paths (Vite proxy handles it)
// In production, we MUST point to the Render.com URL
export const API_BASE_URL = isDevelopment
    ? '/api'
    : 'https://appforman.onrender.com/api';

console.log(`📡 API Bridge Active: ${API_BASE_URL}`);
