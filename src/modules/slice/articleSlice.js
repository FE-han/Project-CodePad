import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name: 'article',
    initialState: { id: 0, title: '', views: 0 },
    reducers: {
        registerArticle: (state, { payload: article }) => {
            console.log(article);
        },
        getArticle: (state, { payload: id }) => {
            console.log(id);
        },
        getArticleAsync: (state, { payload: article }) => {
            console.log(article);
            console.log('saga에서 put 액션 호출 -- getArticleAsync');
            return {
                ...state,
                id: article.id,
                title: article.title,
                views: article.views,
            }
        },
        registerArticleAsync: (state, { payload }) => {
            console.log(payload);
            debugger;
            return {
                ...state,
                id: payload.id,
            }
        },
    },
});

export const articleReducers = articleSlice.reducer;
export const articleActions = articleSlice.actions;