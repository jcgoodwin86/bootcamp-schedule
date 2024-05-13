import React from "react";
import styles from "./ChapterDropDownCSS.module.css";
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
