import React, { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import { PresetImageColors } from "../../utils/CommonStyle";
import { PresetListElement } from "../../pages/MyPresetsPage/utils/types";
import { useParams } from 'react-router';
import { getMyPresetList } from '../../api/getMyPresetList';
import { imageListClasses } from '@mui/material';


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
const PresetImage = (props:{image:Array<PresetListElement>;}) => {
  const classes = PrestImageStyles();
  const [url, setURL] = React.useState(0);
  const data: any = useParams();
  console.log(data.presetId);
  console.log(data)
  
  console.log(props.image)
  

  useEffect(()=>{
    setURL(data.presetId)
  }, [data.presetId])

  // props.image.filter(element => {
  //   const short = element.thumbnailImageURL
  //   console.log(element.thumbnailImageURL)
  // })
  console.log(props.image)
  
  // console.log(props.image[1].thumbnailImageURL)
  

  return (
    <div className={classes.presetImage}>
        <img src={testImage} alt="error" />        
    </div>
  );
};

export default PresetImage;
