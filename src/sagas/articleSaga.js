import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { articleActions } from "../slice/articleSlice";

export function* registerArticleAsync(action) {
    const data = action.payload;

    const postedData = yield Axios.post(`http://localhost:3001/presets/`, data);
    yield alert('저장되었습니다.');
    console.log(postedData);
    // yield put(articleActions.registerArticleAsync(data)); //redux-saga의 dispatch
    // debugger;
}