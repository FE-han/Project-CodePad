import { LaunchPadScale, Preset, SoundSample } from "./types";
import {
  NowPresetValueState,
  SoundSampleWithFile,
} from "../../../modules/actions/setNowPresetValueSlice";

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
    userId: "unknownMan",
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

function initialSoundSampleWithFileGenerator(location: string) {
  const initialSoundSample: SoundSampleWithFile = {
    location,
  };
  return initialSoundSample;
}

export function initialEditPresetGenerator(scale: LaunchPadScale) {
  const LaunchPadLength = Math.sqrt(scale);
  const initialPreset: NowPresetValueState = {
    userId: "",
    presetTitle: "untitled",
    presetId: "unsaved",
    areaSize: scale,
    soundSamples: [],
    thumbnailImg: {
      thumbnailImgURL: "",
      thumbnailImgFile: undefined,
    },
    PrivacyOption: "PUBLIC",
    tags: [],
  };

  for (let x = 0; x < LaunchPadLength; x++) {
    for (let y = 0; y < LaunchPadLength; y++) {
      initialPreset.soundSamples.push(
        initialSoundSampleWithFileGenerator(`${x}X${y}`)
      );
    }
  }
  return initialPreset;
}
