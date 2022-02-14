
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState, useRef } from "react";
import uploadIcon from '../../../assets/cloud_upload_icon.png';
import noImage from '../../../assets/noImage.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const PresetThumbnailUploadStyles = makeStyles({
    root: {
        width: "200px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "space-evenly"
    },

    imageWrap: {
        width: "100%",
        height: "200px",
        textAlign: "center",
        backgroundColor: "gray",
        overflow: "hidden",

        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
        }
    },

    uploadButtonWrap: {
        width: "100%",
        textAlign: "center",
    },
    uploadInput: {
        display: 'none',
    },

    uploadButton: {
        width: "50%",
        lineHeight: "30px",
        background: "transparent",
        border: "1px solid white",
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
    const inputFile = useRef<any>();

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
            <div className={classes.imageWrap}>
                <img src={currImg} alt="프리셋 커버 이미지" /> 
            </div>
            <div className={classes.uploadButtonWrap}>
                {/* <button>
                    <input className={classes.uploadInput} accept="image/*" type="file" onChange={handleImageUpload} />
                    <span className={classes.uploadButton}>
                        UPLOAD &nbsp;
                    <img src={uploadIcon} />
                    </span>

                </button> */}

                <input className={classes.uploadInput} accept="image/*" type="file" onChange={handleImageUpload} ref={inputFile} />
                <button className={classes.uploadButton} onClick={() => {
                    inputFile.current.click()
                }} >UPLOAD
                &nbsp;
                <CloudUploadIcon sx={{transform: "translateY(20%)",fontSize: "1.125rem"}} />
                </button>
            </div>
        </div>
    )
}

export default PresetThumbnailUpload;