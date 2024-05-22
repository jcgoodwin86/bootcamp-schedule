// This context is used to manage the state of the user data.
// It uses the useLoadStateFromDB hook to load the user data from the database
// and the useSaveCompletedState hook to save the completed state of the user data to the database.
import React, { useEffect, useState } from "react";
import useLoadStateFromDB from "../hooks/db/useLoadStateFromDB";
import useSaveCompletedState from "../hooks/db/useSaveCompletedState"; // assuming createDB contains the debounced hook

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { localUserData, setLocalUserData } = useLoadStateFromDB();
  useSaveCompletedState(localUserData);

  const [modulesData, setModulesData] = useState(() => localUserData);

  // Set the modules data when the localUserData is available.
  useEffect(() => {
    if (localUserData.id) {
      setModulesData(localUserData);
    }
  }, [localUserData]);

  // Update the localUserData when the modulesData changes.
  useEffect(() => {
    setLocalUserData(modulesData);
  }, [modulesData, setLocalUserData]);

  return (
    <UserContext.Provider value={{ modulesData, setModulesData }}>
      {children}
    </UserContext.Provider>
  );
};
