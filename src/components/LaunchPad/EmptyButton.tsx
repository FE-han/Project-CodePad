import { makeStyles } from "@mui/styles";
import { SoundSample } from "./utils/types";
import { LaunchPadButtonColor } from "./utils/launchPadStyles";

const EmptyButtonStyles = makeStyles({
  emptyBtn: {
    background: LaunchPadButtonColor.EMPTY,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: "3px",
  },
});

export function EmptyButton() {
  const classes = EmptyButtonStyles();

  return <div className={classes.emptyBtn}></div>;
}

export default EmptyButton;
