import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Preset } from "./utils/types";
import OneShotButton from "./OneShotButton";
import LoopButton from "./LoopButton";
import EmptyButton from "./EmptyButton";
import Metronome from "./Metronome";
import { useAppSelector } from "../../modules/hooks";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { actions as soundButtonsActions } from "../../modules/actions/soundButtonsSlice";
import { actions as loopSoundGroupActions } from "../../modules/actions/loopSoundGroupSlice";
import { LaunchPadStyles } from "../LaunchPad";
import LaunchpadHeaderContainer from "./LaunchPadHeaderContainer";

interface LaunchPadProps {
  presetData: Preset;
  sampleSoundMap: Map<string, string>; //<K=location, V=sampleSoundURL>
}

function RenderButtons({ presetData }: Pick<LaunchPadProps, "presetData">) {
  const classes = LaunchPadStyles();

  return (
    <div className={classes.btnContainer}>
      {presetData.soundSamples.map(
        (
          { soundSampleId, soundSampleURL, buttonType, soundType, location },
          idx
        ) => {
          switch (buttonType) {
            case "ONESHOT":
              return (
                <div key={soundSampleId + location}>
                  <OneShotButton
                    soundSampleURL={soundSampleURL}
                    buttonType={buttonType}
                    soundType={soundType}
                    location={location}
                  />
                </div>
              );

            case "LOOP":
              return (
                <div key={soundSampleId + location}>
                  <LoopButton
                    soundSampleURL={soundSampleURL}
                    buttonType={buttonType}
                    soundType={soundType}
                    location={location}
                  />
                </div>
              );

            default:
              return (
                <div key={soundSampleId + location}>
                  <EmptyButton />
                </div>
              );
          }
        }
      )}
    </div>
  );
}

//8x8 scale
export function LaunchPadEdit({ presetData, sampleSoundMap }: LaunchPadProps) {
  const classes = LaunchPadStyles();

  return (
    <>
      <div className={classes.root}>
        생성/수정용
        <LaunchpadHeaderContainer
          title={presetData.presetTitle}
          onlyFork={true}
        />
        <RenderButtons presetData={presetData} />
      </div>
    </>
  );
}

export default LaunchPadEdit;
