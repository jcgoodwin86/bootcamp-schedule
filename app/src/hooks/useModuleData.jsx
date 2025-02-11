// Custom hook to manage course completion states in a hierarchical structure:
// Module -> Chapters -> Lessons
import React from "react";
import { UserContext } from "../contexts/UserContext";

const updateCompletionStatus = (items, idToToggle, forceComplete = null) => {
  return items.map((item) => {
    // Track completion state for current item
    let completed = item.completed;

    // Case 1: Direct toggle - user clicked this specific item
    if (item.id === idToToggle) {
      completed = !item.completed;
    }

    // Case 2: Parent propagation - parent's state changed, update children
    if (forceComplete !== null) {
      completed = forceComplete;
    }

    // Handle Module level (contains chapters)
    if (item.chapters) {
      // Step 1: Recursively update all chapters
      const updatedChapters = updateCompletionStatus(
        item.chapters,
        idToToggle,
        // Only propagate if module's status changed
        completed !== item.completed ? completed : null
      );

      // Step 2: Module is complete only if all chapters are complete
      completed = updatedChapters.every((chapter) => chapter.completed);

      return {
        ...item,
        completed,
        chapters: updatedChapters,
      };
    }

    // Handle Chapter level (contains lessons)
    if (item.lessons) {
      // Step 1: Recursively update all lessons
      const updatedLessons = updateCompletionStatus(
        item.lessons,
        idToToggle,
        // Only propagate if chapter's status changed
        completed !== item.completed ? completed : null
      );

      // Step 2: Chapter is complete only if all lessons are complete
      completed = updatedLessons.every((lesson) => lesson.completed);

      return {
        ...item,
        completed,
        lessons: updatedLessons,
      };
    }

    // Return the updated item.
    return { ...item, completed };
  });
};

// Use the function inside the hook
export function useModuleData() {
  const { userData, setUserData } = React.useContext(UserContext);

  const updateModuleCompletion = React.useCallback(
    (id) => {
      const updatedModulesData = updateCompletionStatus(
        userData,
        id
      );
      console.log(updatedModulesData);
      setUserData(updatedModulesData);
    },
    [userData, setUserData]
  );

  return { userData, updateModuleCompletion };
}
