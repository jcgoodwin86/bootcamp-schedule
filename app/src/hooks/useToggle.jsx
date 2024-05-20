// This hook is to toggle a boolean value for opening and closing of modules in the UI
// and call a function when the value changes.
import React from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

export default function useToggle({
  initialValue = false,
  onToggle = () => {},
}) {
  const [on, setOn] = React.useState(initialValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  useEffectOnUpdate(onToggle, [on]);

  return [on, toggle];
}
