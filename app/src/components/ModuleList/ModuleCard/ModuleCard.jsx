import PropTypes from "prop-types";
import { useState } from "react";
import ChapterCard from "../ChapterCard/ChapterCard";
import style from "./ModuleCardCSS.module.css";

export default function ModuleCard({ module, index }) {
  const [isChapterHidden, setIsChapterHidden] = useState(true);

  function handleClick() {
    setIsChapterHidden((prevState) => !prevState);
  }

  return (
    <div onClick={handleClick} className={style.container}>
      <div className={style.moduleCard}>
        <div className={style.rectangle}>
          <h2 className={style.moduleTitle}>
            Module <span>{index + 1}</span>
          </h2>
        </div>
        <h3 className={style.title}>{module.title}</h3>
        <div className={style.metaData}>
          <p>Chapters: {module.chapters.length}</p>
          <p>Total Time: {module.totalTime}</p>
        </div>
      </div>

      <div className={style.chaptersContainer}>
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
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.object.isRequired,
};
