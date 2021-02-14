import {
  Button,
  Card,
  Chip,
  IconButton,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";

import React from "react";
import { removeActivity } from "../../firebase/dbActions";
import { UserContext } from "../../Providers/UserProvider";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { TimeDisplay } from "src/components/TimeDisplay/TimeDisplay";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grow from "@material-ui/core/Grow";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    padding: theme.spacing(1)
  },
  itemSpacing: {
    marginRight: theme.spacing(1)
  },
  timeDisplay: {
    // border: '1px solid',
    // borderColor: 'red',
    padding: theme.spacing(0, 1, 0, 1),
    borderRadius: theme.spacing(0.5)
  },
  completedTime: {
    // background: 'rgba(0, 0, 0, 0.87)'
  },
  dateTimeContainer: {
    display: "flex"
  },
  activityContainer: {
    minWidth: "100px",
    width: "150px",
    // border: '1px solid black',
    padding: theme.spacing(0.7)
    // borderRadius: theme.spacing(2),
  }
}));
export const TaskItem: React.FC<TaskItemInfo> = props => {
  const [isDeleteClicked, setDeleteClicked] = React.useState(false);

  const {
    createdTime,
    activity,
    category,
    createdLocalTime,
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
  const toggleDeleteButton = () => {
    setDeleteClicked(!isDeleteClicked);
  };

  return (
    <Card className={classes.root}>
      <div>
      <div >
        <Typography variant="caption">Started: </Typography>
          <Typography variant="caption" className={classes.itemSpacing}>
           {createdLocalTime}
          </Typography>
      </div>
      </div>
        <Chip className={classes.itemSpacing} label={category} />
      <div className={clsx(classes.activityContainer, classes.itemSpacing)}>
        <Typography variant="body2" className={classes.itemSpacing}>
          {activity}
        </Typography>
      </div>
      <Button
        variant="outlined"
        className={clsx(
          classes.itemSpacing,
          classes.timeDisplay,
          isPaused && classes.completedTime
        )}
      >
        <TimeDisplay
          isResumed={isResumed}
          createTime={createdTime}
          isTimerPaused={isPaused}
          pausedTime={pausedTime}
          currentTime={currentTime}
          resumedTime={resumedTime}
          isMostRecent={isMostRecent}
        />
      </Button>
      <IconButton onClick={toggleDeleteButton}>
        <MoreVertIcon color={isDeleteClicked ? "secondary" : undefined} />
      </IconButton>
      <Grow in={isDeleteClicked}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Grow>
    </Card>
  );
};
