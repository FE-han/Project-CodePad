import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CustomRouter from "./utils/CustomRouter";
import "./reset.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import history  from './utils/history';
// import { store } from "./modules/store";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </Provider>,
  document.getElementById("root")
);
