import React from "react";
import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";

import { ScrollValues } from "../../utils/CommonValue";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../modules/hooks";
import { actions as getPresetListActions } from "../../modules/actions/CommunityContents/presetListSlice";
import { useEffect, useState } from "react";

import { makePresetScrollList } from "./makePresetScrollList";

export default function CommunityContentsScrollList(props: {
  title: string;
  listName: string;
}) {
  const classes = ScrollListStyles();

  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.presetListSlice);

  const [curPageNum, setCurPageNum] = useState<number>(
    ScrollValues.defaultPageNum
  );

  const [presetLength, setPresetLength] = useState<number>(0);

  const callPresetListAPI = async () => {
    const configdata = {
      Listname: props.listName,
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
    };

    dispatch(getPresetListActions.getPresetListPending(state));

    const res = await makePresetScrollList(configdata);

    // setTimeout(() => {
    //   if (res.success) {
    //     dispatch(
    //       getPresetListActions.getPresetListFulFilled({ presetList: res.data })
    //     );

    //     setPresetLength(res.data.length);
    //     setCurPageNum(curPageNum + 1);
    //     console.log("ok");
    //   } else {
    //     dispatch(getPresetListActions.getPresetListRejected());
    //     console.log(res.errorMessage);
    //   }
    // }, 2000);
  };

  useEffect(() => {
    callPresetListAPI();
  }, []);

  const watchSrollState = () => {
    const ScrollListContainer = document.querySelector(".ScrollListContainer");
    const lastContents = document.querySelectorAll(".lastContent");

    const option = {
      root: ScrollListContainer,
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

    lastContents.forEach((lastContent) => observer.observe(lastContent));
  };

  return (
    <>
      <header>{props.title}</header>
      <div
        className={`${classes.ScrollListContainer} ScrollListContainer`}
        onScroll={watchSrollState}
      >
        {state.presetList.map((preset, idx) => (
          <PresetContent
            key={preset.presetId + Math.random() * 10}
            presetData={preset}
            checkLastPreset={presetLength - 1 === idx ? true : false}
          />
        ))}
        {state.isLoading ? "wait" : null}
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
