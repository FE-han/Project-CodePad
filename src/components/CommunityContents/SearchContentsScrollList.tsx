import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";
import ArtistContent from "./ArtistContent";
import Loader from "./Loader";

import { ScrollValues } from "../../utils/CommonValue";

import { useEffect, useState, ReactElement } from "react";

import { PresetData } from "../../utils/CommonInterface";
import {
  CommunityContentType,
  SearchRequsetType,
} from "../../utils/CommonValue";
import { memo } from "react";

import { SearchParams } from "../../api/CommunityContents/getSearchList";
import { useParams } from "react-router";
import { makeSearchScrollList } from "./makeSearchScrollList";

const SearchContentsScrollList = (props: {
  title: string;
  listName: SearchRequsetType;
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

  const { keyword } = useParams();

  let text = keyword !== undefined ? keyword : "";

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [itemLists, setItemLists] = useState<Array<PresetData>>([]);

  const [config, setConfig] = useState<SearchParams>({
    listName: props.listName,
    pageNum: ScrollValues.defaultPageNum,
    limitNum: ScrollValues.limitNum,
    keyword: text,
  });

  useEffect(() => {
    const newKeyword = keyword !== undefined ? keyword : "";
    setConfig((prev) => {
      return {
        ...prev,
        pageNum: ScrollValues.defaultPageNum,
        limitNum: ScrollValues.limitNum,
        keyword: newKeyword,
      };
    });
  }, [keyword]);

  useEffect(() => {
    getNewItem();
  }, [config]);

  const getNewItem = async () => {
    const res = await makeSearchScrollList(config);
    if (res.success) {
      const newData = res.data;
      setItemLists((arr) => []);
      setItemLists((arr) => [...newData]);
    }
  };

  const getMoreItem = async () => {
    //console.log(config);
    const res = await makeSearchScrollList(config);

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

export default memo(SearchContentsScrollList);
