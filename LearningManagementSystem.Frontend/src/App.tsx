import { useState } from 'react'
import './App.css'

const API_URL = 'https://localhost:7023/api/Auth'

function App() {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')

    // Register sahələri
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Login sahələri
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('Göndərilir...')
        try {
            const res = await fetch(`${API_URL}/register`, {
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
                setMessage('Qeydiyyat uğurlu oldu! İndi giriş edə bilərsən.')
                setMode('login')
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
            const res = await fetch(`${API_URL}/login`, {
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
                setMessage('Giriş uğurlu oldu!')
            } else {
                setMessage('Xəta: ' + data)
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h1>{mode === 'login' ? 'Giriş' : 'Qeydiyyat'}</h1>

            <div style={{ marginBottom: 20 }}>
                <button onClick={() => setMode('login')} disabled={mode === 'login'}>
                    Giriş
                </button>
                <button onClick={() => setMode('register')} disabled={mode === 'register'} style={{ marginLeft: 10 }}>
                    Qeydiyyat
                </button>
            </div>

            {mode === 'register' ? (
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
            {token && (
                <div style={{ marginTop: 20, wordBreak: 'break-all', fontSize: 12, background: '#eee', padding: 10 }}>
                    <strong>Token:</strong> {token}
                </div>
            )}
        </div>
    )
}

export default App