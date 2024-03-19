import Dexie from "dexie";

export const db = new Dexie("myDatabase");

db.version(1).stores({
  modules: "id", // Primary key and indexed props
});
