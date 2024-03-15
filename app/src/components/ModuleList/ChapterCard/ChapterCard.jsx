import { useState } from "react";
import styles from "./ChapterCardCSS.module.css";
import LessonCard from "../LessonCard/LessonCard";
import { Card, Title, MetaData } from "../../UI/Card/Card";

export default function ChapterCard({ chapter, isChapterHidden }) {
  const [isLessonsHidden, setIsLessonsHidden] = useState(true);

  function handleClick(event) {
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing ModuleCard from being clicked.
    setIsLessonsHidden((prevState) => !prevState);
  }

  return (
    <div
      className={isChapterHidden ? "hidden" : styles.chapterCardContainer}
      onClick={handleClick}
    >
      <Card>
        <Title>{chapter.title}</Title>
        <MetaData>
          <p>
            Lessons: <span>{chapter.totalLessons}</span>
          </p>
          <p>
            Total Time: <span>{chapter.totalTime}</span>
          </p>
        </MetaData>
      </Card>

      {chapter.lessons.map((lesson) => {
        return (
          <LessonCard
            key={crypto.randomUUID()}
            lesson={lesson}
            isLessonsHidden={isLessonsHidden}
          />
        );
      })}
    </div>
  );
}
