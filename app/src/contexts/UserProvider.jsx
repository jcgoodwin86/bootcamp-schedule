// This context is used to manage the state of the user data.
// It uses the useLoadStateFromDB hook to load the user data from the database
// and the useSaveCompletedState hook to save the completed state of the user data to the database.
import useLoadStateFromDB from "../hooks/db/useLoadStateFromDB";
import { useSaveCompletedState } from "../hooks/db/useSaveCompletedState"; // assuming createDB contains the debounced hook
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const { userData, setUserData } = useLoadStateFromDB();
  useSaveCompletedState(userData);

  return (
    <UserContext value={{ userData, setUserData }}>{children}</UserContext>
  );
}
