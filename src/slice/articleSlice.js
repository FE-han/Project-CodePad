import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name: 'article',
    initialState: { id: 0, title: '', views: 0 },
    reducers: {
        registerArticle: (state, { payload: article }) => {
            console.log(article);
            // return {
            //     ...article,
            //     id: state.id,
            // }
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