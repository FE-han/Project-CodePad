import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Preset } from "../../../components/LaunchPad/utils/types";

interface SoundButtonElementState {
  location: string;
  state: "ONESHOT" | "EMPTY" | "STOP" | "WAIT_PLAY" | "PLAY" | "WAIT_STOP";
}

interface SoundButtonsState {
  soundSamples: Array<SoundButtonElementState>;
}

function initialStateGenerator(scale: number): Array<SoundButtonElementState> {
  const soundSamples: Array<SoundButtonElementState> = [];

  for (let x = 0; x < scale; x++) {
    for (let y = 0; y < scale; y++) {
      soundSamples.push({
        location: `${x}X${y}`,
        state: "EMPTY",
      });
    }
  }

  return soundSamples;
}

const initialState: SoundButtonsState = {
  soundSamples: initialStateGenerator(8), //scale 64 = 8*8
};

export const soundButtonsStateSlice = createSlice({
  name: "soundButtonsState",
  initialState,
  reducers: {
    setButtonState: (
      state,
      action: PayloadAction<Pick<Preset, "soundSamples">>
    ) => {
      const newSoundSamplesMap = new Array();
      action.payload.soundSamples.map((soundSample) => {
        if (soundSample.buttonType === "LOOP") {
          newSoundSamplesMap.push({
            location: soundSample.location,
            state: "STOP",
          });
        }
        if (soundSample.buttonType === "ONESHOT") {
          newSoundSamplesMap.push({
            location: soundSample.location,
            state: "EMPTY",
          });
        }
      });
      state.soundSamples = newSoundSamplesMap;
    },
    changeButtonState: (
      state,
      action: PayloadAction<SoundButtonElementState>
    ) => {
      const newSoundButtonsState = state.soundSamples.map((soundSample) => {
        if (soundSample.location === action.payload.location) {
          return {
            location: action.payload.location,
            state: action.payload.state,
          };
        }
        return soundSample;
      });
      state.soundSamples = newSoundButtonsState;
    },
  },
});

export const { actions } = soundButtonsStateSlice;

export default soundButtonsStateSlice.reducer;
