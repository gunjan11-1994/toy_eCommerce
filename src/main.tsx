import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./pages/auth/AuthProvider.tsx";
import "./i18n/i18n";

import "./index.css";

import App from "./App.tsx";
import "./api/interceptors";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter } from "react-router-dom";

import store from "./Redux/store.ts";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
