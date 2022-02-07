import { makeStyles } from "@mui/styles";
import { useState } from "react";
import {
  LaunchPadScale,
  Preset,
  SoundSample,
  SoundSampleLocation,
} from "./types";
import LaunchPadButton from "./LaunchPadButton";
import { AssistantDirection } from "@mui/icons-material";

const LaunchPadStyles = makeStyles({
  //색깔, 폰트크기들 프로젝트 컬러로 변경해야함
  root: {
    margin: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: "10px",
  },
  presetName: {
    flex: "1",
    color: "white",
  },
  forkBtn: {
    background: "none",
    color: "white",
    border: "1px solid gray",
    borderRadius: "4px",
  },
  btnContainer: {
    display: "grid",
    gridTemplateRows: "repeat(8, auto)",
    gridTemplateColumns: "repeat(8, auto)",
    gridGap: "10px",
  },
});

//4x4 scale
// export function LaunchPad16() {
//   const classes = LaunchPadStyles();
//   const [presetData, setPresetData] = useState(
//     initialPresetGenerator(LaunchPadScale.MINI)
//   );
//   return (
//     <>
//       <div className={classes.root}>
//         <div className={classes.header}>
//           <div className={classes.presetName}>Default Preset 1</div>
//           <button className={classes.forkBtn}>FORK</button>
//         </div>

//         <div className={classes.btnContainer}>
//           {presetData.soundSamples.map((soundSample) => {
//             return (
//               <LaunchPadButton
//                 soundPath={soundSample.soundSampleURL}
//                 buttonType={soundSample.buttonType}
//                 soundType={soundSample.soundType}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

interface LaunchPadProps {
  presetData: Preset;
}

//8x8 scale
export function LaunchPad({ presetData }: LaunchPadProps) {
  const classes = LaunchPadStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.presetName}>{presetData.presetTitle}</div>
          <button className={classes.forkBtn}>FORK</button>
        </div>

        <div className={classes.btnContainer}>
          {presetData.soundSamples.map(
            ({ soundSampleId, soundSampleURL, buttonType, soundType }) => {
              return (
                <LaunchPadButton
                  key={soundSampleId}
                  soundSampleURL={soundSampleURL}
                  buttonType={buttonType}
                  soundType={soundType}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default LaunchPad;
