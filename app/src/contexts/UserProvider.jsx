// This context is used to manage the state of the user data.
import React from "react";
import { UserContext } from "./UserContext";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import jsonData from "../assets/data.json";

export function UserProvider({ children }) {
  const [user, setUser] = React.useState([]);

  const fetchedUser = useLiveQuery(() =>
    db.users.where("name").equals("anon").toArray()
  );

  function updateUser(id, newData) {
    db.users.update(id, { data: [...newData] });
  }

  React.useEffect(() => {
    if (!fetchedUser) return;
    setUser(fetchedUser[0]);
  }, [fetchedUser]);

  if (fetchedUser?.length < 1) {
    try {
      db.users.add({
        name: "anon",
        data: [...jsonData],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UserContext value={{ user, setUser, updateUser }}>{children}</UserContext>
  );
}
