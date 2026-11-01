import React from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap must be imported here (or linked in public/index.html) for the
// .navbar / .btn / .card / .modal / .badge / .spinner-border classes used
// throughout App.js to actually take effect.
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);