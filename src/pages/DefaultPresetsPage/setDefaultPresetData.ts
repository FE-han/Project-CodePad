import { Preset } from "../../components/LaunchPad/utils/types";

export const setNewPresetData = (
  newPresetData: Preset,
  currnetPresetData: Preset,
  setDefaultPresetData: React.Dispatch<React.SetStateAction<Preset>>
) => {
  const newSoundSampleMap = newPresetData.soundSamples.reduce(
    (newMap, soundSample) => {
      newMap.set(soundSample.location, soundSample);
      return newMap;
    },
    new Map()
  );
  const newSoundSamples = currnetPresetData.soundSamples.map(
    (currentSoundSample) => {
      const newSoundSampleData = newSoundSampleMap.get(
        currentSoundSample.location
      );
      if (newSoundSampleData !== undefined) {
        return newSoundSampleData;
      }
      return currentSoundSample;
    }
  );

  setDefaultPresetData({
    presetTitle: newPresetData.presetTitle,
    presetId: newPresetData.presetId,
    areaSize: newPresetData.areaSize,
    soundSamples: newSoundSamples,
  });
};
