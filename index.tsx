
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
const rootElement = (globalThis as any).document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);