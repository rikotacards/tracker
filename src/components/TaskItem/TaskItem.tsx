import {
  Button,
  Card,
  Chip,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";

import React from "react";
import { removeActivity } from "../../firebase/dbActions";
import { UserContext } from "../../Providers/UserProvider";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { TimeDisplay } from "../TimeDisplay/TimeDisplay";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    padding: theme.spacing(0.5)
  },
  labels: {
    marginRight: theme.spacing(1)
  }
}));
export const TaskItem: React.FC<TaskItemInfo> = props => {
  const {
    createdTime,
    activity,
    category,
    createdLocalTime,
    createdLocalDate,
    isPaused,
    pausedTime,
    isResumed,
    resumedTime,
    isMostRecent
  } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const currentTime = Date.now();
  const onDelete = () => {
    removeActivity({ userId: user?.uid || "anon", createdTime });
  };


  return (
    <Card className={classes.root}>
      <Typography className={classes.labels}>
        {createdLocalDate} {createdLocalTime}
      </Typography>
      <Chip className={classes.labels} label={category}/>
      <Typography className={classes.labels}> {activity}</Typography>
      <div className={classes.labels}>
        <TimeDisplay
          isResumed={isResumed}
          createTime={createdTime}
          isTimerPaused={isPaused}
          pausedTime={pausedTime}
          currentTime={currentTime}
          resumedTime={resumedTime}
          isMostRecent={isMostRecent}
        />
      </div>
      <Button size='small' variant="contained" onClick={onDelete}>
        Remove
      </Button>
    </Card>
  );
};
