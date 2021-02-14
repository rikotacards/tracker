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
  const { createTime, isTimerPaused, pausedTime = 0, currentTime, isResumed, resumedTime = 0 } = props;
  const elapsedTimeSinceCreation = Math.floor(
    ( (pausedTime > 0 ? pausedTime : currentTime) -  createTime + (resumedTime > 0 ? currentTime - resumedTime : 0) ) / 1000
  )
  const currentTimeSinceCreation = Math.floor((currentTime - createTime)/1000);
  const pauseTimeSinceCreation = Math.floor((pausedTime - createTime)/1000);
  const [isClickedToResume, setClickToResume] = React.useState(false);

  const {
    timer,
    isActive,
    // isPaused,
    handleStart,
    handlePause,
    handleReset,
    handleResume
  } = useTimer( isTimerPaused ? pauseTimeSinceCreation : elapsedTimeSinceCreation );
  const user = React.useContext(UserContext);
  const time = formatTime(
    timer
  );
 
  React.useEffect(() => {
    console.log('ENTER USE EFFECT', 'ISACTIVE:',  isActive)
    console.log('isTimer paused', pausedTime)
    if ( isTimerPaused ) {
      console.log('USE EFFECT IS TIMER PAUSED', pausedTime, resumedTime)
      return;
    }
    if(isActive){
      return;
    }
    
    if(!isTimerPaused && isResumed && !isActive){
      console.log('USE EFFECT RESUME')
      handleStart()
      return;
    }
  
    handleStart();
    
  }, [isTimerPaused]);

  const onPause = () => {
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
    // handleResume();
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
