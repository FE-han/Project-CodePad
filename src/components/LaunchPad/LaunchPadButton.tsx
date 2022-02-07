import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { SoundSample } from "./types";

const LaunchPadButtonStyles = makeStyles({
  root: {},
  button: {
    background: "blue",
    width: "100%",
    // minWidth: "60px",
    height: "100%",
    // minHeight: "60px",
    position: "relative",

    "&:active": {
      background: "skyblue",
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
