import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { CommentData } from "../../utils/CommonInterface";
import { useAppSelector } from "../../modules/hooks";

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

const Comment = (props: {
  commentData: CommentData;
  deleteFn: Function;
  updateFn: Function;
}) => {
  const classes = commentStyles();

  const { commentData } = props;

  const { userId } = useAppSelector((state) => state.setNowPresetValueSlice);

  const { loginUserId } = useAppSelector(
    (state) => state.setNowLoginUserIdSlice
  );

  //const loginUserId = "TuWdQ6QcXQHhG-LPsD7mY";

  const commentAuthorUserId = commentData.userId;

  //const presetAutorUserId = userId;
  const [deleteBtn, setDeleteBtn] = useState<boolean>(
    loginUserId === userId || loginUserId === commentAuthorUserId
  );
  const [updateBtn, setUpdateBtn] = useState<boolean>(
    loginUserId === commentAuthorUserId
  );
  const [toggleHover, setToggleHover] = useState(false);

  useEffect(() => {
    setDeleteBtn(
      (prev) => loginUserId === userId || loginUserId === commentAuthorUserId
    );
    setUpdateBtn((prev) => loginUserId === commentAuthorUserId);
  }, [userId, loginUserId]);

  return (
    <div
      className={classes.root}
      onMouseEnter={() => {
        setToggleHover(true);
      }}
      onMouseLeave={() => {
        setToggleHover(false);
      }}
    >
      <Avatar
        alt="user-image"
        src={`${process.env.REACT_APP_SERVER_BASE_URL}/${commentData.userImageURL}`}
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
          onClick={() => {
            props.deleteFn(commentData.commentId);
          }}
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
            right: `${deleteBtn ? "30px" : "0px"}`,
            "&.disabled": {
              display: "none",
            },
          }}
          className={!toggleHover ? "disabled" : ""}
          onClick={() => {
            props.updateFn(commentData.commentId, commentData.comment);
          }}
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
