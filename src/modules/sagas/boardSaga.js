import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { boardActions } from '../slice/boardSlice';


export function* getBoardAsync() {
    const response = yield Axios.get(`http://localhost:3001/board`);

    try {
        yield put(boardActions.getBoardSuccessAsync(response.data))
    } catch (e) {
        yield put(boardActions.getBoardFailedAsync(e.message))
    }
}