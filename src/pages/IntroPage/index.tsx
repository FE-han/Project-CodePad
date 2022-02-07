import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import "../../assets/font.css";
import CommunityContentsScrollList from "../../components/CommunityContentsScrollList";

export default function introPage() {
  const classes = introPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.first}>
        <CommunityContentsScrollList title="CHART : TOP 50" />
      </div>
      <div className={classes.second}>
        <CommunityContentsScrollList title="Recently Used" />
      </div>
      <div className={classes.third}>
        <CommunityContentsScrollList title="Artist Profiles" />
      </div>
    </div>
  );
}

const introPageStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "900px",
    height: "100%",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"first second third"`,

    boxShadow: `rgba(0, 0, 0, 0.25) 0px 25px 50px -12px`,

    "& > *": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",

      "& > header": {
        color: "indianred",
        marginTop: "56px",
        marginBottom: "56px",
        fontFamily: `IBM Plex Sans Thai Looped, sans-serif`,
        fontSize: "26px",
        fontWeight: "bold",
        opacity: "65%",
      },
    },
  },
  first: {
    gridArea: "first",
  },
  second: {
    gridArea: "second",
  },
  third: {
    gridArea: "third",
  },
});
