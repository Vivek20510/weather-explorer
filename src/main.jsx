import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Vite does NOT use `reportWebVitals`, so we remove it

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
