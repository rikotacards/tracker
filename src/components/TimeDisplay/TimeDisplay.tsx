import React from "react";
import { formatTime } from "src/utils/formatTime";
import { resumeActivityDb, pauseActivityDb } from "../../firebase/dbActions";
import { TimeControlContext } from "../../Providers/TimerControlProvider";
import { UserContext } from "../../Providers/UserProvider";
import { useTimer } from "src/utils/useTimer";
import { Button, Typography } from "@material-ui/core";
import { Time } from "./Time";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";

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
  const timeControl = React.useContext(TimeControlContext);
  const user = React.useContext(UserContext);
  const totalTimeSinceCreation = Date.now() - createdTime;

  console.log(
    "AT STARTcurrent tie of render\n",
    new Date(Date.now()),
    "\ntotalpaused\n",
    totalPausedTime,
    "\ntotalPause FORMAT\n",
    formatTime(totalPausedTime/1000),
    "\n acticity duration\n",
    activityDuration,   
  );
  console.log("TIME", Math.floor((Date.now() - resumedTime) / 1000));
  // elapsedTime = current time - create time - time not tracked (resume time - pause time)

  console.log("isTimerPaused", isPaused);
  console.log(
    "totalTimeSinceCreation\n",
    totalTimeSinceCreation / 1000,
    "\nativityDuratoin\n",
    activityDuration / 1000,
    "\ncreateTime\n",
    createdTime,
    "\ntotalPauseTime\n",
    totalPausedTime
  );
  const duration =
    activityDuration === 0
      ? totalTimeSinceCreation
      : isPaused
      ? activityDuration
      : Math.floor(Date.now() - createdTime - totalPausedTime);
  console.log("DURATION", duration);
  const recordedTime = Math.floor(duration / 1000);

  const { timer, isActive, handleStart, handlePause, handleResume } = useTimer(
    recordedTime
  );
  const time = formatTime(timer);
  console.log("time", time);
  const isDoneTime = formatTime(activityDuration / 1000);

  const onPause = React.useCallback(() => {
    console.log("===========ON PAUSE", new Date(Date.now()));
    const accPausedTime = resumedTime === 0 ? 0 : Date.now() - resumedTime;
    console.log(
      "ON PAUSE, TOTAL PAUSE TIME",
      (Date.now() - resumedTime) / 1000
    );
    console.log(
      "totalpaused",
      formatTime(Math.floor(totalPausedTime / 1000)),
      "\n activityDuration",
      formatTime(Math.floor(activityDuration / 1000))
    );
    pauseActivityDb({
      userId: user?.uid || "anon",
      createdTime: createdTime,
      pausedTime: Date.now(),
      activityDuration: Math.floor(Date.now() - createdTime - totalPausedTime),
    }).then(() => {
      handlePause();
    });
  }, [
    handlePause,
    user?.uid,
    createdTime,
    totalPausedTime,
    resumedTime,
    activityDuration
  ]);

  const onResume = React.useCallback(() => {
    console.log(
      ">>>>>>>>>>ON RESUME \ntotalpaused",
      formatTime(totalPausedTime / 1000),
      "Activity Duration, formatted\n",
      formatTime(activityDuration / 1000)
    );
    resumeActivityDb({
      userId: user?.uid || "anon",
      resumedTime: Date.now(),
      createdTime,
      activityDuration,
      totalPausedTime: totalPausedTime + Math.floor(Date.now() - pausedTime)
    }).then(() => {
      handleResume();
    })
  }, [
    handleResume,
    user?.uid,
    createdTime,
    pausedTime,
    totalPausedTime,
    activityDuration,
  ]);

  React.useEffect(() => {
    if (isDone) {
      return;
    }
    if (isResumed && isActive) {
      return;
    }

    if (timeControl.isMostRecentPaused && isMostRecent && pausedTime === 0) {
      console.log("ON PAUSE FIRED IN EFFECT");
      onPause();
    }
    
    if (isPaused || isActive) {
      console.log(
        "RETURN EARLY",
        "isTimerPaused=",
        isPaused,
        "isActive",
        isActive
      );
      return;
    }

    if (!isPaused && !isResumed && !isActive) {
      console.log("HANDLE STSR FIRED FROM CONDITION");
      handleStart();
      return;
    }

    console.log("MISSED ALL CONDITION, FIRE START");
    handleStart();
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
    pausedTime
  ]);

  if (isDone) {
    return (
      <Typography variant="body2">
        {isDoneTime.hours}:{isDoneTime.minutes}:{isDoneTime.seconds}
      </Typography>
    );
  }
  return (
    <>
      <Time isTimerPaused={isPaused} time={time} />
      <Button onClick={isPaused ? onResume : onPause}>{isPaused ? 'resume' :'pause'}</Button>
    </>
  );
};

TimeDisplay = React.memo(TimeDisplay);
export { TimeDisplay };
