import PropTypes from 'prop-types';
import styles from './LessonCardCSS.module.css';

export default function LessonCard({ lesson, isLessonsHidden }) {
    return (
        <div className={isLessonsHidden ?  'hidden' : ''}>
            <div className={styles.lessonCard}>
                <h4>{lesson.title}</h4>
                <p>{lesson.time}</p>
            </div>
        </div>
    )
}

LessonCard.propTypes = {
    lesson: PropTypes.object.isRequired,
    isLessonsHidden: PropTypes.bool.isRequired,
}