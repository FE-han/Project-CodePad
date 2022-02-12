import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/types";
import setPresetData from "../../utils/setPresetData";
import setPresetId from "../../utils/setPresetId";
import PresetOptionHandle from "./components/PresetOptionHandle";
import PresetThumbnailUpload from "./components/PresetThumbnailUpload";
import PresetTitle from "./components/PresetTitle";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../slice/articleSlice"; //임시 액션함수 불러오기
import { RootState } from "../../modules/store";
import { title } from "process";

const MyPresetsPageStyles = makeStyles({
  root: {
    background: "#4b7a1f",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px auto 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "communityContainer presetList"`,

    "& > *": {
      border: "1px solid gray",
      minWidth: "500px",
    },
  },
  launchPad: {
    gridArea: "launchPad",
  },
  togglePresetBtn: {
    gridArea: "togglePresetBtn",
    display: "flex",
    justifyContent: "space-around",
  },
  presetList: {
    gridArea: "presetList",
  },
  communityContainer: {},
});

export function MyPresetsUpdatePage() {
  const classes = MyPresetsPageStyles();
  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const presetId = useParams();

  const getInitialData = async () => {
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
    getInitialData();
  }, []);

  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();
  const views = useSelector((state:any) => state.articleReducers.views);

    const onTitleChange = (event:any) => {
        setTitleValue(event.currentTarget.value);
    }

  const onSubmitTitle = (event:any) =>{
    event.preventDefault();
    if (titleValue=== '' || titleValue === null || titleValue === undefined){
      alert('제목을 작성하세요')
      return false;
    }
    const article = { title : titleValue, views : views };
    dispatch(articleActions.registerArticle(article))
    console.log(article);
  }


  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
        런치패드 올곳
        <LaunchPad presetData={myPresetData} />
      </div>
      <div className={classes.togglePresetBtn}>
        <PresetThumbnailUpload imgURL="https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png" />
        <div>
          <PresetTitle titleValue={titleValue} handleTitleChange={onTitleChange}/>
          <PresetOptionHandle handleSubmit={onSubmitTitle} />
        </div>
      </div>
      <div className={classes.presetList}>
        프리셋 리스트 올곳
        {/* <PresetList /> */}
      </div>
      <div className={classes.communityContainer}>
        태그, 댓글 등등 기타 커뮤니티 기능 들어올곳
      </div>
    </div>
  );
}

export default MyPresetsUpdatePage;
