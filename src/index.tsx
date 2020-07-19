import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import './Styles/Font.css';
import * as serviceWorker from './serviceWorker';
import HomePage from "./Pages/HomePage/HomePage";
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
