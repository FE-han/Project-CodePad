import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducers } from "./rootSlice";

export const createRootReducer = () =>
  combineReducers({
    ...reducers,
  });

export const store = configureStore({
  reducer: createRootReducer(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
