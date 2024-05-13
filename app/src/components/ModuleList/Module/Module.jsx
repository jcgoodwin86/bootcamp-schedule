import React from "react";
import ModuleCSS from "./ModuleCSS.module.css";
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

// {modulesData?.map((module, i) => (
//   <ModuleCard module={module} key={module.id} index={i} />
// ))}
