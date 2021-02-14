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
  label:string;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = props => {
  const {
    createTime,
    isTimerPaused,
    pausedTime = 0,
    currentTime,
    isResumed,
    isMostRecent, label
  } = props;
  console.log('pause time from db', pausedTime, label)
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
    console.log('in Use Effect, active, label', label)
    if (timeControl.isMostRecentPaused && isMostRecent) {
      console.log('USE EFFECT ON PAUSE TRIGGERED')
      onPause()
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
  }, [ timeControl.isMostRecentPaused, isMostRecent, isActive, isResumed, isTimerPaused]);

  
  return <div>{time}</div>;
};
