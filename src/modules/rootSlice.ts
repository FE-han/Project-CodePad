//1. 최상단에 자신이 작성한 슬라이스를 불러온다
import exampleSlice from "./actions/exampleSlice";
import presetListSlice from "./actions/CommunityContents/presetListSlice";

export const reducers = {
  //2. 작성한 슬라이스를 여기에 추가한다.
  exampleSlice,
  presetListSlice,
};
