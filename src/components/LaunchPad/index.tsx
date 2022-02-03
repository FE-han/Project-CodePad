import { makeStyles } from "@mui/styles";
import { ButtonType, LoopSoundType } from "./buttonType";
import LaunchPadButton from "./LaunchPadButton";
import soundSample1 from "./DHS_Disco Drum Loop 128_19.wav";

const LaunchPadStyles = makeStyles({
  root: {
    marginLeft: 10,
  },
});
export function LaunchPad() {
  const classes = LaunchPadStyles();
  return (
    <>
      <div className={classes.root}>
        여긴 런치패드
        <LaunchPadButton
          soundPath={soundSample1}
          buttonType={ButtonType.ONE_SHOT}
          soundType={LoopSoundType.VOCAL}
        />
      </div>
    </>
  );
}

export default LaunchPad;
