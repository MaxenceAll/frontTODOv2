import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { ThemeContextProvider } from "./Contexts/ThemeContext";
import "./index.css";

import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todosApi } from "./features/todosSlice";
import { store } from "./store";
import { AdminProvider } from "./Contexts/AdminContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    
    <Provider store={store}>
      <ApiProvider api={todosApi}>


        <AdminProvider>

        <AuthContextProvider>
          
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>

        </AuthContextProvider>

        </AdminProvider>

      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
