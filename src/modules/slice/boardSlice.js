import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        board: [],
        isLoading: true,
        isSuccess: false,
        error: null,
    },
    reducers: {
        getBoard: (state, { payload }) => {
            console.log('게시글 목록 조회 액션 호출 -- getboard');
        },
        getBoardSuccessAsync: (state, { payload: data }) => {
            console.log('saga에서 put 액션 호출 -- getboardSuccessAsync')
            return {
                ...state,
                board: data,
                isSuccess: true,
                isLoading: false,
            }
        },
        getBoardFailedAsync: (state, { payload: error }) => {
            console.log('saga에서 put 액션 호출 -- getboardFailedAsync')
            return {
                ...state,
                isLoading: false,
                error: error,
            }
        },
        // getBoardAsync: (state, { payload: data }) => {
        //     return {
        //         ...state,
        //         board: data,
        //         inSuccess: true,
        //         isLoading: false,
        //     }
        // }
    }
});

export const boardReducers = boardSlice.reducer;
export const boardActions = boardSlice.actions;