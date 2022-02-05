import { makeStyles } from "@mui/styles";
import { ButtonType, LoopSoundType } from "./buttonType";
import LaunchPadButton from "./LaunchPadButton";

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
  btnContainer: {},
});

//4x4 scale
export function LaunchPad16() {
  const classes = LaunchPadStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.presetName}>Default Preset 1</div>
          <button className={classes.forkBtn}>FORK</button>
        </div>

        <LaunchPadButton
          soundPath={"soundSample1"}
          buttonType={ButtonType.ONE_SHOT}
          soundType={LoopSoundType.VOCAL}
        />
      </div>
    </>
  );
}

//8x8 scale
export function LaunchPad() {
  const classes = LaunchPadStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.presetName}>Default Preset 1</div>
          <button className={classes.forkBtn}>FORK</button>
        </div>

        <div className={classes.btnContainer}>
          <LaunchPadButton
            soundPath={"soundSample1"}
            buttonType={ButtonType.ONE_SHOT}
            soundType={LoopSoundType.VOCAL}
          />
        </div>
      </div>
    </>
  );
}

export default LaunchPad;
