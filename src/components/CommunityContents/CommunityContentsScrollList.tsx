import React from "react";
import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";
import ArtistContent from "./ArtistContent";

import { ScrollValues } from "../../utils/CommonValue";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../modules/hooks";
import { actions as getPresetListActions } from "../../modules/actions/CommunityContents/presetListSlice";
import { useEffect, useState, useRef } from "react";

import { makePresetScrollList } from "./makePresetScrollList";
import { PresetData } from "../../utils/CommonInterface";
import { CommunityContentType } from "../../utils/CommonValue";

export default function CommunityContentsScrollList(props: {
  title: string;
  listName: string;
  type: number;
}) {
  const classes = ScrollListStyles();

  const scrollDiv = useRef<Element>(null);
  const lastContentDiv = useRef<Element>(null);

  const dispatch = useDispatch();
  //const state = useAppSelector((state) => state.presetListSlice);

  const [dataList, setDataList] = useState<Array<PresetData>>([]);

  const [curPageNum, setCurPageNum] = useState<number>(
    ScrollValues.defaultPageNum
  );

  const [presetLength, setPresetLength] = useState<number>(0);

  const callPresetListAPI = async () => {
    setDataList([]);

    const configdata = {
      Listname: props.listName,
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
    };

    //dispatch(getPresetListActions.getPresetListPending(state));

    const res = await makePresetScrollList(configdata);

    if (res.success) {
      // dispatch(
      //   getPresetListActions.getPresetListFulFilled({ presetList: res.data })
      // );

      const lastContent = document.querySelector(".lastContent");
      if (lastContent !== null) {
        lastContent.classList.remove(".lastContent");
      }
      const newDataList = [...dataList];
      res.data.map((dt: PresetData) => newDataList.push(dt));
      setDataList(newDataList);
      setPresetLength(res.data.length);
      setCurPageNum(curPageNum + 1);
      console.log("ok");
    } else {
      dispatch(getPresetListActions.getPresetListRejected());
      console.log(res.errorMessage);
    }
  };

  useEffect(() => {
    callPresetListAPI();
  }, []);

  const watchSrollState = () => {
    //const ScrollListContainer = document.querySelector(".ScrollListContainer");
    //const lastContent = document.querySelector(".lastContent");

    const option = {
      root: scrollDiv.current,
      rootMargin: "0px",
      threshold: 1,
    };
    const callback = (entries: Array<any>, observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callPresetListAPI();
        }
      });
    };
    const observer = new IntersectionObserver(callback, option);

    //lastContents.forEach((lastContent) => observer.observe(lastContent));
    if (lastContentDiv.current !== null) {
      observer.observe(lastContentDiv.current);
    }
  };

  const ContentList = () => {
    const type = props.type;
    let li: Array<any> = [];

    if (CommunityContentType.preset === type) {
      dataList.map((preset, idx) =>
        li.push(
          <PresetContent
            key={preset.presetId + Math.random() * 10}
            ref={presetLength - 1 === idx ? lastContentDiv : null}
            presetData={preset}
          />
        )
      );
    }

    if (CommunityContentType.profile === type) {
      dataList.map((preset, idx) =>
        li.push(
          <ArtistContent
            key={preset.presetId + Math.random() * 10}
            presetData={preset}
            ref={presetLength - 1 === idx ? lastContentDiv : null}
          />
        )
      );
    }

    return <>{li}</>;
  };

  // if (dataList === []]) {
  //   return <>Loading....</>;
  // }

  return (
    <>
      <header>{props.title}</header>
      <div
        className={`${classes.ScrollListContainer}`}
        onScroll={watchSrollState}
        ref={scrollDiv}
      >
        {ContentList()}
      </div>
    </>
  );
}

const ScrollListStyles = makeStyles({
  ScrollListContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    PaddingTop: "42px",
    PaddingBottom: "42px",
    textAlign: "center",
    height: `calc(100vh - 176px)`,
    overflow: "auto",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
