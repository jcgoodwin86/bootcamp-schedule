import React from "react";
import TextInput from "../TextInput/TextInput";
import style from "./InputWrapper.module.css";
import { DayScheduleContext } from "../../../contexts/DayScheduleContext";

export default function InputWrapper() {
  const { availableTime, bufferTime, setAvailableTime, setBufferTime } =
    React.useContext(DayScheduleContext);

  const handleChange1 = (event) => {
    const { value } = event.target;
    setAvailableTime(value);
  };

  const handleChange2 = (event) => {
    const { value } = event.target;
    setBufferTime(value);
  };

  return (
    <div className={style.wrapper}>
      <TextInput time={availableTime} handleChange={handleChange1}>
        <h4>Available Time</h4>
      </TextInput>
      <TextInput time={bufferTime} handleChange={handleChange2}>
        <h4>Buffer Time</h4>
      </TextInput>
    </div>
  );
}
