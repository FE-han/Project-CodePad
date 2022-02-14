export enum LaunchPadScale {
  DEFAULT = 64,
  MINI = 16,
}

export type OneShotSoundType = "FX" | "DRUM" | "PERC" | "VOCAL";
export type LoopSoundType = "SYNTH" | "DRUMS" | "MELODIC" | "VOCAL" | "CHORD";

export interface SoundSample {
  location: string;
  soundSampleId?: string;
  soundSampleURL?: string;
  buttonType?: "ONESHOT" | "LOOP";
  soundType?: OneShotSoundType | LoopSoundType;
}
export interface Preset {
  presetTitle?: string;
  presetId?: string;
  areaSize?: LaunchPadScale;
  soundSamples: Array<SoundSample>;
}
