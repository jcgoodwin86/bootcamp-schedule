import Module from "../index";
import ModuleListCSS from "./ModuleListCSS.module.css";
import { ModuleTitle, Title, MetaData } from "../../UI/Card/Card";

export default function ModuleList({ modulesData }) {
  return (
    <section className={ModuleListCSS.moduleList}>
      {modulesData?.map((module, i) => (
        // Generate Module Card
        <Module key={module.id} onOpen={() => console.log("Open/Closed")}>
          <Module.Card>
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
          </Module.Card>

          {/* Generate Chapter Cards */}
          {module.chapters.map((chapter) => (
            <Module.DropDown key={chapter.id}>
              <Module onOpen={() => console.log("Open/Closed - Child")}>
                <Module.Card>
                  <Title>{chapter.title}</Title>
                  <MetaData>
                    <p>
                      Lessons: <span>{chapter.totalLessons}</span>
                    </p>
                    <p>
                      Total Time: <span>{chapter.totalTime}</span>
                    </p>
                  </MetaData>
                </Module.Card>

                {/* Generate Lesson Cards */}
                {chapter.lessons.map((lesson) => (
                  <Module.DropDown key={lesson.id}>
                    <Module.Card>
                      <Title>{lesson.title}</Title>
                      <MetaData>
                        <p>
                          Time: <span>{lesson.time}</span>
                        </p>
                      </MetaData>
                    </Module.Card>
                  </Module.DropDown>
                ))}
              </Module>
            </Module.DropDown>
          ))}
        </Module>
      ))}
    </section>
  );
}
