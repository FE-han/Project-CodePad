import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import LaunchpadHeaderContainer from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import PresetImage from "../../components/Preset/PresetImage";
import PaginationContainer from "../../components/Preset/PaginationContainer";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";

import { actions as setNowPresetValueActions } from "../../modules/actions/setNowPresetValueSlice";
import { getPreset, PresetParams } from "../../api/getPreset";

import { ToggleType } from "../../utils/CommonValue";
import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";
import { PresetListElement } from "./utils/types";

import { useDispatch, useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";

import PresetCommunity from "../../components/PresetCommunity/PresetCommunity";
import { actions as getMyPresetListActions } from "../../modules/actions/getMyPresetListSlice";
import { getMyPresetList, GetMyPresetParams } from "../../api/getMyPresetList";
import { PresetListState } from "../../modules/actions/CommunityContents/presetListSlice";
import { PresetData } from "../../utils/CommonInterface";

import { useAppSelector } from "../../modules/hooks";
import { getPresetInfo } from "../../api/getPresetInfo";
import { actions as getPresetActions } from "../../modules/actions/LaunchPad/getPresetSlice";
import { actions as soundButtonsActions } from "../../modules/actions/LaunchPad/soundButtonsSlice";

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
      gap: "8px",
      width: "93%",
    },
  },
  community: {
    gridArea: "community",
    padding: "18px",
    display: "grid",
    alignItems: "center",
  },
});

export function MyPresetsPage() {
  const classes = MyPresetsPageStyles();
  const dispatch = useDispatch();

  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const [sampleSoundMap, setSampleSoundMap] = useState(new Map());

  const presetId = useParams();
  // const userId = useParams();

  const { presetList, isLoading } = useAppSelector(
    (state) => state.getMyPresetListSlice
  );

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
    } catch {
      dispatch(getMyPresetListActions.getPresetDataRejected());
      console.log("에러");
    }
  };

  const urlParams = useParams<{ userId: string; presetId: string }>();

  const getInitialPresetData = async () => {
    const config: PresetParams = {
      userId: urlParams.userId,
      presetId: urlParams.presetId,
    };
    try {
      const nowPresetData: Preset = await getPreset(config);
      dispatch(getPresetActions.getPresetDataFulfilled(nowPresetData));
      setPresetData({
        nowPresetData,
        defaultPresetData: myPresetData,
        setDefaultPresetData: setMyPresetData,
      });
      dispatch(
        soundButtonsActions.setButtonState({
          soundSamples: nowPresetData.soundSamples,
        })
      );
      const currentSampleSoundMap = sampleSoundMap;
      nowPresetData.soundSamples.map((soundSample) => {
        currentSampleSoundMap.set(
          soundSample.location,
          soundSample.soundSampleURL
        );
      });
      setSampleSoundMap(currentSampleSoundMap);
      dispatch(setNowPresetValueActions.setValueFromPreset(nowPresetData)); //redux에 저장
    } catch (err) {
      console.log("프리셋 Api에러", err);
      dispatch(getPresetActions.getPresetDataRejected());
    }

    const newPresetInfo = await getPresetInfo(urlParams.presetId);
    dispatch(setNowPresetValueActions.setValueFromPrivacyOption(newPresetInfo));
    dispatch(setNowPresetValueActions.setValueFromImage(newPresetInfo));
    dispatch(setNowPresetValueActions.setValueFromTags(newPresetInfo));
  };

  useEffect(() => {
    getPresetListInfoData();
    getInitialPresetData();
  }, []);

  const state = useAppSelector((state) => state.getPresetSlice);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <LaunchpadHeaderContainer
            title={myPresetData.presetTitle}
            onlyFork={false}
            presetId={myPresetData.presetId || "unknownId"}
          />

          {state.isLoading ? (
            "로딩중"
          ) : (
            <LaunchPad
              presetData={myPresetData}
              sampleSoundMap={sampleSoundMap}
            />
          )}
        </div>
        <div className={classes.togglePresetBtn}>
          <PresetToggleButton type={ToggleType.myPreset} />
        </div>

        <div className={classes.presetList}>
          <div className="presetListContainer">
            <PresetImage presetList={presetList} selectedPresetId={presetId} />
            <PresetList createBtn={true} presetList={presetList} />
            <PaginationContainer presetList={presetList} />
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
