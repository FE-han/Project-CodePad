import React from "react";
import { makeStyles } from "@mui/styles";
import { Fonts } from "../../utils/CommonStyle";
import { PresetData } from "../../utils/CommonInterface";
import { memo } from "react";
import { useNavigate } from "react-router";
import noImage from "../../assets/noImage.png";

const Artist = (props: { presetData: PresetData }) => {
  const classes = PresetContentStyles();
  const navigate = useNavigate();

  const { presetData } = props;
  const imgSrc = presetData.thumbnailURL;

  return (
    <div
      className={`${classes.albumCoverContainer}`}
      onClick={() => {
        navigate(`/userpresets/${presetData.userId}/enter`);
      }}
    >
      <img
        className={classes.albumCoverImg}
        src={
          imgSrc === (null || undefined)
            ? noImage
            : `${process.env.REACT_APP_SERVER_BASE_URL}/${imgSrc}`
        }
        alt="artist-img"
      ></img>
      <p className={classes.albumCoverTitle}>{presetData.author}</p>
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
    marginBottom: "8px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  albumCoverTitle: {
    fontSize: "20px",
    fontFamily: `${Fonts.DEFAULT}`,
  },
});

export default memo(Artist);
