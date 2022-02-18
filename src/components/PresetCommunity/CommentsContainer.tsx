import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Fonts, ButtonColors, CommentColors } from "../../utils/CommonStyle";
import React, { useEffect } from "react";
import { memo } from "react";
import {
  getCommentListAPI,
  getCommentListParams,
  postCommentListAPI,
} from "../../api/Comment/commentListAPI";
import { useState, useCallback } from "react";
import { CommentData } from "../../utils/CommonInterface";
import { ScrollValues } from "../../utils/CommonValue";
import Loader from "../CommunityContents/Loader";
import { setConstantValue } from "typescript";
import { makeCommentScrollList } from "./makeCommentScroll";
import { useRef } from "react";
import { AlternateEmailTwoTone } from "@mui/icons-material";

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
    height: "74px",
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
    //marginBottom: "50px",
  },
});

const CommentsContainer = () => {
  const classes = commentsContainerStyles();

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [commentList, setCommentList] = useState<Array<CommentData>>([]);
  //const [pageNum, setPageNum] = useState<number>(ScrollValues.defaultPageNum);
  const [config, setConfig] = useState<getCommentListParams>({
    presetId: "-S9Y43q1F_lt5pjBM_2E6",
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
        console.log("Done!");
      }
    }
    if (!res.success) {
      setIsError(true);
      alert(res.errorMessage);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

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
      presetId: "4i85YMVBPsydQGMgGwAF9",
      text,
    };

    try {
      const newCommentList = await postCommentListAPI(configdata);
      setCommentList(newCommentList);
    } catch (error) {
      alert("send Error");
    }
  };
  const handleSendBtn = (evt: React.ChangeEvent<HTMLButtonElement>) => {};
  const handleEnterKey = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const value = target.value;
    if (evt.key === "Enter") {
      if (value.length > 0) {
        handleCreate();
        setText("");
      }
    }
  };
  const handleDelete = () => {};
  const handleUpdate = () => {};

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
          onChange={(evt) => setText(evt.target.value)}
          onKeyDown={handleEnterKey}
        />
        <Button variant="outlined" size="small" disabled onClick={handleCreate}>
          send
        </Button>
      </div>
    </div>
  );
};
export default memo(CommentsContainer);
