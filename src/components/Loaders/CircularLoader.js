import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CircularLoader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color={props?.color ? props?.color : "secondary"} />
    </div>
  );
}
