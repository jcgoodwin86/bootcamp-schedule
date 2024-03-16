import ModuleCard from "../ModuleCard/ModuleCard";
import ModuleCSS from "./ModuleCSS.module.css";

export default function ModuleList({ modulesData }) {
  const classData = modulesData.map((module, i) => {
    return <ModuleCard key={crypto.randomUUID()} module={module} index={i} />;
  });

  return <section className={ModuleCSS.moduleList}>{classData}</section>;
}
