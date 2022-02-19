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
  imageURL: string;
}

const PresetImage = ({ imageURL }: PresetImageProps) => {
  const classes = PrestImageStyles();

  // const [imgURL, setImgURL] = useState('');

  // useEffect(()=>{
  //  presetList.map((value)=>{
  //     if(value.presetId === selectedPresetId.presetId){
  //       setImgURL(value.thumbnailImageURL);
  //     }
  //   })
  // },[presetList, selectedPresetId])
  //감지할 대상 ex) nowselectedElement

  return (
    <div className={classes.presetImage}>
      <img src={imageURL} alt="" />
    </div>
  );
};

export default PresetImage;
