// Custom hook to update the completion status of modules, chapters, and lessons.
import { useContext, useCallback } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

// Define the recursive function
const updateCompletionStatus = (items, idToToggle, forceComplete = null) => {
  return items.map((item) => {
    let completed = item.completed;

    // Toggle the completion status if this is the item to change.
    if (item.id === idToToggle) {
      completed = !item.completed;
    }

    // If part of a parent's state change, propagate it to children.
    if (forceComplete !== null) {
      completed = forceComplete;
    }

    // If the item has chapters, recursively update their statuses.
    if (item.chapters) {
      return {
        ...item,
        completed,
        chapters: updateCompletionStatus(
          item.chapters,
          idToToggle,
          completed !== item.completed ? completed : null
        ),
      };
    }

    // If the item has lessons, recursively update their statuses.
    if (item.lessons) {
      return {
        ...item,
        completed,
        lessons: updateCompletionStatus(
          item.lessons,
          idToToggle,
          completed !== item.completed ? completed : null
        ),
      };
    }

    // Return the updated item.
    return { ...item, completed };
  });
};

// Use the function inside the hook
export function useModuleData() {
  const { modulesData, setModulesData } = useContext(UserContext);

  const updateModuleCompletion = useCallback(
    (id) => {
      const updatedModulesData = updateCompletionStatus(
        modulesData.completed,
        id
      );
      setModulesData({ ...modulesData, completed: [...updatedModulesData] });
    },
    [modulesData, setModulesData]
  );

  return { modulesData, updateModuleCompletion };
}
