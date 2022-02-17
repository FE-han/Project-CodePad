import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SoundSample } from "../../../components/LaunchPad/utils/types";

interface SelectedButtonState extends SoundSample {
  soundFile?: File;
}

const initialState: SelectedButtonState = {
  location: "",
  soundSampleId: undefined,
  soundSampleURL: undefined,
  buttonType: "ONESHOT",
  soundType: "FX",
  soundFile: undefined,
};

export const selectedButtonSlice = createSlice({
  name: "selectedButton",
  initialState,
  reducers: {
    selectButton: (state, action: PayloadAction<SelectedButtonState>) => {
      state.location = action.payload.location;
      state.soundSampleId = action.payload.soundSampleId;
      state.soundSampleURL = action.payload.soundSampleURL;
      state.buttonType = action.payload.buttonType;
      state.soundType = action.payload.soundType;
      state.soundFile = action.payload.soundFile;
    },
    resetSelectButton: (state, action: PayloadAction<SelectedButtonState>) => {
      state.location = "";
      state.soundSampleId = undefined;
      state.soundSampleURL = undefined;
      state.buttonType = "ONESHOT";
      state.soundType = "FX";
      state.soundFile = undefined;
    },
  },
});

export const { actions } = selectedButtonSlice;

export default selectedButtonSlice.reducer;
