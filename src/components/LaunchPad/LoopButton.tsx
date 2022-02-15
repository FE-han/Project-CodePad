import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { useDispatch } from "react-redux";
import { actions as loopSoundGroupActions } from "../../modules/actions/loopSoundGroupSlice";
import { useAppSelector } from "../../modules/hooks";
import { actions as soundButtonsActions } from "../../modules/actions/soundButtonsSlice";

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
  // const [isWait, setIsWait] = useState<boolean>(false);
  // const [isPlaySample, setIsPlaySample] = useState<boolean>(false);
  const isEven = Number(location.split("X")[1]) % 2 === 1;

  const [buttonState, setButtonState] = useState({
    location: "",
    state: "EMPTY",
  });

  const dispatch = useDispatch();
  const { nowBar } = useAppSelector((state) => state.loopSoundGroupSlice);
  const { soundSamples } = useAppSelector(
    (state) => state.soundButtonsStateSlice
  );

  useEffect(() => {
    soundSamples.map((soundSample) => {
      if (soundSample.location === location) {
        setButtonState(soundSample);
      }
    });
  }, [soundSamples]);

  const getClassNameByBtnState = () => {
    if (isEven && buttonState.state === "STOP") {
      return classes.loopEvenBtn;
    }

    if (!isEven && buttonState.state === "STOP") {
      return classes.loopOddBtn;
    }

    if (
      buttonState.state === "WAIT_PLAY" ||
      buttonState.state === "WAIT_STOP"
    ) {
      return classes.waitingBtn;
    }

    if (buttonState.state === "PLAY") {
      return classes.nowPlayingBtn;
    }

    return classes.errorBtn;
  };

  return (
    <div
      className={getClassNameByBtnState()}
      onClick={() => {
        //처음 클릭시
        // 1. (stop) 버튼 state를 wait_play로 바꿈, 그룹에 선택한 셈플로써 올림
        // (이후 메트로눔을 통해서 재생시 state를 play로 바꿈)
        // 2. (play) 버튼 state를 wait_stop으로 바꿈
        // (이후 메트로눔을 통해서 해당 음원을 stop하고 unstaging처리함 )
        // 3. (wait_play) 버튼 state를 stop으로 바꿈, 바로 그룹에서 unstaging처리
        // 4. (wait_stop) 버튼 state를 play로 바꿈
        switch (buttonState.state) {
          case "STOP":
            dispatch(
              loopSoundGroupActions.selectLoopSound({
                location,
                nowBar,
              })
            );
            dispatch(
              soundButtonsActions.changeButtonState({
                location,
                state: "WAIT_PLAY",
              })
            );
            break;

          case "PLAY":
            dispatch(
              loopSoundGroupActions.deselectLoopSound({
                location,
                nowBar,
              })
            );
            break;

          case "WAIT_PLAY":
            // dispatch(
            //   actions.selectLoopSound({
            //     location,
            //     nowBar,
            //   })
            // );
            break;

          case "WAIT_STOP":
            dispatch(
              soundButtonsActions.changeButtonState({
                location,
                state: "PLAY",
              })
            );
            break;
          default:
            break;
        }
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
