import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import App from "./App";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { store } from "./modules/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
=======

ReactDOM.render(
  <BrowserRouter>
    <App />
>>>>>>> 6a71dea9d30afc113df0337431646915b9fc1a87
  </BrowserRouter>,
  document.getElementById("root")
);
