// The ModuleCard component which is used to display the module card in the module list.
import React from "react";
import style from "./ModuleCardCSS.module.css";
import { Card } from "../../UI/Card/Card";
import { ModuleContext } from "../Module/Module.jsx";
import { Checkbox } from "../../UI/checkbox";
import { useModuleData } from "../../../hooks/useModuleData.jsx";
export default function ModuleCard({
  children,
  hasDropDown = true,
  id,
  completed,
}) {
  const { updateModuleCompletion } = useModuleData();
  const { ToggleOpen } = React.useContext(ModuleContext);

  const handleClick = (event) => {
    event.stopPropagation();
    hasDropDown && ToggleOpen();
  };

  return (
    <div onClick={handleClick} className={[style.span, style.space].join(" ")}>
      <Card>
        <Checkbox
          checked={completed}
          onChange={updateModuleCompletion}
          id={id}
        />
        {children}
      </Card>
    </div>
  );
}
