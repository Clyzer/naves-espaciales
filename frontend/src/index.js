import React from 'react';
import ReactDOM from 'react-dom/client';
// Importamos nuestro frontend que guardamos en app.js
import App from './app';

// Este archivo es el primero en ejecutarse en el Frontend, lo usaremos para crear nuestro DOM y asignarlo al <div> con id "root" que tenemos en public/index.html

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos todo lo que importamos de App en nuestro DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);