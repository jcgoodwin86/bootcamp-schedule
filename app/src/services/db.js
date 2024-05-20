// IndexedDB service to store data locally
import { openDB } from "idb";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval", { keyPath: "id", autoIncrement: true });
  },
});

export async function get(key) {
  return (await dbPromise).get("keyval", key);
}
export async function set(user) {
  return (await dbPromise).put("keyval", { ...user, id: user.id });
}
export async function del(key) {
  return (await dbPromise).delete("keyval", key);
}
export async function clear() {
  return (await dbPromise).clear("keyval");
}
export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}
