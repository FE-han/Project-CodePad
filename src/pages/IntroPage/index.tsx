import React from "react";
import { makeStyles } from "@mui/styles";
import { titleFont, pageBgColor, pageBoxShadow } from "../../utils/CommonStyle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../modules/hooks";
import { actions } from "../../modules/actions/exampleSlice";

import CommunityContentsScrollList from "../../components/CommunityContents/CommunityContentsScrollList";

export default function IntroPage() {
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
    backgroundColor: `${pageBgColor}`,

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "900px",
    height: "100%",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"first second third"`,

    boxShadow: `${pageBoxShadow}`,

    "& > *": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",

      "& > header": {
        color: "indianred",
        marginTop: "56px",
        marginBottom: "56px",
        fontFamily: `${titleFont}`,
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
