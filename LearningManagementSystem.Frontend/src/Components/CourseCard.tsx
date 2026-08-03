import type { Course } from '../types'

interface CourseCardProps {
    course: Course
    onOpen: (course: Course) => void
    onEnroll: (courseId: number) => void
}

function CourseCard({ course, onOpen, onEnroll }: CourseCardProps) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3 style={{ cursor: 'pointer' }} onClick={() => onOpen(course)}>
                {course.title}
            </h3>
            <p>{course.description}</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onOpen(course)}>Dərslərə bax</button>
                <button onClick={() => onEnroll(course.id)}>Kursa yazıl</button>
            </div>
        </div>
    )
}

export default CourseCard