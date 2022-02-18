import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";
import ArtistContent from "./ArtistContent";
import Loader from "./Loader";

import { ScrollValues } from "../../utils/CommonValue";

import { useEffect, useState, ReactElement } from "react";

import { makePresetScrollList } from "./makePresetScrollList";
import { PresetData } from "../../utils/CommonInterface";
import {
  CommunityContentType,
  IntroRequsetType,
} from "../../utils/CommonValue";
import { memo } from "react";
import { PresetListparams } from "../../api/CommunityContents/getPresetList";

const CommunityContentsScrollList = (props: {
  title: string;
  listName: IntroRequsetType;
  type: CommunityContentType;
  scrollSize: number;
}) => {
  const ScrollListStyles = makeStyles({
    ScrollListContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      PaddingTop: "42px",
      PaddingBottom: "42px",
      textAlign: "center",
      height: `calc(100vh - ${props.scrollSize}px)`,
      overflow: "auto",

      "&::-webkit-scrollbar": {
        display: "none",
      },
    },

    Loader: {
      marginBottom: "50px",
    },
  });

  const classes = ScrollListStyles();

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [itemLists, setItemLists] = useState<Array<PresetData>>([]);

  const visitedPresetIdList = localStorage.getItem("visitedPresetIdList");
  let defaultPresetIds = "";

  if (props.listName === "recentlyUsed" && visitedPresetIdList !== null) {
    defaultPresetIds = visitedPresetIdList;
  }

  const [config, setConfig] = useState<PresetListparams>({
    Listname: props.listName,
    pageNum: ScrollValues.defaultPageNum,
    limitNum: ScrollValues.limitNum,
    presetIds: defaultPresetIds,
  });

  const getMoreItem = async () => {
    const res = await makePresetScrollList(config);

    if (res.success) {
      if (res.data.length > 0) {
        setItemLists((arr) => arr.concat(res.data));
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!isLoaded) return;

    const res = getMoreItem();
    if (!res) {
      setIsError(true);
    }
    const newPageNum = config.pageNum + 1;
    setConfig((prev) => {
      return { ...prev, pageNum: newPageNum };
    });
    setIsLoaded(false);
  }, [isLoaded]);

  const onIntersect = (
    [entry]: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting) {
      //observer.unobserve(entry.target);
      setIsLoaded(true);
      //observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (isDone || isError) {
      return () => observer && observer.disconnect();
    } else {
      if (target && !isDone && !isError) {
        observer = new IntersectionObserver(onIntersect, {
          threshold: 0,
        });

        observer.observe(target);
      }
    }
  }, [target, isDone, isError]);

  const ContentList = () => {
    const type = props.type;
    let li: Array<ReactElement> = [];

    if (type === "PRESET") {
      itemLists.map((preset, idx) =>
        li.push(<PresetContent key={preset.presetId} presetData={preset} />)
      );
    }

    if (type === "PROFILE") {
      itemLists.map((preset, idx) =>
        li.push(<ArtistContent key={preset.presetId} presetData={preset} />)
      );
    }

    return <>{li}</>;
  };

  return (
    <>
      <header>{props.title}</header>
      <div className={classes.ScrollListContainer}>
        {ContentList()}
        <div ref={setTarget} className={classes.Loader}>
          {isLoaded && <Loader />}
        </div>
      </div>
    </>
  );
};

export default memo(CommunityContentsScrollList);
