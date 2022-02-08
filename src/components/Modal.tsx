import { makeStyles } from "@mui/styles";
//Dialog Part
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";

const googleClientId =
  "159449363473-19ebs6siob9mepj3jdqr0kdojalsdclh.apps.googleusercontent.com";

function GoogleLoginButton() {
  const onSuccess = async (res: any) => {
    window.localStorage.setItem("user_id", res.googleId);
    window.localStorage.setItem("user_email", res.Ft.pu);
    window.localStorage.setItem("user_name", res.Ft.Ue);
    // await onSocial({
    //   socialId: googleId,
    //   socialType: "google",
    //   email,
    //   nickname: name,
    // });
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Log in"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

function GoogleLogoutButton() {
  const onSuccess = () => {
    console.log("Logout");
  };
  return (
    <div>
      <GoogleLogout
        clientId={googleClientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle classes={{ root: classes.titleRoot }}>Login</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <GoogleLoginButton></GoogleLoginButton>
        <GoogleLogoutButton></GoogleLogoutButton>
        <Button variant="outlined">KaKao</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Modal() {}
