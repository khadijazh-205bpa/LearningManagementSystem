import { useState, useEffect } from 'react'
import './App.css'
import type { Category, Course, Lesson } from './types'
import { registerUser, loginUser, getCategories, getCourses, getLessonsByCourse, enrollInCourse } from './services/api'

function App() {
  const [token, setToken] = useState<string>('')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [message, setMessage] = useState('')

  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [categories, setCategories] = useState<Category[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [lessonsLoading, setLessonsLoading] = useState(false)

  useEffect(() => {
    if (!token) return
    getCategories(token).then(setCategories).catch((err) => console.error(err))
    getCourses(token).then(setCourses).catch((err) => console.error(err))
  }, [token])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Göndərilir...')
    try {
      await registerUser({ fullName, userName, email: registerEmail, password, confirmPassword })
      setMessage('Qeydiyyat uğurlu oldu! İndi giriş et.')
      setAuthMode('login')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setMessage('Xəta: ' + errorMessage)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Giriş edilir...')
    try {
      const newToken = await loginUser({ email: loginEmail, password: loginPassword })
      setToken(newToken)
      setMessage('')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setMessage('Xəta: ' + errorMessage)
    }
  }

  const handleLogout = () => {
    setToken('')
    setCategories([])
    setCourses([])
    setSelectedCourse(null)
    setLessons([])
    setMessage('')
  }

  const handleEnroll = async (courseId: number) => {
    try {
      await enrollInCourse(token, courseId)
      setMessage('Kursa uğurla yazıldın!')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setMessage('Xəta: ' + errorMessage)
    }
  }

  const handleOpenCourse = async (course: Course) => {
    setSelectedCourse(course)
    setLessons([])
    setLessonsLoading(true)
    try {
      const data = await getLessonsByCourse(token, course.id)
      setLessons(data)
    } catch (err: unknown) {
      console.error(err)
    } finally {
      setLessonsLoading(false)
    }
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    setLessons([])
  }

  if (!token) {
    return (
      <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
        <h1>{authMode === 'login' ? 'Giriş' : 'Qeydiyyat'}</h1>

        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setAuthMode('login')} disabled={authMode === 'login'}>
            Giriş
          </button>
          <button onClick={() => setAuthMode('register')} disabled={authMode === 'register'} style={{ marginLeft: 10 }}>
            Qeydiyyat
          </button>
        </div>

        {authMode === 'register' ? (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input placeholder="İstifadəçi adı" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <input placeholder="Email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
            <input placeholder="Şifrə" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input placeholder="Şifrəni təsdiqlə" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Qeydiyyatdan keç</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input placeholder="Email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input placeholder="Şifrə" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            <button type="submit">Giriş et</button>
          </form>
        )}

        {message && <p style={{ marginTop: 20, fontWeight: 'bold' }}>{message}</p>}
      </div>
    )
  }

  if (selectedCourse) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
        <button onClick={handleBackToCourses} style={{ marginBottom: 20 }}>
          ← Geri
        </button>
        <h1>{selectedCourse.title}</h1>
        <p>{selectedCourse.description}</p>

        <h2 style={{ marginTop: 30 }}>Dərslər</h2>
        {lessonsLoading && <p>Yüklənir...</p>}
        {!lessonsLoading && lessons.length === 0 && <p>Bu kursda hələ dərs yoxdur.</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lessons.map((lesson) => (
            <div key={lesson.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
              <h3>
                {lesson.order}. {lesson.title}
              </h3>
              <p>{lesson.content}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const filteredCourses = selectedCategoryId
    ? courses.filter((c) => c.categoryId === selectedCategoryId)
    : courses

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Kurslar</h1>
        <button onClick={handleLogout}>Çıxış</button>
      </div>

      {message && <p style={{ fontWeight: 'bold', color: 'green' }}>{message}</p>}

      <div style={{ marginBottom: 20 }}>
        <strong>Kateqoriyalar: </strong>
        <button onClick={() => setSelectedCategoryId(null)} style={{ marginRight: 5 }}>
          Hamısı
        </button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategoryId(cat.id)} style={{ marginRight: 5 }}>
            {cat.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3 style={{ cursor: 'pointer' }} onClick={() => handleOpenCourse(course)}>
              {course.title}
            </h3>
            <p>{course.description}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => handleOpenCourse(course)}>Dərslərə bax</button>
              <button onClick={() => handleEnroll(course.id)}>Kursa yazıl</button>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && <p>Kurs tapılmadı.</p>}
      </div>
    </div>
  )
}

export default App