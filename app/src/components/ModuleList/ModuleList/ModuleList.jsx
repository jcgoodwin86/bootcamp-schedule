// This component is responsible for rendering the list of modules, chapters, and lessons.
import { useContext, useCallback } from "react";
import Module from "../index";
import ModuleListCSS from "./ModuleListCSS.module.css";
import { ModuleTitle, Title, MetaData } from "../../UI/Card/Card";
import { UserContext } from "../../../contexts/UserContext";
import ModuleCard from "../ModuleCard/ModuleCard.jsx";

function ChapterCard({ chapter, onOpen, children }) {
  return (
    <Module.DropDown key={chapter.id}>
      <Module onOpen={onOpen}>
        <ModuleCard id={chapter.id} completed={chapter.completed}>
          <Title>{chapter.title}</Title>
          <MetaData>
            <p>
              Lessons: <span>{chapter.totalLessons}</span>
            </p>
            <p>
              Total Time: <span>{chapter.totalTime}</span>
            </p>
          </MetaData>
        </ModuleCard>
        {children}
      </Module>
    </Module.DropDown>
  );
}

function LessonCard({ lesson }) {
  return (
    <Module.DropDown key={lesson.id}>
      <ModuleCard
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
      </ModuleCard>
    </Module.DropDown>
  );
}

export default function ModuleList() {
  const { modulesData } = useContext(UserContext);
  const handleOpen = useCallback(() => console.log("Open/Closed"), []);
  return (
    <section className={ModuleListCSS.moduleList}>
      {modulesData.completed?.map((module, i) => (
        <Module onOpen={handleOpen} key={module.id}>
          <ModuleCard id={module.id} completed={module.completed} index={i}>
            <ModuleTitle>
              Module <span>{i + 1}</span>
            </ModuleTitle>
            <Title>{module.title}</Title>
            <MetaData>
              <p>
                Chapters: <span>{module.chapters.length}</span>
              </p>
              <p>
                Total Time: <span>{module.totalTime}</span>
              </p>
            </MetaData>
          </ModuleCard>
          {module.chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} onOpen={handleOpen}>
              {chapter.lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </ChapterCard>
          ))}
        </Module>
      ))}
    </section>
  );
}
