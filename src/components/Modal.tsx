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

const getProfileInfo = async (accessToken: string) => {
  return {
    name: "CodePad",
    thumbnailUrl:
      "data:image/jpeg;base64,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",
  };
};

const editProfileInfo = async (
  accessToken: string,
  name: string,
  thumbnail: string | undefined
) => {
  return { message: "success" };
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
    localStorage.removeItem("userName");
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
        setUserProfileImageBase64(res.thumbnailUrl);
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
