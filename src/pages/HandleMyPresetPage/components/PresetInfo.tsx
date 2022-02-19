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
import { useState, useEffect } from "react";
import { ButtonColors } from "../../../utils/CommonStyle";
import { PrivacyType } from "../../../utils/CommonValue";
import { NowPresetValueState } from "../../../modules/actions/setNowPresetValueSlice";
import { useNavigate } from "react-router";
import { updatePreset } from "../../../api/updatePreset";

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
export default function PresetInfo({
  nowHandlePresetData,
  setInitialPresetData,
}: PresetInfoProps) {
  const classes = PresetInfoStyles();
  const [privacy, setPrivacy] = useState<PrivacyType>("PUBLIC");
  const [presetTitle, setPresetTitle] = useState<string>("");

  useEffect(() => {
    setPrivacy(nowHandlePresetData.PrivacyOption);
    setPresetTitle(nowHandlePresetData.presetTitle);
  }, [nowHandlePresetData])

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

  const postPresetDataWithOutSoundFile = async (
    nowHandlePresetData: NowPresetValueState
  ) => {
    const formData = new FormData();
    formData.append("userId", nowHandlePresetData.userId);
    formData.append("presetId", nowHandlePresetData.presetId);
    formData.append("presetTitle", nowHandlePresetData.presetTitle);
    formData.append("areaSize", JSON.stringify(nowHandlePresetData.areaSize));
    formData.append(
      "thumbnailImgFile",
      nowHandlePresetData.thumbnailImg.thumbnailImgFile || ""
    );
    formData.append("PrivacyOption", nowHandlePresetData.PrivacyOption);
    formData.append("tags", JSON.stringify(nowHandlePresetData.tags));

    //console.log
    const testkeys = Array.from(formData.keys());
    const testvalues = Array.from(formData.values());
    console.log(
      testkeys.map((ele, idx) => {
        return [ele, testvalues[idx]];
      })
    );

    Promise.all([updatePreset(formData, nowHandlePresetData.presetId)]).then(res => alert("성공"))

  };

  const navigate = useNavigate();
  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(window.confirm("작성을 취소하시겠습니까?")){
      navigate(-1);
    } 
  }


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
        <Button 
          variant="outlined" 
          startIcon={<ClearIcon />}
          onClick={handleCancelClick}
          >
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
