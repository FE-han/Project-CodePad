import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import {
  CommunityContentType,
  ScrollListContainerSize,
} from "../../utils/CommonValue";

import CommunityContentsScrollList from "../../components/CommunityContents/CommunityContentsScrollList";
import { useParams } from "react-router";

export default function SearchResultPage() {
  const classes = searchResultPageStyles();

  const { keyword } = useParams();

  return (
    <div className={classes.root}>
      <div className={classes.searchTitle}>
        <span> Search Results : {keyword}</span>
      </div>
      <div className={classes.searchResultContainer}>
        <div className={classes.preset}>
          <CommunityContentsScrollList
            title="Preset"
            listName="top50"
            type={CommunityContentType.preset}
            scrollSize={ScrollListContainerSize.searchResultPage}
          />
        </div>
        <div className={classes.tag}>
          <CommunityContentsScrollList
            title="Tag"
            listName="used"
            type={CommunityContentType.preset}
            scrollSize={ScrollListContainerSize.searchResultPage}
          />
        </div>
        <div className={classes.artist}>
          <CommunityContentsScrollList
            title="Artist Profile"
            listName="artist"
            type={CommunityContentType.profile}
            scrollSize={ScrollListContainerSize.searchResultPage}
          />
        </div>
      </div>
    </div>
  );
}

const searchResultPageStyles = makeStyles({
  root: {
    backgroundColor: `${PageColors.BACKGROUND}`,
    boxShadow: `${PageColors.SHADOW}`,

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "1020px",
  },
  searchTitle: {
    display: "flex",
    alignItems: "center",
    padding: `50px 70px 0px 70px`,

    "& > span": {
      fontSize: "34px",
      fontWeight: "700",
      color: PageColors.COLOR,
    },
  },
  searchResultContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"preset tag artist"`,

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
  preset: {
    gridArea: "preset",
  },
  tag: {
    gridArea: "tag",
  },
  artist: {
    gridArea: "artist",
  },
});
