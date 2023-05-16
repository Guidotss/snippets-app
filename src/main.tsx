import React from "react";
import ReactDOM from "react-dom/client";
import App  from "./App";
import "./styles.css";
import { SnippetProvider } from "./context";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SnippetProvider>
      <App />
    </SnippetProvider>
    
  </React.StrictMode>
);
