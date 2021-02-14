import React from "react";
import { formatTime } from "src/utils/formatTime";
import { setTrackingState } from "../../firebase/dbActions";
import { TimeControlContext } from "../../Providers/TimerControlProvider";
import { UserContext } from "../../Providers/UserProvider";
import { useTimer } from "src/utils/useTimer";
import { Typography } from "@material-ui/core";

interface TimeDisplayProps {
  createTime: number;
  createDate?: string;
  isTimerPaused: boolean;
  pausedTime?: number;
  currentTime: number;
  isResumed: boolean;
  resumedTime?: number;
  isMostRecent?: boolean;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = props => {
  const {
    createTime,
    isTimerPaused,
    pausedTime = 0,
    currentTime,
    isResumed,
    isMostRecent
  } = props;
  const timeControl = React.useContext(TimeControlContext);
  const user = React.useContext(UserContext);

  const elapsedTimeSinceCreation = Math.floor(
    ((pausedTime > 0 ? pausedTime : currentTime) -
      createTime ) /
      1000
  );
  const pauseTimeSinceCreation = Math.floor((pausedTime - createTime) / 1000);

  const { timer, isActive, handleStart, handlePause } = useTimer(
    isTimerPaused ? pauseTimeSinceCreation : elapsedTimeSinceCreation
  );
  const time = formatTime(timer);
  
  const onPause = React.useCallback(() => {
    setTrackingState({
      userId: user?.uid || "anon",
      createdTime: createTime,
      pausedTime: pausedTime > 0 ? pausedTime : Date.now(),
      state: "pause",
      activityDuration: Date.now() - createTime // In ms
    });
    handlePause();
  }, [handlePause, user?.uid, createTime, pausedTime])

  React.useEffect(() => {
    if (timeControl.isMostRecentPaused && isMostRecent && pausedTime === 0) {
      onPause()
    }
    if(pausedTime > 0){
      return;
    }
    if (isTimerPaused || isActive) {
      return;
    }
    
    if (!isTimerPaused && isResumed && !isActive) {
      handleStart();
      return;
    }

    handleStart();
    return () => {
      console.log("MEANT TO DO SOME CLEAN UP")
    }
  }, [onPause,  handleStart, timeControl.isMostRecentPaused, isMostRecent, isActive, isResumed, isTimerPaused, pausedTime]);

  
  return (
    <Typography variant='body2' color={isTimerPaused ? undefined: 'primary'}>
      {time.hours}:{time.minutes}:{time.seconds}
    </Typography>

  )
};
