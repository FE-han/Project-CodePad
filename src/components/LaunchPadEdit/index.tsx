import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Preset } from "./utils/types";
import { LaunchPadStyles } from "../LaunchPad";
import LaunchpadHeaderContainer from "./LaunchPadHeaderContainer";
import { LaunchPadEditButton } from "./LaunchPadEditButton";

interface LaunchPadEditProps {
  presetData: Preset;
}

function RenderButtons({ presetData }: LaunchPadEditProps) {
  const classes = LaunchPadStyles();

  return (
    <div className={classes.btnContainer}>
      {presetData.soundSamples.map((soundSample, idx) => {
        return (
          <div key={idx}>
            <LaunchPadEditButton soundSample={soundSample} />
          </div>
        );
      })}
    </div>
  );
}

//8x8 scale
export function LaunchPadEdit({ presetData }: LaunchPadEditProps) {
  const classes = LaunchPadStyles();

  return (
    <>
      <div className={classes.root}>
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
