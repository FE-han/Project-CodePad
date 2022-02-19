import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NowLoginUserId {
  loginUserId: string;
}

const initialState: NowLoginUserId = {
  loginUserId: "TuWdQ6QcXQHhG-LPsD7mY",
};

export const setNowLoginUserIdSlice = createSlice({
  name: "setNowLoginUserId",
  initialState,
  reducers: {
    getLoginUserId: (state, action: PayloadAction<NowLoginUserId>) => {
      state.loginUserId = action.payload.loginUserId;
    },
  },
});

export const { actions } = setNowLoginUserIdSlice;

export default setNowLoginUserIdSlice.reducer;
