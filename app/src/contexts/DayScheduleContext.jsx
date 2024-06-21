import React from "react";
import useLatestLessons from "../hooks/useLatestLessons";

export const DayScheduleContext = React.createContext();

export const DayScheduleProvider = ({ children }) => {
  const [daySchedule, setDaySchedule] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState({
    hours: 0,
    minutes: 0,
  });
  const [bufferTime, setBufferTime] = React.useState("");
  const { latestLessons } = useLatestLessons(
    availableTime.hours * 60 * 60 + availableTime.minutes * 60,
    bufferTime
  );

  React.useEffect(() => {
    setDaySchedule(latestLessons);
  }, [latestLessons]);

  return (
    <DayScheduleContext.Provider
      value={{
        daySchedule,
        setDaySchedule,
        availableTime,
        setAvailableTime,
        bufferTime,
        setBufferTime,
      }}
    >
      {children}
    </DayScheduleContext.Provider>
  );
};
