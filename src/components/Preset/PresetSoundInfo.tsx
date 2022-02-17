import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoopIcon from "@mui/icons-material/Loop";

import { CreatePresetsPageStyles } from "../../pages/CreatePresetsPage/index";
import { useEffect, useState } from "react";
import { ButtonColors } from "../../utils/CommonStyle";
import { BtnType } from "../../utils/CommonValue";
import { useAppSelector } from "../../modules/hooks";
import { LoopButton } from "../LaunchPadEdit/LoopButton";
import { SelectedPresetButton } from "./SelectedPresetButton";
import { NowPresetValueState } from "../../modules/actions/setNowPresetValueSlice";
import { SelectedButtonState } from "../../modules/actions/LaunchPadEdit/selectedButtonSlice";
import {
  LoopSoundType,
  OneShotSoundType,
  SoundSample,
} from "../LaunchPad/utils/types";

interface SoundSampleValue {
  name: string;
  file: File | undefined;
}

interface PresetSoundInfoProps {
  initialPresetData: NowPresetValueState;
  setInitialPresetData: React.Dispatch<
    React.SetStateAction<NowPresetValueState>
  >;
}

export default function PresetSoundInfo({
  initialPresetData,
  setInitialPresetData,
}: PresetSoundInfoProps) {
  const classes = CreatePresetsPageStyles();

  const selectedButtonState = useAppSelector(
    (state) => state.selectedButtonSlice
  );

  const [selectedButtonValue, setSelectedButtonValue] =
    useState<SelectedButtonState>(selectedButtonState);

  useEffect(() => {
    setSelectedButtonValue(selectedButtonState);
    console.log(selectedButtonState);
  }, [selectedButtonState]);

  const [soundSampleValue, setSoundSampleValue] = useState<SoundSampleValue>({
    name: "",
    file: undefined,
  });
  const handleSoundSampleUpload = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!evt.target.files) return;
    const singleSoundFile = evt.target.files[0];
    setSoundSampleValue({
      name: singleSoundFile.name,
      file: singleSoundFile,
    });
  };

  const [btnType, setBtnType] = useState<BtnType>("ONESHOT");
  const handleBtnTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value as BtnType;

    setBtnType(value);
    setInitialPresetData({
      ...initialPresetData,
      soundSamples: initialPresetData.soundSamples.map((soundSample) => {
        if (soundSample.location === selectedButtonValue.location) {
          return {
            ...soundSample,
            buttonType: value,
          };
        }
        return soundSample;
      }),
    });
  };

  const [soundType, setSoundType] = useState("");
  const handleSoundTypeChange = (event: SelectChangeEvent) => {
    const selectedNumValue = Number(event.target.value);
    setSoundType(event.target.value);

    const returnSoundType = (
      selectedNumValue: number
    ): OneShotSoundType | LoopSoundType | undefined => {
      switch (selectedNumValue) {
        case 0:
          return "FX";
        case 1:
          return "DRUM";
        case 2:
          return "PERC";
        case 3:
          return "VOCAL";
        case 4:
          return "SYNTH";
        case 5:
          return "DRUMS";
        case 6:
          return "MELODIC";
        case 7:
          return "CHORD";

        default:
          return undefined;
      }
    };

    setSelectedButtonValue({
      ...selectedButtonValue,
      soundType: returnSoundType(selectedNumValue),
    });
    setInitialPresetData({
      ...initialPresetData,
      soundSamples: initialPresetData.soundSamples.map((soundSample) => {
        if (soundSample.location === selectedButtonValue.location) {
          return {
            ...soundSample,
            soundType: returnSoundType(selectedNumValue),
          };
        }
        return soundSample;
      }),
    });
  };

  return (
    <div className={classes.soundInfo}>
      <div
        style={{
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: "150px", width: "150px" }}>
          <SelectedPresetButton selectedButtonValue={selectedButtonValue} />
        </div>
      </div>
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
            value={soundSampleValue.name}
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
              accept="Audio/*"
              type="file"
              onChange={handleSoundSampleUpload}
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
              value="ONESHOT"
              control={<Radio color="default" />}
              label={<ArrowForwardIcon />}
              sx={{
                "& > span": {
                  lineHeight: "0px",
                },
              }}
            />
            <FormControlLabel
              value="LOOP"
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
            {/* value: magicNumber 수정필요*/}
            <MenuItem value={0}>FX</MenuItem>
            <MenuItem value={1}>DRUM</MenuItem>
            <MenuItem value={2}>VOICE</MenuItem>
            <MenuItem value={3}>PERC</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
