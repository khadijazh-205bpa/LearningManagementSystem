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