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
import { NowPresetValueState } from "../../../modules/actions/setNowPresetValueSlice";
import { postBasePresetData } from "../../../api/CreatePreset/postBasePresetData";
import axios, { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../../api/axiosInstance";
import {
  setBasePresetFormData,
  setPresetSoundFormDataArray,
} from "../../../utils/setPresetFormData";
import { postPresetSoundSampleData } from "../../../api/CreatePreset/postPresetSoundSampleData";

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

interface PresetInfoProps {
  nowHandlePresetData: NowPresetValueState;
  setInitialPresetData: React.Dispatch<
    React.SetStateAction<NowPresetValueState>
  >;
}

type PresetSoundFormDataArray = Map<string, FormData>;

export default function PresetInfo({
  nowHandlePresetData,
  setInitialPresetData,
}: PresetInfoProps) {
  const classes = PresetInfoStyles();
  const [privacy, setPrivacy] = useState<PrivacyType>("PUBLIC");
  const [presetTitle, setPresetTitle] = useState<string>("");

  const handlePresetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPresetTitle = event.target.value;
    setPresetTitle(newPresetTitle);
    setInitialPresetData({
      ...nowHandlePresetData,
      presetTitle: newPresetTitle,
    });
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value as PrivacyType;
    console.log(value);
    setPrivacy(value);
    // setInitialPresetData
    setInitialPresetData({
      ...nowHandlePresetData,
      PrivacyOption: value,
    });
  };

  const postPresetSoundFiles = async (
    nowHandlePresetData: NowPresetValueState
  ) => {
    const formData = new FormData();
    if (nowHandlePresetData.soundSamples === undefined) return;
    formData.append(
      "sound",
      nowHandlePresetData.soundSamples[0].soundFile || ""
    );
    formData.append("presetId", "s9faOIF-XKdeaA0tYdbzV");
    formData.append("location", nowHandlePresetData.soundSamples[0].location);
    formData.append(
      "buttonType",
      nowHandlePresetData.soundSamples[0].buttonType || ""
    );
    formData.append(
      "soundType",
      nowHandlePresetData.soundSamples[0].soundType || ""
    );

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axiosInstance(config).post(
      "/presets/soundUpload",
      formData
    );

    console.log(response.data);
  };

  const postPresetDataWithOutSoundFile = async (
    nowHandlePresetData: NowPresetValueState
  ) => {
    const firstFormData = setBasePresetFormData(nowHandlePresetData);
    const { presetId } = await postBasePresetData(firstFormData);
    console.log("targetPresetId: ", presetId);

    const presetSoundFormDataArray: Array<PresetSoundFormDataArray> =
      setPresetSoundFormDataArray({
        nowHandlePresetData,
        targetPresetId: presetId,
      });

    const responses = new Array();

    await Promise.all(
      presetSoundFormDataArray.map(async (presetSoundFormData) => {
        const [formDataKey] = presetSoundFormData.values();
        const [formData] = presetSoundFormData.values();
        const { data, status } = await postPresetSoundSampleData(formData);
        responses.push([formDataKey, data, status]);
      })
    );

    console.log("sound저장결과", responses);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        className={classes.title}
        value={presetTitle}
        onChange={handlePresetTitle}
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
            value="PUBLIC"
            control={<Radio color="default" />}
            label="public"
          />
          <FormControlLabel
            value="PRIVATE"
            control={<Radio color="default" />}
            label="private"
          />
        </RadioGroup>
      </FormControl>
      <Stack direction="row" spacing={2} className={classes.btnContainer}>
        <Button variant="outlined" startIcon={<ClearIcon />}>
          CANCLE
        </Button>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={() => {
            postPresetDataWithOutSoundFile(nowHandlePresetData);
          }}
        >
          SAVE
        </Button>
      </Stack>
    </div>
  );
}
