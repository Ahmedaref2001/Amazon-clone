import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
      <ToastContainer/>
        <App />
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
