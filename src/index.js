import React from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import { UserProvider } from "./contexts/UserContext";
import { MessagesProvider } from "./contexts/MessagesContext.js";
import { ConfigProvider } from './contexts/ConfigContext.js';
import App from './App';
import "flag-icons/css/flag-icons.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Router>
        <TranslationProvider>
          <UserProvider>
            <ThemeProvider>
              <MessagesProvider>
                <App />
              </MessagesProvider>
            </ThemeProvider>
          </UserProvider>
        </TranslationProvider>
      </Router>
    </ConfigProvider>
  </React.StrictMode>
);
