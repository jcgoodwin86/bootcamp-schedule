import React from "react";
import { UserContext } from "../contexts/UserContext";

// Helper function outside of components and hooks
const convertToSeconds = (time, buffer) => {
  const [minutes, seconds] = time.split(":");
  return Number(buffer) * 60 + Number(minutes) * 60 + Number(seconds);
};

export default function useLatestLessons(timeLimit, bufferTime) {
  // console.log(timeLimit);
  const [latestLessons, setLatestLessons] = React.useState([]);
  const { modulesData } = React.useContext(UserContext);

  const findIncompleteLessons = React.useCallback(
    (item, incompleteLessons = [], totalTime = 0) => {
      if (totalTime >= timeLimit) {
        return { lessons: incompleteLessons, totalTime, done: true };
      }

      let done = false; // Flag to stop further processing

      if (item.lessons) {
        for (const lesson of item.lessons) {
          if (totalTime >= timeLimit || done) break;

          if (!lesson.completed) {
            const lessonTime = convertToSeconds(lesson.time, bufferTime);
            // console.log("Checking lesson", { lesson, lessonTime });

            if (totalTime + lessonTime <= timeLimit) {
              incompleteLessons.push(lesson);
              totalTime += lessonTime;
              // console.log("Lesson added", { incompleteLessons, totalTime });
            } else {
              // console.log("Time limit exceeded, stopping", {lesson,totalTime});
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
            // console.log("Checking child", { child });
            const result = findIncompleteLessons(
              child,
              incompleteLessons,
              totalTime
            );
            incompleteLessons = result.lessons;
            totalTime = result.totalTime;
            done = result.done;

            if (done) {
              // console.log("Time limit reached within children:", { incompleteLessons, totalTime });
              break; // Break if total time exceeds after recursive call
            }
          }
        }
      }
      return { lessons: incompleteLessons, totalTime, done };
    },
    [timeLimit, bufferTime]
  );

  React.useEffect(() => {
    // console.log("Starting search with modulesData:", modulesData.completed);
    const { lessons } = findIncompleteLessons(modulesData.completed);
    setLatestLessons(lessons);
    // console.log("Set latest lessons:", lessons);
  }, [modulesData, timeLimit, findIncompleteLessons]);

  return { latestLessons };
}
