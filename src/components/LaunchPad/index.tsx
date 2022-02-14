import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddLinkIcon from "@mui/icons-material/AddLink";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Fonts, ButtonColors } from "../../utils/CommonStyle";

import { useState, memo } from "react";
import { Preset } from "./utils/types";
import OneShotButton from "./OneShotButton";
import LoopButton from "./LoopButton";
import EmptyButton from "./EmptyButton";
import { metronome, MetronomeParams } from "./utils/metronome";

const LaunchPadStyles = makeStyles({
  //색깔, 폰트크기들 프로젝트 컬러로 변경해야함
  root: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  launchPadHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "18px 15px",
    justifyContent: "space-between",

    "& > :nth-child(1)": {
      fontWeight: "700",
      opacity: "50%",
      fontSize: "22px",
    },
  },

  launchPadHeaderBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,
      margin: "0px 3px",

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
  btnContainer: {
    display: "grid",
    justifyContent: "space-evenly",

    gridTemplateRows: "repeat(8, 52px)",
    gridTemplateColumns: "repeat(8, 52px)",
    gridGap: "7px",

    margin: "0px 15px",
  },
});
interface LaunchPadProps {
  presetData: Preset;
}

function RenderButtons({ presetData }: LaunchPadProps) {
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
                <OneShotButton
                  key={soundSampleId + location}
                  soundSampleURL={soundSampleURL}
                  buttonType={buttonType}
                  soundType={soundType}
                  location={location}
                />
              );

            case "LOOP":
              return (
                <LoopButton
                  key={soundSampleId + location}
                  soundSampleURL={soundSampleURL}
                  buttonType={buttonType}
                  soundType={soundType}
                  location={location}
                />
              );

            default:
              return <EmptyButton key={soundSampleId + location} />;
          }
        }
      )}
    </div>
  );
}

//8x8 scale
export function LaunchPad({ presetData }: LaunchPadProps) {
  const classes = LaunchPadStyles();

  //박자 맟추기 테스트
  const [tempo, setTempo] = useState<number>(112);
  const handleSetTempo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  const [bar, setBar] = useState<number>(1);
  const [beat, setBeat] = useState<number>(1);

  const metronomeParams: MetronomeParams = {
    tempo,
    bar,
    setBar,
    beat,
    setBeat,
  };

  //

  return (
    <>
      <div className={classes.root}>
        <div className={classes.launchPadHeader}>
          <h2>{presetData.presetTitle}</h2>
          <div className={classes.launchPadHeaderBtnContainer}>
            <Button variant="outlined" size="small" startIcon={<AddLinkIcon />}>
              FORK
            </Button>
            <Button variant="outlined" size="small" startIcon={<BuildIcon />}>
              UPDATE
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* 템포테스트 */}
        <details>
          <summary>metronome기능</summary>

          <label htmlFor="bpm">BPM : {tempo} </label>
          <input
            type="range"
            id="bpm"
            min={60}
            max={240}
            step={1}
            value={tempo}
            onChange={handleSetTempo}
          />
          <div>tempoTest</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              onClick={() => {
                const initialIntervalTime = 0;
                metronome(metronomeParams, initialIntervalTime);
              }}
            >
              start!
            </button>
            <button
              onClick={() => {
                const initialIntervalTime = 0;
                metronome(metronomeParams, initialIntervalTime, true);
              }}
            >
              stop!
            </button>
            <div>bar: {bar}</div>
            <div>beat: {beat}</div>
          </div>
        </details>
        {/* 템포테스트 */}

        <RenderButtons presetData={presetData} />
      </div>
    </>
  );
}

export default LaunchPad;
