import React from "react";
import jsonData from "../../assets/data.json";
import { get, set } from "../../services/db.js";

const initialState = {
  id: 1,
  user: "Guest",
  completed: [],
};

async function getData() {
  const data = await get(1);
  if (data && data.completed[0]) {
    return data;
  }

  // Populate IndexedDB with default JSON data
  const defaultData = {
    ...initialState,
    completed: [...jsonData],
  };
  await set(defaultData);
  return defaultData;
}

export default function useLoadStateFromDB() {
  const [userData, setUserDataState] = React.useState(initialState);

  React.useEffect(() => {
    getData().then((data) => {
      setUserDataState(data);
    });
  }, []);

  const setUserData = React.useCallback(async (newData) => {
    await set(newData);
    setUserDataState(newData);
  }, []);

  return { userData, setUserData };
}
