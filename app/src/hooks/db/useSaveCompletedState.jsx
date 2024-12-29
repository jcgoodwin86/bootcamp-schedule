// Custom hook to save completed state to the database
import React from "react";
import { set } from "../../services/db";
import debounce from "../../utils/debouncer";

export function useSaveCompletedState(data) {
  const [completed, setCompleted] = React.useState({});

  const saveToDb = React.useCallback(async (completedData) => {
    try {
      await set(completedData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Debounce the function to avoid multiple calls in a short time.
  const debouncedFuncRef = React.useRef(debounce(saveToDb, 1500));

  // Set the completed state when the data is available.
  React.useEffect(() => {
    if (data.id) {
      setCompleted(data);
    }
  }, [data]);

  // Save the completed state to the database.
  React.useEffect(() => {
    const currentDebouncedFunc = debouncedFuncRef.current;

    if (completed.id && currentDebouncedFunc) {
      currentDebouncedFunc(completed);
    }

    return () => {
      // Cleanup the debounced function if it exists
      if (currentDebouncedFunc?.cancel) {
        currentDebouncedFunc.cancel();
      }
    };
  }, [completed]);

  return { completed };
}
