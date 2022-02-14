import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  nowStagedSampleCount: number;
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
  nowStagedSampleCount: 0,
  nowBar: "bar1",
};

type Bar =
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
      state.soundGroup = {
        ...state.soundGroup,
        [state.nowBar]: [
          ...state.soundGroup[state.nowBar],
          action.payload.location,
        ],
      };
      state.nowStagedSampleCount += 1;
    },
    deselectLoopSound: (
      state,
      action: PayloadAction<Omit<SelectLoopParams, "nowStagedSampleCount">>
    ) => {
      state.nowStagedSampleCount -= 1;
      // for ( const bar in state.soundGroup) {
      //   bar.
      // }
    },
    checkNowBar: (state, action: PayloadAction<Bar>) => {
      state.nowBar = action.payload;
    },
  },
});

export const { actions } = loopSoundGroupSlice;

export default loopSoundGroupSlice.reducer;
