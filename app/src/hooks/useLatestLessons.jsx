import React from "react";
import { UserContext } from "../contexts/UserContext";

// Helper function outside of components and hooks
const convertToSeconds = (time) => {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
};

export default function useLatestLessons(timeLimit = 1800) {
  const [latestLessons, setLatestLessons] = React.useState([]);
  const { modulesData } = React.useContext(UserContext);

  const findIncompleteLessons = React.useCallback(
    (item, incompleteLessons = [], totalTime = 0) => {
      if (totalTime >= timeLimit) {
        return { lessons: incompleteLessons, totalTime };
      }

      if (item.lessons) {
        for (const lesson of item.lessons) {
          if (!lesson.completed) {
            const lessonTime = convertToSeconds(lesson.time);
            // console.log("Checking lesson", { lesson, lessonTime });

            if (totalTime + lessonTime <= timeLimit) {
              incompleteLessons.push(lesson);
              totalTime += lessonTime;
              // console.log("Lesson added", { incompleteLessons, totalTime });
            } else {
              // console.log("Time limit exceeded, stopping", { lesson, totalTime });
              break;
            }
          }
        }
      } else if (item.chapters || Array.isArray(item)) {
        const children = item.chapters || item;
        for (const child of children) {
          if (!child.completed) {
            // console.log("Checking child", { child });
            const result = findIncompleteLessons(
              child,
              incompleteLessons,
              totalTime
            );
            incompleteLessons = result.lessons;
            totalTime = result.totalTime;

            if (totalTime >= timeLimit) {
              // console.log("Time limit reached within children:", { incompleteLessons, totalTime });
              break; // Ensure we stop processing further children once time limit is hit
            }
          }
        }
      }
      return { lessons: incompleteLessons, totalTime };
    },
    [timeLimit]
  );

  React.useEffect(() => {
    // console.log("Starting search with modulesData:", modulesData.completed);
    const { lessons } = findIncompleteLessons(modulesData.completed);
    setLatestLessons(lessons);
    // console.log("Set latest lessons:", lessons);
  }, [modulesData, timeLimit, findIncompleteLessons]);

  return { latestLessons };
}
