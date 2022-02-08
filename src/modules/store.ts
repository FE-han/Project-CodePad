import { createStore, combineReducers, compose } from "redux";
import getPresetReducer from "./actions/getPresetActions";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {
  getPresetReducer,
};

const rootReducer = () =>
  combineReducers({
    ...reducers,
  });

export const store = createStore(rootReducer, composeEnhancers());
