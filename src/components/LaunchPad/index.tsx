import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Preset } from "./utils/types";
import OneShotButton from "./OneShotButton";
import LoopButton from "./LoopButton";
import EmptyButton from "./EmptyButton";

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

  const beatMatch: BeatMatch = {
    tempo,
    bar,
    setBar,
    beat,
    setBeat,
  };

  // const handleTempoStart = (beatMatch: BeatMatch) => {
  //   const intervalTime = (60 / beatMatch.tempo) * 1000;
  //   let expected = Date.now() + intervalTime;

  //   console.log("intervalTime", intervalTime);

  //   function step (
  //     beatMatch: BeatMatch,
  //     intervalTime: number,
  //     expected: number
  //   ) {
  //     const delayTime = Date.now() - expected;
  //     if (delayTime > intervalTime) {
  //       console.log("딜레이가 너무 커졌습니다");
  //     }

  //     console.log("step", beatMatch.beat);

  //     if (beatMatch.beat < 4) {
  //       beatMatch.setBeat(beatMatch.beat + 1);
  //     }
  //     if (beatMatch.beat >= 4) {
  //       beatMatch.setBeat(1);

  //       if (beatMatch.bar < 4) {
  //         beatMatch.setBar(beatMatch.bar + 1);
  //       }
  //       if (beatMatch.bar >= 4) {
  //         beatMatch.setBar(1);
  //       }
  //     }

  //     expected += intervalTime;
  //     setTimeout(step(beatMatch,intervalTime,expected), Math.max(0, intervalTime - delayTime));
  //   };

  //   setTimeout(step(beatMatch,intervalTime,expected), 0);
  // };

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
              // handleTempoStart(beatMatch);

              metronome(beatMatch, 0);
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
