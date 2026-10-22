import { useState } from 'react'
import { ArrowLeft, BookOpen, Eye, EyeOff, GraduationCap, LoaderCircle, LockKeyhole, Mail, UserRound } from 'lucide-react'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

export default function StudentAuth() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); setError('') }

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const response = await fetch(`${API}/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Could not connect. Check that the Bright Academy backend is running.')
      localStorage.setItem('ba_token', data.token)
      localStorage.setItem('ba_student', JSON.stringify(data.student))
      window.location.href = '/student-dashboard'
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally { setBusy(false) }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-slate-900 lg:grid lg:grid-cols-[1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <a href="/" className="relative z-10 inline-flex w-fit items-center gap-2 text-2xl font-black">bright<span className="text-orange-400">.</span></a>
        <div className="relative z-10 max-w-xl py-16">
          <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-orange-300"><GraduationCap size={16}/> Bright Academy Student Portal</span>
          <h1 className="mt-7 text-5xl font-black leading-tight xl:text-6xl">Your next chapter starts <span className="text-orange-400">here.</span></h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">Pick up where you left off, track your progress and keep moving towards your goals.</p>
          <div className="mt-10 grid grid-cols-2 gap-3"><div className="border border-white/10 bg-white/5 p-5"><BookOpen className="text-orange-400"/><p className="mt-4 font-bold">Learn at your pace</p><p className="mt-1 text-sm text-slate-400">Your learning, organised.</p></div><div className="border border-white/10 bg-white/5 p-5"><LockKeyhole className="text-orange-400"/><p className="mt-4 font-bold">Your own account</p><p className="mt-1 text-sm text-slate-400">Private student profile.</p></div></div>
        </div>
        <p className="relative z-10 text-sm text-slate-500">Learn today. Lead tomorrow.</p>
        <div className="pointer-events-none absolute -right-28 top-1/4 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <a href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"><ArrowLeft size={16}/> Back to website</a>
          <div className="mb-8 lg:hidden"><a href="/" className="text-2xl font-black">bright<span className="text-orange-500">.</span></a></div>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-orange-600">Student portal</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{mode === 'login' ? 'Welcome back.' : 'Create your account.'}</h2>
          <p className="mt-3 leading-7 text-slate-500">{mode === 'login' ? 'Sign in to continue your learning journey.' : 'Join Bright Academy and start tracking your learning.'}</p>
          <div className="mt-8 grid grid-cols-2 border border-slate-200 bg-white p-1"><button type="button" onClick={() => {setMode('login');setError('')}} className={`py-3 text-sm font-bold ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Sign in</button><button type="button" onClick={() => {setMode('register');setError('')}} className={`py-3 text-sm font-bold ${mode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Create account</button></div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === 'register' && <label className="block"><span className="mb-2 block text-sm font-semibold">Full name</span><span className="flex items-center gap-3 border border-slate-200 bg-white px-4 focus-within:border-orange-500"><UserRound size={18} className="text-slate-400"/><input required name="name" value={form.name} onChange={change} autoComplete="name" placeholder="Your full name" className="w-full py-3.5 outline-none"/></span></label>}
            <label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><span className="flex items-center gap-3 border border-slate-200 bg-white px-4 focus-within:border-orange-500"><Mail size={18} className="text-slate-400"/><input required type="email" name="email" value={form.email} onChange={change} autoComplete="email" placeholder="you@example.com" className="w-full py-3.5 outline-none"/></span></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">Password</span><span className="flex items-center gap-3 border border-slate-200 bg-white px-4 focus-within:border-orange-500"><LockKeyhole size={18} className="text-slate-400"/><input required minLength={8} type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={change} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" className="w-full py-3.5 outline-none"/><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label>
            {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70">{busy && <LoaderCircle size={18} className="animate-spin"/>}{busy ? 'Please wait…' : mode === 'login' ? 'Sign in to dashboard' : 'Create student account'}</button>
          </form>
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">Your student account is stored securely by Bright Academy.</p>
        </div>
      </section>
    </main>
  )
}
