import { makeStyles } from "@mui/styles";
//Dialog Part
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import loginGoogle from "../../api/loginGoogle";

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

export default function LoginModal(props: LoginModalProps) {
  const { onClose, open } = props;

  const navigate = useNavigate();
  const classes = LoginModalStyles();

  const login = () => {
    navigate(`/api/auth/google`);
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
