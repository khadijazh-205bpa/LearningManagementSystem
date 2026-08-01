import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://localhost:7023/api'

interface Category {
    id: number
    name: string
}

interface Course {
    id: number
    title: string
    description: string
    level: number
    categoryId: number
}

function App() {
    const [token, setToken] = useState<string>('')
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
    const [message, setMessage] = useState('')

    // Auth sahələri
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // Dashboard state
    const [categories, setCategories] = useState<Category[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

    // Login olandan sonra data çək
    useEffect(() => {
        if (!token) return

        fetch(`${API_URL}/Category`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Category error:', err))

        fetch(`${API_URL}/Course`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error('Course error:', err))
    }, [token])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('Göndərilir...')
        try {
            const res = await fetch(`${API_URL}/Auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    userName,
                    email: registerEmail,
                    password,
                    confirmPassword,
                }),
            })
            const data = await res.text()
            if (res.ok) {
                setMessage('Qeydiyyat uğurlu oldu! İndi giriş et.')
                setAuthMode('login')
            } else {
                setMessage('Xəta: ' + data)
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('Giriş edilir...')
        try {
            const res = await fetch(`${API_URL}/Auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            })
            const data = await res.text()
            if (res.ok) {
                setToken(data)
                setMessage('')
            } else {
                setMessage('Xəta: ' + data)
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    const handleLogout = () => {
        setToken('')
        setCategories([])
        setCourses([])
        setMessage('')
    }

    const handleEnroll = async (courseId: number) => {
        try {
            const res = await fetch(`${API_URL}/Enrollment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ courseId }),
            })
            if (res.ok) {
                setMessage('Kursa uğurla yazıldın!')
            } else {
                const data = await res.text()
                setMessage('Xəta: ' + data)
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    // ============ LOGIN/REGISTER EKRANI ============
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

    // ============ DASHBOARD (LOGIN-DƏN SONRA) ============
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
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button onClick={() => handleEnroll(course.id)}>Kursa yazıl</button>
                    </div>
                ))}
                {filteredCourses.length === 0 && <p>Kurs tapılmadı.</p>}
            </div>
        </div>
    )
}

export default App