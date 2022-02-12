import { makeStyles } from "@mui/styles";
import PresetContent from "./PresetContent";
import ArtistContent from "./ArtistContent";
import Loader from "./Loader";

import { ScrollValues } from "../../utils/CommonValue";

import { useEffect, useState, useRef, ReactElement } from "react";

import { makePresetScrollList } from "./makePresetScrollList";
import { PresetData } from "../../utils/CommonInterface";
import { CommunityContentType } from "../../utils/CommonValue";
import { red } from "@mui/material/colors";

export default function CommunityContentsScrollList(props: {
  title: string;
  listName: string;
  type: number;
}) {
  const classes = ScrollListStyles();

  const wrapper = useRef<HTMLDivElement>(null);

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [curPageNum, setCurPageNum] = useState<number>(
    ScrollValues.defaultPageNum
  );

  const [itemLists, setItemLists] = useState<Array<PresetData>>([]);

  const getMoreItem = async () => {
    setIsLoaded(true);

    const configdata = {
      Listname: props.listName,
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
    };

    const res: any = await makePresetScrollList(configdata);

    if (res.success) {
      setItemLists((itemLists) => itemLists.concat(res.data));
      setCurPageNum(curPageNum + 1);
    }

    if (!res.success) {
      setIsLoaded(false);
      throw new Error(res.errorMessage); // (A)
    }
    setIsLoaded(false);
  };

  const onIntersect = (
    //onIntersect은 Promise 반환 함수가 아니라 여기서는 async 쓸필요없어요
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        try {
          await getMoreItem();
          //여기서 실패일때 에러를 던저주세요 => A (52번줄)
        } catch (error) {
          observer.disconnect();
          return;
        }
        observer.observe(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      const option = {
        root: wrapper.current,
        rootMargin: "0px",
        threshold: 0.4,
      };

      observer = new IntersectionObserver(onIntersect, option);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, wrapper]);

  const ContentList = () => {
    const type = props.type;
    let li: Array<ReactElement> = [];

    if (CommunityContentType.preset === type) {
      itemLists.map((preset, idx) =>
        li.push(
          <PresetContent
            key={preset.presetId}
            // key={preset.presetId + Math.random() * 10}
            //key값은 각 요소를 구별하면서 추정가능해야합니다. presetId가 unique한 값이라면 preset.presetId만 사용하세요. random같은 추정불가능한 값은 비추천...
            presetData={preset}
          />
        )
      );
    }

    if (CommunityContentType.profile === type) {
      itemLists.map((preset, idx) =>
        li.push(
          <ArtistContent
            key={preset.presetId}
            //위와 동일
            presetData={preset}
          />
        )
      );
    }

    return <>{li}</>;
  };

  return (
    <>
      <header>{props.title}</header>
      <div ref={wrapper} className={classes.ScrollListContainer}>
        {ContentList()}
        <div ref={setTarget}>{isLoaded && <Loader />}</div>
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
