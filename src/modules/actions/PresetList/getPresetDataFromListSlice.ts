import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PresetDataFromListState {
  userId?: string;
  presetId?: string;
  thumbnailURL?: string;
}

const initialState: PresetDataFromListState = {
  userId: undefined,
  presetId: undefined,
  thumbnailURL: undefined,
};

export const getPresetDataFromListSlice = createSlice({
  name: "getPresetDataFromList",
  initialState,
  reducers: {
    getNewPresetData: (
      state,
      action: PayloadAction<PresetDataFromListState>
    ) => {
      state.presetId = action.payload.presetId;
      state.userId = action.payload.userId;
      state.thumbnailURL = action.payload.thumbnailURL;
    },
    resetNewPresetData: (state) => {
      state.presetId = undefined;
      state.userId = undefined;
      state.thumbnailURL = undefined;
    },
  },
});

export const { actions } = getPresetDataFromListSlice;

export default getPresetDataFromListSlice.reducer;
