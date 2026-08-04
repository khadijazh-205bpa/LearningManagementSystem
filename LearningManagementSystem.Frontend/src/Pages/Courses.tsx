import { useState, useEffect } from 'react'
import type { Category, Course } from '../types'
import { decodeToken } from '../types'
import { getCategories, getCourses, enrollInCourse } from '../services/api'
import Navbar from '../components/Navbar'
import CategoryFilter from '../components/CategoryFilter'
import CourseCard from '../components/CourseCard'

interface CoursesProps {
    token: string
    onLogout: () => void
    onOpenCourse: (course: Course) => void
    onOpenAdmin: () => void
}

function Courses({ token, onLogout, onOpenCourse, onOpenAdmin }: CoursesProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
    const [message, setMessage] = useState('')

    const decoded = decodeToken(token)
    const isAdmin = decoded?.role === 'Admin'
    console.log('Decoded token:', decoded)
    useEffect(() => {
        getCategories(token).then(setCategories).catch((err) => console.error(err))
        getCourses(token).then(setCourses).catch((err) => console.error(err))
    }, [token])

    const handleEnroll = async (courseId: number) => {
        try {
            await enrollInCourse(token, courseId)
            setMessage('Kursa uğurla yazıldın!')
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    const filteredCourses = selectedCategoryId
        ? courses.filter((c) => c.categoryId === selectedCategoryId)
        : courses

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
            <Navbar onLogout={onLogout} />

            {isAdmin && (
                <div style={{ marginBottom: 20 }}>
                    <button onClick={onOpenAdmin} style={{ background: '#333', color: 'white', padding: '8px 16px' }}>
                        🛠️ Admin Panel
                    </button>
                </div>
            )}

            {message && <p style={{ fontWeight: 'bold', color: 'green' }}>{message}</p>}

            <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onOpen={onOpenCourse} onEnroll={handleEnroll} />
                ))}
                {filteredCourses.length === 0 && <p>Kurs tapılmadı.</p>}
            </div>
        </div>
    )
}

export default Courses