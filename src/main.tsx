import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add error handling
const handleError = (error: Error) => {
  console.error('Global error caught in main.tsx:', error);
  
  // Display a fallback UI
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        padding: 20px;
        max-width: 800px;
        margin: 100px auto;
        background-color: #1a1a1a;
        color: white;
        border: 1px solid #FF2E63;
        border-radius: 8px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <h1 style="color: #FF2E63; margin-bottom: 20px;">Application Error</h1>
        <p style="margin-bottom: 20px;">The application failed to initialize. Please try refreshing the page.</p>
        <pre style="
          background-color: #111;
          padding: 15px;
          border-radius: 4px;
          overflow: auto;
          margin-bottom: 20px;
          white-space: pre-wrap;
        ">${error.toString()}</pre>
        <button 
          onclick="window.location.reload()" 
          style="
            background-color: #4CC9F0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Refresh Page
        </button>
      </div>
    `;
  }
};

try {
  console.log('Initializing application...');
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Application initialized successfully');
} catch (error) {
  handleError(error as Error);
}
