import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import LaunchpadHeaderContainer from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import PresetImage from "../../components/Preset/PresetImage";
import PaginationContainer from "../../components/Preset/PaginationContainer";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";
import PresetCommunity from "../../components/PresetCommunity/PresetCommunity";

import { actions as setNowPresetValueActions } from "../../modules/actions/setNowPresetValueSlice";
import { getPreset, PresetParams } from "../../api/getPreset";

import { ToggleType } from "../../utils/CommonValue";
import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";

const MyPresetsPageStyles = makeStyles({
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
    gridTemplateRows: "1fr 4fr 3fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "community presetList"`,

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  changePresets: {
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
  },
  listStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#8E8E8E",
    height: "60%",
    width: "100%",
    fontWeight: "medium",
    borderRadius: 1,
  },
  presetListStyles: {
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    fontWeight: "medium",
    paddingBottom: "20px",
    textAlign: "center",
    lineHeight: "50px",
  },

  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
    display: "grid",
    alignItems: "center",
    padding: "10px",
  },

  togglePresetBtn: {
    gridArea: "togglePresetBtn",

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  presetList: {
    gridArea: "presetList",
    minWidth: "460px",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",

    "& > .presetListContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "23px 30px",
      gap: "8px",
      width: "93%",
    },
  },
  community: {
    gridArea: "community",
    padding: "18px",
    display: "grid",
    // alignItems: "center",
  },
});

export function MyPresetsPage() {
  const classes = MyPresetsPageStyles();

  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const urlParams = useParams<{ userId: string; presetId: string }>();
  const dispatch = useDispatch();

  const getInitialPresetData = async () => {
    if (!urlParams.userId) {
      throw new Error("urlParams에서 userId를 가져오지 못했습니다.");
    }
    const config: PresetParams = {
      userId: urlParams.userId,
      presetId: urlParams.presetId,
    };
    console.log(config);
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(config);
    // setDefaultPresetData(newPresetData);
    setPresetData({
      nowPresetData,
      defaultPresetData: myPresetData,
      setDefaultPresetData: setMyPresetData,
    });

    dispatch(setNowPresetValueActions.setValueFromPreset(nowPresetData)); //redux에 저장
  };

  useEffect(() => {
    getInitialPresetData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <LaunchpadHeaderContainer
            title={myPresetData.presetTitle}
            onlyFork={false}
          />

          <LaunchPad presetData={myPresetData} sampleSoundMap={new Map()} />
        </div>
        <div className={classes.togglePresetBtn}>
          <PresetToggleButton type={ToggleType.myPreset} />
        </div>

        <div className={classes.presetList}>
          <div className="presetListContainer">
            <PresetImage />
            <PresetList createBtn={true} />
            <PaginationContainer />
          </div>
        </div>
        <div className={classes.community}>
          <PresetCommunity />
        </div>
      </div>
    </div>
  );
}

export default MyPresetsPage;
