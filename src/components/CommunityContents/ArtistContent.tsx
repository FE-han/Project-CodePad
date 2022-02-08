import React from "react";
import { makeStyles } from "@mui/styles";
import { commonFont } from "../../utils/CommonStyle";

export default function Artist(props: { src: string; title: string }) {
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
    borderRadius: "50%",
  },

  albumCoverTitle: {
    fontSize: "20px",
    fontFamily: `${commonFont}`,
  },
});
