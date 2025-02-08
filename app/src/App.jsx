import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import DaySchedule from "./components/DaySchedule/index";
import { DayScheduleProvider } from "./contexts/DayScheduleContext.jsx";
import CurriculumList from "./components/CurriculumList/Curriculum.jsx";
import {useQuery, useZero} from "@rocicorp/zero/react";

function App() {
  const z = useZero();
  const data = z.query.module;
  const test = useQuery(data);

  console.log(test);

  return (
    <main>
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
