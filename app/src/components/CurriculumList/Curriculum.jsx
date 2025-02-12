import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import { Checkbox } from "@/components/UI/checkbox";
import { useModuleData } from "@/hooks/useModuleData.jsx";
import { UserContext } from "@/contexts/UserContext";
import Chapter from "./Chapter.jsx";
import Lesson from "./Lesson.jsx";

export default function CurriculumList() {
  const { userData } = React.useContext(UserContext);
  const { updateModuleCompletion } = useModuleData();

  return (
    <Accordion type="single" collapsible className="mx-auto max-w-screen-lg">
      {userData.map((module) => {
        const { id, title, chapters, completed, totalTime } = module;
        return (
          <AccordionItem value={id} key={id}>
            <div className="flex gap-6 items-center">
              <Checkbox
                checked={completed}
                onChange={updateModuleCompletion}
                id={id}
              />
              <AccordionTrigger
              className="grid grid-cols-12 place-items-start"
              headerClassName="grow"
              chevronClassName="justify-self-end col-span-1"
            >
              <span className="col-span-6 text-2xl">{title}</span>
              <p className="col-span-2">
                <span>{chapters.length} Chapters</span>
              </p>
              <p className="col-span-3">
                Total Time: <span>{totalTime}</span>
              </p>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <Accordion type="single" className="ml-6" collapsible>
              {chapters.map((chapter) => (
                <Chapter
                  key={chapter.id}
                  chapter={chapter}
                  onChange={updateModuleCompletion}
                >
                  {chapter.lessons.map((lesson) => (
                    <Lesson
                      key={lesson.id}
                      lesson={lesson}
                      onChange={updateModuleCompletion}
                    />
                  ))}
                </Chapter>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      );
      })}
    </Accordion>
  );
}
