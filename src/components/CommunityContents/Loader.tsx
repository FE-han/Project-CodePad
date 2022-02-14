import { memo } from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";

const Loader = () => {
  return (
    <div>
      <ReactLoading type="spin" color="#A593E0" />
    </div>
  );
};

export default memo(Loader);
