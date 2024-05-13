import { useState } from "react";
import "./App.css";
import jsonData from "./assets/data.json";
import { UserProvider } from "./contexts/UserContext";
import ModuleList from "./components/ModuleList/ModuleList/ModuleList";

function App() {
  const [modulesData] = useState(jsonData);

  return (
    <main>
      <h1>Bootcamp Schedule App</h1>
      <UserProvider>
        <ModuleList modulesData={modulesData} />
      </UserProvider>
    </main>
  );
}

export default App;
