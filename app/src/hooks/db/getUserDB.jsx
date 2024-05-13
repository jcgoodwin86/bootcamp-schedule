import React from "react";
import { get } from "../../services/db.js";

export default function useGetUserDB() {
  // Initialize all expected properties upfront
  const [localUserData, setLocalUserData] = React.useState({
    id: null,
    user: "Guest",
    completed: [], // Ensure it’s always there from the beginning
  });

  React.useEffect(() => {
    async function getDB() {
      const data = await get(1);
      if (data && data.id) {
        setLocalUserData((previousState) => ({ ...previousState, ...data }));
      }
    }
    getDB();
  }, []);

  return { localUserData, setLocalUserData };
}
