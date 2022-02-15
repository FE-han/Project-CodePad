import { makeStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../modules/slice/articleSlice";
import { useEffect } from "react";
import { useParams } from "react-router";
import { RootState } from "../../modules/store";

const ReactionStyles = makeStyles({
  container: {
    lineHeight: "20px",
  },
  reactionNum: {
    fontSize: "12px",
    margin: "0px 5px",
  },
});

export default function Reaction(props:any) {
  const classes = ReactionStyles();
  const dispatch = useDispatch();
  const { presetId } = useParams();
  useEffect(()=>{
    dispatch(articleActions.getArticle(presetId))
  },[presetId])
  const { views } = useSelector((state: any)=>({
    views : state.articleReducers.views,
  }));
  console.log(props)
  return (
    
    <ListItemIcon className={classes.container}>
      <PianoIcon fontSize="small" />
      <span className={classes.reactionNum}>{props.views}</span>
      <FavoriteIcon fontSize="small" />
      <span className={classes.reactionNum}>10,203</span>
      <CommentIcon fontSize="small" />
      <span className={classes.reactionNum}>10,203</span>
    </ListItemIcon>
  );
}
