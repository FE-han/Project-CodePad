import { makeStyles } from "@mui/styles";
import Tags from "./Tags";
import Reactions from "./Reactions";
import CommentsContainer from "./CommentsContainer";

const PresetCommunityStyles = makeStyles({
  root: {
    display: `grid`,
    rowGap: "15px",
    columnGap: "15px",
    maxHeight: "189px",
    alignItems: "center",
  },
  tags: {
    display: "flex",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  reactions: {
    display: "flex",
    alignItems: "center",
  },
  commentsContainer: {
    gridColumn: `1 / 3`,
  },
});
export default function PresetCommunity() {
  const classes = PresetCommunityStyles();

  return (
    <div className={classes.root}>
      <div className={classes.tags}>
        <Tags />
      </div>
      <div className={classes.reactions}>
        <Reactions />
      </div>
      <div className={classes.commentsContainer}>
        <CommentsContainer />
      </div>
    </div>
  );
}
