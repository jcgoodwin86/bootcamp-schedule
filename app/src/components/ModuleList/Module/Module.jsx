// Module component to handle the open state of the module
import React from "react";
import useToggle from "../../../hooks/useToggle";

const ModuleContext = React.createContext();
export { ModuleContext };

export default function Module({ children, onOpen }) {
  const [open, ToggleOpen] = useToggle({
    initialValue: false,
    onToggle: onOpen,
  });

  return (
    <ModuleContext.Provider value={{ open, ToggleOpen }}>
      {children}
    </ModuleContext.Provider>
  );
}
