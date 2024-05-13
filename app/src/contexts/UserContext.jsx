import React from "react";
import useUserDB from "../hooks/db/createDB";
import useGetUserDB from "../hooks/db/getUserDB";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { localUserData, setLocalUserData } = useGetUserDB();
  const { completed } = useUserDB(localUserData);

  return (
    <UserContext.Provider value={{ localUserData, setLocalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
