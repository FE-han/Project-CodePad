import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPreset, PresetParams } from "../../api/getPreset";

import PresetThumbnailUpload from "./components/PresetThumbnailUpload";
import { initialEditPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";
import PresetInfo from "./components/PresetInfo";

import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";

import { ButtonColors } from "../../utils/CommonStyle";
import { BtnType, PrivacyType } from "../../utils/CommonValue";
import testImage from "../../assets/testImage.png";
import LaunchPadEdit from "../../components/LaunchPadEdit";
import PresetSoundInfo from "../../components/Preset/PresetSoundInfo";
import { NowPresetValueState } from "../../modules/actions/setNowPresetValueSlice";

export const HandleMyPresetPageStyles = makeStyles({
  root: {
    height: `calc(100% - 64px)`,
    minWidth: "1041px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1041px",
    minHeight: "814.5px",

    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad presetInfo"
    "launchPad soundInfo"
    "tags soundInfo"`,

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  presetInfo: {
    gridArea: "presetInfo",
    minWidth: "460px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > .presetInfoContainer": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  soundInfo: {
    gridArea: "soundInfo",
    minWidth: "460px",

    "& > .soundInfoContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "23px 30px",
    },
  },

  btnContainer: {
    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,
      margin: "0px 3px",

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
  title: {
    // input label when focused
    "& label.Mui-focused": {
      color: ButtonColors.COLOR,
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: ButtonColors.COLOR,
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: ButtonColors.COLOR,
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: ButtonColors.COLOR,
      },
    },
  },

  radioContainer: {
    justifyContent: "center",
  },
  setSoundInfo: {
    width: "80%",
    margin: `50px auto`,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 2fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",

    textAlign: "center",
    color: ButtonColors.COLOR,
    fontWeight: "700",
    alignItems: "center",
  },
  uploadInput: {
    display: "none",
  },
  tags: {
    gridArea: "tags",
  },
});

export function HandleMyPresetPage() {
  const classes = HandleMyPresetPageStyles();

  const [initialPresetData, setInitialPresetData] =
    useState<NowPresetValueState>(
      initialEditPresetGenerator(LaunchPadScale.DEFAULT)
    );
  const urlParams = useParams<{ presetId: string }>();

  const getInitialDataForUpdate = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    console.log("asdf", urlParams.presetId);

    const config: PresetParams = {
      userId: "userIdFromApi", //token을 이용해서 서버에서 받아옴
      presetId: setPresetId(urlParams),
    };

    const nowPresetData: Preset = await getPreset(config);
    console.log(nowPresetData);
    // setinitialPresetData(newPresetData);

    // setPresetData({
    //   nowPresetData,
    //   defaultPresetData: initialPresetData,
    //   setDefaultPresetData: setinitialPresetData,
    // });
  };

  useEffect(() => {
    if (urlParams.presetId === undefined) {
      console.log("create page");
      return;
    }
    console.log("update page");
    getInitialDataForUpdate(); // redux state값이 비어있다면 이것으로 값을 가져오게끔 해야함
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <LaunchPadEdit presetData={initialPresetData} />
        </div>
        <div className={classes.presetInfo}>
          <div className="presetInfoContainer">
            <PresetThumbnailUpload imgURL={testImage} />
            <PresetInfo />
          </div>
        </div>
        <PresetSoundInfo
          setInitialPresetData={setInitialPresetData}
          initialPresetData={initialPresetData}
        />
        <div className={classes.tags}></div>
      </div>
    </div>
  );
}

export default HandleMyPresetPage;
