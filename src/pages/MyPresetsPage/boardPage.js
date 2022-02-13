import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoardList from './boardList';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slice/boardSlice';

//보드정보 불러오기
function BoardPage(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(boardActions.getBoard());
    },[dispatch]);

    const board = useSelector((state)=> state.boardReducers.board);
    
    return (
        
        <BoardList board={board} />
        
    )
}

export default BoardPage;