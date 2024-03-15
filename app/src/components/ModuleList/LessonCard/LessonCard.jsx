import styles from "./LessonCardCSS.module.css";
import { Card, Title, MetaData } from "../../UI/Card/Card";

export default function LessonCard({ lesson, isLessonsHidden }) {
  return (
    <div className={isLessonsHidden ? "hidden" : styles.lessonCard}>
      <Card>
        <Title>{lesson.title}</Title>
        <MetaData>
          <p>
            Time: <span>{lesson.time}</span>
          </p>
        </MetaData>
      </Card>
    </div>
  );
}
