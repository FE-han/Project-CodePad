import React from "react";
import "../assets/font.css";
import { makeStyles } from "@mui/styles";

export default function PresetContent(props: { src: string; title: string }) {
  const classes = PresetContentStyles();
  return (
    <div className={classes.albumCoverContainer}>
      <div className={classes.albumCoverImg}>
        <img src={props.src} alt="preset-img"></img>
      </div>
      <p className={classes.albumCoverTitle}>{props.title}</p>
    </div>
  );
}

const PresetContentStyles = makeStyles({
  albumCoverContainer: {
    marginBottom: "42px",
  },
  albumCoverImg: {
    width: "200px",
    height: "200px",
    backgroundColor: "red",
    marginBottom: "8px",
  },

  albumCoverTitle: {
    fontSize: "20px",
    fontFamily: `Roboto, sans-serif`,
  },
});
