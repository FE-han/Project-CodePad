//1. 최상단에 자신이 작성한 슬라이스를 불러온다
import getPresetSlice from "./actions/getPresetSlice";
import presetListSlice from "./actions/CommunityContents/presetListSlice";
import loopSoundGroupSlice from "./actions/loopSoundGroupSlice";
import soundButtonsStateSlice from "./actions/soundButtonsSlice";

export const reducers = {
  //2. 작성한 슬라이스를 여기에 추가한다.
  getPresetSlice,
  presetListSlice,
  loopSoundGroupSlice,
  soundButtonsStateSlice,
};
