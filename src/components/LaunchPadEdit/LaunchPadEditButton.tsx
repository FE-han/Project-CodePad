import { makeStyles } from "@mui/styles";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";
import { memo, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppSelector } from "../../modules/hooks";
import { useDispatch } from "react-redux";
import { actions } from "../../modules/actions/LaunchPadEdit/selectedButtonSlice";

const LaunchPadEditButtonStyles = makeStyles({
  emptyBtn: {
    background: LaunchPadButtonColor.EMPTY,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",

    border: (props) => (props ? "2px solid red" : ""),
  },
  loopEvenBtn: {
    background: LaunchPadButtonColor.LOOP_EVEN,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
    border: (props) => (props ? "2px solid red" : ""),
  },
  loopOddBtn: {
    background: LaunchPadButtonColor.LOOP_ODD,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
    border: (props) => (props ? "2px solid red" : ""),
  },
  oneshotBtn: {
    background: LaunchPadButtonColor.ONESHOT,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
    border: (props) => (props ? "2px solid red" : ""),
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
interface LaunchPadEditButtonProps {
  soundSample: SoundSample;
}
export function LaunchPadEditButton({ soundSample }: LaunchPadEditButtonProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const classes = LaunchPadEditButtonStyles(isSelected);
  const isEven = Number(soundSample.location.split("X")[1]) % 2 === 1;

  const dispatch = useDispatch();
  const nowSelectedLocation = useAppSelector(
    (state) => state.selectedButtonSlice.location
  );

  useEffect(() => {
    if (nowSelectedLocation === soundSample.location) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [nowSelectedLocation]);

  const buttonClassName = () => {
    switch (soundSample.buttonType) {
      case "LOOP":
        if (isEven) {
          return classes.loopEvenBtn;
        }
        return classes.loopOddBtn;
      case "ONESHOT":
        return classes.oneshotBtn;
      default:
        return classes.emptyBtn;
    }
  };

  const buttonIcon = () => {
    switch (soundSample.buttonType) {
      case "LOOP":
        return <ArrowRightAltIcon />;

      case "ONESHOT":
        return <AutorenewIcon />;

      default:
        return;
    }
  };

  return (
    <div
      className={buttonClassName()}
      onClick={() => {
        dispatch(
          actions.selectButton({
            location: soundSample.location,
            buttonType: soundSample.buttonType,
            soundFile: undefined,
            soundSampleId: soundSample.soundSampleId,
            soundSampleURL: soundSample.soundSampleURL,
            soundType: soundSample.soundType,
          })
        );
      }}
    >
      <div className={classes.buttonText}>{soundSample.soundType || ""}</div>
      <div className={classes.buttonIcon}>{buttonIcon()}</div>
    </div>
  );
}

export default memo(LaunchPadEditButton);
