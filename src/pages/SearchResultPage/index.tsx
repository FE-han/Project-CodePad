import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const SearchResultPageStyles = makeStyles({
  root: {
    background: "skyblue",

    margin: "0 auto 0 auto",
    width: "880px",
    height: "100%",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"preset tag artist"`,

    "& > *": {
      border: "1px solid gray",

      display: "flex",
      justifyContent: "center",
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

export function SearchResultPage() {
  const classes = SearchResultPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.preset}>
        preset
        {/* <PresetSearchResult /> */}
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
      </div>
      <div className={classes.tag}>
        tag
        {/* <TagSearchResult /> */}
      </div>
      <div className={classes.artist}>
        Artist Profiles
        {/* <ArtistProfilesSearchResult /> */}
      </div>
    </div>
  );
}

export default SearchResultPage;
