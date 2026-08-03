import type { Lesson } from '../types'

interface LessonCardProps {
    lesson: Lesson
}

function LessonCard({ lesson }: LessonCardProps) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3>
                {lesson.order}. {lesson.title}
            </h3>
            <p>{lesson.content}</p>
        </div>
    )
}

export default LessonCard