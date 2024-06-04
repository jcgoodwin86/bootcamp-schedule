import React from "react";
import { UserContext } from "../contexts/UserContext";

export default function useLatestLessons() {
  const [latestLessons, setLatestLessons] = React.useState([]);
  const { modulesData } = React.useContext(UserContext);

  function findIncompleteLessons(item, incompleteLessons = [], maxCount = 4) {
    if (incompleteLessons.length >= maxCount) {
      return incompleteLessons;
    }

    // Base case: looking through lessons
    if (item.lessons) {
      for (const lesson of item.lessons) {
        if (!lesson.completed) {
          incompleteLessons.push(lesson);
          if (incompleteLessons.length >= maxCount) {
            return incompleteLessons;
          }
        }
      }
      return incompleteLessons;
    }

    // Recursive case: looking through chapters
    if (item.chapters) {
      for (const chapter of item.chapters) {
        if (!chapter.completed) {
          findIncompleteLessons(chapter, incompleteLessons, maxCount);
          if (incompleteLessons.length >= maxCount) {
            return incompleteLessons;
          }
        }
      }
      return incompleteLessons;
    }

    // Recursive case: looking through modules
    if (!item.completed) {
      for (const module of item) {
        if (!module.completed) {
          findIncompleteLessons(module, incompleteLessons, maxCount);
          if (incompleteLessons.length >= maxCount) {
            return incompleteLessons;
          }
        }
      }
      return incompleteLessons;
    }

    return incompleteLessons;
  }

  React.useEffect(() => {
    const lessons = findIncompleteLessons(modulesData.completed);
    setLatestLessons(lessons);
  }, [modulesData]);

  return { latestLessons };
}
