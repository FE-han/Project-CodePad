import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./modules/store";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/snackBarMessage";

//redux-saga 적용했다가 돌렸음 0216 1213

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
