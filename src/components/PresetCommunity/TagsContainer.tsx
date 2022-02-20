import { makeStyles } from "@mui/styles";
import { Fonts, ButtonColors, CommentColors } from "../../utils/CommonStyle";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { postTagsList } from "../../api/postTagsList";
import alertSnackBarMessage, {
  SnackBarMessageType,
} from "../../utils/snackBarMessage";

const TagsContainerStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: CommentColors.COLOR,
    fontFamily: Fonts.DEFAULT,
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
});

const TagsContainer = () => {
  const classes = TagsContainerStyles();
  const [text, setText] = useState<string>("");
  const [tagsList, setTagsList] = useState([]);

  const handleCreate = async () => {
    const configdata = {
      text,
    };

    try {
      const newTagsList = await postTagsList(configdata);
      setTagsList(newTagsList);
    } catch {
      alertSnackBarMessage({
        message: `프리셋이 없거나, 가져오지 못했습니다.`,
        type: SnackBarMessageType.ERROR,
      });
    }
  };

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
  return (
    <div className={classes.root}>
      <div className={classes.commentInput}>
        <Input
          fullWidth
          placeholder="태그를 입력하세요..."
          sx={{
            "&:after": {
              borderBottom: `2px solid rgba(225, 178, 149, 1)`,
            },
          }}
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          onKeyDown={handleEnterKey}
        />
        <Button variant="outlined" size="small" onClick={handleCreate}>
          send
        </Button>
      </div>
    </div>
  );
};

export default TagsContainer;
