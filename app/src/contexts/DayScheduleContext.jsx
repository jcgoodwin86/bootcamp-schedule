import React from "react";
import useLatestLessons from "../hooks/useLatestLessons";
import { UserContext } from "../contexts/UserContext"; // Assuming UserContext is defined in this file

export const DayScheduleContext = React.createContext();

export const DayScheduleProvider = ({ children }) => {
  const [daySchedule, setDaySchedule] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState({
    hours: 0,
    minutes: 0,
  });
  const [bufferTime, setBufferTime] = React.useState(0);
  const { latestLessons } = useLatestLessons(
    availableTime.hours * 60 * 60 + availableTime.minutes * 60,
    bufferTime
  );

  // Keep daySchedule in sync with userData
  const { userData } = React.useContext(UserContext);

  const findLessonInModules = React.useCallback((items, lessonId) => {
    for (const item of items) {
      if (item.id === lessonId) {
        return item;
      }
      if (item.chapters) {
        for (const chapter of item.chapters) {
          if (chapter.lessons) {
            const lesson = chapter.lessons.find((l) => l.id === lessonId);
            if (lesson) return lesson;
          }
        }
      }
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (daySchedule.length > 0) {
      setDaySchedule((prevSchedule) =>
        prevSchedule.map((lesson) => {
          const updatedLesson = findLessonInModules(
            userData.curriculum,
            lesson.id
          );
          return updatedLesson || lesson;
        })
      );
    }
  }, [userData, findLessonInModules]);

  const generateSchedule = React.useCallback(() => {
    setDaySchedule(latestLessons);
  }, [latestLessons]);

  const resetTime = React.useCallback(() => {
    setAvailableTime({ hours: 0, minutes: 0 });
    setBufferTime(0);
  }, []);

  const clearSchedule = React.useCallback(() => {
    setDaySchedule([]);
    resetTime();
  }, [resetTime]);

  return (
    <DayScheduleContext.Provider
      value={{
        generateSchedule, // Keep for button usage
        clearSchedule,
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
