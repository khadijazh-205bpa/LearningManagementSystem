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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('Giriş edilir...')
        try {
            const token = await loginUser({ email, password })
            onLoginSuccess(token)
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            setMessage('Xəta: ' + errorMessage)
        }
    }
        return (
        <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h1>Giriş</h1>

            <div style={{ marginBottom: 20 }}>
                <button disabled>Giriş</button>
                <button onClick={onSwitchToRegister} style={{ marginLeft: 10 }}>
                    Qeydiyyat
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input placeholder="Şifrə" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Giriş et</button>
            </form>

            {message && <p style={{ marginTop: 20, fontWeight: 'bold' }}>{message}</p>}
        </div>
    )
}

export default Login