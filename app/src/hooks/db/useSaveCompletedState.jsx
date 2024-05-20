// Custom hook to save completed state to the database
import { useState, useEffect, useRef } from "react";
import { set } from "../../services/db";
import debounce from "../../utils/debouncer";

export default function useSaveCompletedState(data) {
  const [completed, setCompleted] = useState({});

  // Debounce the function to avoid multiple calls in a short time.
  const debouncedFuncRef = useRef(
    debounce(async (completedData) => {
      try {
        // console.log("Running set with data:", completedData); // Debugging
        await set(completedData);
        // console.log(completedData); // Debugging
      } catch (error) {
        console.log(error);
      }
    }, 1500)
  );

  // Set the completed state when the data is available.
  useEffect(() => {
    if (data.id) {
      setCompleted(data);
    }
  }, [data]);

  // Save the completed state to the database.
  useEffect(() => {
    if (completed.id) {
      // console.log("Effect triggered with data:", completed); // Debugging
      if (debouncedFuncRef.current) {
        debouncedFuncRef.current(completed);
      }
    }
  }, [completed]);

  return { completed };
}
