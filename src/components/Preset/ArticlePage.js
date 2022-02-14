import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { articleActions } from '../../modules/slice/articleSlice';

//페이지 한개 불러오기
function ArticlePage() {
    const dispatch = useDispatch();
    const { presetId } = useParams(); 
    console.log(presetId);
    useEffect(()=>{
        dispatch(articleActions.getArticle(presetId));
    },[presetId]);

    

    const { id, title } = useSelector((state)=>({
        id: state.articleReducers.id,
        title: state.articleReducers.title,
    }));
    
    const views = useSelector((state)=> state.articleReducers.views)
    
    return (<div>{title}, {views}</div> )
    
}
 
export default ArticlePage; 

