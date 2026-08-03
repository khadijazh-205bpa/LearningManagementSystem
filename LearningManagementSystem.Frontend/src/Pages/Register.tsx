import { useState } from 'react'
import { registerUser } from '../services/api'

interface RegisterProps {
    onRegisterSuccess: () => void
    onSwitchToLogin: () => void
}

function Register({ onRegisterSuccess, onSwitchToLogin }: RegisterProps) {
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('Göndərilir...')
        try {
            await registerUser({ fullName, userName, email, password, confirmPassword })
            setMessage('Qeydiyyat uğurlu oldu! İndi giriş et.')
            onRegisterSuccess()
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h1>Qeydiyyat</h1>

            <div style={{ marginBottom: 20 }}>
                <button onClick={onSwitchToLogin}>Giriş</button>
                <button disabled style={{ marginLeft: 10 }}>
                    Qeydiyyat
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input placeholder="İstifadəçi adı" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input placeholder="Şifrə" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input placeholder="Şifrəni təsdiqlə" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Qeydiyyatdan keç</button>
            </form>

            {message && <p style={{ marginTop: 20, fontWeight: 'bold' }}>{message}</p>}
        </div>
    )
}

export default Register