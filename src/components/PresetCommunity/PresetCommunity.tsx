import { makeStyles } from "@mui/styles";
import Tags from "./Tags";
import Reactions from "./Reactions";
import CommentsContainer from "./CommentsContainer";

const PresetCommunityStyles = makeStyles({
  root: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr`,
    gridTemplateRows: `1fr 4fr`,
  },
  tags: {},
  reactions: {
    float: "right",
  },
  commentsContainer: {},
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
