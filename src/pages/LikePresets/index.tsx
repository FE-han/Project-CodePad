import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import {
  CommunityContentType,
  ScrollListContainerSize,
  ScrollValues,
} from "../../utils/CommonValue";

import CommunityContentsScrollList from "../../components/CommunityContents/CommunityContentsScrollList";
import { useEffect, useState } from "react";
import { PresetData } from "../../utils/CommonInterface";
import { makePresetScrollList } from "../../components/CommunityContents/makePresetScrollList";
import PresetContent from "../../components/CommunityContents/PresetContent";
import Loader from "../../components/CommunityContents/Loader";

export default function LikePresetsPage() {
  const classes = likePresetsPageStyles();

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
      Listname: `top50`,
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
      presetIds: "",
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

  return (
    <div className={classes.root}>
      <div className={classes.likeTitle}>
        <span>Likes</span>
      </div>
      <div className={classes.likeContainer}>
        {itemLists.map((preset, idx) => (
          <PresetContent key={preset.presetId} presetData={preset} />
        ))}
        <div ref={setTarget} className={classes.Loader}>
          {isLoaded && <Loader />}
        </div>
      </div>
    </div>
  );
}

const likePresetsPageStyles = makeStyles({
  root: {
    backgroundColor: `${PageColors.BACKGROUND}`,
    boxShadow: `${PageColors.SHADOW}`,

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "1041px",
    overflow: "hidden",
  },
  likeTitle: {
    display: "flex",
    alignItems: "center",
    padding: `50px 70px 15px 70px`,

    "& > span": {
      fontSize: "34px",
      fontWeight: "700",
      color: PageColors.COLOR,
    },
  },
  likeContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    textAlign: "center",
    padding: "20px",
    height: `calc(100vh - 203px)`,
    overflow: "auto",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  Loader: {
    gridColumn: "1 / 5",
    margin: "auto",
  },
});
