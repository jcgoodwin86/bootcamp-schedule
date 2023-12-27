import PropTypes from 'prop-types';
import { useState } from 'react';
import ChapterCard from '../ChapterCard/ChapterCard';
import style from './ModuleCardCSS.module.css';

export default function ModuleCard({ module }) {

    const [isChapterHidden, setIsChapterHidden] = useState(true);

    function handleClick() {
        setIsChapterHidden(prevState => !prevState);
    }

    return (
        <div  onClick={handleClick}>
            <div className={style.moduleCard}>
                <h2>{module.title}</h2>
                <div className={style.metaData}>
                    <p>{module.module}</p>
                    <p>{module.totalLessons}</p>
                    <p>{module.totalTime}</p>
                </div>
            </div>
            
            {module.chapters.map((chapter) => {
                    return <ChapterCard key={crypto.randomUUID()} chapter={chapter} isChapterHidden={isChapterHidden}/>
                })
            }
        </div>
    )
}

ModuleCard.propTypes = {
    module: PropTypes.object.isRequired
};
