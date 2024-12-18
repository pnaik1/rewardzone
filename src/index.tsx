import React from "react";
import ReactDOM from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./MessageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MessageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MessageProvider>
  </React.StrictMode>
);
