import React from "react";
import { setTrackingState } from "../../firebase/dbActions";
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
}

export const TimeDisplay: React.FC<TimeDisplayProps> = props => {
  const { createTime, isTimerPaused, pausedTime = 0, currentTime, isResumed, resumedTime } = props;
  const elapsedTimeSinceCreation = Math.floor(
    ( (pausedTime > 0 ? pausedTime : currentTime) -  createTime ) / 1000
  )
  const currentTimeSinceCreation = Math.floor((currentTime - createTime)/1000);
  const pauseTimeSinceCreation = Math.floor((pausedTime - createTime)/1000);
  
  console.log('elapsed', elapsedTimeSinceCreation)
  const {
    timer,
    // isActive,
    // isPaused,
    handleStart,
    handlePause,
    handleReset,
    handleResume
  } = useTimer( elapsedTimeSinceCreation );
  const user = React.useContext(UserContext);
  const time = formatTime(
    timer
  );
 
  React.useEffect(() => {
    console.log('isTimer paused', pausedTime)
    if ( isTimerPaused ) {
      console.log('pausedtime', pausedTime, resumedTime)
      console.log('useEffect, pausedTime > 0, we dont handle start')
      return;
    }
    if(!isTimerPaused && isResumed){
      return;
    }
  
    
    handleStart();
    
  }, [isTimerPaused]);

  const onPause = () => {
    console.log('++++++PAUSE CLICKED')
    setTrackingState({
      userId: user?.uid || "anon",
      createdTime: createTime,
      pausedTime: Date.now(),
      state: "pause"
    });
    handlePause();
  };
  const onResume = () => {
    setTrackingState({
      userId: user?.uid || "anon",
      createdTime: createTime,
      resumedTime: Date.now(),
      state: "resume"
    });
    handleResume();
  };
  return (
    <div>
      {time}
      <div>
        {/* {!isActive && <button onClick={handleStart}> Start </button>} */}
        {(
          <button onClick={isTimerPaused ? onResume : onPause}>
            {isTimerPaused ? "Resume" : "Pause"}
          </button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
