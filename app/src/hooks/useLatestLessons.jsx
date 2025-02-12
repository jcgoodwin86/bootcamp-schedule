import React from "react";
import { UserContext } from "../contexts/UserContext";

const convertToSeconds = (time, buffer) => {
  const [minutes, seconds] = time.split(":");
  return Number(buffer) * 60 + Number(minutes) * 60 + Number(seconds);
};

export default function useLatestLessons(timeLimit, bufferTime) {
  const [latestLessons, setLatestLessons] = React.useState([]);
  const { userData } = React.useContext(UserContext);

  const findIncompleteLessons = React.useCallback(
    (item, incompleteLessons = [], totalTime = 0) => {
      if (totalTime >= timeLimit) {
        return { lessons: incompleteLessons, totalTime, done: true };
      }

      let done = false;

      if (item.lessons) {
        for (const lesson of item.lessons) {
          if (totalTime >= timeLimit || done) break;

          if (!lesson.completed) {
            const lessonTime = convertToSeconds(lesson.time, bufferTime);

            if (totalTime + lessonTime <= timeLimit) {
              incompleteLessons.push(lesson);
              totalTime += lessonTime;
            } else {
              done = true;
              break;
            }
          }
        }
      } else if (item.chapters || Array.isArray(item)) {
        const children = item.chapters || item;
        for (const child of children) {
          if (totalTime >= timeLimit || done) break;
          if (!child.completed) {
            const result = findIncompleteLessons(
              child,
              incompleteLessons,
              totalTime
            );
            incompleteLessons = result.lessons;
            totalTime = result.totalTime;
            done = result.done;

            if (done) break;
          }
        }
      }
      return { lessons: incompleteLessons, totalTime, done };
    },
    [timeLimit, bufferTime]
  );

  React.useEffect(() => {
    if (timeLimit > 0) {
      const { lessons } = findIncompleteLessons(userData);
      setLatestLessons(lessons);
    } else {
      setLatestLessons([]); // Clear lessons when time is 0
    }
  }, [timeLimit, bufferTime, findIncompleteLessons, userData]);

  return { latestLessons };
}
