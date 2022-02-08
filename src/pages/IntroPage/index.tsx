import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../modules/hooks";
import { actions } from "../../modules/actions/exampleSlice";

const IntroPageStyles = makeStyles({
  root: {
    background: "green",

    margin: "0 auto 0 auto",
    width: "880px",
    height: "100%",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"top50 recentlyUsed artist"`,

    "& > *": {
      border: "1px solid gray",

      display: "flex",
      justifyContent: "center",
    },
  },
  top50: {
    gridArea: "top50",
  },
  recentlyUsed: {
    gridArea: "recentlyUsed",
  },
  artist: {
    gridArea: "artist",
  },
});

export function IntroPage() {
  const classes = IntroPageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top50}>
        CHART : TOP 50
        {/* <Top50 /> */}
      </div>
      <div className={classes.recentlyUsed}>
        Recently Used
        {/* <RecentlyUsed /> */}
      </div>
      <div className={classes.artist}>
        Artist Profiles
        {/* <ArtistProfiles /> */}
      </div>
    </div>
  );
}

export default IntroPage;
