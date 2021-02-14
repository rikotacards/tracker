import { Button } from "@material-ui/core";
import React from "react";
import { setTrackingState } from "../../firebase/dbActions";
import { TimeControlContext } from "../../Providers/TimerControlProvider";
import { UserContext } from "../../Providers/UserProvider";
import { useTimer } from "../../utils/useTimer";

export const formatTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = Math.floor(timer / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

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
    resumedTime = 0,
    isMostRecent
  } = props;
  const timeControl = React.useContext(TimeControlContext);
  const user = React.useContext(UserContext);

  const elapsedTimeSinceCreation = Math.floor(
    ((pausedTime > 0 ? pausedTime : currentTime) -
      createTime +
      (resumedTime > 0 ? currentTime - resumedTime : 0)) /
      1000
  );
  const pauseTimeSinceCreation = Math.floor((pausedTime - createTime) / 1000);

  const { timer, isActive, handleStart, handlePause, handleReset } = useTimer(
    isTimerPaused ? pauseTimeSinceCreation : elapsedTimeSinceCreation
  );
  const time = formatTime(timer);
  
  const onPause = () => {
    setTrackingState({
      userId: user?.uid || "anon",
      createdTime: createTime,
      pausedTime: Date.now(),
      state: "pause",
      activityDuration: Date.now() - createTime // In ms
    });
    handlePause();
  };

  React.useEffect(() => {
    console.log("ENTER USE EFFECT")
    if (timeControl.isMostRecentPaused && isMostRecent) {
      console.log("USER EFFECT, ON PAUSE");
      onPause()
    }
    if (isTimerPaused) {
      return;
    }
    if (isActive) {
      console.log('IS ACTIVE')
      return;
    }

    if (!isTimerPaused && isResumed && !isActive) {
      handleStart();
      return;
    }
    console.log('HANDLE START', 'active', isActive)
    handleStart();
    return () => {
      console.log("MEANT TO DO SOME CLEAN UP")
    }
  }, [  timeControl.isMostRecentPaused, isMostRecent, isActive, isResumed, isTimerPaused]);

  
  return <div>{time}</div>;
};
