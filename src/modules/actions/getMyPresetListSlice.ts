import { PresetListElement } from "../../pages/MyPresetsPage/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMyPresetParams } from "../../api/getMyPresetList";

export interface PresetListState {
  presetList: Array<PresetListElement>;
  isLoading: boolean;
}

const initialState: PresetListState = {
  presetList: [],
  isLoading: false,
};

export const getMyPresetListSlice = createSlice({
  name: "getMyPresetList",
  initialState,
  reducers: {
    getPresetDataPending: (state, action: PayloadAction<GetMyPresetParams>) => {
      state.isLoading = true;
    },
    getPresetDataFulfilled: (
      state,
      action: PayloadAction<Omit<PresetListState, "isLoading">>
    ) => {
      state.presetList = action.payload.presetList;
      state.isLoading = false;
    },
    getPresetDataRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { actions } = getMyPresetListSlice;

export default getMyPresetListSlice.reducer;
