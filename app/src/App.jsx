import { useEffect } from "react";
import "./App.css";
import jsonData from "./assets/data.json";
import ModuleList from "./components/ModuleList/ModuleList/ModuleList";
import { db } from "./services/db.js";
function App() {
  useEffect(() => {
    db.modules.bulkPut(jsonData);
  }, []);

  return (
    <main>
      <h1>Bootcamp Schedule App</h1>
      <ModuleList db={db} />
    </main>
  );
}

export default App;
