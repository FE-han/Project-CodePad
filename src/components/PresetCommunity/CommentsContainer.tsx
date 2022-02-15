import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import { makeStyles } from "@mui/styles";

const commentsContainerStyles = makeStyles({
  root: {
    border: `1px solid gray`,
    padding: "15px",
    height: "97px",
    overflow: "auto",
  },
});

export default function CommentsContainer() {
  const classes = commentsContainerStyles();

  return (
    <div className={classes.root}>
      <Stack spacing={2}>
        {/* <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment /> */}
      </Stack>
    </div>
  );
}
