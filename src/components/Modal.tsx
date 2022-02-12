import { makeStyles } from "@mui/styles";
//Dialog Part
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import getProfileInfo from "../api/getProfileInfo";
import editProfileInfo from "../api/editProfileInfo";
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

// dummy api
const loginGoogle = async () => {
  try {
    return {
      status: true,
      message: "로그인 성공",
    };
  } finally {
  }
};

const ModalStyles = makeStyles({
  loginPaper: {
    minWidth: "500px",
    minHeight: "200px",
  },
  profilePaper: {
    minWidth: "500px",
    minHeight: "300px",
  },
  loginButton: {
    width: "250px",
    height: "50px",
    margin: "0px auto 60px",
    backgroundColor: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
  titleRoot: {
    textAlign: "center",
  },
  fileButton: {
    padding: "11px 12px",
    backgroundColor: "#FF6600",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
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
    fontSize: "20px",
    "&:focus": {
      outline: "none",
    },
  },
});

export function LoginModal(props: LoginModalProps) {
  const { onClose, open } = props;

  const classes = ModalStyles();

  const login = () => {
    loginGoogle();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      classes={{ paper: classes.loginPaper }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle classes={{ root: classes.titleRoot }}>로그인</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <button className={classes.loginButton} onClick={login}>
          구글 로그인
        </button>
      </DialogActions>
    </Dialog>
  );
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileModal(props: ProfileModalProps) {
  const { onClose, open } = props;
  const [profileModalState, setProfileModalState] = useState<string>("CLOSE");
  const [userNameInput, setUserNameInput] = useState<string>("");
  //이미지 관련 state
  const [userProfileImageBase64, setUserProfileImageBase64] = useState<
    string | undefined
  >("");

  const classes = ModalStyles();

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
        setUserProfileImageBase64(base64.toString());
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  //프로필 수정 클릭 함수
  const onClickForEditProfile = () => {
    if (userNameInput.length === 0) {
      alert("유저 이름은 1글자 이상이어야 합니다.");
      return;
    }
    editProfileInfo("myToken", userNameInput, userProfileImageBase64);
  };

  const initializeProfileModal = (accessToken: string) => {
    getProfileInfo("myToken")
      .then((res) => {
        setUserNameInput(res.name);
        setUserProfileImageBase64(res.thumbnail);
      })
      .catch((e) => alert(e.message));
  };

  if (profileModalState === "CLOSE" && open) {
    initializeProfileModal("myToken");
    setProfileModalState("WAIT");
  }

  return (
    <Dialog
      classes={{ paper: classes.profilePaper }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle classes={{ root: classes.titleRoot }}>
        프로필 정보
      </DialogTitle>
      <img
        src={userProfileImageBase64}
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
        <input
          id="userThumbnail"
          type="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={onChangeThumbnailUpload}
        ></input>
        <Button variant="outlined" onClick={onClickForEditProfile}>
          프로필 수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
