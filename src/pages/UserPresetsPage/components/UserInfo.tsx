import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { getPresetUserInfo } from "../../../api/getPresetUserInfo";
import testImage from "../../../assets/testImage.png";
import { useAppSelector } from "../../../modules/hooks";
import { PageColors } from "../../../utils/CommonStyle";
import defaultUserProfileImg from "../../../assets/defaultUserProfileImg.png";

const UserInfoStyles = makeStyles({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
  },

  userImageWrap: {
    height: "125px",
    width: "125px",

    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "70%",
    },
  },

  userNameWrap: {
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "bold",
    color: PageColors.COLOR,

    "& p": {
      lineHeight: "150px",
    },
  },
});

type UserInfoProps = {
  userId: string;
}

export default function UserInfo({userId}:UserInfoProps) {
  const classes = UserInfoStyles();

  const [userInfo, setUserInfo] = useState({
    name: "default",
    thumbnailURL: defaultUserProfileImg,
  });

  const getInitialData = async () => {
    try {
      const userInfoData = await getPresetUserInfo(userId);
      setUserInfo(userInfoData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.userImageWrap}>
        <img src={userInfo.thumbnailURL} alt="user-profile" />
      </div>
      <div className={classes.userNameWrap}>
        <p>{userInfo.name}</p>
      </div>
    </div>
  );
}
