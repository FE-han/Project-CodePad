import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { useDispatch } from "react-redux";
import { actions as loopSoundGroupActions } from "../../modules/actions/LaunchPad/loopSoundGroupSlice";
import { useAppSelector } from "../../modules/hooks";
import { actions as soundButtonsActions } from "../../modules/actions/LaunchPad/soundButtonsSlice";

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
    fontSize: "0.5rem",

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
            dispatch(
              soundButtonsActions.changeButtonState({
                location,
                state: "WAIT_STOP",
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
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default memo(LoopButton);
