import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../../slice/articleSlice';

//페이지 한개 불러오기
function ArticlePage({ match, location }) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(articleActions.getArticle(match.params.articleId));
    },[match.params.articleId]);

    const { id, title } = useSelector((state)=>({
        id: state.articleReducers.id,
        title: state.articleReducers.title,
    }));

    const views = useSelector((state)=> state.articleReducers.views)
    
    return <div style={{height:"50px", width:"500px", border:"1px solid white", color:'white', backgroundColor:'#8e8e8e'}}>제목:{title}<br />조회수:{views}</div>
}

export default ArticlePage;