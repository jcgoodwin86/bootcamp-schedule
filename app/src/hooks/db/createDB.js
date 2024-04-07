import { useState, useEffect } from "react";
import { set } from "../../services/db.js";

export default function useUserDB(data) {
  const [completed, setCompleted] = useState();
  async function updateDB(completedData) {
    try {
      console.log("Running set with data:", completedData);
      await set(completedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data) {
      setCompleted(data);
    }
  }, [data]);

  useEffect(() => {
    if (completed) {
      console.log("Effect triggered with data:", completed);
      updateDB(completed);
    }
  }, [completed]);

  return { completed };
}
