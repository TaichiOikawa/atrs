import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./features/ErrorBoundary/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";
import "./global.css";

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Methods"] =
  "HEAD, GET, POST, PUT, DELETE, OPTIONS, PATCH";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ErrorBoundary>
  </StrictMode>
);
