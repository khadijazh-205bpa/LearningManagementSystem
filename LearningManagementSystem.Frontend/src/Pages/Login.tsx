import { useState } from 'react'
import { loginUser } from '../services/api'

interface LoginProps {
    onLoginSuccess: (token: string) => void
    onSwitchToRegister: () => void
}

function Login({ onLoginSuccess, onSwitchToRegister }: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const token = await loginUser({ email, password })
            onLoginSuccess(token)
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
                <h1 style={{ textAlign: 'center', fontSize: 28 }}>Xoş gəldin</h1>
                <p style={{ textAlign: 'center', marginTop: -8, marginBottom: 24 }}>Hesabına daxil ol</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    <button disabled style={{ flex: 1 }}>Giriş</button>
                    <button onClick={onSwitchToRegister} style={{ flex: 1, background: '#3a3540' }}>
                        Qeydiyyat
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                    <button type="submit" className="btn-bright-red" disabled={loading}>
                        {loading ? 'Giriş edilir...' : 'Giriş et'}
                    </button>
                </form>

                {message && <p style={{ marginTop: 16, color: '#ff5757', fontWeight: 600, textAlign: 'center' }}>{message}</p>}
            </div>
        </div>
    )
}

export default Login