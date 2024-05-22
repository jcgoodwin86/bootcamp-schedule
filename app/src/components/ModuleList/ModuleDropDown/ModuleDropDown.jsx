// The ModuleDropDown component will be used to display the chapters and lessons of a module when the module/chapter is clicked on
// It gets the open state from the Module component and renders the children if the open state is true
import React from "react";
import styles from "./ModuleDropDownCSS.module.css";
import { ModuleContext } from "../Module/Module";

export default function ModuleDropDown({ children }) {
  const { open } = React.useContext(ModuleContext);
  return (
    <>
      {open ? (
        <div className={styles.chapterCardContainer}>{children}</div>
      ) : null}
    </>
  );
}
