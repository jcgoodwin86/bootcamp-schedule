// Hook to initialize user data context
import { useEffect, useState, useRef } from "react";
import jsonData from "../../assets/data.json";
import { get, set } from "../../services/db.js";

const initialState = {
  id: 1,
  user: "Guest",
  completed: [],
};

// Custom hook to load state from the database
export default function useLoadStateFromDB() {
  const [localUserData, setLocalUserData] = useState(initialState);

  useEffect(() => {
    async function initializeDB() {
      const data = await get(1);
      if (data && data.id) {
        setLocalUserData(data);
      } else {
        // Populate IndexedDB with default JSON data
        const defaultData = {
          ...initialState,
          completed: [...jsonData],
        };
        await set(defaultData);
        setLocalUserData(defaultData);
      }
    }
    initializeDB();
  }, []);

  return { localUserData, setLocalUserData };
}
