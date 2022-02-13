import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Router } from 'react-router';
import "./reset.css";
import App from "./App";
import { Provider } from "react-redux";
import history  from './utils/history';
import CustomRouter from './utils/customRouter';
// import { store } from "./modules/store"; 원래서버
import store from './store' //내가 시험하는 서버(한대현)


ReactDOM.render(
  <Provider store={store}>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </Provider>,
  document.getElementById("root")
);
