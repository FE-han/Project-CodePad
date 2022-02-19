import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";
import alertSnackBarMessage, {
  SnackBarMessageType,
} from "../../utils/snackBarMessage";

const OneShotButtonStyles = makeStyles({
  oneshotBtn: {
    background: LaunchPadButtonColor.ONESHOT,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",

    "&:active": {
      background: "green",
    },
  },

  buttonText: {
    color: "white",

    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  buttonIcon: {
    position: "absolute",
    bottom: 0,

    color: "gray",
    fontSize: "20px",
  },
});

export function OneShotButton({
  soundSampleURL,
  buttonType,
  soundType,
  location,
}: Omit<SoundSample, "soundSampleId">) {
  const classes = OneShotButtonStyles();
  const [sound, setSound] = useState<HTMLAudioElement | undefined>(undefined);

  const handleSoundPlay = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === undefined) {
      alertSnackBarMessage({
        message: `음악파일을 불러오지 못했습니다.`,
        type: SnackBarMessageType.ERROR,
      });
      return;
    }
    sound.play();
  };

  const handleSoundStop = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === undefined) {
      return;
    }
    sound.pause();
    sound.currentTime = 0;
  };

  useEffect(() => {
    if (soundSampleURL === undefined) {
      //URL없을경우 에러컨트롤
      setSound(undefined);
    } else {
      setSound(
        new Audio(`${process.env.REACT_APP_SERVER_BASE_URL}/${soundSampleURL}`)
      );
    }
  }, [setSound]);

  return (
    <div
      className={classes.oneshotBtn}
      onMouseDown={handleSoundPlay}
      onMouseUp={handleSoundStop}
    >
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <ArrowRightAltIcon />
      </div>
    </div>
  );
}

export default memo(OneShotButton);
