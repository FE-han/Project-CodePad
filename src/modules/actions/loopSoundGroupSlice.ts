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
};

interface SelectLoopParams {
  location: string;
  nowBar: "bar1" | "bar2" | "bar3" | "bar4" | "bar5" | "bar6" | "bar7" | "bar8";
}

export const loopSoundGroupSlice = createSlice({
  name: "loopSoundGroup",
  initialState,
  reducers: {
    selectLoopSound: (state, action: PayloadAction<SelectLoopParams>) => {
      const selectedBar = action.payload.nowBar;
      state.isPlay = true;
      state.soundGroup = {
        ...state.soundGroup,
        [selectedBar]: [
          ...state.soundGroup[selectedBar],
          action.payload.location,
        ],
      };
    },
  },
});

export const { actions } = loopSoundGroupSlice;

export default loopSoundGroupSlice.reducer;
