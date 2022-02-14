import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoopIcon from "@mui/icons-material/Loop";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Divider } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPreset } from "../../api/getPreset";

import PresetThumbnailUpload from "./components/PresetThumbnailUpload";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";
import PresetInfo from "./components/PresetInfo";

import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";

import { ButtonColors } from "../../utils/CommonStyle";
import { BtnType, PrivacyType } from "../../utils/CommonValue";
import testImage from "../../assets/testImage.png";

const CreatePresetsPageStyles = makeStyles({
  root: {
    height: `calc(100% - 64px)`,
    minWidth: "1200px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1200px",
    minHeight: "814.5px",

    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad presetInfo"
    "launchPad soundInfo"
    "none soundInfo"`,

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  presetInfo: {
    gridArea: "presetInfo",
    minWidth: "460px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > .presetInfoContainer": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  soundInfo: {
    gridArea: "soundInfo",
    minWidth: "460px",

    "& > .soundInfoContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "23px 30px",
    },
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
  setSoundInfo: {
    width: "80%",
    margin: `50px auto`,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 2fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",

    textAlign: "center",
    color: ButtonColors.COLOR,
    fontWeight: "700",
    alignItems: "center",
  },
  uploadInput: {
    display: "none",
  },
});

export function CreatePresetsPage() {
  const classes = CreatePresetsPageStyles();

  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const presetId = useParams();

  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(setPresetId(presetId));
    // setDefaultPresetData(newPresetData);

    setPresetData({
      nowPresetData,
      defaultPresetData: myPresetData,
      setDefaultPresetData: setMyPresetData,
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const [privacy, setPrivacy] = useState(PrivacyType.public);

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(parseInt((event.target as HTMLInputElement).value));
  };

  const [sample, setSample] = useState<string>("");

  const handleSampleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSample(files[0].name);
      console.log(files[0].name);
    }
  };

  const [btnType, setBtnType] = useState(BtnType.effect);

  const handleBtnTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBtnType(parseInt((event.target as HTMLInputElement).value));
  };

  const [soundType, setSoundType] = useState("");

  const handleSoundTypeChange = (event: SelectChangeEvent) => {
    setSoundType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <LaunchPad presetData={myPresetData} />
        </div>
        <div className={classes.presetInfo}>
          <div className="presetInfoContainer">
            <PresetThumbnailUpload imgURL={testImage} />
            <PresetInfo />
          </div>
        </div>
        <div className={classes.soundInfo}>
          <div
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePresetsPage;
