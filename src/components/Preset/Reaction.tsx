import { makeStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const ReactionStyles = makeStyles({});

export default function Reaction() {
  const classes = ReactionStyles();
  return (
    <ListItemIcon>
      <PianoIcon />
      <span>10,203</span>
      <FavoriteIcon />
      <span>10,203</span>
      <CommentIcon />
      <span>10,203</span>
    </ListItemIcon>
  );
}
