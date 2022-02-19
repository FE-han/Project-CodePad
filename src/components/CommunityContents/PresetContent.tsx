import { memo } from "react";
import { makeStyles } from "@mui/styles";
import { PresetData } from "../../utils/CommonInterface";
import { Fonts, PageColors } from "../../utils/CommonStyle";
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
    const idx = visitedPresetIdList.indexOf(presetData.presetId);

    if (idx > -1) {
      visitedPresetIdList.splice(idx, 1);
    }

    visitedPresetIdList.push(presetData.presetId);
    localStorage.setItem(
      "visitedPresetIdList",
      JSON.stringify(visitedPresetIdList)
    );
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
  },
  albumCoverImg: {
    width: "200px",
    height: "200px",
    marginBottom: "8px",
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

export default memo(PresetContent);
