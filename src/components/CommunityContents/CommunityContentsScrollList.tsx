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
import { Fonts } from "../../utils/CommonStyle";

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
        width: "10px",
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(210, 95, 95, 0.5)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "rgb(255,255,255,0.3)",
        borderRadius: "10px",
        boxShadow: `inset 0px 0px 5px white`,
      },
    },
    title: {
      color: "#d16a6a",
      marginTop: "56px",
      marginBottom: "56px",
      fontFamily: `${Fonts.TITLE}`,
      fontSize: "28px",
      fontWeight: "bold",
      opacity: "65%",
    },
    Loader: {
      //margin: "50px 0px",
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
      } else {
        setIsDone(true);
      }
    } else {
      setIsError(true);
    }
    setIsLoaded(false);
  };

  useEffect(() => {
    if (!isLoaded || isError || isDone) return;

    getMoreItem();

    const newPageNum = config.pageNum + 1;
    setConfig((prev) => {
      return { ...prev, pageNum: newPageNum };
    });
  }, [isLoaded]);

  const onIntersect = (
    [entry]: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setIsLoaded(true);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && !isDone && !isError) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });

      observer.observe(target);
    }
    return () => observer && observer.disconnect();
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
        li.push(<ArtistContent key={preset.userId} presetData={preset} />)
      );
    }

    return <>{li}</>;
  };

  return (
    <>
      <header className={classes.title}>{props.title}</header>
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
