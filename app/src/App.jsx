import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import CurriculumList from "./components/CurriculumList/Curriculum.jsx";

function App() {
  return (
    <main>
      <h1 className="text-4xl font-bold title">Bootcamp Schedule App</h1>
      <UserProvider>
        <CurriculumList />
      </UserProvider>
    </main>
  );
}

export default App;
