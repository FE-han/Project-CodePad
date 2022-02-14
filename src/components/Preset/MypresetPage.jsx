import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyPresetList from './MyPresetList';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../modules/slice/boardSlice';

//보드정보 불러오기
function BoardPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(boardActions.getBoard());
    }, [dispatch]);

    const board = useSelector((state) => state.boardReducers.board);

    return (

        <
        MyPresetList board = { board }
        />

    )
}

export default BoardPage;