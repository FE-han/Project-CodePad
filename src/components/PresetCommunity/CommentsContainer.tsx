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
  postCommentListAPI,
} from "../../api/commentListAPI";
import { useState } from "react";
import { CommentData } from "../../utils/CommonInterface";
import { ScrollValues } from "../../utils/CommonValue";
import Loader from "../CommunityContents/Loader";
import { setConstantValue } from "typescript";

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
    marginBottom: "50px",
  },
});

const CommentsContainer = () => {
  const classes = commentsContainerStyles();

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [commentList, setCommentList] = useState<Array<CommentData>>([]);
  const [curPageNum, setCurPageNum] = useState<number>(
    ScrollValues.defaultPageNum
  );

  const [text, setText] = useState<string>("");

  const getMoreItem = async () => {
    setIsLoaded(true);

    const configdata = {
      presetId: "4i85YMVBPsydQGMgGwAF9",
      pageNum: curPageNum + 1,
      limitNum: ScrollValues.limitNum,
    };

    try {
      const data = await getCommentListAPI(configdata);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCommentList((commentList) => commentList.concat(data));
      setCurPageNum(curPageNum + 1);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      throw new Error();
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
    console.log(value);
    if (value.length > 0) {
    }
    if (evt.key === "Enter") {
      handleCreate();
      setText("");
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
