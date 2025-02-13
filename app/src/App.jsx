import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import DaySchedule from "./components/DaySchedule/index";
import { DayScheduleProvider } from "./contexts/DayScheduleContext.jsx";
import CurriculumList from "./components/CurriculumList/Curriculum.jsx";
import LoginComponent from "./components/Login/LoginComponent.jsx";

function App() {
  return (
    <main>
      <LoginComponent />
      <h1 className="text-4xl font-bold title">Bootcamp Schedule App</h1>
      <UserProvider>
        <DayScheduleProvider>
          <DaySchedule>
            <DaySchedule.InputList />
            <DaySchedule.LessonList />
          </DaySchedule>
        </DayScheduleProvider>
        <CurriculumList />
      </UserProvider>
    </main>
  );
}

export default App;
