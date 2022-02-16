import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../modules/hooks";

const presetTitleStyles = makeStyles({
    titleWrap: {
        "& h2": {
            fontWeight: "bold",
            fontSize: "1.75rem",
            color: "white",
            marginBottom: "30px"
        },

        "& input": {
            width: "100%",
            height: "40px",
            border: "none",
            borderRadius: "5px",
            boxSizing: "border-box",
            padding: "0 20px 0 20px"
        }
    }
})

export default function PresetTitle(){

    const classes = presetTitleStyles();
    const state = useAppSelector((state) => state.getPresetInfoSlice);
    const [title,setTitle] = useState<string>("");
    useEffect(() => {
        setTitle(state.presetTitle);
    },[state])
    return (
        <div className={classes.titleWrap}>
            <h2>Title</h2>
            <input type="text" name="title" value={title} placeholder={title}/>
        </div>
    )
}