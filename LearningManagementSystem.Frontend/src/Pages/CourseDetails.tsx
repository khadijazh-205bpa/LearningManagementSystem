import { useState, useEffect } from 'react'
import type { Course, Lesson } from '../types'
import { getLessonsByCourse } from '../services/api'
import LessonCard from '../components/LessonCard'

interface CourseDetailsProps {
    token: string
    course: Course
    onBack: () => void
}

function CourseDetails({ token, course, onBack }: CourseDetailsProps) {
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getLessonsByCourse(token, course.id)
            .then(setLessons)
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [token, course.id])

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
            <button onClick={onBack} style={{ marginBottom: 20 }}>
                ← Geri
            </button>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <h2 style={{ marginTop: 30 }}>Dərslər</h2>
            {loading && <p>Yüklənir...</p>}
            {!loading && lessons.length === 0 && <p>Bu kursda hələ dərs yoxdur.</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                ))}
            </div>
        </div>
    )
}

export default CourseDetails