import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';
import SnackbarConfig from './components/SnackbarConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarConfig>
    <App />
    </SnackbarConfig>
  </React.StrictMode>,
);
