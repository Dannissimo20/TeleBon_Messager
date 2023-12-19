import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ThemeProvider } from 'styled-components';

import theme from './assets/theme';
import themeDark from './assets/themeDark';
import reportWebVitals from './reportWebVitals';
import stores from './store';
import routes from './utils/routes';

import 'react-toastify/dist/ReactToastify.css';
import './utils/lang';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const themes: any = {
  default: theme,
  dark: themeDark
};

root.render(
  <>
    <Provider {...stores}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      closeOnClick
      pauseOnHover
      theme='colored'
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
