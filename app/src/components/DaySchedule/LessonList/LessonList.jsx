import React from "react";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";
import { useModuleData } from "@/hooks/useModuleData.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/UI/checkbox";
import { cn } from "@/lib/utils";

function LessonCard({ lesson }) {
  const { updateModuleCompletion } = useModuleData();

  return (
    <Card id={lesson.id}>
      <CardHeader className="p-4">
        <div className="flex flex-col">
          <CardDescription className="pl-10 text-xs">
            Time: <span>{lesson.time}</span>
          </CardDescription>
          <div className="flex gap-6 items-center">
            <Checkbox
              checked={lesson.completed}
              onChange={updateModuleCompletion}
              id={lesson.id}
            />
            <CardTitle className="text-xl">{lesson.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function LessonList({ children }) {
  const { daySchedule } = React.useContext(DayScheduleContext);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mx-auto w-1/2",
        !daySchedule[0] && "hidden"
      )}
    >
      {children}
      {daySchedule[0] && (
        <h4 className="text-2xl text-center">Lessons For Today</h4>
      )}
      {daySchedule.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
