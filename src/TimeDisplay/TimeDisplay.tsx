import React from "react";
import { useTimer } from "../utils/useTimer";

export const formatTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = Math.floor(timer / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

interface TimeDisplayProps {
  createTime?: number;
  createDate?: string;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = (props) => {
    const {createTime, createDate} = props;
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleReset,
    handleResume
  } = useTimer();
  const time = formatTime(timer);
  console.log("createTime", createTime);
  return (
    <div>
      {time}
      <div>
        {!isActive && <button onClick={handleStart}> Start </button>}
        {isActive && (
          <button onClick={isPaused ? handlePause : handleResume}>
            {isPaused ? "Pause" : "Resume"}
          </button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
