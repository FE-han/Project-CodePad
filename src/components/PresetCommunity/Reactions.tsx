import { makeStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { PresetListBtnColors } from "../../utils/CommonStyle";

const ReactionStyles = makeStyles({
  container: {
    lineHeight: "20px",
    float: "right",
    color: PresetListBtnColors.COLOR,
    fontWeight: "700",
  },
  reactionNum: {
    fontSize: "12px",
    margin: "0px 5px",
  },
});

export default function Reactions() {
  const classes = ReactionStyles();
  return (
    <ListItemIcon className={classes.container}>
      <PianoIcon fontSize="small" />
      <span className={classes.reactionNum}>10,203</span>
      <FavoriteIcon fontSize="small" />
      <span className={classes.reactionNum}>10,203</span>
      <CommentIcon fontSize="small" />
      <span className={classes.reactionNum}>10,203</span>
    </ListItemIcon>
  );
}
