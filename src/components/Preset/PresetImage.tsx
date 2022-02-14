import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import { PresetImageColors } from "../../utils/CommonStyle";

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
const PresetImage = () => {
  const classes = PrestImageStyles();
  return (
    <div className={classes.presetImage}>
      <img src={testImage} alt="" />
    </div>
  );
};

export default PresetImage;
