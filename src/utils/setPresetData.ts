import { Preset } from "../components/LaunchPad/types";

interface setPresetDataProps {
  nowPresetData: Preset;
  defaultPresetData: Preset;
  setDefaultPresetData: React.Dispatch<React.SetStateAction<Preset>>;
}

export const setPresetData = ({
  nowPresetData,
  defaultPresetData,
  setDefaultPresetData,
}: setPresetDataProps) => {
  const newSoundSampleMap = nowPresetData.soundSamples.reduce(
    (newMap, soundSample) => {
      newMap.set(soundSample.location, soundSample);
      return newMap;
    },
    new Map()
  );
  const newSoundSamples = defaultPresetData.soundSamples.map(
    (defaultSoundSample) => {
      const newSoundSampleData = newSoundSampleMap.get(
        defaultSoundSample.location
      );
      if (newSoundSampleData !== undefined) {
        return newSoundSampleData;
      }
      return defaultSoundSample;
    }
  );

  setDefaultPresetData({
    presetTitle: nowPresetData.presetTitle,
    presetId: nowPresetData.presetId,
    areaSize: nowPresetData.areaSize,
    soundSamples: newSoundSamples,
  });
};

export default setPresetData;
