import { useLiveQuery } from "dexie-react-hooks";
import ModuleCard from "../ModuleCard/ModuleCard";
import ModuleCSS from "./ModuleCSS.module.css";

export default function ModuleList({ db }) {
  const modules = useLiveQuery(() => db.modules.toArray());

  return (
    <section className={ModuleCSS.moduleList}>
      {modules?.map((module, i) => (
        <ModuleCard module={module} key={module.id} index={i} />
      ))}
    </section>
  );
}
