import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import App from "./App";
import { Provider } from "react-redux";
// import { store } from "./modules/store"; 원래서버
import store from './store' //내가 시험하는 서버(한대현)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
