import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { TagColors } from "../../utils/CommonStyle";

const tagsStyles = makeStyles({
  chip: {
    "& .MuiChip-root": {
      backgroundColor: TagColors.BACKGROUND,
      fontWeight: "600",
      color: TagColors.COLOR,
    },
  },
});

export default function Tags() {
  const classes = tagsStyles();
  return (
    <Stack direction="row" spacing={1} className={classes.chip}>
      <Chip label="housㄹㅇㄴㄹㅇㄴㅁㄹe" size="small" />
      <Chip label="house" size="small" />
      <Chip label="house" size="small" />
      <Chip label="house" size="small" />
      <Chip label="house" size="small" />
    </Stack>
  );
}
