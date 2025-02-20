// IndexedDB service to store data locally
import Dexie, { type EntityTable } from "dexie";

interface User {
  id: number;
  name: string;
  data: object[];
}

const db = new Dexie("userDB") as Dexie & {
  user: EntityTable<User, "id">;
};

db.version(1).stores({
  users: "++id, &name, data",
});

export type { User };
export { db };
