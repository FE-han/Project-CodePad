//1. 최상단에 자신이 작성한 슬라이스를 불러온다
import getPresetSlice from "./actions/LaunchPad/getPresetSlice";
import presetListSlice from "./actions/CommunityContents/presetListSlice";
import getMyPresetListSlice from "./actions/getMyPresetListSlice";
import loopSoundGroupSlice from "./actions/LaunchPad/loopSoundGroupSlice";
import soundButtonsStateSlice from "./actions/LaunchPad/soundButtonsSlice";
import setNowPresetValueSlice from "./actions/setNowPresetValueSlice";
import selectedButtonSlice from "./actions/LaunchPadEdit/selectedButtonSlice";
import setNowLoginUserIdSlice from "./actions/setNowLoginUserIdSlice";

export const reducers = {
  //2. 작성한 슬라이스를 여기에 추가한다.
  getPresetSlice,
  presetListSlice,
  loopSoundGroupSlice,
  soundButtonsStateSlice,
  getMyPresetListSlice,
  setNowPresetValueSlice,
  selectedButtonSlice,
  setNowLoginUserIdSlice,
};
