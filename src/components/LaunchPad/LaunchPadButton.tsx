import { makeStyles } from "@mui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { ButtonType, LoopSoundType, OneShotSoundType } from "./buttonType";

const LaunchPadButtonStyles = makeStyles({
  root: {},
  btn: {
    background: "blue",
    width: "100px",
    height: "100px",

    "&:active": {
      background: "skyblue",
    },
  },
});

interface LaunchPadButtonProps {
  soundPath: string;
  buttonType: ButtonType;
  soundType: LoopSoundType | OneShotSoundType;
}

export function LaunchPadButton({
  soundPath,
  buttonType,
  soundType,
}: LaunchPadButtonProps) {
  const sound = new Audio(soundPath);

  const classes = LaunchPadButtonStyles(ButtonType);
  return (
    <div className={classes.root}>
      <div
        className={classes.btn}
        onMouseDown={() => {
          sound.play();
        }}
        onMouseUp={() => {
          sound.pause();
          sound.currentTime = 0;
        }}
      >
        {soundType}
        {buttonType === "oneShot" ? <ArrowRightAltIcon /> : <AutorenewIcon />}
      </div>
    </div>
  );
}

export default LaunchPadButton;
