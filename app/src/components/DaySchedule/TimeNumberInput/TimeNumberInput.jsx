import { Input } from "@/components/UI/input";

export default function TimeNumberInput({ handleChange, children, id, value }) {
  let inputEle;

  if (id === "availableTimeHour") {
    inputEle = (
      <Input
        id={id}
        type="number"
        min="0"
        max="8"
        onChange={handleChange}
        value={value}
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
        value={value}
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
