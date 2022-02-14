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
import loginGoogle from "../api/loginGoogle";
import { getCookie } from "../utils/cookie";
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModalStyles = makeStyles({
  paper: {
    minWidth: "500px",
    minHeight: "200px",
  },
  titleRoot: {
    textAlign: "center",
    display: "inline",
  },
  closeButton: {
    display: "inline",
    position: "relative",
    left: "200px",
    top: "-10px",
    cursor: "pointer",
  },
  loginButton: {
    width: "250px",
    height: "50px",
    margin: "0px auto 60px",
    backgroundColor: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
});

export function LoginModal(props: LoginModalProps) {
  const { onClose, open } = props;

  const classes = LoginModalStyles();

  const login = () => {
    loginGoogle();
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle classes={{ root: classes.titleRoot }}>
        로그인
        <div className={classes.closeButton} onClick={handleClose}>
          X
        </div>
      </DialogTitle>
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
    fontSize: "20px",
    "&:focus": {
      outline: "none",
    },
  },
});

export function ProfileModal(props: ProfileModalProps) {
  const { onClose, open } = props;
  const [profileModalState, setProfileModalState] = useState<string>("CLOSE");
  const [userNameInput, setUserNameInput] = useState<string>("");
  //이미지 관련 state
  const [userProfileImageBase64, setUserProfileImageBase64] = useState<
    string | undefined
  >("");

  const classes = ProfileModalStyles();

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
    editProfileInfo(getCookie("token"), userNameInput, userProfileImageBase64);
    alert("수정되었습니다");
    handleClose();
  };

  const initializeProfileModal = (accessToken: string) => {
    const cookieToken = getCookie("token");
    console.log(cookieToken);
    getProfileInfo(cookieToken)
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
