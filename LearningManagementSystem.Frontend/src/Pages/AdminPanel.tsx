import { useState, useEffect } from 'react'
import type { Category, Course, Lesson } from '../types'
import { decodeToken } from '../types'
import {
    getCategories,
    getCourses,
    createCategory,
    deleteCategory,
} from '../services/api'

const API_URL = 'https://localhost:7023/api'

interface AdminPanelProps {
    token: string
    onBack: () => void
}

function AdminPanel({ token, onBack }: AdminPanelProps) {
    const decoded = decodeToken(token)
    const instructorId = decoded?.userId || ''

    console.log('MY instructorId:', JSON.stringify(instructorId))
    console.log('MY decoded:', JSON.stringify(decoded))

    const [tab, setTab] = useState<'category' | 'course' | 'lesson'>('category')
    const [categories, setCategories] = useState<Category[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [message, setMessage] = useState('')

    const [categoryName, setCategoryName] = useState('')

    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseLevel, setCourseLevel] = useState(0)
    const [courseCategoryId, setCourseCategoryId] = useState(0)

    const [lessonTitle, setLessonTitle] = useState('')
    const [lessonContent, setLessonContent] = useState('')
    const [lessonOrder, setLessonOrder] = useState(1)
    const [lessonCourseId, setLessonCourseId] = useState(0)

    const loadAll = () => {
        getCategories(token).then(setCategories).catch(console.error)
        getCourses(token).then(setCourses).catch(console.error)
        fetch(`${API_URL}/Lesson`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => res.json())
            .then(setLessons)
            .catch(console.error)
    }

    useEffect(() => {
        loadAll()
    }, [])

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createCategory(token, categoryName)
            setMessage('Kateqoriya əlavə olundu!')
            setCategoryName('')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory(token, id)
            setMessage('Kateqoriya silindi!')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/Course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: courseTitle,
                    description: courseDescription,
                    level: courseLevel,
                    categoryId: courseCategoryId,
                    instructorId: instructorId,
                }),
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('Kurs əlavə olundu!')
            setCourseTitle('')
            setCourseDescription('')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleDeleteCourse = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/Course/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('Kurs silindi!')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleAddLesson = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/Lesson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: lessonTitle,
                    content: lessonContent,
                    order: lessonOrder,
                    courseId: lessonCourseId,
                }),
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('Dərs əlavə olundu!')
            setLessonTitle('')
            setLessonContent('')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleDeleteLesson = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/Lesson/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('Dərs silindi!')
            loadAll()
        } catch (err: unknown) {
            setMessage('Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
            <button onClick={onBack} style={{ marginBottom: 20 }}>
                ← Geri
            </button>
            <h1>Admin Panel</h1>

            {message && <p style={{ fontWeight: 'bold', color: 'green' }}>{message}</p>}

            <div style={{ marginBottom: 20 }}>
                <button onClick={() => setTab('category')} disabled={tab === 'category'}>
                    Kateqoriyalar
                </button>
                <button onClick={() => setTab('course')} disabled={tab === 'course'} style={{ marginLeft: 8 }}>
                    Kurslar
                </button>
                <button onClick={() => setTab('lesson')} disabled={tab === 'lesson'} style={{ marginLeft: 8 }}>
                    Dərslər
                </button>
            </div>

            {tab === 'category' && (
                <div>
                    <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                        <input
                            placeholder="Kateqoriya adı"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                        <button type="submit">Əlavə et</button>
                    </form>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {categories.map((cat) => (
                            <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', padding: 8, borderRadius: 6 }}>
                                <span>{cat.name}</span>
                                <button onClick={() => handleDeleteCategory(cat.id)}>Sil</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'course' && (
                <div>
                    <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxWidth: 400 }}>
                        <input
                            placeholder="Kurs adı"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Təsvir"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            required
                        />
                        <select value={courseLevel} onChange={(e) => setCourseLevel(Number(e.target.value))}>
                            <option value={0}>Başlanğıc</option>
                            <option value={1}>Orta</option>
                            <option value={2}>İrəli</option>
                        </select>
                        <select value={courseCategoryId} onChange={(e) => setCourseCategoryId(Number(e.target.value))} required>
                            <option value={0}>Kateqoriya seç</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Əlavə et</button>
                    </form>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {courses.map((course) => (
                            <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', padding: 8, borderRadius: 6 }}>
                                <span>{course.title}</span>
                                <button onClick={() => handleDeleteCourse(course.id)}>Sil</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'lesson' && (
                <div>
                    <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxWidth: 400 }}>
                        <select value={lessonCourseId} onChange={(e) => setLessonCourseId(Number(e.target.value))} required>
                            <option value={0}>Kurs seç</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                        <input
                            placeholder="Dərs adı"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Məzmun"
                            value={lessonContent}
                            onChange={(e) => setLessonContent(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Sıra"
                            value={lessonOrder}
                            onChange={(e) => setLessonOrder(Number(e.target.value))}
                            required
                        />
                        <button type="submit">Əlavə et</button>
                    </form>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {lessons.map((lesson) => (
                            <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', padding: 8, borderRadius: 6 }}>
                                <span>{lesson.title}</span>
                                <button onClick={() => handleDeleteLesson(lesson.id)}>Sil</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPanel            