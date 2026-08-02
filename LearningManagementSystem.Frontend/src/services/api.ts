import type { Category, Course, Lesson } from '../types'

const API_URL = 'https://localhost:7023/api'

// ============ AUTH ============

export async function registerUser(data: {
  fullName: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}): Promise<string> {
  const res = await fetch(`${API_URL}/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(text)
  return text
}

export async function loginUser(data: { email: string; password: string }): Promise<string> {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(text)
  return text
}

// ============ CATEGORY ============

export async function getCategories(token: string): Promise<Category[]> {
  const res = await fetch(`${API_URL}/Category`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Kateqoriyalar yüklənmədi')
  return res.json()
}

// ============ COURSE ============

export async function getCourses(token: string): Promise<Course[]> {
  const res = await fetch(`${API_URL}/Course`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Kurslar yüklənmədi')
  return res.json()
}

// ============ LESSON ============

export async function getLessonsByCourse(token: string, courseId: number): Promise<Lesson[]> {
  const res = await fetch(`${API_URL}/Lesson`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Dərslər yüklənmədi')
  const data: Lesson[] = await res.json()
  return data.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order)
}

// ============ ENROLLMENT ============

export async function enrollInCourse(token: string, courseId: number): Promise<void> {
  const res = await fetch(`${API_URL}/Enrollment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text)
  }
}