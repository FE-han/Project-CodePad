import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";

import { getPreset } from "../../api/getPreset";

import LaunchpadHeaderContainer from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import PresetImage from "../../components/Preset/PresetImage";
import PaginationContainer from "../../components/Preset/PaginationContainer";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";

import { ToggleType } from "../../utils/CommonValue";
import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";
import { PresetListElement } from "./utils/types";

import { useDispatch, useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";

import PresetCommunity from "../../components/PresetCommunity/PresetCommunity";
import { actions as getMyPresetListActions } from "../../modules/actions/getMyPresetListSlice";
import { useAppSelector } from "../../modules/hooks";
import { getMyPresetList, GetMyPresetParams } from "../../api/getMyPresetList";
import { PresetListState } from "../../modules/actions/CommunityContents/presetListSlice";
import { PresetData } from "../../utils/CommonInterface";

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
  const dispatch = useDispatch();

  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const presetId = useParams();
  // const userId = useParams();

  const { presetList, isLoading } = useAppSelector(
    (state) => state.getMyPresetListSlice
  );
  console.log(presetList)
  

  // const state = useSelector((state) => state.getPresetListInfoDataActions.presetId)
  // console.log(state)

  const getPresetListInfoData = async () => {
    // const userId = await getUserId()  이런식으로 토큰을 서버에 보내고, 내 userId를 가져오는 api를 수행해서 값을 받아옴

    const param: GetMyPresetParams = {
      userId: "1",
    };

    try {
      dispatch(getMyPresetListActions.getPresetDataPending(param)); //내가 리스트를 가져오기 시작하겠다! 명시
      const nowMyPresetList: Array<PresetListElement> = await getMyPresetList(
        param
      );
      console.log(nowMyPresetList);
      dispatch(
        getMyPresetListActions.getPresetDataFulfilled({
          presetList: nowMyPresetList,
        })
      );
      console.log("state:", presetList);
    } catch {
      dispatch(getMyPresetListActions.getPresetDataRejected());
      alert("에러");
    }
  };

  const getInitialLaunchPadPresetData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(setPresetId(presetId));
    // setDefaultPresetData(newPresetData);
    setPresetData({
      nowPresetData,
      defaultPresetData: myPresetData,
      setDefaultPresetData: setMyPresetData,
    });
  };

  useEffect(() => {
    getPresetListInfoData();
    getInitialLaunchPadPresetData();
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
            <PresetList createBtn={true} presetList={presetList} />
            <PaginationContainer presetList={presetList}/>
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
