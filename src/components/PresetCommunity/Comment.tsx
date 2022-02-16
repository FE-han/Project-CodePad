import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useState } from "react";
import { CommentData } from "../../utils/CommonInterface";
import { memo } from "react";

const commentStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    fontSize: "14px",
    position: "relative",
  },
  userName: {
    fontWeight: "600",
  },
});

const Comment = (props: { commentData: CommentData; actionFn: Function }) => {
  const { commentData } = props;

  const classes = commentStyles();

  const loginUserId = "IYfxLxA9t3BwCjCodzvwT";

  const commentAuthorUserId = commentData.userId;

  const presetAutorUserId = "IYfxLxA9t3BwCjCodzvwT";

  const deleteBtn = loginUserId === (commentAuthorUserId || presetAutorUserId);
  const updateBtn = loginUserId === commentAuthorUserId;

  const [toggleHover, setToggleHover] = useState(false);

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    setToggleHover(!toggleHover);
    console.log(toggleHover);
  };

  const handleDelete = () => {
    props.actionFn();
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Avatar
        alt="user-image"
        src={commentData.userImageURL}
        sx={{ width: 24, height: 24 }}
      />
      <span className={classes.userName}>{commentData.userName}</span>
      <Divider orientation="vertical" flexItem />
      <span>{commentData.comment}</span>

      {deleteBtn ? (
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            position: "absolute",
            right: "0px",
            "&.disabled": {
              display: "none",
            },
          }}
          className={!toggleHover ? "disabled" : ""}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      ) : (
        ""
      )}
      {updateBtn ? (
        <IconButton
          aria-label="edit"
          size="small"
          sx={{
            position: "absolute",
            right: "30px",
            "&.disabled": {
              display: "none",
            },
          }}
          className={!toggleHover ? "disabled" : ""}
        >
          {" "}
          <EditIcon />
        </IconButton>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(Comment);
