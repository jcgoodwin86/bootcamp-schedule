import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { DayScheduleProvider } from "./contexts/DayScheduleContext";
import ModuleList from "./components/ModuleList/ModuleList/ModuleList";
import DaySchedule from "./components/DaySchedule/Index";

function App() {
  return (
    <main>
      <h1 className="title">Bootcamp Schedule App</h1>
      <UserProvider>
        <DayScheduleProvider>
          <DaySchedule>
            <DaySchedule.InputWrapper />
            <DaySchedule.LessonList />
          </DaySchedule>
        </DayScheduleProvider>
        <ModuleList />
      </UserProvider>
    </main>
  );
}

export default App;
