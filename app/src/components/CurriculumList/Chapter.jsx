import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

export default function Chapter({ children, chapter, onChange, ...props }) {
  return (
    <AccordionItem value={chapter.id}>
      <div className="flex flex-row gap-6 items-center">
        <Checkbox
          checked={chapter.completed}
          onChange={onChange}
          id={chapter.id}
        />
        <AccordionTrigger
          headerClassName="grow"
          className="grid grid-cols-12 place-items-start"
          chevronClassName="justify-self-end col-span-1"
        >
          <span className="col-span-6 text-xl">{chapter.title}</span>
          <p className="col-span-2">
            <span>{chapter.totalLessons}</span>
          </p>
          <p className="col-span-3">
            Total Time: <span>{chapter.totalTime}</span>
          </p>
        </AccordionTrigger>
      </div>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
