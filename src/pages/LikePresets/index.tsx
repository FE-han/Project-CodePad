import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";
import { ScrollValues } from "../../utils/CommonValue";

import { useEffect, useState } from "react";
import { PresetData } from "../../utils/CommonInterface";
import { makeLikePresetScroll } from "../../components/PresetCommunity/makeLikePresetScroll";
import PresetContent from "../../components/CommunityContents/PresetContent";
import Loader from "../../components/CommunityContents/Loader";
import { LikePresetListparams } from "../../api/CommunityContents/getLikePresetList";

export default function LikePresetsPage() {
  const classes = likePresetsPageStyles();

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [itemLists, setItemLists] = useState<Array<PresetData>>([]);

  const [config, setConfig] = useState<LikePresetListparams>({
    pageNum: ScrollValues.defaultPageNum,
    limitNum: ScrollValues.limitNum,
  });

  const getMoreItem = async () => {
    const res = await makeLikePresetScroll(config);

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
