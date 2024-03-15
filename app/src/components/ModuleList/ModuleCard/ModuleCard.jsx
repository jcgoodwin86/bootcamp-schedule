import { useState } from "react";
import ChapterCard from "../ChapterCard/ChapterCard";
import style from "./ModuleCardCSS.module.css";
import { Card, ModuleTitle, Title, MetaData } from "../../UI/Card/Card";

export default function ModuleCard({ module, index }) {
  const [isChapterHidden, setIsChapterHidden] = useState(true);

  function handleClick() {
    setIsChapterHidden((prevState) => !prevState);
  }

  return (
    <div onClick={handleClick} className={[style.span, style.space].join("")}>
      <Card>
        <ModuleTitle>
          Module <span>{index + 1}</span>
        </ModuleTitle>
        <Title>{module.title}</Title>
        <MetaData>
          <p className={style.data}>
            Chapters: <span>{module.chapters.length}</span>
          </p>
          <p className={style.data}>
            Total Time: <span>{module.totalTime}</span>
          </p>
        </MetaData>
      </Card>

      {module.chapters.map((chapter) => {
        return (
          <ChapterCard
            key={crypto.randomUUID()}
            chapter={chapter}
            isChapterHidden={isChapterHidden}
          />
        );
      })}
    </div>
  );
}
