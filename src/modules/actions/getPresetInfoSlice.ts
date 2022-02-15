 import { PresetInfoType } from "../../pages/UpdatePresetsPage/utils/types";
 import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PresetInfoDataState extends PresetInfoType {
    isLoading: boolean
}

const initialPresetData: PresetInfoType = {
    presetTitle: "",
    presetId: "",
    thumbnailImageURL: "",
    isPrivate: true,
};

const initialState: PresetInfoDataState = {
    ...initialPresetData,
    isLoading: false,
  };
 
export const getPresetInfoSlice = createSlice({
    name: "getPresetData",
    initialState,
    reducers: {
        getPresetDataPending: (
            state,
            action: PayloadAction<Omit<PresetInfoDataState, "isLoading">>
        ) => {
            state.isLoading = true;
        },
        getPresetDataFulfilled: (
            state,
            action: PayloadAction<Pick<PresetInfoDataState, "presetTitle" | "presetId" | "thumbnailImageURL" | "isPrivate">>
        ) => {
            state.presetTitle = action.payload.presetTitle;
            state.presetId = action.payload.presetId;
            state.thumbnailImageURL = action.payload.thumbnailImageURL;
            state.isPrivate = action.payload.isPrivate;
            state.isLoading = false;
        },
        getPresetDataRejected: (state) => {
            state.isLoading = false;
        },
    },
});
 
 export const { actions } = getPresetInfoSlice;
 
 export default getPresetInfoSlice.reducer;
 