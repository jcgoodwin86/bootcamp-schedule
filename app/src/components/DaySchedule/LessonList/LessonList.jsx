import React from "react";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";
import { Title, MetaData } from "../../UI/Card/Card";
import Module from "../../ModuleList/index";
import styles from "./LessonList.module.css";
function LessonCard({ lesson }) {
  return (
    <Module.Card
      id={lesson.id}
      completed={lesson.completed}
      hasDropDown={false}
    >
      <Title>{lesson.title}</Title>
      <MetaData>
        <p>
          Time: <span>{lesson.time}</span>
        </p>
      </MetaData>
    </Module.Card>
  );
}
export default function LessonList({ children }) {
  const { daySchedule } = React.useContext(DayScheduleContext);
  // console.log(daySchedule); // For debugging

  return (
    <div className={styles.lessonList}>
      {children}
      {daySchedule[0] && <h4>Lessons For Today</h4>}
      <Module>
        {daySchedule.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </Module>
    </div>
  );
}
