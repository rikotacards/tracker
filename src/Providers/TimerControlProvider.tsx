import * as React from "react";


interface TimerControlContextProps {
  isMostRecentPaused: boolean;
  setPause: () => void;
}

export const TimeControlContext = React.createContext<TimerControlContextProps>(
  {} as TimerControlContextProps
);

const useTimeControl = () => {
  const [isMostRecentPaused, setMostRecentPause] = React.useState(false);

  const setPause = () => {
    setMostRecentPause(true);
  };
  return {
    setPause,
    isMostRecentPaused
  };
};

export const TimerControlProvider: React.FC = props => {
  const timeControl = useTimeControl();

  return (
    <TimeControlContext.Provider value={timeControl}>
      {props.children}
    </TimeControlContext.Provider>
  );
};
