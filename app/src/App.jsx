import { useState } from "react";
import "./App.css";
import jsonData from "./assets/data.json";
import ModuleList from "./components/ModuleList/ModuleList/ModuleList";
import useUserDB from "./hooks/db/createDB";

function App() {
  const [modulesData] = useState(jsonData);
  const [localKeyData, setLocalKeyData] = useState();
  const { completed } = useUserDB(localKeyData);

  return (
    <main>
      <h1>Bootcamp Schedule App</h1>
      <ModuleList modulesData={modulesData} />
    </main>
  );
}

export default App;
