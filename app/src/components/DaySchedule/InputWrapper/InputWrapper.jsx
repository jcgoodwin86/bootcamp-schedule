import React from "react";
import TextInput from "../TextInput/TextInput";
import style from "./InputWrapper.module.css";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";

export default function InputWrapper() {
  const { availableTime, bufferTime, setAvailableTime, setBufferTime } =
    React.useContext(DayScheduleContext);

  const handleChange1 = (event) => {
    if (event.target.value > 8) {
      event.target.value = 8;
    }
    const { value } = event.target;
    setAvailableTime({ ...availableTime, hours: value });
  };

  const handleChange2 = (event) => {
    // has to be less than 59
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    setAvailableTime({ ...availableTime, minutes: value });
  };

  const handleChange3 = (event) => {
    if (event.target.value > 59) {
      event.target.value = 59;
    }
    const { value } = event.target;
    setBufferTime(value);
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
    </div>
  );
}
