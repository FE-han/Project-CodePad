import React from "react";
import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import { PresetData } from "../../utils/CommonInterface";
import { memo } from "react";
import { useNavigate } from "react-router";
import noUserImage from "../../assets/noUserImage.png";

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
          imgSrc === null || imgSrc === undefined
            ? noUserImage
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
    boxShadow: `rgba(0, 0, 0, 0.15) 0px 2px 8px`,

    "&:hover": {
      boxShadow: `rgb(207 195 189) 0px 0px 20px 2px, rgb(255 255 255 / 80%) 0px 0px 20px 8px`,
    },
  },

  albumCoverTitle: {
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: `${Fonts.DEFAULT}`,
    color: `${PageColors.COLOR}`,
  },
});

export default memo(Artist);
