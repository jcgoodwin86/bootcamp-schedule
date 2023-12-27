import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './ChapterCardCSS.module.css';
import LessonCard from '../LessonCard/LessonCard';

export default function ChapterCard({ chapter, isChapterHidden }) {
    const [isLessonsHidden, setIsLessonsHidden] = useState(true);

    function handleClick(event) {
        event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing ModuleCard from being clicked.
        setIsLessonsHidden(prevState => !prevState);
    }


    return (
        <div className={isChapterHidden ? 'hidden' : styles.chapterCardContainer} onClick={handleClick}>
            <div className={styles.chapterCard}>
                <h3>{chapter.title}</h3>
                <div className={styles.metaData}>
                    <p>{chapter.totalLessons}</p>
                    <p>{chapter.totalTime}</p>
                </div>
            </div>

            {chapter.lessons.map((lesson) => {
                return <LessonCard key={crypto.randomUUID()} lesson={lesson} isLessonsHidden={isLessonsHidden}/>
            })}
        </div>
    )
}

ChapterCard.propTypes = {
    chapter: PropTypes.object.isRequired,
    isChapterHidden: PropTypes.bool.isRequired,
};
