import React from "react";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";
export default function LessonList({ children }) {
  const { daySchedule } = React.useContext(DayScheduleContext);
  return (
    <div>
      {children}
      {daySchedule.length > 0 ? null : "loading...hopefully...😥"}
    </div>
  );
}
