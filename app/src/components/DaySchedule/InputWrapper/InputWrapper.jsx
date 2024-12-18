import React from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../../UI/Button/Button";
import style from "./InputWrapper.module.css";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";
import debounce from "../../../utils/debouncer";

export default function InputWrapper() {
  const {
    generateSchedule,
    availableTime,
    bufferTime,
    setAvailableTime,
    setBufferTime,
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
    debouncedSetAvailableTime.current({ ...availableTime, hours: value });
  };

  const handleChange2 = (event) => {
    // has to be less than 59
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    debouncedSetAvailableTime.current({ ...availableTime, minutes: value });
  };

  const handleChange3 = (event) => {
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    debouncedSetBufferTime.current(value);
  };

  return (
    <div className={style.wrapper}>
      <TextInput
        time={availableTime}
        handleChange={handleChange1}
        id="availableTimeHour"
      >
        <span>Hours Available</span>
      </TextInput>
      <TextInput
        time={availableTime}
        handleChange={handleChange2}
        id="availableTimeMinute"
      >
        <span>Minutes Available</span>
      </TextInput>
      <TextInput time={bufferTime} handleChange={handleChange3} id="bufferTime">
        <span>Buffer Time</span>
      </TextInput>
      <Button onClick={generateSchedule}>Create List</Button>
    </div>
  );
}
