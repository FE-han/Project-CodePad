import {
  LaunchPadScale,
  Preset,
  SoundSample,
  SoundSampleLocation,
} from "./types";

function initialSoundSampleGenerator(location: SoundSampleLocation) {
  const initialSoundSample: SoundSample = {
    location,
    soundSampleId: null,
    soundSampleURL: null,
    buttonType: null,
    soundType: null,
  };
  return initialSoundSample;
}

export function initialPresetGenerator(scale: LaunchPadScale) {
  const LaunchPadLength = Math.sqrt(scale);
  const initialPreset: Preset = {
    presetTitle: "none",
    presetId: "none",
    areaSize: scale,
    soundSamples: [],
  };

  //일단 2중 for문으로 만듦. but, magicNumber를 제거하고 좋은코드로 수정해야함
  for (let x = 0; x < LaunchPadLength; x++) {
    for (let y = 0; y < LaunchPadLength; y++) {
      initialPreset.soundSamples.push(initialSoundSampleGenerator({ x, y }));
    }
  }
  return initialPreset;
}
