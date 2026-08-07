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
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            await registerUser({ fullName, userName, email, password, confirmPassword })
            setMessage('✅ Qeydiyyat uğurlu oldu! İndi giriş et.')
            setTimeout(() => onRegisterSuccess(), 1000)
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div className="auth-card">
                <h1 style={{ textAlign: 'center', fontSize: 28 }}>Qeydiyyat</h1>
                <p style={{ textAlign: 'center', marginTop: -8, marginBottom: 24 }}>Yeni hesab yarat</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    <button onClick={onSwitchToLogin} style={{ flex: 1, background: '#3a3540' }}>
                        Giriş
                    </button>
                    <button disabled style={{ flex: 1 }}>Qeydiyyat</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <input placeholder="İstifadəçi adı" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div className="password-field">
                        <input
                            placeholder="Şifrə"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁️' : '🙈'}
                        </button>
                    </div>

                    <div className="password-field">
                        <input
                            placeholder="Şifrəni təsdiqlə"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                    <button type="submit" className="btn-bright-red" disabled={loading}>
                        {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
                    </button>
                </form>

                {message && (
                    <p style={{ marginTop: 16, color: message.startsWith('✅') ? '#4ade80' : '#ff5757', fontWeight: 600, textAlign: 'center' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Register