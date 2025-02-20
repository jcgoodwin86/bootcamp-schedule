import React from "react";
import TimeNumberInput from "../TimeNumberInput/TimeNumberInput";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";
import debounce from "../../../utils/debouncer";

export default function InputList() {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [bufferMinutes, setBufferMinutes] = React.useState(0);

  const {
    generateSchedule,
    availableTime,
    setAvailableTime,
    setBufferTime,
    clearSchedule,
  } = React.useContext(DayScheduleContext);

  const debouncedSetAvailableTime = React.useRef(
    debounce(setAvailableTime, 800)
  );

  const debouncedSetBufferTime = React.useRef(debounce(setBufferTime, 800));

  const handleChange1 = (event) => {
    if (event.target.value > 8) {
      event.target.value = 8;
    }
    const { value } = event.target;
    setHours(value);
    debouncedSetAvailableTime.current({ ...availableTime, hours: value });
  };

  const handleChange2 = (event) => {
    // has to be less than 59
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    setMinutes(value);
    debouncedSetAvailableTime.current({ ...availableTime, minutes: value });
  };

  const handleChange3 = (event) => {
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    setBufferMinutes(value);
    debouncedSetBufferTime.current(value);
  };

  function resetInputs() {
    setHours(0);
    setMinutes(0);
    setBufferMinutes(0);
  }

  function handleClear() {
    resetInputs();
    clearSchedule();
  }

  return (
    <div className="flex gap-4 items-end mx-auto w-1/2">
      <TimeNumberInput
        value={hours}
        handleChange={handleChange1}
        id="availableTimeHour"
      >
        <Label htmlFor="availableTimeHour">Hours</Label>
      </TimeNumberInput>
      <TimeNumberInput
        value={minutes}
        handleChange={handleChange2}
        id="availableTimeMinute"
      >
        <Label htmlFor="availableTimeMinute">Minutes</Label>
      </TimeNumberInput>
      <TimeNumberInput
        value={bufferMinutes}
        handleChange={handleChange3}
        id="bufferTime"
      >
        <Label htmlFor="bufferTime">Buffer Minutes</Label>
      </TimeNumberInput>
      <Button onClick={generateSchedule}>Create List</Button>
      <Button variant="destructive" onClick={handleClear}>Clear</Button>
    </div>
  );
}
