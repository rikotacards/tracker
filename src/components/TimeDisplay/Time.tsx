import { Typography } from '@material-ui/core';
import React from 'react'; 
interface TimeProps {
    isTimerPaused: boolean;
    time: Record<string, string>
}
export const Time: React.FC<TimeProps> = ({isTimerPaused, time}) => {
    return (
        <Typography
        variant="body2"
        color={isTimerPaused ? undefined : "secondary"}
      >
        {time.hours}:{time.minutes}:{time.seconds}
      </Typography>
    )
}