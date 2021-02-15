import {
  Button,
  Card,
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
import { EditableText } from "../EditableText/EditableText";
import { isMobile } from "src/platform/platform";
import { TaskItemMobile } from "../TaskItemMobile/TaskItemMobile";
import { Tag } from "../Tag/Tag";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    padding: theme.spacing(1)
  },
  categoryContainer: {
    width: "80px",
    display: "flex",
    justifyContent: "flex-start"
  },
  itemSpacing: {
    marginRight: theme.spacing(1)
  },
  timeDisplay: {
    padding: theme.spacing(0, 1, 0, 1),
    borderRadius: theme.spacing(0.5)
  },
  dateTimeContainer: {
    display: "flex"
  },
  activityContainer: {
    width: "200px",
    // padding: theme.spacing(0.7)
  },
  activityText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    textDecoration: 'none'
    
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

  if(isMobile()){
    return <TaskItemMobile {...props}/>
  }

  return (
    <Card className={classes.root}>
      <div>
        <Typography variant="caption">Started: </Typography>
        <Typography variant="caption" className={classes.itemSpacing}>
          {createdLocalTime}
        </Typography>
      </div>

      <div className={classes.categoryContainer}>
        <Tag label={category} />
      </div>
      <div className={clsx(classes.activityContainer, classes.itemSpacing)}>
        <EditableText
          text={activity}
          placeholder="edit"
          userId={user?.uid}
          createdTime={createdTime}
        >
          <Button size='small'  className={clsx(classes.itemSpacing, classes.activityText)}>
            {activity}
          </Button>
        </EditableText>
      </div>
      <Button
        variant="outlined"
        className={clsx(classes.itemSpacing, classes.timeDisplay, isPaused)}
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
