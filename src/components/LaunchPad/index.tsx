import { makeStyles } from "@mui/styles";
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
    //버튼 크기 기준 재정립 필요
    gridTemplateRows: "repeat(8, 4vw)",
    gridTemplateColumns: "repeat(8, 4vw)",
    gridGap: "5px",
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
        <div className={classes.header}>
          <div className={classes.presetName}>{presetData.presetTitle}</div>
          <button className={classes.forkBtn}>FORK</button>
        </div>

        {/* 템포테스트 */}
        <div>
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
              const initialIntervalTime = 0;
              metronome(metronomeParams, initialIntervalTime);
            }}
          >
            start!
          </button>
          <div>
            <div>bar: {bar}</div>
            <div>beat: {beat}</div>
          </div>
        </div>
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
