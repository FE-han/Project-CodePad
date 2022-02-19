import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { TagColors } from "../../utils/CommonStyle";
import { TagsElement } from "../../pages/HandleMyPresetPage/utils/types";

const tagsStyles = makeStyles({
  chip: {
    "& .MuiChip-root": {
      backgroundColor: TagColors.BACKGROUND,
      fontWeight: "600",
      color: TagColors.COLOR,
    },
  },
});

interface tagsProps{
  data: Array<TagsElement>;
  // selectedPresetId: any
}

const Tags = ({data} : tagsProps) => {
  const classes = tagsStyles();
  
  const [selectTag,setSelectTag] = React.useState("");

  console.log(data)

  // const handleChipClick = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   Tag: any
  // ) => {
  //   setSelectTag(Tag);
  //   console.log(Tag)
  // }

  useEffect(()=>{
    data.map((value)=>{
        setSelectTag(value.tags)
    })
  },[data])
  

  return (
    <Stack direction="row" spacing={1} className={classes.chip}>
      {data.map((value) => (
        <Chip label={value.tags} size="small" />
      ))}
    </Stack>
  );
}


export default Tags;