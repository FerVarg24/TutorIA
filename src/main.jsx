import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sileo';
import App from './App.jsx';
import './styles/global.css';
import 'sileo/styles.css';
import '@copilotkit/react-ui/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="bottom-right" offset={24} theme="light" />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
