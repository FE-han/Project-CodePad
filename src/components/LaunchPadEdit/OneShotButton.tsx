import { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";

const OneShotButtonStyles = makeStyles({
  oneshotBtn: {
    background: LaunchPadButtonColor.ONESHOT,
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

export function OneShotButton({
  soundSampleURL,
  buttonType,
  soundType,
  location,
}: Omit<SoundSample, "soundSampleId">) {
  const classes = OneShotButtonStyles();

  return (
    <div className={classes.oneshotBtn}>
      <div className={classes.buttonText}>{soundType || ""}</div>
      <div className={classes.buttonIcon}>
        <ArrowRightAltIcon />
      </div>
    </div>
  );
}

export default memo(OneShotButton);
