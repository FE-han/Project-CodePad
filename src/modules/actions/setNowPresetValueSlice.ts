import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LaunchPadScale,
  Preset,
  SoundSample,
} from "../../components/LaunchPad/utils/types";
import { PrivacyType } from "../../utils/CommonValue";

interface SoundSampleWithFile extends SoundSample {
  soundFile: File | undefined;
}

interface NowPresetValueState {
  presetTitle: string; //Preset
  presetId: string; //Preset
  areaSize: LaunchPadScale; //Preset
  soundSamples: Array<SoundSampleWithFile>; //Preset
  thumbnailImgURL: string;
  PrivacyOption: PrivacyType;
  tags: Array<string>;
}

const initialState: NowPresetValueState = {
  presetTitle: "",
  presetId: "",
  areaSize: 64,
  soundSamples: [],
  thumbnailImgURL: "",
  PrivacyOption: "PUBLIC",
  tags: [],
};

export const setNowPresetValueSlice = createSlice({
  name: "setNowPresetValue",
  initialState,
  reducers: {
    setValueFromPreset: (state, action: PayloadAction<Preset>) => {
      state.presetTitle = action.payload!.presetTitle || "untitled";
      state.presetId = action.payload.presetId || "unsaved";
      state.areaSize = action.payload.areaSize || LaunchPadScale.DEFAULT;

      const canSaveFileForm = action.payload.soundSamples.map((soundSample) => {
        return {
          ...soundSample,
          soundFile: undefined,
        };
      });

      state.soundSamples = canSaveFileForm;
    },
    setValueFromImage: (
      state,
      action: PayloadAction<Pick<NowPresetValueState, "thumbnailImgURL">>
    ) => {
      state.thumbnailImgURL = action.payload.thumbnailImgURL;
    },
    setValueFromPrivacyOption: (
      state,
      action: PayloadAction<Pick<NowPresetValueState, "PrivacyOption">>
    ) => {
      state.PrivacyOption = action.payload.PrivacyOption;
    },
    setValueFromTags: (
      state,
      action: PayloadAction<Pick<NowPresetValueState, "tags">>
    ) => {
      state.tags = action.payload.tags;
    },
  },
});

export const { actions } = setNowPresetValueSlice;

export default setNowPresetValueSlice.reducer;
