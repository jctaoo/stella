import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import doSiteConfig from "./SiteConfig";

import './Styles/index.scss';
import './Styles/Font.css';
import 'antd/dist/antd.css'
import 'katex/dist/katex.min.css';

doSiteConfig();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

