import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalData } from "../../pages/RTKPage";

//다룰 state값.
//관리할 값(PersonalData) + isLoading(boolean)을 추천한다.
//그 이유는 해당 액션이 진행중일때, 완료되었을때를 구분하기 위함임.
export interface PersonalDataState extends PersonalData {
  isLoading: boolean;
}

//상태 초기값
const initialState: PersonalDataState = {
  name: "",
  phoneNumber: "",
  age: 0,
  isLoading: false,
};

export const exampleSlice = createSlice({
  //슬라이스를 식별할 수 있는 이름을 작성한다
  name: "RTK_example",
  //관리할 상태값의 초기값을 배정한다
  initialState,
  //상태값을 handle할 액션들을 reducer로 선언한다. pending(액션시작), fulfilled(수행완료), rejected(수행실패) 3가지로 나누는것을 추천한다.
  reducers: {
    getPersonalDataPending: (
      state,
      action: PayloadAction<Omit<PersonalDataState, "isLoading">> //액션 실행시 payload로 받아올(=상태값에 부여할) 값
    ) => {
      state.isLoading = true;
    },
    getPersonalDataFulFilled: (
      state,
      action: PayloadAction<Omit<PersonalDataState, "isLoading">>
    ) => {
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.age = action.payload.age;
      state.isLoading = false;
    },
    getPersonalDataRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { actions } = exampleSlice; //actions 라는 이름으로 슬라이스를 내보낸다 => 실제 components에서 사용

export default exampleSlice.reducer; //rootSlice에 등록하기 위한 리듀서들만 내보낸다 => rootSlice 등록용으로만 사용
