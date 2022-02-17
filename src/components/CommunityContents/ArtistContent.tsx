import React from "react";
import { makeStyles } from "@mui/styles";
import { Fonts } from "../../utils/CommonStyle";
import { PresetData } from "../../utils/CommonInterface";
import { memo } from "react";
import { useNavigate } from "react-router";

const Artist = (props: { presetData: PresetData }) => {
  const classes = PresetContentStyles();
  const navigate = useNavigate();

  const { presetData } = props;
  return (
    <div
      className={`${classes.albumCoverContainer}`}
      onClick={() => {
        navigate(`/userpresets/${presetData.userId}`);
      }}
    >
      <img
        className={classes.albumCoverImg}
        src={`${process.env.REACT_APP_SERVER_BASE_URL}/${presetData.thumbnailURL}`}
        alt="preset-img"
      ></img>
      <p className={classes.albumCoverTitle}>{presetData.title}</p>
    </div>
  );
};

const PresetContentStyles = makeStyles({
  albumCoverContainer: {
    margin: `23px auto`,
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

export default memo(Artist);
