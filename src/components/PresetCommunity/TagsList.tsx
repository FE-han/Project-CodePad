import React, { useEffect } from 'react'
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


  interface tagsListProps{
      data: Array<TagsElement>;
      selectedPresetId: any;
  }

  const TagsList = ({data, selectedPresetId} : tagsListProps) =>{
      const classes = tagsStyles();

      const [selectTag, setSelectTag] = React.useState('');


    console.log(data)
      

      useEffect(()=>{
          data.map((value)=>{
            if(value.presetId === selectedPresetId.presetId){
              setSelectTag(value.text)
            }
          })
      },[data, selectedPresetId])

      return (
        <Stack direction="row" spacing={1} className={classes.chip}>
        {data.map((value) => (
          <Chip label={value.text} size="small" />
        ))}
      </Stack>
      )
  }

  export default TagsList;