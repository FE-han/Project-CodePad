import { PresetData } from "../../../utils/CommonInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PresetListState {
  presetList: Array<PresetData>;
  isLoading: boolean;
}

//상태 초기값
const initialState: PresetListState = {
  presetList: [],
  isLoading: false,
};

export const PresetListSlice = createSlice({
  name: "PresetListSlice",

  initialState,

  reducers: {
    getPresetListPending: (
      state,
      action: PayloadAction<Omit<PresetListState, "isLoading">> //액션 실행시 payload로 받아올(=상태값에 부여할) 값
    ) => {
      state.isLoading = true;
    },
    getPresetListFulFilled: (
      state,
      action: PayloadAction<Omit<PresetListState, "isLoading">>
    ) => {
      const newPrestList = [...state.presetList];

      action.payload.presetList.map((data) => newPrestList.push(data));

      state.presetList = newPrestList;
      state.isLoading = false;
    },
    getPresetListRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { actions } = PresetListSlice; //actions 라는 이름으로 슬라이스를 내보낸다 => 실제 components에서 사용

export default PresetListSlice.reducer; //rootSlice에 등록하기 위한 리듀서들만 내보낸다 => rootSlice 등록용으로만 사용
