import { Button, makeStyles, Theme } from "@material-ui/core";

import React from "react";
import { removeActivity } from "../../firebase/dbActions";
import { UserContext } from "../../Providers/UserProvider";
import { TaskItemInfo } from "../TaskItemForm/TaskItemForm";
import { TimeDisplay } from "../TimeDisplay/TimeDisplay";

const useStyles = makeStyles((theme: Theme) => ({
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
    resumedTime
  } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const currentTime = Date.now();
  const onDelete = () => {
    removeActivity({ userId: user?.uid || "", createdTime });
  };

  return (
    <div style={{ margin: "2px", border: "1px solid black", display: "flex" }}>
      <div className={classes.labels}>{category}</div>
      <div className={classes.labels}> {activity}</div>
      <div className={classes.labels}>
        Date: {createdLocalDate} - {createdLocalTime}
      </div>
      <div className={classes.labels}>
        <TimeDisplay
        isResumed={isResumed}
          createTime={createdTime}
          isTimerPaused={isPaused}
          pausedTime={pausedTime}
          currentTime={currentTime}
          resumedTime={resumedTime}
        />
      </div>
      <Button variant="contained" onClick={onDelete}>
        Remove
      </Button>
      <Button variant="contained">Complete</Button>
    </div>
  );
};
