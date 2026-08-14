import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import ReactQueryClientProvider from "../provider/ReactQueryClientProvider.jsx";
import NavBar from "./Components/common/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <ReactQueryClientProvider>
        <App />
      </ReactQueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
