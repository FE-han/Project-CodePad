import React, { Props, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import { PresetImageColors } from "../../utils/CommonStyle";
import { PresetListElement } from "../../pages/MyPresetsPage/utils/types";
import { useParams } from "react-router";
import { getMyPresetList } from "../../api/getMyPresetList";
import { imageListClasses } from "@mui/material";
import { PresetData } from "../../utils/CommonInterface";
import { getMyPresetListSlice } from "../../modules/actions/getMyPresetListSlice";
import defaultImg from "../../assets/noImage.png";

const PrestImageStyles = makeStyles({
  presetImage: {
    margin: `0 auto`,

    "& > img": {
      width: "200px",
      height: "200px",
      boxShadow: PresetImageColors.SHADOW,
    },
  },
});
interface PresetImageProps {
  imageURL?: string;
}

const PresetImage = ({ imageURL }: PresetImageProps) => {
  const classes = PrestImageStyles();

  return (
    <div className={classes.presetImage}>
      <img
        src={
          imageURL !== null && imageURL !== undefined
            ? `${process.env.REACT_APP_SERVER_BASE_URL}/${imageURL}`
            : defaultImg
        }
        alt="/src/assets/noImage.png"
      />
    </div>
  );
};

export default PresetImage;
