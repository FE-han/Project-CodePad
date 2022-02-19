import { makeStyles } from "@mui/styles";
import Tags from "./Tags";
import Reactions from "./Reactions";
import CommentsContainer from "./CommentsContainer";
import { useAppSelector } from "../../modules/hooks";
import { useParams } from "react-router";
import TagsList from './TagsList'
import { useDispatch } from "react-redux";
import { getTags, GetTags } from "../../api/getTags";
import { actions as getTagsActions } from '../../modules/actions/getTagsSlice'
import { TagsElement } from "../../pages/HandleMyPresetPage/utils/types";
import { useEffect } from "react";


const PresetCommunityStyles = makeStyles({
  root: {
    display: `grid`,
    rowGap: "15px",
    columnGap: "15px",
    maxHeight: "189px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tags: {
    display: "flex",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  reactions: {
    display: "flex",
    alignItems: "center",
  },
  commentsContainer: {
    gridColumn: `1 / 3`,
  }
});
export default function PresetCommunity() {
  const classes = PresetCommunityStyles();
  const presetId= useParams();
  const dispatch = useDispatch();

  const {data} = useAppSelector(
    (state) => state.getTagsSlice
)

  const {presetList} = useAppSelector(
    (state) => state.getMyPresetListSlice
  )

  //내 tags를 가져오는 api에서 값을 받아옴

  const presetTagsData = async () => {
    const param: GetTags = {
      tagId: "2"
    }

    try{
      dispatch(getTagsActions.getTagsDataPending(param));
      const nowpresetTags: Array<TagsElement> = await getTags(param);
      dispatch(
        getTagsActions.getTagsDataFulfilled({
          data: nowpresetTags
        })
      )
    }catch{
      dispatch(getTagsActions.getTagsDataRejecterd());
      console.log('에러')
    }
  }

  useEffect(()=>{
    presetTagsData();
  },[])

  return (
    <div className={classes.root}>
      <div className={classes.tags}>
        <TagsList data={data} selectedPresetId={presetId}/>
      </div>
      <div className={classes.reactions}>
        <Reactions presetList={presetList} selectedPresetId={presetId}/>
      </div>
      <div className={classes.commentsContainer}>
        <CommentsContainer />
      </div>
    </div>
  );
}
