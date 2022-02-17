import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { useDispatch } from "react-redux";
import { actions as loopSoundGroupActions } from "../../modules/actions/LaunchPad/loopSoundGroupSlice";
import { useAppSelector } from "../../modules/hooks";
import { actions as soundButtonsActions } from "../../modules/actions/LaunchPad/soundButtonsSlice";
import { actions } from "../../modules/actions/LaunchPadEdit/selectedButtonSlice";
import { LaunchPadButtonColor } from "../LaunchPadEdit/utils/launchPadStyles";

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
  selected: {
    border: "1px solid red",
  },
});

export function SelectedPresetButton() {
  const classes = LoopButtonStyles();
  //   const isEven = Number(location.split("X")[1]) % 2 === 1;

  const [buttonState, setButtonState] = useState({
    location: "",
    state: "EMPTY",
  });

  const dispatch = useDispatch();

  const getClassNameByBtnState = () => {
    // if (isEven) {
    //   return classes.loopEvenBtn;
    // }
    // if (!isEven) {
    //   return classes.loopOddBtn;
    // }
    // return classes.errorBtn;
  };

  return (
    <div
      className={classes.loopEvenBtn}
      onClick={() => {
        // dispatch(
        //   actions.selectButton({
        // location,
        // soundSampleURL,
        // buttonType,
        // soundType,
        //   })
        // );
      }}
    >
      <div className={classes.buttonText}>{"FX" || ""}</div>
      <div className={classes.buttonIcon}>
        <AutorenewIcon />
      </div>
    </div>
  );
}

export default memo(SelectedPresetButton);
