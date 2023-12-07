import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "styled-components";
import theme from "./assets/theme";
import routes from "./utils/routes";
import { Provider } from "mobx-react";
import stores from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import themeDark from "./assets/themeDark";
import './utils/lang';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const themes: any = {
  default: theme,
  dark: themeDark,
};

root.render(
  <>
    <Provider {...stores}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
