import { makeStyles } from "@mui/styles";

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

    return (
        <div className={classes.titleWrap}>
            <h2>Title</h2>
            <input type="text" />
        </div>
    )
}