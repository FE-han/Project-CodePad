import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";
import ArtistContent from "./ArtistContent";
import Loader from "./Loader";

import { ScrollValues } from "../../utils/CommonValue";

import { useEffect, useState, ReactElement } from "react";

import { makePresetScrollList } from "./makePresetScrollList";
import { PresetData } from "../../utils/CommonInterface";
import { CommunityContentType } from "../../utils/CommonValue";
import { memo } from "react";

const CommunityContentsScrollList = (props: {
  title: string;
  listName: string;
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

  const [itemLists, setItemLists] = useState<Array<PresetData>>([]);
  const [curPageNum, setCurPageNum] = useState<number>(
    ScrollValues.defaultPageNum
  );

  const getMoreItem = async () => {
    setIsLoaded(true);

    const configdata = {
      Listname: props.listName,
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
    };

    const res: any = await makePresetScrollList(configdata);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (res.success) {
      setItemLists((itemLists) => itemLists.concat(res.data));
      setCurPageNum(curPageNum + 1);
      setIsError(false);
    }

    if (!res.success) {
      setIsError(true);
      console.log("error");
      throw new Error(res.errorMessage);
    }

    setIsLoaded(false);
  };

  const onIntersect = async (
    [entry]: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting && !isLoaded && !isError) {
      observer.unobserve(entry.target);
      try {
        await getMoreItem();
      } catch (error) {
        observer.disconnect();
        return;
      }
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });

      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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
