// Custom hook to save curriculum state to the database
import React from "react";
import { set } from "../../services/db";
import debounce from "../../utils/debouncer";

export function useSaveCurriculumState(data) {
  const [curriculum, setCurriculum] = React.useState({});

  const saveToDb = React.useCallback(async (curriculumData) => {
    try {
      await set(curriculumData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Debounce the function to avoid multiple calls in a short time.
  const debouncedFuncRef = React.useRef(debounce(saveToDb, 1500));

  // Set the curriculum state when the data is available.
  React.useEffect(() => {
    if (data.id) {
      setCurriculum(data);
    }
  }, [data]);

  // Save the curriculum state to the database.
  React.useEffect(() => {
    const currentDebouncedFunc = debouncedFuncRef.current;

    if (curriculum.id && currentDebouncedFunc) {
      currentDebouncedFunc(curriculum);
    }

    return () => {
      // Cleanup the debounced function if it exists
      if (currentDebouncedFunc?.cancel) {
        currentDebouncedFunc.cancel();
      }
    };
  }, [curriculum]);

  return { curriculum };
}
