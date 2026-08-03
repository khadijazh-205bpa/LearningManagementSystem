import { useState } from 'react'
import './App.css'
import type { Course } from './types'
import Login from './pages/Login'
import Register from './pages/Register'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'

function App() {
    const [token, setToken] = useState<string>('')
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    const handleLogout = () => {
        setToken('')
        setSelectedCourse(null)
    }

    if (!token) {
        if (authMode === 'login') {
            return (
                <Login
                    onLoginSuccess={(newToken) => setToken(newToken)}
                    onSwitchToRegister={() => setAuthMode('register')}
                />
            )
        }
        return (
            <Register
                onRegisterSuccess={() => setAuthMode('login')}
                onSwitchToLogin={() => setAuthMode('login')}
            />
        )
    }

    if (selectedCourse) {
        return (
            <CourseDetails
                token={token}
                course={selectedCourse}
                onBack={() => setSelectedCourse(null)}
            />
        )
    }

    return (
        <Courses token={token} onLogout={handleLogout} onOpenCourse={setSelectedCourse} />
    )
}

export default App