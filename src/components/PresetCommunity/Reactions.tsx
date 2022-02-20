import { makeStyles } from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { PresetListBtnColors } from "../../utils/CommonStyle";
import { useAppSelector } from "../../modules/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { actions as getMyPresetListActions } from "../../modules/actions/getMyPresetListSlice";
import { PresetListElement } from "../../pages/MyPresetsPage/utils/types";
import { Stack } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import { flexbox } from "@mui/system";
import { postLike } from "../../api/postLike";
import { check } from "prettier";

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

interface PresetReactionProps {
  presetList: Array<PresetListElement>;
  selectedPresetId: any;
}

const Reactions = ({ presetList, selectedPresetId }: PresetReactionProps) => {
  const classes = ReactionStyles();
  const dispatch = useDispatch();
  const [viewCount, setViewCount] = React.useState(0);
  const [likeCount, setLikeCount] = React.useState(0);
  const [commentCount, setCommentCount] = React.useState(0);
  const { presetId } = useParams();

  const [isClicked, setisClicked] = useState<boolean>(true);

  const changeCheck = () => {
    setisClicked((check: boolean) => !check);
  };

  useEffect(() => {
    presetList.map((value) => {
      if (value.presetId === selectedPresetId.presetId) {
        setViewCount(value.reactions.viewCount);
        setLikeCount(value.reactions.likeCount);
        setCommentCount(value.reactions.commentCount);
      }
    });
  }, [presetList, selectedPresetId]);

  // console.log(isClicked);

  return (
    <ListItemIcon className={classes.container}>
      <div>
        <PianoIcon fontSize="small" />
        <span className={classes.reactionNum}>{viewCount}</span>
        <IconButton onClick={changeCheck}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <span className={classes.reactionNum}>{likeCount}</span>
        <CommentIcon fontSize="small" />
        <span className={classes.reactionNum}>{commentCount}</span>
      </div>
    </ListItemIcon>
  );
};

export default Reactions;
