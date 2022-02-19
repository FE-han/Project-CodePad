import { TagsElement } from '../../pages/HandleMyPresetPage/utils/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetTags } from '../../api/getTags';

export interface TagsState {
    data: Array<TagsElement>
    isLoading: boolean;
}

const initialState: TagsState = {
    isLoading: false,
    data: [],
}
export const getTagsSlice = createSlice({
    name: "getTags",
    initialState,
    reducers:{
        getTagsDataPending: (state, action: PayloadAction<GetTags>) => {
            state.isLoading = true;
        },
        getTagsDataFulfilled: (
            state,
            action: PayloadAction<Omit<TagsState, "isLoading">>
        ) =>{
            state.data = action.payload.data;
            state.isLoading = false;
        },
        getTagsDataRejecterd: (state)=>{
            state.isLoading = false;
        },     
    },
});

export const { actions } = getTagsSlice;

export default getTagsSlice.reducer;