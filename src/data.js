import { BookOpen, GraduationCap, Star } from 'lucide-react'

export const CONTACT_EMAIL = 'hdheyddudjdj@gmail.com' // change the email in this one place

export const courses = [
  {
    number: '01',
    title: 'Academic Coaching',
    category: 'ACADEMICS',
    duration: 'Flexible batches',
    description: 'Strengthen your fundamentals, improve subject knowledge and prepare confidently for exams.',
    topics: ['Subject-wise learning', 'Concept clarification', 'Exam preparation'],
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Computer & Digital Skills',
    category: 'TECHNOLOGY',
    duration: 'Beginner friendly',
    description: 'Build practical computer knowledge and learn the digital skills used in everyday life.',
    topics: ['Computer fundamentals', 'Digital tools', 'Practical exercises'],
    icon: GraduationCap,
  },
  {
    number: '03',
    title: 'Personality Development',
    category: 'PERSONAL GROWTH',
    duration: 'Practical sessions',
    description: 'Develop communication, presentation and interpersonal skills to express yourself confidently.',
    topics: ['Communication skills', 'Confidence building', 'Presentation practice'],
    icon: Star,
  },
]
