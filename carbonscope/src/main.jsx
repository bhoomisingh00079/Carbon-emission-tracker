import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ActivityProvider } from "./context/ActivityContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ActivityProvider>
        <App />
      </ActivityProvider>
    </AuthProvider>
  </BrowserRouter>
);