

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '114673832827-t3j7f6kloamihnsu9llkoka3tt89q783.apps.googleusercontent.com';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

