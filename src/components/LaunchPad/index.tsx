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

interface BeatMatch {
  tempo: number;
  bar: number;
  setBar: React.Dispatch<React.SetStateAction<number>>;
  beat: number;
  setBeat: React.Dispatch<React.SetStateAction<number>>;
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

  const beatMatch: BeatMatch = {
    tempo,
    bar,
    setBar,
    beat,
    setBeat,
  };

  const metronome = (beatMatch: BeatMatch, delayTime: number) => {
    const intervalTime = (60 / beatMatch.tempo) * 1000;
    let expected = Date.now() + intervalTime;

    const Timer = setTimeout(() => {
      const newBeatMatch: BeatMatch = {
        ...beatMatch,
      };

      const delayTime = Date.now() - expected;
      if (delayTime > intervalTime) {
        console.log("딜레이가 너무 커졌습니다");
      }

      if (beatMatch.beat < 4) {
        newBeatMatch.beat = beatMatch.beat + 1;
        beatMatch.setBeat(newBeatMatch.beat);
      }
      if (beatMatch.beat >= 4) {
        newBeatMatch.beat = 1;
        beatMatch.setBeat(newBeatMatch.beat);

        if (beatMatch.bar < 4) {
          newBeatMatch.bar = beatMatch.bar + 1;
          beatMatch.setBar(newBeatMatch.bar);
        }
        if (beatMatch.bar >= 4) {
          newBeatMatch.bar = 1;
          beatMatch.setBar(newBeatMatch.bar);
        }
      }

      metronome(newBeatMatch, Math.max(0, intervalTime - delayTime));
    }, intervalTime);
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
        {/* <div>
          <label htmlFor={"tempo"}>tempo(bpm)</label>
          <input
            id={"tempo"}
            type="number"
            value={tempo}
            onChange={handleSetTempo}
          />
          <div>tempoTest</div>
          <button
            onClick={() => {
              // handleTempoStart(beatMatch);
              const initialIntervalTime = 0;
              metronome(beatMatch, initialIntervalTime);
            }}
          >
            start!
          </button>
          <div>
            <div>bar: {bar}</div>
            <div>beat: {beat}</div>
          </div>
        </div> */}
        {/* 템포테스트 */}

        <div className={classes.btnContainer}>
          {presetData.soundSamples.map(
            (
              {
                soundSampleId,
                soundSampleURL,
                buttonType,
                soundType,
                location,
              },
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
      </div>
    </>
  );
}

export default LaunchPad;
