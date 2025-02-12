// This context is used to manage the state of the user data.
// It uses the useLoadStateFromDB hook to load the user data from the database
// and the useSaveCurriculumState hook to save the curriculum state of the user data to the database.
import React from "react";

import { UserContext } from "./UserContext";
import {useQuery, useZero} from "@rocicorp/zero/react";

const sortModuleData = (moduleData) => {
  if (!moduleData) return [];
  return [...moduleData].sort((a, b) => {
    if (!a?.data || !b?.data) return 0;
    const moduleA = parseInt(a.data.module?.replace('Module ', '') || '0');
    const moduleB = parseInt(b.data.module?.replace('Module ', '') || '0');
    return moduleA - moduleB;
  });
};

export function UserProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const z = useZero();
  const moduleQuery = z.query.module;
  const queryResult = useQuery(moduleQuery);
  const [userData, setUserData] = React.useState([]);

  const updateModuleDB = React.useCallback(async (moduleData) => {
    try {
      await z.mutate.module.update({ id: "all_modules", data: moduleData });
    } catch (err) {
      setError(err.message);
    }
  }, [z.mutate]);

  React.useEffect(() => {
    try {
      if (queryResult) {
        const sortedData = sortModuleData(queryResult[0][0].data);
        setUserData(sortedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [queryResult]);


  React.useEffect(() => {
    if (userData.length > 0) {
      updateModuleDB(userData);
    }
  }, [userData, updateModuleDB]);

  const contextValue = React.useMemo(() => ({
    userData,
    setUserData,
    isLoading,
    error
  }), [userData, isLoading, error]);

  return (
    <UserContext value={contextValue}>{children}</UserContext>
  );
}
