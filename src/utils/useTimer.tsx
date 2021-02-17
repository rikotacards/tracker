import React from "react";
/**@description receives value in seconds (not ms) */
export const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef<any>(null);
  React.useEffect(() => {
  },[initialState])
  
  const handleStart = React.useCallback(() => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  }, [setTimer, setIsActive, setIsPaused, countRef])

  const handlePause = React.useCallback(() => {
    clearInterval(countRef.current);
    setIsPaused(false);
  }, [setIsPaused, countRef])

  const handleResume = React.useCallback(() => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  },[setTimer, countRef, setIsPaused])

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset
  };
};
