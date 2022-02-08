import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { SoundSample } from "./types";

const LaunchPadButtonStyles = makeStyles({
  root: {},
  button: {
    background: "skyblue",
    width: "100%",
    // minWidth: "60px",
    height: "100%",
    // minHeight: "60px",
    position: "relative",
    cursor: "pointer",

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

export function LaunchPadButton({
  soundSampleURL,
  buttonType,
  soundType,
}: Omit<SoundSample, "location" | "soundSampleId">) {
  const [sound, setSound] = useState<HTMLAudioElement | "empty">("empty");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (soundSampleURL === null) {
      //URL없을경우 에러컨트롤
      setSound("empty");
    } else {
      setSound(new Audio(soundSampleURL));
    }
  }, []);

  const handleSoundPlay = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === "empty") {
      console.log("음악이 없음");
      return;
    }
    console.log(sound);
    //https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    //load되고있는 상황일때는 재생하지 못하게 동기적 처리가 필요 => load단에서 막아버리면 된다 여기서는 재생 바로 할 수 있게끔
    sound.play();
  };

  const handleSoundStop = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === "empty") {
      return;
    }
    sound.pause();
    sound.currentTime = 0;
  };

  const classes = LaunchPadButtonStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        onMouseDown={handleSoundPlay}
        onMouseUp={handleSoundStop}
      >
        <div className={classes.buttonText}>{soundType || "null"}</div>
        <div className={classes.buttonIcon}>
          {buttonType === "ONESHOT" ? <ArrowRightAltIcon /> : <AutorenewIcon />}
        </div>
      </div>
    </div>
  );
}

export default LaunchPadButton;
