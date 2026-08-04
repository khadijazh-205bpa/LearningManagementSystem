export interface Category {
  id: number
  name: string
}

export interface Course {
  id: number
  title: string
  description: string
  level: number
  categoryId: number
}

export interface Lesson {
  id: number
  title: string
  content: string
  order: number
  courseId: number
}
export function decodeToken(token: string): { role: string; userId: string; email: string } | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return {
            role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            userId: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        }
    } catch {
        return null
    }
}