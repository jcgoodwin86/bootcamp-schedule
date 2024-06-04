import style from "./DayScheduleCSS.module.css";
import useLatestLessons from "../../../hooks/useLatestLessons";

export default function DaySchedule({ children }) {
  const { latestLessons } = useLatestLessons();
  console.log(latestLessons); // For debugging

  return <section className={style.daySchedule}>{children}</section>;
}
