/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { makeStyles } from "@mui/styles";
import Tags from "./Tags";
import TagsContainer from "./TagsContainer";
import {GetTags, getTags} from '../../api/getTags'
import { useDispatch } from "react-redux";
import { actions as getTagsActions } from '../../modules/actions/getTagsSlice'
import { TagsElement } from "../../pages/HandleMyPresetPage/utils/types";
import { useAppSelector } from "../../modules/hooks";
import { useEffect } from "react";

const PresetTagsStyles = makeStyles({
    root: {
        display: `grid`,
        rowGap: "15px",
        columnGap: "15px",
        maxHeight: "189px",
        alignItems: "center",
      },
      tags:{
          display: "flex",
          overflow: "auto",
          "&::-webkit-scrollbar":{
              display: "none"
          },
      },
      commentsContainer: {
        gridColumn: `1 / 3`,
      },
})

export default function presetTags() {
    const classes = PresetTagsStyles();
    const dispatch = useDispatch();
    const {data, isLoading} = useAppSelector(
        (state) => state.getTagsSlice
    )

    //내 tags를 가져오는 api에서 값을 받아옴

    const presetTagsData = async () => {
        const param: GetTags = {
            tagId: "1"
        }

        try{
            dispatch(getTagsActions.getTagsDataPending(param));
            const nowpresetTags: Array<TagsElement> = await getTags(param);
            dispatch(
                getTagsActions.getTagsDataFulfilled({
                    data : nowpresetTags
                })
            )
            console.log(nowpresetTags)
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
                <Tags data={data}/>
            </div>
            <div className={classes.commentsContainer}>
                <TagsContainer />
            </div>
        </div>
    )
}