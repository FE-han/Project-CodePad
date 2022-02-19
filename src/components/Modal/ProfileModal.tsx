import { makeStyles } from "@mui/styles";
//Dialog Part
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import editProfileInfo from "../../api/editProfileInfo";

export type USERID = string | null;

export type USERINFO = {
  userId: USERID;
  userName: string;
  userThumbnailURL: string | undefined;
};
interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  userInfo: USERINFO;
}

const ProfileModalStyles = makeStyles({
  paper: {
    minWidth: "500px",
    minHeight: "300px",
  },
  titleRoot: {
    textAlign: "center",
    display: "inline",
  },
  closeButton: {
    display: "inline",
    float: "right",
    cursor: "pointer",
  },
  fileButton: {
    padding: "11px 12px",
    backgroundColor: "#FF6600",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    position: "relative",
    right: "240px",
    top: "-10px",
    "&:hover": {
      backgroundColor: "#FF8800",
    },
  },
  ProfileImage: {
    width: "200px",
    borderRadius: "50%",
    display: "block",
    margin: "auto auto",
  },
  ProfileName: {
    width: "150px",
    display: "block",
    margin: "0px auto",
    borderWidth: "0px 0px 1px 0px",
    textAlign: "center",
    fontSize: "16px",
    "&:focus": {
      outline: "none",
    },
  },
});

type ProfileModalType = "CLOSE" | "WAIT";

export default function ProfileModal(props: ProfileModalProps) {
  const { onClose, open, userInfo } = props;
  const [profileModalState, setProfileModalState] =
    useState<ProfileModalType>("CLOSE");

  const [userNameInput, setUserNameInput] = useState<string>(userInfo.userName);
  //이미지 관련 state
  const [userProfileImageSrc, setUserProfileImageSrc] = useState<
    string | undefined
  >(userInfo.userThumbnailURL);
  const [userProfileImageFile, setUserProfileImageFile] = useState<
    Blob | string
  >("");

  const classes = ProfileModalStyles();

  useEffect(() => {}, [userNameInput, userProfileImageSrc]);

  //토스트 메시지 핸들링 함수

  // 모달 창 닫기 함수
  const handleClose = () => {
    onClose();
    setProfileModalState("CLOSE");
  };

  //닉네임 변경 함수
  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserNameInput(event.target.value);
  };

  //썸네일 업로드 버튼 클릭시 실행 함수
  const onChangeThumbnailUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setUserProfileImageSrc(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setUserProfileImageFile(event.target.files[0]);
    }
  };
  //프로필 수정 클릭 함수
  const onClickForEditProfile = () => {
    if (userNameInput.length === 0) {
      console.log("유저 이름은 1글자 이상이어야 합니다");
      return;
    }
    const userFormData = new FormData();
    userFormData.append("name", userNameInput);
    if (userProfileImageFile) {
      userFormData.append("img", userProfileImageFile);
    }
    editProfileInfo(userFormData);
    console.log("수정되었습니다");
    handleClose();
  };

  const initializeProfileModal = () => {
    setUserNameInput(userInfo.userName);
    setUserProfileImageSrc(userInfo.userThumbnailURL);
  };

  if (profileModalState === "CLOSE" && open) {
    initializeProfileModal();
    setProfileModalState("WAIT");
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle classes={{ root: classes.titleRoot }}>
        프로필 정보
        <div className={classes.closeButton} onClick={handleClose}>
          X
        </div>
      </DialogTitle>
      <img
        src={userProfileImageSrc}
        alt="Profile"
        className={classes.ProfileImage}
      />
      <DialogContent>
        <input
          required
          id="username"
          onChange={onChangeUserName}
          value={userNameInput}
          className={classes.ProfileName}
          maxLength={12}
        ></input>
      </DialogContent>
      <DialogActions>
        <label className={classes.fileButton} htmlFor="userThumbnail">
          썸네일 업로드
        </label>
        <input
          id="userThumbnail"
          type="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={onChangeThumbnailUpload}
          style={{ display: "none" }}
        ></input>
        <Button variant="outlined" onClick={onClickForEditProfile}>
          프로필 수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
