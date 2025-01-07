import { Input } from "@/components/UI/input";

export default function TimeNumberInput({ handleChange, children, id }) {
  let inputEle;

  if (id === "availableTimeHour") {
    inputEle = (
      <Input
        id={id}
        type="number"
        min="0"
        max="8"
        onChange={handleChange}
        defaultValue="0"
      />
    );
  } else {
    inputEle = (
      <Input
        id={id}
        type="number"
        min="0"
        max="59"
        onChange={handleChange}
        defaultValue="0"
      />
    );
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {children}
      {inputEle}
    </div>
  );
}
