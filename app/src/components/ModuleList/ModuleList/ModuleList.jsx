import PropTypes from 'prop-types';
import ModuleCard from '../ModuleCard/ModuleCard';
import ModuleCSS from './ModuleCSS.module.css';

export default function ModuleList({ modulesData }) {
    const classData = modulesData.map((module) => {
        return <ModuleCard key={crypto.randomUUID()} module={module} />
        })

    return (
        <section className={ModuleCSS.moduleList}>
            {classData}
        </section>
    )
}

ModuleList.propTypes = {
    modulesData: PropTypes.array.isRequired
};
