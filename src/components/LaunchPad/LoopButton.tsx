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

    "&:active": {
      background: "green",
    },
  },
  loopOddBtn: {
    background: LaunchPadButtonColor.LOOP_ODD,
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

export function LoopButton({
  soundSampleURL,
  buttonType,
  soundType,
  location,
}: Omit<SoundSample, "soundSampleId">) {
  const classes = LoopButtonStyles();
  const [sound, setSound] = useState<HTMLAudioElement | undefined>(undefined);
  const isEven = Number(location.split("X")[1]) % 2 === 1;

  const handleSoundPlay = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (sound === undefined) {
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
    if (sound === undefined) {
      return;
    }
    //루프는 누르자마자 멈추면 안된다
    sound.pause();
    sound.currentTime = 0;
  };
  useEffect(() => {
    if (soundSampleURL === undefined) {
      //URL없을경우 에러컨트롤
      setSound(undefined);
    } else {
      setSound(new Audio(soundSampleURL));
    }
  }, [setSound]);

  return (
    <div
      className={isEven ? classes.loopEvenBtn : classes.loopOddBtn}
      onMouseDown={handleSoundPlay}
      onMouseUp={handleSoundStop}
    >
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default LoopButton;
