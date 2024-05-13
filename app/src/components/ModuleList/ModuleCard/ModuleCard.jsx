import { useState, useContext, useEffect } from "react";
import style from "./ModuleCardCSS.module.css";
import { Card, ModuleTitle, Title, MetaData } from "../../UI/Card/Card";
// import { UserContext } from "../../../contexts/UserContext";
import { ModuleContext } from "../Module/Module.jsx";

export default function ModuleCard({ children, hasDropDown = true }) {
  // const { localUserData, setLocalUserData } = useContext(UserContext);

  // function handleCheckboxChange(event, key) {
  //   event.stopPropagation();

  //   if (event.target.checked) {
  //     setLocalUserData((prevState) => {
  //       // console.log(prevState);
  //       return {
  //         ...prevState,
  //         completed: [...new Set([...prevState.completed, key])],
  //       };
  //     });
  //   } else if (!event.target.checked) {
  //     setLocalUserData((prevState) => ({
  //       ...prevState,
  //       completed: prevState.completed.filter((item) => item !== key),
  //     }));
  //   }
  // }
  const { ToggleOpen } = useContext(ModuleContext);

  function handleClick(event) {
    event.stopPropagation();
    hasDropDown && ToggleOpen();
  }

  return (
    <div onClick={handleClick} className={[style.span, style.space].join("")}>
      {/* <input
        onClick={(event) => event.stopPropagation()} // Stop ToggleOpen from bubbling up the DOM tree
        type="checkbox"
        name="test"
        id="test"
      /> */}
      <Card>{children}</Card>
    </div>
    // <div onClick={handleClick} className={[style.span, style.space].join("")}>
    //   <Card>
    //     <input
    //       type="checkbox"
    //       onClick={(event) => event.stopPropagation()}
    //       onChange={(event) => handleCheckboxChange(event, module.id)}
    //       checked={
    //         Array.isArray(localUserData.completed) &&
    //         localUserData.completed.includes(module.id)
    //       }
    //     />

    //     <ModuleTitle>
    //       Module <span>{index + 1}</span>
    //     </ModuleTitle>
    //     <Title>{module.title}</Title>
    //     <MetaData>
    //       <p className={style.data}>
    //         Chapters: <span>{module.chapters.length}</span>
    //       </p>
    //       <p className={style.data}>
    //         Total Time: <span>{module.totalTime}</span>
    //       </p>
    //     </MetaData>
    //   </Card>

    //   {module.chapters.map((chapter) => {
    //     return (
    //       <ChapterCard
    //         key={chapter.id}
    //         chapter={chapter}
    //         isChapterHidden={isChapterHidden}
    //       />
    //     );
    //   })}
    // </div>
  );
}
