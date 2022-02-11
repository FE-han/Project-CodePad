import React from "react";
import { makeStyles } from "@mui/styles";
import { Fonts } from "../../utils/CommonStyle";
import { PresetData } from "../../utils/CommonInterface";

export default function Artist(props: { presetData: PresetData; ref: any }) {
  const classes = PresetContentStyles();

  return (
    <div className={`${classes.albumCoverContainer}`} ref={props.ref}>
      <div className={classes.albumCoverImg}>
        <img src={props.presetData.thumbnailURL} alt="preset-img"></img>
      </div>
      <p className={classes.albumCoverTitle}>{props.presetData.title}</p>
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
    fontFamily: `${Fonts.DEFAULT}`,
  },
});
