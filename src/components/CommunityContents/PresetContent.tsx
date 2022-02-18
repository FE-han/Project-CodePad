import { memo } from "react";
import { makeStyles } from "@mui/styles";
import { PresetData } from "../../utils/CommonInterface";
import { Fonts } from "../../utils/CommonStyle";
import { useNavigate } from "react-router";
import noImage from "../../assets/noImage.png";

const PresetContent = (props: { presetData: PresetData }) => {
  const classes = PresetContentStyles();
  const navigate = useNavigate();

  const { presetData } = props;
  const imgSrc = presetData.thumbnailURL;

  const visitedPresetIds = localStorage.getItem("visitedPresetIdList");
  let visitedPresetIdList: Array<string> = [];
  if (visitedPresetIds !== null) {
    visitedPresetIdList = JSON.parse(visitedPresetIds);
  }

  const addLocalStroage = () => {
    const isNotExist = visitedPresetIdList.indexOf(presetData.presetId);

    console.log(isNotExist);
    if (isNotExist === -1) {
      visitedPresetIdList.push(presetData.presetId);
      localStorage.setItem(
        "visitedPresetIdList",
        JSON.stringify(visitedPresetIdList)
      );
    }
  };

  return (
    <div
      className={`${classes.albumCoverContainer}`}
      onClick={() => {
        addLocalStroage();
        navigate(`/userpresets/${presetData.userId}/${presetData.presetId}`);
      }}
    >
      <img
        className={classes.albumCoverImg}
        src={
          imgSrc === null || imgSrc === undefined
            ? noImage
            : `${process.env.REACT_APP_SERVER_BASE_URL}/${imgSrc}`
        }
        alt="preset-img"
      ></img>

      <p className={classes.albumCoverTitle}>{presetData.title}</p>
    </div>
  );
};

const PresetContentStyles = makeStyles({
  albumCoverContainer: {
    margin: `23px auto`,
    cursor: "",
  },
  albumCoverImg: {
    width: "200px",
    height: "200px",
    marginBottom: "8px",
    cursor: "pointer",
  },

  albumCoverTitle: {
    fontSize: "20px",
    fontFamily: `${Fonts.DEFAULT}`,
  },
});

export default memo(PresetContent);
