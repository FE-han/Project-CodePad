import { NowPresetValueState } from "../modules/actions/setNowPresetValueSlice";

export const setBasePresetFormData = (
  nowHandlePresetData: NowPresetValueState
) => {
  const BasePresetFormData = new FormData();
  BasePresetFormData.append("presetId", nowHandlePresetData.presetId);
  BasePresetFormData.append("title", nowHandlePresetData.presetTitle);
  BasePresetFormData.append(
    "img",
    nowHandlePresetData.thumbnailImg.thumbnailImgFile || ""
  );
  BasePresetFormData.append("isPrivate", JSON.stringify(false));
  BasePresetFormData.append("tags", JSON.stringify(nowHandlePresetData.tags));
  return BasePresetFormData;
};

interface SetPresetSoundFormDataArrayParams {
  nowHandlePresetData: NowPresetValueState;
  targetPresetId: string;
}

interface asd {}
export const setPresetSoundFormDataArray = ({
  nowHandlePresetData,
  targetPresetId,
}: SetPresetSoundFormDataArrayParams) => {
  const presetSoundFormDataArray = new Array<Map<string, FormData>>();

  nowHandlePresetData.soundSamples.map((soundSample) => {
    const buttonMapData = new Map();
    const soundSampleFormData = new FormData();

    soundSampleFormData.append("sound", soundSample.soundFile || "");
    soundSampleFormData.append("presetId", targetPresetId);
    soundSampleFormData.append("location", soundSample.location);
    soundSampleFormData.append("buttonType", soundSample.buttonType || "");
    soundSampleFormData.append("soundType", soundSample.soundType || "");

    buttonMapData.set(soundSample.location, soundSampleFormData);
    presetSoundFormDataArray.push(buttonMapData);
  });

  return presetSoundFormDataArray;
};
