
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from '../../../assets/noImage.png';

const PresetThumbnailUploadStyles = makeStyles({
    root: {
        width: "40%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    imageWrap: {
        width: "100%",
        height: "100%",
    },

    uploadInput: {
        display: 'none',
    },

    uploadButton: {
        width: "50%",
        height: "20%",
        background: "transport",
        border: "1px solid white",
        padding: "5px 10px 5px 10px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
    },
});

type PresetThumbnailUploadProps = {
    imgURL: string | undefined
}

PresetThumbnailUpload.defaultProps = {
    imgURL: noImage
}
function PresetThumbnailUpload({imgURL}:PresetThumbnailUploadProps){
    const classes = PresetThumbnailUploadStyles();

    const [currImg, setCurrImg] = useState(imgURL);

    //파일 변환
    const encodeFileToBase64 = (file:File) => { 
        const reader = new FileReader();  
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64 = reader.result;
            if(base64) {
                setCurrImg(base64.toString());
            }
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files){
            encodeFileToBase64(files[0]);
        }
    }

    return (
        <div className={classes.root}>
            <img className={classes.imageWrap} src={currImg} alt="프리셋 커버 이미지" /> 
            <label>
                <input className={classes.uploadInput} accept="image/*" type="file" onChange={handleImageUpload} />
                <span className={classes.uploadButton}>
                    Upload <CloudUploadIcon/>
                </span>
            </label>
        </div>
    )
}

export default PresetThumbnailUpload;