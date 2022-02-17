import { PresetListInfoType } from '../../pages/MyPresetsPage/utils/types'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPreset } from "../../api/getPreset";

export interface PresetListInfoDataState extends PresetListInfoType {
    isLoading: boolean
}

const initialPresetListData: PresetListInfoType = {
    presetId : "",
    presetTitle : "",
}

const initialState: PresetListInfoDataState = {
    ...initialPresetListData,
    presetId:"",
    presetTitle:"",
    isLoading: false,
}

export const getPresetListInfoSlice = createSlice({
    name: "getPresetListData",
    initialState,
    reducers:{
        getPresetDataPending:(
            state,
            action: PayloadAction<Pick <PresetListInfoDataState, "presetId" | "presetTitle">>
        ) => {
            state.isLoading = true;
            state.presetId = action.payload.presetId;
            state.presetTitle = action.payload.presetTitle;
        },
        getPresetDataFulfilled:(
            state,
            action: PayloadAction<Pick <PresetListInfoDataState, "presetTitle" | "presetId">>
        ) => {
            state.presetTitle = action.payload.presetTitle;
            state.presetId = action.payload.presetId;
        },
        getPresetDataRejected : (state) => {
            state.isLoading = false;
        },
    },
})

export const { actions } = getPresetListInfoSlice;

export default  getPresetListInfoSlice.reducer;