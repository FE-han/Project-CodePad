import { memo } from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";

const Loader = () => {
  return (
    <div>
      <ReactLoading type="spin" color="rgba(251,201,143,0.6)" />
    </div>
  );
};

export default memo(Loader);
