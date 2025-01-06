import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useModuleData } from "@/hooks/useModuleData.jsx";
import { UserContext } from "@/contexts/UserContext";
import Chapter from "./Chapter.jsx";
import Lesson from "./Lesson.jsx";

export default function CurriculumList() {
  const { userData } = React.useContext(UserContext);
  const { updateModuleCompletion } = useModuleData();

  return (
    <Accordion type="single" collapsible className="mx-auto max-w-screen-lg">
      {userData.curriculum?.map((module) => (
        <AccordionItem value={module.id} key={module.id}>
          <div className="flex gap-6 items-center">
            <Checkbox
              checked={module.completed}
              onChange={updateModuleCompletion}
              id={module.id}
            />
            <AccordionTrigger
              className="grid grid-cols-12 place-items-start"
              headerClassName="grow"
              chevronClassName="justify-self-end col-span-1"
            >
              <span className="col-span-6 text-2xl">{module.title}</span>
              <p className="col-span-2">
                <span>{module.chapters.length} Chapters</span>
              </p>
              <p className="col-span-3">
                Total Time: <span>{module.totalTime}</span>
              </p>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <Accordion type="single" className="ml-6" collapsible>
              {module.chapters.map((chapter) => (
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
      ))}
    </Accordion>
  );
}
