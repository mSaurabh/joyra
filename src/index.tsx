import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// components
import { AuthContextProvider } from "./context/AuthContext";
// styles
import "./index.css";

// hooks

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
