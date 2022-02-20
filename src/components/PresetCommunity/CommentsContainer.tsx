import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Fonts, ButtonColors, CommentColors } from "../../utils/CommonStyle";
import React, { useEffect } from "react";
import { memo } from "react";
import {
  deleteCommnetListAPI,
  getCommentListParams,
  postCommentListAPI,
  putCommnetListAPI,
} from "../../api/Comment/commentListAPI";
import { useState } from "react";
import { CommentData } from "../../utils/CommonInterface";
import { ScrollValues } from "../../utils/CommonValue";
import Loader from "../CommunityContents/Loader";

import { makeCommentScrollList } from "./makeCommentScroll";
import { useAppSelector } from "../../modules/hooks";

const commentsContainerStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: CommentColors.COLOR,
    fontFamily: Fonts.DEFAULT,
  },
  commentList: {
    border: `1px solid gray`,
    padding: "7px",
    height: "133px",
    overflow: "auto",
  },
  commentInput: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",

    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
  Loader: {
    display: "flex",
    justifyContent: "center",
  },
});

const CommentsContainer = () => {
  const classes = commentsContainerStyles();

  const { presetId } = useAppSelector((state) => state.setNowPresetValueSlice);

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const [IsUpdate, setIsUpdate] = useState<boolean>(false);
  const [commentIdForUpdate, setCommentIdForUpdate] = useState<string>("");
  const [commentList, setCommentList] = useState<Array<CommentData>>([]);
  //const [pageNum, setPageNum] = useState<number>(ScrollValues.defaultPageNum);
  const [config, setConfig] = useState<getCommentListParams>({
    presetId,
    pageNum: ScrollValues.defaultPageNum,
    limitNum: ScrollValues.limitNum,
  });

  const [text, setText] = useState<string>("");

  const getMoreItem = async () => {
    const res = await makeCommentScrollList(config);

    if (res.success) {
      if (res.data.length > 0) {
        setCommentList((arr) => arr.concat(res.data));
      } else {
        setIsDone(true);
      }
    } else {
      setIsError(true);
    }
    setIsLoaded(false);
  };

  const getNewItem = async () => {
    const res = await makeCommentScrollList(config);
    if (res.success) {
      const newData = res.data;
      setCommentList((arr) => []);
      setCommentList((arr) => [...newData]);
    }
  };

  useEffect(() => {
    setConfig((prev) => {
      return {
        ...prev,
        presetId,
        pageNum: ScrollValues.defaultPageNum,
        limitNum: ScrollValues.limitNum,
      };
    });
    handleCancleBtn();
  }, [presetId]);

  useEffect(() => {
    if (
      config.pageNum === ScrollValues.defaultPageNum &&
      config.presetId !== ""
    ) {
      getNewItem();
    }
    setIsLoaded(false);
  }, [config]);

  useEffect(() => {
    if (!isLoaded || isError || isDone || config.presetId === "") return;

    getMoreItem();

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

  const handleCreate = async () => {
    const configdata = {
      presetId,
      text,
    };

    try {
      const newCommentList = await postCommentListAPI(configdata);
      setCommentList(newCommentList);
    } catch (error) {
      //alert("send Error");
    }
  };
  const handleCancleBtn = () => {
    setText("");
    setIsUpdate(false);
    setBtnDisabled(true);
  };

  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const value = target.value.trim();

    if (value.length > 20) {
      setText(value.substr(0, 20));
    }

    if (evt.key === "Enter") {
      if (value.length > 0) {
        if (IsUpdate) {
          updateComment(commentIdForUpdate);
          setIsUpdate(false);
        } else {
          handleCreate();
        }
      }
      setText("");
    }
  };

  const handleUpdate = (commentId: string, comment: string) => {
    setIsUpdate(true);
    setText(comment);
    setCommentIdForUpdate(commentId);
  };
  const updateComment = async (commentId: string) => {
    const configdata = {
      presetId,
      commentId,
      text,
    };

    try {
      await putCommnetListAPI(configdata);
      const newCommentList = [...commentList];

      newCommentList.map((dt) => {
        if (dt.commentId === commentId) {
          dt.comment = text;
        }
      });
      setCommentList(newCommentList);
    } catch (error) {
      //alert("update Error");
    }
  };
  const handleDelete = async (commentId: string) => {
    const configdata = {
      presetId,
      commentId,
    };

    try {
      await deleteCommnetListAPI(configdata);
      const newCommentList = commentList.filter(
        (dt) => dt.commentId !== commentId
      );
      setCommentList((prev) => newCommentList);
    } catch (error) {
      //alert("delete Error");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.commentList}>
        <Stack spacing={1.5}>
          {commentList.map((dt) => (
            <Comment
              key={dt.commentId}
              commentData={dt}
              deleteFn={handleDelete}
              updateFn={handleUpdate}
            />
          ))}
        </Stack>
        <div ref={setTarget} className={classes.Loader}>
          {isLoaded && <Loader />}
        </div>
      </div>
      <div className={classes.commentInput}>
        <Input
          fullWidth
          placeholder="Write a comment..."
          sx={{
            "&:after": {
              borderBottom: `2px solid rgba(225, 178, 149, 1)`,
            },
          }}
          value={text}
          onChange={(evt) => {
            setText(evt.target.value);
            if (evt.target.value.trim().length > 0) {
              setBtnDisabled(false);
            } else {
              setBtnDisabled(true);
            }
          }}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="outlined"
          size="small"
          disabled={btnDisabled}
          onClick={handleCancleBtn}
        >
          cancle
        </Button>
      </div>
    </div>
  );
};
export default memo(CommentsContainer);
