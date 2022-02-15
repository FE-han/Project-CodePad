import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bindNextbar } from "../../utils/bindNextbar";

interface LoopSoundGroupState {
  isPlay: boolean;
  soundGroup: {
    [key: string]: Array<string>;
  };
  nowPlayingSampleSounds: Array<string>;
  nowBar: Bar;
}

const initialState: LoopSoundGroupState = {
  isPlay: false,
  soundGroup: {
    bar1: [],
    bar2: [],
    bar3: [],
    bar4: [],
    bar5: [],
    bar6: [],
    bar7: [],
    bar8: [],
  },
  nowPlayingSampleSounds: [],

  nowBar: "bar1",
};

export type Bar =
  | "bar1"
  | "bar2"
  | "bar3"
  | "bar4"
  | "bar5"
  | "bar6"
  | "bar7"
  | "bar8";

interface SelectLoopParams {
  location: string;
  nowBar: Bar;
}

export const loopSoundGroupSlice = createSlice({
  name: "loopSoundGroup",
  initialState,
  reducers: {
    selectLoopSound: (state, action: PayloadAction<SelectLoopParams>) => {
      state.isPlay = true;

      const currentStagedSampleSounds = state.nowPlayingSampleSounds;
      const unduplicatedStagedSampleSoundsSet = new Set(
        currentStagedSampleSounds
      );
      unduplicatedStagedSampleSoundsSet.add(action.payload.location);
      const newStagedSampleSounds = Array.from(
        unduplicatedStagedSampleSoundsSet
      );

      state.nowPlayingSampleSounds = newStagedSampleSounds;

      if (newStagedSampleSounds.length === currentStagedSampleSounds.length)
        return;

      const targetbar = bindNextbar(state.nowBar);
      state.soundGroup = {
        ...state.soundGroup,
        [targetbar]: [...state.soundGroup[targetbar], action.payload.location],
      };
    },
    deselectLoopSound: (state, action: PayloadAction<SelectLoopParams>) => {
      state.nowPlayingSampleSounds = state.nowPlayingSampleSounds.filter(
        (StagedSampleSound) => StagedSampleSound !== action.payload.location
      );

      for (const bars in state.soundGroup) {
        state.soundGroup[bars].map((stagedLocation) => {
          if (stagedLocation === action.payload.location) {
            state.soundGroup[bars] = state.soundGroup[bars].filter(
              (stagedLocation) => stagedLocation !== action.payload.location
            );
          }
        });
      }

      if (state.nowPlayingSampleSounds.length === 0) {
        state.isPlay = false;
      }
    },
    checkNowBar: (state, action: PayloadAction<Bar>) => {
      state.nowBar = action.payload;
    },
  },
});

export const { actions } = loopSoundGroupSlice;

export default loopSoundGroupSlice.reducer;
