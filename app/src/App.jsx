import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import ModuleList from "./components/ModuleList/ModuleList/ModuleList";

function App() {
  return (
    <main>
      <h1>Bootcamp Schedule App</h1>
      <UserProvider>
        <ModuleList />
      </UserProvider>
    </main>
  );
}

export default App;
