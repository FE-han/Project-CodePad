import { NowPresetValueState } from "../modules/actions/setNowPresetValueSlice";

interface SetSecondPresetFormDataParams {
  nowHandlePresetData: NowPresetValueState;
  targetPresetId: string;
}

export const setSecondPresetFormData = ({
  nowHandlePresetData,
  targetPresetId,
}: SetSecondPresetFormDataParams) => {
  const secondFormData = new FormData();
  if (nowHandlePresetData.soundSamples === undefined) return;
  secondFormData.append(
    "sound",
    nowHandlePresetData.soundSamples[0].soundFile || ""
  );
  secondFormData.append("presetId", targetPresetId);
  secondFormData.append(
    "location",
    nowHandlePresetData.soundSamples[0].location
  );
  secondFormData.append(
    "buttonType",
    nowHandlePresetData.soundSamples[0].buttonType || ""
  );
  secondFormData.append(
    "soundType",
    nowHandlePresetData.soundSamples[0].soundType || ""
  );
  return secondFormData;
};

export default setSecondPresetFormData;
