import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { CreatePresetsPageStyles } from "../index";

export default function PresetSoundInfo() {
  const classes = CreatePresetsPageStyles();
  return (
    <div className={classes.soundInfo}>
      {/* <div
        style={{
          height: "40%",
        }}
      ></div>
      <Divider />
      <div className={classes.setSoundInfo}>
        <span>Sound Sample</span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-read-only-input"
            value={sample}
            size="small"
            sx={{ width: "165px", marginRight: "10px" }}
            InputProps={{
              readOnly: true,
            }}
            className={classes.title}
          />
          <label>
            <input
              className={classes.uploadInput}
              accept="image/*"
              type="file"
              onChange={handleSampleUpload}
            />
            <Button
              variant="outlined"
              size="small"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                color: ButtonColors.COLOR,
                border: `1px solid ${ButtonColors.COLOR}`,
                borderRadius: "12px",
                boxShadow: ButtonColors.SHADOW,
                margin: "0px 3px",

                "&:hover": {
                  border: `1px solid white`,
                },
              }}
            >
              Upload
            </Button>
          </label>
        </div>
        <span>Button Type</span>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={btnType}
            onChange={handleBtnTypeChange}
            className={classes.radioContainer}
            sx={{
              alignItems: "center",
              justifyContent: "space-evenly",
              color: ButtonColors.COLOR,
            }}
          >
            <FormControlLabel
              value={BtnType.effect}
              control={<Radio color="default" />}
              label={<ArrowForwardIcon />}
              sx={{
                "& > span": {
                  lineHeight: "0px",
                },
              }}
            />
            <FormControlLabel
              value={BtnType.loop}
              control={<Radio color="default" />}
              label={<LoopIcon />}
              sx={{
                "& > span": {
                  lineHeight: "0px",
                },
              }}
            />
          </RadioGroup>
        </FormControl>
        <span>Sound Type</span>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          className={classes.title}
        >
          <Select
            value={soundType}
            onChange={handleSoundTypeChange}
            displayEmpty
          >
            <MenuItem value={0}>FX</MenuItem>
            <MenuItem value={1}>DRUM</MenuItem>
            <MenuItem value={2}>VOICE</MenuItem>
            <MenuItem value={3}>PERC</MenuItem>
          </Select>
        </FormControl>
      </div> */}
    </div>
  );
}
