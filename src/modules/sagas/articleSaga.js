import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { articleActions, articleSlice } from "../slice/articleSlice";
import history from '../../utils/history'

export function* registerArticleAsync(action) {
    const data = action.payload;

    const response = yield Axios.post(`http://localhost:3001/board/`, data);
    alert('저장되었습니다.');
    console.log(response.data.id);

    //저장 후 페이지 이동경로 
    history.push(`/mypresets/enter/`, response.data.id);
    // yield put(articleActions.registerArticleAsync(data)); //redux-saga의 dispatch
    // debugger;
}

export function* getArticleAsync(action) {
    const id = action.payload;

    const response = yield Axios.get(`http://localhost:3001/board/${id}`);

    const request = yield Axios.put(`http://localhost:3001/board/${id}`, {
        ...response.data,
        views: parseInt(response.data.views) + 1,
    })


    yield put(articleActions.getArticleAsync(response.data))
}