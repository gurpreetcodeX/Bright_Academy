import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, Clock3, GraduationCap, LogOut, RefreshCw, UserRound, PlayCircle, AlertCircle } from 'lucide-react'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')
const token = () => localStorage.getItem('ba_token')

export default function StudentDashboard() {
  const [student, setStudent] = useState(() => { try { return JSON.parse(localStorage.getItem('ba_student') || 'null') } catch { return null } })
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyCourse, setBusyCourse] = useState('')

  const loadDashboard = useCallback(async () => {
    if (!token()) { window.location.href = '/student-login'; return }
    setLoading(true); setError('')
    try {
      const response = await fetch(`${API}/student/me`, { headers: { Authorization: `Bearer ${token()}` } })
      const data = await response.json().catch(() => ({}))
      if (response.status === 401) { localStorage.removeItem('ba_token'); localStorage.removeItem('ba_student'); window.location.href = '/student-login'; return }
      if (!response.ok) throw new Error(data.message || 'Could not load your dashboard.')
      setStudent(data.student); setCourses(data.student.courses || [])
      localStorage.setItem('ba_student', JSON.stringify(data.student))
    } catch (err) { setError(`${err.message} Make sure the backend is running and MongoDB is connected.`) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadDashboard() }, [loadDashboard])

  const completed = useMemo(() => courses.reduce((sum, course) => sum + (course.completedLessons || 0), 0), [courses])
  const totalLessons = useMemo(() => courses.reduce((sum, course) => sum + (course.totalLessons || 0), 0), [courses])
  const progress = totalLessons ? Math.round((completed / totalLessons) * 100) : 0

  async function markLesson(courseId) {
    setBusyCourse(courseId); setError('')
    try {
      const response = await fetch(`${API}/student/courses/${courseId}/complete-lesson`, { method: 'POST', headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' } })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Could not update lesson progress.')
      setStudent(data.student); setCourses(data.student.courses || []); localStorage.setItem('ba_student', JSON.stringify(data.student))
    } catch (err) { setError(err.message) } finally { setBusyCourse('') }
  }

  function logout() { localStorage.removeItem('ba_token'); localStorage.removeItem('ba_student'); window.location.href = '/student-login' }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900">
      <nav className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><a href="/" className="text-2xl font-black">bright<span className="text-orange-500">.</span></a><div className="flex items-center gap-4"><a href="/" className="hidden items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600 sm:flex"><ArrowLeft size={16}/> Website</a><button onClick={logout} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-orange-300 hover:text-orange-600"><LogOut size={16}/> Sign out</button></div></div></nav>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-orange-600">Student portal</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Welcome{student?.name ? `, ${student.name.split(' ')[0]}` : ' back'}.</h1><p className="mt-2 text-slate-500">Every small step moves you forward.</p></div><div className="flex items-center gap-3 border border-slate-200 bg-white p-3"><div className="flex h-11 w-11 items-center justify-center bg-orange-50 text-orange-600"><UserRound size={22}/></div><div className="min-w-0"><p className="max-w-[210px] truncate font-bold">{student?.name || 'Student'}</p><p className="max-w-[210px] truncate text-xs text-slate-500">{student?.email || 'Your Bright Academy account'}</p></div></div></motion.div>

        {error && <div role="alert" className="mt-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"><AlertCircle className="mt-0.5 shrink-0" size={18}/><div className="flex-1">{error}<button onClick={loadDashboard} className="ml-2 inline-flex items-center gap-1 font-bold underline"><RefreshCw size={13}/> Retry</button></div></div>}

        {loading ? <div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="h-32 animate-pulse bg-white"/><div className="h-32 animate-pulse bg-white"/><div className="h-32 animate-pulse bg-white"/></div> : <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">{[{ label: 'My courses', value: String(courses.length).padStart(2, '0'), icon: BookOpen, detail: 'Courses on your learning plan' }, { label: 'Lessons completed', value: `${completed}${totalLessons ? ` / ${totalLessons}` : ''}`, icon: CheckCircle2, detail: `${progress}% overall completion` }, { label: 'Learning progress', value: `${progress}%`, icon: GraduationCap, detail: 'Keep up your momentum' }].map((stat, index) => { const Icon = stat.icon; return <motion.article key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }} className="border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{stat.label}</span><Icon size={20} className="text-orange-500"/></div><p className="mt-4 text-3xl font-black tracking-tight">{stat.value}</p><p className="mt-1 text-xs text-slate-400">{stat.detail}</p></motion.article> })}</div>

          <section className="mt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-orange-600">Your learning plan</p><h2 className="mt-2 text-2xl font-black">My courses</h2></div><a href="/courses" className="inline-flex items-center gap-2 text-sm font-bold hover:text-orange-600">Explore courses <ArrowUpRight size={16}/></a></div>
            {courses.length ? <div className="mt-5 grid gap-4 lg:grid-cols-2">{courses.map((course, index) => { const percent = course.totalLessons ? Math.round(course.completedLessons / course.totalLessons * 100) : 0; const finished = course.completedLessons >= course.totalLessons; return <motion.article key={course.id || course._id || course.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }} className="border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center bg-orange-50 text-orange-600"><BookOpen size={22}/></div><div className="min-w-0 flex-1"><h3 className="font-bold">{course.name}</h3><p className="mt-1 text-sm text-slate-500">{course.completedLessons} of {course.totalLessons} lessons completed</p></div><span className="text-sm font-bold text-orange-600">{percent}%</span></div><div className="mt-5 h-2 bg-slate-100"><div className="h-full bg-orange-500 transition-all" style={{ width: `${percent}%` }}/></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Clock3 size={14}/>{finished ? 'Course completed' : 'Continue at your pace'}</span><button disabled={busyCourse === course.id || finished} onClick={() => markLesson(course.id)} className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50">{finished ? <CheckCircle2 size={16}/> : <PlayCircle size={16} />}{busyCourse === course.id ? 'Saving…' : finished ? 'Completed' : 'Complete next lesson'}</button></div></motion.article> })}</div> : <div className="mt-5 border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><BookOpen className="mx-auto text-orange-500" size={30}/><h3 className="mt-4 text-lg font-bold">Your learning plan is ready to begin</h3><p className="mt-2 text-sm text-slate-500">Explore our courses and contact Bright Academy to get enrolled.</p><a href="/courses" className="mt-5 inline-flex items-center gap-2 bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Browse courses <ArrowUpRight size={16}/></a></div>}
          </section>
          <div className="mt-8 flex flex-col justify-between gap-4 bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:p-8"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-400">Stay consistent</p><h2 className="mt-2 text-xl font-black sm:text-2xl">A little progress each day adds up.</h2><p className="mt-2 text-sm text-slate-400">Your lesson progress is saved to your student account.</p></div><a href="/courses" className="inline-flex w-fit items-center gap-2 bg-orange-500 px-5 py-3 text-sm font-bold hover:bg-orange-600">Explore courses <ArrowUpRight size={16}/></a></div>
        </>}
      </div>
    </main>
  )
}
