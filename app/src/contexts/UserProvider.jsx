// This context is used to manage the state of the user data.
// It uses the useLoadStateFromDB hook to load the user data from the database
// and the useSaveCurriculumState hook to save the curriculum state of the user data to the database.
import useLoadStateFromDB from "../hooks/db/useLoadStateFromDB";
import { useSaveCurriculumState } from "../hooks/db/useSaveCurriculumState";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const { userData, setUserData } = useLoadStateFromDB();
  useSaveCurriculumState(userData);

  return (
    <UserContext value={{ userData, setUserData }}>{children}</UserContext>
  );
}
