import { combineReducers } from "redux";
import { articleReducers } from "./articleSlice";
import { boardReducers } from "./boardSlice";

const rootReducer = combineReducers({ articleReducers, boardReducers });

export default rootReducer;