import React from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";
interface TagProps {
  label: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0,0.8,0,0.8),
    margin: theme.spacing(0,0.5,0,0.5),
    border: "1px",
    borderColor: theme.palette.divider,
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    alignSelf: 'flex-start'
  },
  text: {
      color: 'white'
  }
}));
export const Tag: React.FC<TagProps> = ({ label }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="caption">{label}</Typography>
    </div>
  );
};
