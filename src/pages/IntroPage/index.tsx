import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import { ScrollListContainerSize } from "../../utils/CommonValue";

import CommunityContentsScrollList from "../../components/CommunityContents/CommunityContentsScrollList";
import { useNavigate } from "react-router";

export default function IntroPage() {
  const classes = introPageStyles();
  const navigate = useNavigate();
  const asdf = {
    a: "a",
    b: "b",
  };
  return (
    <div className={classes.root}>
      <div className={classes.top50}>
        <button
          onClick={() => {
            navigate(`/userpresets/${asdf.a}/${asdf.b}`);
          }}
        >
          임시이동
        </button>
        <CommunityContentsScrollList
          title="CHART : TOP 50"
          listName="top50"
          type="PRESET"
          scrollSize={ScrollListContainerSize.introPage}
        />
      </div>
      <div className={classes.used}>
        <CommunityContentsScrollList
          title="Recently Used"
          listName="used"
          type="PRESET"
          scrollSize={ScrollListContainerSize.introPage}
        />
      </div>
      <div className={classes.artist}>
        <CommunityContentsScrollList
          title="Artist Profile"
          listName="artist"
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
