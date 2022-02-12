import { takeevery, takeLatest } from "redux-saga/effects";
import { articleActions } from "../slice/articleSlice";
import { registerArticleAsync } from "./articleSaga";

const { registerArticle } = articleActions;

export default function* rootWatcher() {
    yield takeLatest(registerArticle.type, registerArticleAsync);
}