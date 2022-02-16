import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Fonts, ButtonColors, CommentColors } from "../../utils/CommonStyle";

const commentsContainerStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: CommentColors.COLOR,
    fontFamily: Fonts.DEFAULT,
  },
  commentList: {
    border: `1px solid gray`,
    padding: "7px",
    height: "74px",
    overflow: "auto",
  },
  commentInput: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",

    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
});

export default function CommentsContainer() {
  const classes = commentsContainerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.commentList}>
        <Stack spacing={1.5}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </Stack>
      </div>
      <div className={classes.commentInput}>
        <Input
          fullWidth
          placeholder="Write a comment..."
          sx={{
            "&:after": {
              borderBottom: `2px solid rgba(225, 178, 149, 1)`,
            },
          }}
        />
        <Button variant="outlined" size="small" disabled>
          send
        </Button>
      </div>
    </div>
  );
}
