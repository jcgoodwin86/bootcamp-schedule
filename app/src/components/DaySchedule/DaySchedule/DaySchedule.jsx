import style from "./DayScheduleCSS.module.css";

export default function DaySchedule({ children }) {
  return <section className={style.daySchedule}>{children}</section>;
}
