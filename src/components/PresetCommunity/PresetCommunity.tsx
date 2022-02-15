import { makeStyles } from "@mui/styles";
import Tags from "./Tags";
import Reactions from "./Reactions";
import CommentsContainer from "./CommentsContainer";

const PresetCommunityStyles = makeStyles({
  root: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr`,
    gridTemplateRows: `1fr 7fr`,
    rowGap: "10px",
    columnGap: "20px",
    maxHeight: "188px",
    alignItems: "center",
  },
  tags: {
    display: "flex",
    alignItems: "center",
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
