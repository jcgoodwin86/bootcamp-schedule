import { Checkbox } from "../ui/checkbox";

export default function Lesson({ lesson, onChange, ...props }) {
  return (
    <div className="flex gap-6 items-center pb-3 ml-6 cursor-pointer">
      <Checkbox checked={lesson.completed} onChange={onChange} id={lesson.id} />
      <label
        className="grid grid-cols-2 gap-6 items-center cursor-pointer hover:underline grow"
        htmlFor={lesson.id}
      >
        <span className="text-lg">{lesson.title}</span>
        <p>
          Time: <span>{lesson.time}</span>
        </p>
      </label>
    </div>
  );
}
