import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import { ScrollListContainerSize } from "../../utils/CommonValue";

import CommunityContentsScrollList from "../../components/CommunityContents/CommunityContentsScrollList";

export default function IntroPage() {
  const classes = introPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top50}>
        <CommunityContentsScrollList
          title="CHART : TOP 50"
          listName="top50List"
          type="PRESET"
          scrollSize={ScrollListContainerSize.introPage}
        />
      </div>
      <div className={classes.used}>
        <CommunityContentsScrollList
          title="Recently Used"
          listName="recentlyUsed"
          type="PRESET"
          scrollSize={ScrollListContainerSize.introPage}
        />
      </div>
      <div className={classes.artist}>
        <CommunityContentsScrollList
          title="Artist Profile"
          listName="artists"
          type="PROFILE"
          scrollSize={ScrollListContainerSize.introPage}
        />
      </div>
    </div>
  );
}

const introPageStyles = makeStyles({
  root: {
    backgroundColor: `${PageColors.BACKGROUND}`,
    boxShadow: `${PageColors.SHADOW}`,

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "1041px",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"top50 used artist"`,

    "& > *": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",

      "& > header": {
        color: "indianred",
        marginTop: "56px",
        marginBottom: "56px",
        fontFamily: `${Fonts.TITLE}`,
        fontSize: "26px",
        fontWeight: "bold",
        opacity: "65%",
      },
    },
  },
  top50: {
    gridArea: "top50",
  },
  used: {
    gridArea: "used",
  },
  artist: {
    gridArea: "artist",
  },
});
