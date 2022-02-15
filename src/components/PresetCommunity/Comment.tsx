import Avatar from "@mui/material/Avatar";
import testImage from "../../assets/testImage.png";

export default function Comment() {
  return (
    <div>
      <Avatar alt="user-image" src={testImage} />
    </div>
  );
}
