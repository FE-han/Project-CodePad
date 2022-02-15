import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bindNextbar } from "../../utils/bindNextbar";

interface LoopSoundGroupState {
  isPlay: boolean;
  soundGroup: {
    bar1: Array<string>;
    bar2: Array<string>;
    bar3: Array<string>;
    bar4: Array<string>;
    bar5: Array<string>;
    bar6: Array<string>;
    bar7: Array<string>;
    bar8: Array<string>;
  };
  nowStagedSampleSounds: Array<string>;
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
  nowStagedSampleSounds: [],
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
    selectLoopSound: (
      state,
      action: PayloadAction<Omit<SelectLoopParams, "nowStagedSampleCount">>
    ) => {
      state.isPlay = true;

      const currentStagedSampleSounds = state.nowStagedSampleSounds;
      const unduplicatedStagedSampleSoundsSet = new Set(
        currentStagedSampleSounds
      );
      unduplicatedStagedSampleSoundsSet.add(action.payload.location);
      const newStagedSampleSounds = Array.from(
        unduplicatedStagedSampleSoundsSet
      );

      state.nowStagedSampleSounds = newStagedSampleSounds;

      if (newStagedSampleSounds.length === currentStagedSampleSounds.length)
        return;

      const targetbar = bindNextbar(state.nowBar);
      state.soundGroup = {
        ...state.soundGroup,
        [targetbar]: [...state.soundGroup[targetbar], action.payload.location],
      };
    },
    deselectLoopSound: (
      state,
      action: PayloadAction<Omit<SelectLoopParams, "nowStagedSampleCount">>
    ) => {
      state.nowStagedSampleSounds = state.nowStagedSampleSounds.filter(
        (StagedSampleSound) => StagedSampleSound !== action.payload.location
      );

      const group = state.soundGroup;
      const bars = Object.keys(state.soundGroup);
      // bars.map(bar => {
      //   group[bar]
      // })

      if (state.nowStagedSampleSounds.length === 0) {
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
