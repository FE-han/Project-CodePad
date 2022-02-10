import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";

const LoopButtonStyles = makeStyles({
  loopEvenBtn: {
    background: LaunchPadButtonColor.LOOP_EVEN,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
  },
  loopOddBtn: {
    background: LaunchPadButtonColor.LOOP_ODD,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
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

export function LoopButton({
  soundSampleURL,
  buttonType,
  soundType,
  location,
}: Omit<SoundSample, "soundSampleId">) {
  const classes = LoopButtonStyles();
  const [sound, setSound] = useState<HTMLAudioElement | undefined>(undefined);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const isEven = Number(location.split("X")[1]) % 2 === 1;

  const toggleSoundPlay = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === undefined) {
      console.log("음악이 없음");
      return;
    }

    if (isPlay) {
      sound.pause();

      return;
    }

    sound.play();
  };

  useEffect(() => {
    if (soundSampleURL === undefined) {
      //URL없을경우 에러컨트롤
      setSound(undefined);
    } else {
      const loopSound = new Audio(soundSampleURL);
      // loopSound.loop = true;
      setSound(loopSound);
    }
  }, [setSound]);

  return (
    <div
      className={isEven ? classes.loopEvenBtn : classes.loopOddBtn}
      onClick={toggleSoundPlay}
    >
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default LoopButton;
