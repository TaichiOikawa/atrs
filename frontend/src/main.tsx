import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./features/ErrorBoundary/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ErrorBoundary>
);
