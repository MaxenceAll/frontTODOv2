import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { ThemeContextProvider } from "./Contexts/ThemeContext";
import "./index.css";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./features/api/ApiSlice";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiProvider api={apiSlice}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ApiProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
