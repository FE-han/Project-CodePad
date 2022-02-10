import React from "react";
import "../assets/font.css";
import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";

export default function CommunityContentsScrollList(props: { title: string }) {
  const classes = ScrollListStyles();
  return (
    <>
      <header>{props.title}</header>
      <div className={classes.ScrollListContainer}>
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
        <PresetContent src="" title="test" />
      </div>
    </>
  );
}

const ScrollListStyles = makeStyles({
  ScrollListContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    PaddingTop: "42px",
    PaddingBottom: "42px",
    textAlign: "center",
    height: `calc(100vh - 176px)`,
    overflow: "auto",

    "&::-webkit-scrollbar": {
      display: "none",
    },
    // "&::-webkit-scrollbar": {
    //   width: "10px",
    // },

    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "#2f3542",
    //   borderRadius: "10px",
    //   backgroundClip: "padding-box",
    //   border: `2px solid transparent`,
    // },
    // "&::-webkit-scrollbar-track": {
    //   backgroundColor: "grey",
    //   borderRadius: "10px",
    //   boxshadow: `inset 0px 0px 5px white`,
    // },
  },
});
