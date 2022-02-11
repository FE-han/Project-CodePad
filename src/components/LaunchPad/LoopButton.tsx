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
  nowPlayingBtn: {
    background: LaunchPadButtonColor.NOW_PLAYING,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
  },
  waitingBtn: {
    background: LaunchPadButtonColor.NOW_WAIT,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
  },

  errorBtn: {
    background: "gray",
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
  const [sound2, setSound2] = useState<HTMLAudioElement | undefined>(undefined);
  const [isWait, setIsWait] = useState<boolean>(false);
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
      setIsPlay(false);
      sound.pause();

      return;
    }

    setIsPlay(true);
    sound.play();

    if (sound.onended) {
      console.log("End");
    }

    console.log(sound);
  };

  const getClassNameByBtnState = () => {
    if (isPlay) {
      return classes.nowPlayingBtn;
    }

    if (isWait) {
      return classes.waitingBtn;
    }

    if (isEven) {
      return classes.loopEvenBtn;
    }

    if (!isEven) {
      return classes.loopOddBtn;
    }

    return classes.errorBtn;
  };

  useEffect(() => {
    if (soundSampleURL === undefined) {
      //URL없을경우 에러컨트롤
      setSound(undefined);
    } else {
      // const soundTag: React.DetailedHTMLProps<
      //   React.AudioHTMLAttributes<HTMLAudioElement>,
      //   HTMLAudioElement
      // > = (
      //   <audio
      //     src={soundSampleURL}
      //     preload="auto"
      //     onPlay={() => {

      //     }}
      //     onEnded={() => {
      //       console.log("end");
      //     }}
      //   ></audio>
      // );
      // setSound(soundTag);

      setSound(new Audio(soundSampleURL));
      setSound2(new Audio(soundSampleURL));
    }
  }, [setSound]);

  const handleTempoStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const intervalTime = (60 / 112) * 1000;
    let expected = Date.now() + intervalTime;

    console.log(intervalTime);

    const step = () => {
      const delayTime = Date.now() - expected;
      if (delayTime > intervalTime) {
        console.log("딜레이가 너무 커졌습니다");
      }

      if (isPlay) {
        console.log("clap!");
        sound2!.play();
      } else {
        console.log("clap!!!");
        sound!.play();
        setIsPlay(true);
      }

      expected += intervalTime;
      setTimeout(step, Math.max(0, intervalTime - delayTime));
    };

    setTimeout(step, intervalTime);
  };

  return (
    <div className={getClassNameByBtnState()} onClick={handleTempoStart}>
      {/* <div className={getClassNameByBtnState()}> */}
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default LoopButton;
