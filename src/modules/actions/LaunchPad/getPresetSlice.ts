import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPresetGenerator } from "../../../components/LaunchPad/utils/initialPresetFormGenerator";
import {
  LaunchPadScale,
  Preset,
} from "../../../components/LaunchPad/utils/types";

export interface PresetDataState extends Preset {
  userId: string;
  isLoading: boolean;
}

const initialPreset = initialPresetGenerator(LaunchPadScale.DEFAULT);

const initialState: PresetDataState = {
  ...initialPreset,
  userId: "",
  isLoading: false,
};

export const getPresetSlice = createSlice({
  name: "getPresetData",
  initialState,
  reducers: {
    getPresetDataPending: (
      state,
      action: PayloadAction<Pick<PresetDataState, "userId" | "presetId">>
    ) => {
      state.userId = action.payload.userId;
      state.presetId = action.payload.presetId;
      state.isLoading = true;
    },
    getPresetDataFulfilled: (state, action: PayloadAction<Preset>) => {
      state.presetTitle = action.payload.presetTitle;
      state.areaSize = action.payload.areaSize;
      state.soundSamples = action.payload.soundSamples;
      state.isLoading = false;
    },
    getPresetDataRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { actions } = getPresetSlice;

export default getPresetSlice.reducer;
