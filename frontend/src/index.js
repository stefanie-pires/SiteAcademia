import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Criação da raiz do React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderização do aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Para medir o desempenho do aplicativo
reportWebVitals();
