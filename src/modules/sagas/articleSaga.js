import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { articleActions, articleSlice } from "../slice/articleSlice";
import history from '../../utils/history'

export function* registerArticleAsync(action) {
    const data = action.payload;

    const response = yield Axios.post(`http://localhost:3001/board/`, data);
    alert('저장되었습니다.');
    console.log(response.data.id);

    history.push(`/mypresets/enter/${response.data.id}`, response.data.id);
    // yield put(articleActions.registerArticleAsync(data)); //redux-saga의 dispatch
    // debugger;
}

export function* getArticleAsync(action) {
    const id = action.payload;

    const response = yield Axios.get(`http://localhost:3001/board/${id}`);

    console.log(response.data);

    yield put(articleActions.getArticleAsync(response.data))
}