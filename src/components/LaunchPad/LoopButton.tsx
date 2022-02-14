import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { useDispatch } from "react-redux";
import { actions } from "../../modules/actions/loopSoundGroupSlice";

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
  const [isWait, setIsWait] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const isEven = Number(location.split("X")[1]) % 2 === 1;

  const dispatch = useDispatch();

  // const [audioContext, setAudioContext] =
  //   useState<AudioContext | undefined>(undefined);

  const [audioContext, setAudioContext] =
    useState<AudioBufferSourceNode | undefined>(undefined);

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

  // const [bufferSource, setBufferSource] =
  //   useState<ArrayBuffer | undefined>(undefined);

  const getBufferSource = async (url: string) => {
    const data: ArrayBuffer = await getAudioArrayBuffer(url);

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(data);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(audioContext.destination);
    setAudioContext(source);
  };

  useEffect(() => {
    // const audioSource = new Audio(soundSampleURL);
    // audioSource.crossOrigin = "anonymous";
    // setSound(audioSource);

    // audioSource.addEventListener("ended", () => {
    //   console.log("끝");
    //   setIsPlay(false);
    // });

    // //web audio api
    // const audioContext = new AudioContext();
    // // const track = audioContext.createMediaElementSource(audioSource);
    // // track.connect(audioContext.destination);

    // const track = audioContext.createBufferSource();
    // // track.loop;

    // setAudioContext(audioContext);

    //=======
    if (soundSampleURL === undefined) return;
    getBufferSource(soundSampleURL);
  }, []);

  return (
    <div
      className={getClassNameByBtnState()}
      onClick={() => {
        // // if (sound === undefined) return;

        // // sound.play();
        // // setIsPlay(true);

        // if (audioContext === undefined) {
        //   console.log("음원배정되지 않음");
        //   return;
        // }

        // if (audioContext.state === "suspended") {
        //   console.log("음원 reload");
        //   audioContext.resume();
        // }

        // sound!.play();

        //=======
        dispatch(
          actions.selectLoopSound({
            location,
            nowBar: "bar1",
          })
        );

        if (audioContext === undefined) return;

        audioContext.start();
        setIsPlay(true);
      }}
    >
      {/* <div className={getClassNameByBtnState()}> */}
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default memo(LoopButton);
