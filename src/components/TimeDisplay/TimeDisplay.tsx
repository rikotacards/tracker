import React from "react";
import { formatTime } from "src/utils/formatTime";
import { resumeActivityDb, pauseActivityDb } from "../../firebase/dbActions";
import { TimeControlContext } from "../../Providers/TimerControlProvider";
import { UserContext } from "../../Providers/UserProvider";
import { useTimer } from "src/utils/useTimer";
import { IconButton, Typography } from "@material-ui/core";
import { Time } from "./Time";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { makeStyles, Theme } from "@material-ui/core";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
const useStyles = makeStyles((theme: Theme) => ({
  timeContainer: {
    padding: theme.spacing(0, 1, 0, 1),
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.spacing(0.5)
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  },
  timeControlContainer: {
    display: 'flex'
  },
}));
let TimeDisplay: React.FC<Omit<
  TaskItemInfo,
  "createdLocalTime" | "createdLocalDate" | "category" | "activity"
>> = props => {
  const {
    createdTime,
    isPaused,
    pausedTime = 0,
    isResumed,
    isMostRecent,
    resumedTime = 0,
    totalPausedTime = 0,
    activityDuration = 0,
    isDone
  } = props;
  const classes = useStyles();
  const timeControl = React.useContext(TimeControlContext);
  const user = React.useContext(UserContext);
  const totalTimeSinceCreation = Date.now() - createdTime;
  const [isResumeClicked, setResume] = React.useState(false);
  const duration =
    activityDuration === 0
      ? totalTimeSinceCreation
      : isPaused
      ? activityDuration
      : Math.floor(Date.now() - createdTime - totalPausedTime);
  const recordedTime = Math.floor(duration / 1000);

  const { timer, isActive, handleStart, handlePause, handleResume } = useTimer(
    recordedTime
  );
  const time = formatTime(timer);
  const isDoneTime = formatTime(activityDuration / 1000);

  const onPause = React.useCallback(() => {
    pauseActivityDb({
      userId: user?.uid || "anon",
      createdTime: createdTime,
      pausedTime: Date.now(),
      activityDuration: Math.floor(Date.now() - createdTime - totalPausedTime)
    }).then(() => {
      handlePause();
    });
  }, [handlePause, user?.uid, createdTime, totalPausedTime, resumedTime]);

  const onResume = React.useCallback(() => {
    setResume(true);
    resumeActivityDb({
      userId: user?.uid || "anon",
      resumedTime: Date.now(),
      createdTime,
      activityDuration,
      totalPausedTime: totalPausedTime + Math.floor(Date.now() - pausedTime)
    }).then(() => {
      handleResume();
    });
  }, [
    handleResume,
    user?.uid,
    createdTime,
    pausedTime,
    totalPausedTime,
    activityDuration,
    isResumeClicked
  ]);

  React.useEffect(() => {
    if (isPaused) {
      return;
    }
    if (isActive && isResumed) {
      return;
    }
    if (isDone) {
      return;
    }

    if (timeControl.isMostRecentPaused && isMostRecent && pausedTime === 0) {
      onPause();
    }

    if (isPaused || isActive) {
      return;
    }
    if (isResumeClicked) {
      return;
    }
    if (isResumed && !isActive && !isPaused) {
      if (isResumeClicked) {
        return;
      }
      handleResume();
    }

    if (!isPaused && !isResumed && !isActive) {
      handleStart();
      return;
    }
    // console.log('HANDLE START')
    // handleStart();
    return () => {
      console.log("MEANT TO DO SOME CLEAN UP");
    };
  }, [
    isDone,
    resumedTime,
    totalPausedTime,
    onPause,
    handleStart,
    timeControl.isMostRecentPaused,
    isMostRecent,
    isActive,
    isResumed,
    isPaused,
    pausedTime,
    isResumeClicked
  ]);

  // if (isDone) {
  //   return (
  //     <Typography variant="body2">
  //       {isDoneTime.hours}:{isDoneTime.minutes}:{isDoneTime.seconds}
  //     </Typography>
  //   );
  // }
  return (
    <div className={classes.wrapper}>
      <div className={classes.timeContainer}>
        <Time isTimerPaused={isPaused} time={time} />
      </div>
      <div>
        <IconButton style={{'marginLeft': '4px', 'paddingRight': 0}} onClick={isPaused ? onResume : onPause}>
          {isPaused ? (
              <PlayCircleOutlineIcon /> 
          ) : (
            <PauseCircleOutlineIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

TimeDisplay = React.memo(TimeDisplay);
export { TimeDisplay };
