// Style components for Module Card
import style from "./Card.module.css";
function Card({ children }) {
  return <div className={style.container}>{children}</div>;
}

function ModuleTitle({ children }) {
  return <h3 className={style.moduleTitle}>{children}</h3>;
}

// TODO add param for title size
function Title({ children }) {
  return <h4 className={style.title}>{children}</h4>;
}

function MetaData({ children }) {
  return <div className={style.metaData}>{children}</div>;
}
export { Card, Title, ModuleTitle, MetaData };
