import { useState, useEffect } from 'react'
import type { Course } from '../types'
import { decodeToken } from '../types'
import { getCourses, getMyEnrollments } from '../services/api'

interface MyCoursesProps {
    token: string
    onBack: () => void
    onOpenCourse: (course: Course) => void
}

function MyCourses({ token, onBack, onOpenCourse }: MyCoursesProps) {
    const [myCourses, setMyCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const decoded = decodeToken(token)
        const myId = decoded?.userId

        Promise.all([getCourses(token), getMyEnrollments(token)])
            .then(([allCourses, enrollments]) => {
                const myEnrollments = enrollments.filter((e) => e.studentId === myId)
                const courseIds = myEnrollments.map((e) => e.courseId)
                const filtered = allCourses.filter((c) => courseIds.includes(c.id))
                setMyCourses(filtered)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [token])

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
            <button onClick={onBack} style={{ marginBottom: 20 }}>← Geri</button>
            <h1>Mənim Kurslarım</h1>

            {loading && <p>Yüklənir...</p>}
            {!loading && myCourses.length === 0 && <p>Hələ heç bir kursa yazılmamısan.</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                {myCourses.map((course) => (
                    <div key={course.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, cursor: 'pointer' }} onClick={() => onOpenCourse(course)}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyCourses