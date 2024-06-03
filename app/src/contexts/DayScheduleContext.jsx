import React from "react";

export const DayScheduleContext = React.createContext();

export const DayScheduleProvider = ({ children }) => {
  const [daySchedule, setDaySchedule] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [bufferTime, setBufferTime] = React.useState("");
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
