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

//8x8 scale
export function LaunchPad({ presetData }: LaunchPadProps) {
  const classes = LaunchPadStyles();

  //박자 맟추기 테스트
  const [tempo, setTempo] = useState<number>(112);
  const handleSetTempo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  const handleTempoStart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const intervalTime = (60 / tempo) * 1000;
    let expected = Date.now() + intervalTime;

    console.log(intervalTime);

    const step = () => {
      const delayTime = Date.now() - expected;
      if (delayTime > intervalTime) {
        console.log("딜레이가 너무 커졌습니다");
      }

      console.log("clap!");

      expected += intervalTime;
      setTimeout(step, Math.max(0, intervalTime - delayTime));
    };

    setTimeout(step, intervalTime);
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
          <button onClick={handleTempoStart}>start!</button>
        </div>
        {/* 템포테스트 */}

        <div className={classes.btnContainer}>
          {presetData.soundSamples.map(
            ({
              soundSampleId,
              soundSampleURL,
              buttonType,
              soundType,
              location,
            }) => {
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
                  return <EmptyButton />;
              }
            }
          )}
        </div>
      </div>
    </>
  );
}

export default LaunchPad;
