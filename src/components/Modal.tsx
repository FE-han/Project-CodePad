import { makeStyles } from "@mui/styles";
//Dialog Part
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
interface ModalProps {
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
    console.log("");
  }
};

const getProfileInfo = async (accessToken: string) => {
  return {
    name: "CodePag",
    thumbnailUrl: "codepadUrl",
  };
};

const editProfileInfo = async (
  accessToken: string,
  name: string,
  thumbnail: File
) => {
  return { message: "success" };
};

const ModalStyles = makeStyles({
  paper: {
    minWidth: "500px",
  },
  titleRoot: {
    textAlign: "center",
  },
});

export function LoginModal(props: ModalProps) {
  const { onClose, open } = props;

  const classes = ModalStyles();

  const login = () => {
    loginGoogle()
      .then((res) => {
        if (!res.status) alert(res.message);
      })
      .catch((e) => alert(e.message));
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
      <DialogTitle classes={{ root: classes.titleRoot }}>로그인</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={login}>구글 로그인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Modal() {}
