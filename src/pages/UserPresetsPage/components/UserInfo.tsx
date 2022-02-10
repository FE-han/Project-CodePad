import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState, useEffect } from "react";

const UserInfoStyles = makeStyles ({
    container: {
        height: "100%" ,
        display: "flex",
        justifyContent: "center",
    },

    userImageWrap: {
        marginTop: "auto",
        marginBottom: "auto",
        height: "125px",
        width: "125px",
        marginRight: "50px",

        "& img": {
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "70%",
            border: "1px solid gray",
        }
    },

    userNameWrap: {

        textAlign: "center",
        fontSize: "25px",
        fontWeight: "bold",

        "& p": {
            lineHeight: "150px",
        }
    },
})

interface UserInfoProps {
    userId: number
}

// userId 값 필요
export default function UserInfo(){

    const classes = UserInfoStyles();
    const [userInfo, setUserInfo] = useState({
        name: "UserName",
        thumbnailURL: "https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg"
    });

    //유저정보 호출
    const getUserInfo = async (userId:number) => {
        const user = await axios.get("/userData.json")
        setUserInfo(user.data[userId]);
    }

    useEffect(() => {
        getUserInfo(1);
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.userImageWrap}>
                <img src={userInfo.thumbnailURL} />
            </div>
            <div className={classes.userNameWrap}>
                <p>{userInfo.name}</p>
            </div>
        </div>
    );
}