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

interface PresetThumbnail {
  thumbnailImgURL: string;
  thumbnailImgFile: File | undefined;
}

interface NowPresetValueState {
  userId: string;
  presetTitle: string; //Preset
  presetId: string; //Preset
  areaSize: LaunchPadScale; //Preset
  soundSamples: Array<SoundSampleWithFile>; //Preset
  thumbnailImg: PresetThumbnail;
  PrivacyOption: PrivacyType;
  tags: Array<string>;
}

const initialState: NowPresetValueState = {
  userId: "",
  presetTitle: "",
  presetId: "",
  areaSize: 64,
  soundSamples: [],
  thumbnailImg: {
    thumbnailImgURL: "",
    thumbnailImgFile: undefined,
  },
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
    setValueFromPresetTitle: (
      state, 
      action: PayloadAction<Pick<NowPresetValueState, "presetTitle">>) => {
      state.presetTitle = action.payload.presetTitle;
    },
    setValueFromImage: (
      state,
      action: PayloadAction<Pick<NowPresetValueState, "thumbnailImg">>
    ) => {
      state.thumbnailImg = {
        thumbnailImgURL: action.payload.thumbnailImg.thumbnailImgURL,
        thumbnailImgFile: action.payload.thumbnailImg.thumbnailImgFile,
      };
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
    setValueFromUserId: (
      state,
      action: PayloadAction<Pick<NowPresetValueState, "userId">>
    ) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { actions } = setNowPresetValueSlice;

export default setNowPresetValueSlice.reducer;
