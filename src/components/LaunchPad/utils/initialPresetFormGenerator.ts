import { LaunchPadScale, Preset, SoundSample } from "./types";

function initialSoundSampleGenerator(location: string) {
  const initialSoundSample: SoundSample = {
    location,
  };
  return initialSoundSample;
}

export function initialPresetGenerator(scale: LaunchPadScale) {
  const LaunchPadLength = Math.sqrt(scale);
  const initialPreset: Preset = {
    presetTitle: "untitled",
    presetId: "unsaved",
    areaSize: scale,
    soundSamples: [],
  };

  //일단 2중 for문으로 만듦. but, magicNumber를 제거하고 좋은코드로 수정해야함
  for (let x = 0; x < LaunchPadLength; x++) {
    for (let y = 0; y < LaunchPadLength; y++) {
      initialPreset.soundSamples.push(initialSoundSampleGenerator(`${x}X${y}`));
    }
  }
  return initialPreset;
}
