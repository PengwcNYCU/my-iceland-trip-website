// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { register, checkNetworkStatus } from './registerServiceWorker';

// 註冊 Service Worker
register();

// 監控網絡狀態
checkNetworkStatus();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);