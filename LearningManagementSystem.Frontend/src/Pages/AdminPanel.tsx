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

    const [tab, setTab] = useState<'category' | 'course' | 'lesson'>('category')
    const [categories, setCategories] = useState<Category[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [confirmDelete, setConfirmDelete] = useState<{ type: string; id: number; name: string } | null>(null)

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

    useEffect(() => {
        if (message) {
            const t = setTimeout(() => setMessage(''), 3000)
            return () => clearTimeout(t)
        }
    }, [message])

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createCategory(token, categoryName)
            setMessage('✅ Kateqoriya əlavə olundu!')
            setCategoryName('')
            loadAll()
        } catch (err: unknown) {
            setMessage('❌ Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/Course`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    title: courseTitle,
                    description: courseDescription,
                    level: courseLevel,
                    categoryId: courseCategoryId,
                    instructorId,
                }),
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('✅ Kurs əlavə olundu!')
            setCourseTitle('')
            setCourseDescription('')
            loadAll()
        } catch (err: unknown) {
            setMessage('❌ Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const handleAddLesson = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/Lesson`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    title: lessonTitle,
                    content: lessonContent,
                    order: lessonOrder,
                    courseId: lessonCourseId,
                }),
            })
            if (!res.ok) throw new Error(await res.text())
            setMessage('✅ Dərs əlavə olundu!')
            setLessonTitle('')
            setLessonContent('')
            loadAll()
        } catch (err: unknown) {
            setMessage('❌ Xəta: ' + (err instanceof Error ? err.message : String(err)))
        }
    }

    const performDelete = async () => {
        if (!confirmDelete) return
        const { type, id } = confirmDelete
        try {
            if (type === 'category') {
                await deleteCategory(token, id)
                setMessage('🗑️ Kateqoriya silindi!')
            } else if (type === 'course') {
                const res = await fetch(`${API_URL}/Course/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
                if (!res.ok) throw new Error(await res.text())
                setMessage('🗑️ Kurs silindi!')
            } else {
                const res = await fetch(`${API_URL}/Lesson/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
                if (!res.ok) throw new Error(await res.text())
                setMessage('🗑️ Dərs silindi!')
            }
            loadAll()
        } catch (err: unknown) {
            setMessage('❌ Xəta: ' + (err instanceof Error ? err.message : String(err)))
        } finally {
            setConfirmDelete(null)
        }
    }

    const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    const filteredLessons = lessons.filter((l) => l.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif', padding: 16 }}>
            <button onClick={onBack} style={{ marginBottom: 20 }}>← Geri</button>
            <h1 className="admin-title">Admin Panel</h1>

            {/* Statistik kartlar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, margin: '20px 0' }}>
                <div className="stat-card">
                    <div className="stat-number">{categories.length}</div>
                    <div className="stat-label">Kateqoriya</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{courses.length}</div>
                    <div className="stat-label">Kurs</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{lessons.length}</div>
                    <div className="stat-label">Dərs</div>
                </div>
            </div>

            {message && <div className="toast">{message}</div>}

            <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <button onClick={() => setTab('category')} disabled={tab === 'category'}>Kateqoriyalar</button>
                <button onClick={() => setTab('course')} disabled={tab === 'course'}>Kurslar</button>
                <button onClick={() => setTab('lesson')} disabled={tab === 'lesson'}>Dərslər</button>
                <input
                    placeholder="🔍 Axtar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginLeft:"auto", minWidth: 500, padding: '22px 24px', fontSize: 18 }}
                />
            </div>
           
            {tab === 'category' && (
                <div>
                    <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                        <input placeholder="Kateqoriya adı" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                        <button type="submit" className="btn-add">Əlavə et</button>
                    </form>
                    <div className="item-grid">
                        {filteredCategories.map((cat) => (
                            <div key={cat.id} className="item-card">
                                <span>{cat.name}</span>
                                <button className="btn-delete" onClick={() => setConfirmDelete({ type: 'category', id: cat.id, name: cat.name })}>Sil</button>
                            </div>
                        ))}
                        {filteredCategories.length === 0 && <p>Nəticə tapılmadı.</p>}
                    </div>
                </div>
            )}

            {tab === 'course' && (
                <div>
                    <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxWidth: 400 }}>
                        <input placeholder="Kurs adı" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
                        <textarea placeholder="Təsvir" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required />
                        <select value={courseLevel} onChange={(e) => setCourseLevel(Number(e.target.value))}>
                            <option value={0}>Başlanğıc</option>
                            <option value={1}>Orta</option>
                            <option value={2}>İrəli</option>
                        </select>
                        <select value={courseCategoryId} onChange={(e) => setCourseCategoryId(Number(e.target.value))} required>
                            <option value={0}>Kateqoriya seç</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn-add">Əlavə et</button>
                    </form>
                    <div className="item-grid">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="item-card">
                                <span>{course.title}</span>
                                <button className="btn-delete" onClick={() => setConfirmDelete({ type: 'course', id: course.id, name: course.title })}>Sil</button>
                            </div>
                        ))}
                        {filteredCourses.length === 0 && <p>Nəticə tapılmadı.</p>}
                    </div>
                </div>
            )}

            {tab === 'lesson' && (
                <div>
                    <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxWidth: 400 }}>
                        <select value={lessonCourseId} onChange={(e) => setLessonCourseId(Number(e.target.value))} required>
                            <option value={0}>Kurs seç</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                        <input placeholder="Dərs adı" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required />
                        <textarea placeholder="Məzmun" value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} required />
                        <input type="number" placeholder="Sıra" value={lessonOrder} onChange={(e) => setLessonOrder(Number(e.target.value))} required />
                        <button type="submit" className="btn-add">Əlavə et</button>
                    </form>
                    <div className="item-grid">
                        {filteredLessons.map((lesson) => (
                            <div key={lesson.id} className="item-card">
                                <span>{lesson.title}</span>
                                <button className="btn-delete" onClick={() => setConfirmDelete({ type: 'lesson', id: lesson.id, name: lesson.title })}>Sil</button>
                            </div>
                        ))}
                        {filteredLessons.length === 0 && <p>Nəticə tapılmadı.</p>}
                    </div>
                </div>
            )}

            {/* Silmə təsdiq pəncərəsi */}
            {confirmDelete && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Silmək istədiyinizə əminsiniz?</h3>
                        <p>"{confirmDelete.name}" həmişəlik silinəcək.</p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                            <button onClick={() => setConfirmDelete(null)}>Ləğv et</button>
                            <button className="btn-delete" onClick={performDelete}>Sil</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPanel