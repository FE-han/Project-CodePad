import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { ButtonColors } from "../../../utils/CommonStyle";
import { PrivacyType } from "../../../utils/CommonValue";

const PresetInfoStyles = makeStyles({
  root: {
    display: "grid",
    rowGap: "7px",
  },
  title: {
    // input label when focused
    "& label.Mui-focused": {
      color: ButtonColors.COLOR,
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: ButtonColors.COLOR,
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: ButtonColors.COLOR,
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: ButtonColors.COLOR,
      },
    },
  },
  radioContainer: {
    justifyContent: "center",
  },
  btnContainer: {
    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,
      margin: "0px 3px",

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
});
export default function PresetInfo() {
  const classes = PresetInfoStyles();
  const [privacy, setPrivacy] = useState(PrivacyType.public);

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(parseInt((event.target as HTMLInputElement).value));
  };
  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        className={classes.title}
      />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={privacy}
          onChange={handlePrivacyChange}
          className={classes.radioContainer}
          sx={{
            justifyContent: "space-evenly",
            color: ButtonColors.COLOR,
          }}
        >
          <FormControlLabel
            value={PrivacyType.public}
            control={<Radio color="default" />}
            label="public"
          />
          <FormControlLabel
            value={PrivacyType.private}
            control={<Radio color="default" />}
            label="private"
          />
        </RadioGroup>
      </FormControl>
      <Stack direction="row" spacing={2} className={classes.btnContainer}>
        <Button variant="outlined" startIcon={<ClearIcon />}>
          CANCLE
        </Button>
        <Button variant="outlined" startIcon={<SaveIcon />}>
          SAVE
        </Button>
      </Stack>
    </div>
  );
}
