import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddLinkIcon from "@mui/icons-material/AddLink";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useNavigate } from "react-router-dom";

import { ButtonColors } from "../../utils/CommonStyle";

const LaunchpadHeaderContainerStyles = makeStyles({
  launchPadHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "15px",
    justifyContent: "space-between",

    "& > :nth-child(1)": {
      fontWeight: "700",
      opacity: "50%",
      fontSize: "22px",
    },
  },
  launchPadHeaderBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    "& > Button": {
      float: "right",
      color: ButtonColors.COLOR,
      border: `1px solid ${ButtonColors.COLOR}`,
      borderRadius: "12px",
      boxShadow: ButtonColors.SHADOW,
      margin: "0px 3px",

      "&:hover": {
        border: `1px solid white`,
      },
    },
  },
});

export default function LaunchpadHeaderContainer(props: {
  title: String | undefined;
  onlyFork: Boolean;
}) {
  const classes = LaunchpadHeaderContainerStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.launchPadHeader}>
      <h2>{props.title}</h2>
      <div className={classes.launchPadHeaderBtnContainer}>
        <Button variant="outlined" size="small" startIcon={<AddLinkIcon />}>
          FORK
        </Button>
        {!props.onlyFork ? (
          <>
            <Button
              onClick={() => {
                navigate("/mypresets/update");
              }}
              variant="outlined"
              size="small"
              startIcon={<BuildIcon />}
            >
              UPDATE
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
