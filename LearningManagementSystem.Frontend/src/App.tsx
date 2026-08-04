import { useState } from 'react'
import './App.css'
import type { Course } from './types'
import Login from './pages/Login'
import Register from './pages/Register'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import AdminPanel from './pages/AdminPanel'

function App() {
    const [token, setToken] = useState<string>('')
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [showAdmin, setShowAdmin] = useState(false)

    const handleLogout = () => {
        setToken('')
        setSelectedCourse(null)
        setShowAdmin(false)
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

    if (showAdmin) {
        return <AdminPanel token={token} onBack={() => setShowAdmin(false)} />
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
        <Courses
            token={token}
            onLogout={handleLogout}
            onOpenCourse={setSelectedCourse}
            onOpenAdmin={() => setShowAdmin(true)}
        />
    )
}

export default App