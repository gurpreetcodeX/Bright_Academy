import { motion } from 'framer-motion'
import Courses from './Courses'
import { courses, CONTACT_EMAIL } from './data'
import StudentDashboard from './StudentDashboard'
import StudentAuth from './StudentAuth'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Menu,
  Star,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  ['Courses', '/courses'],
  ['Reviews', '/#reviews'],
  ['About us', '/#about'],
  ['Contact', '/#contact'],
]

const reviews = [
  { name: 'Aarav Sharma', course: 'Academic Coaching', review: 'The learning environment is encouraging, and difficult topics become easier to understand.', initials: 'AS' },
  { name: 'Priya Verma', course: 'Digital Skills', review: 'The practical approach helped me feel more confident using computers and digital tools.', initials: 'PV' },
  { name: 'Rohan Singh', course: 'Personality Development', review: 'I learned to communicate more confidently and organise my thoughts better.', initials: 'RS' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const phone = form.get('phone')
    const course = form.get('course')
    const message = form.get('message') || 'No additional message'

    const subject = encodeURIComponent(`Admission enquiry - ${course}`)
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nCourse: ${course}\nMessage: ${message}`,
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }
       let loggedIn = false
     try { loggedIn = Boolean(localStorage.getItem('ba_token')) } catch { /* storage blocked */ }
     const links = [...navLinks, loggedIn ? ['Student dashboard', '/student-dashboard'] : ['Student login', '/student-login']]  
  const isCoursesPage = window.location.pathname === '/courses'
  if (isCoursesPage) return <Courses />
  if (window.location.pathname === '/student-dashboard') return <StudentDashboard />
  if (window.location.pathname === '/student-login' || window.location.pathname === '/student-register') return <StudentAuth />
  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9f6] text-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="text-2xl font-black tracking-tight">
          bright<span className="text-orange-500">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
         {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-slate-600 transition hover:text-orange-500">{label}</a>
          ))}
        </div>

        <a href="#admission" className="hidden items-center gap-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 sm:inline-flex">
          Enquire now <ArrowUpRight size={16} />
        </a>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" aria-label="Toggle menu">
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-col gap-4 border-t border-slate-200 px-6 py-5 md:hidden"
        >
         {[...links, ['Admission enquiry', '#admission']].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </motion.div>
      )}

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              Your future starts here
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Learn today.
              <span className="mt-2 block text-orange-500">Lead tomorrow.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Great learning changes everything. Build confidence, master new
              skills and take the next step towards your dream.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#courses" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600">
                Explore courses <ArrowUpRight size={18} />
              </a>
              <a href="#admission" className="rounded-full border border-slate-300 px-7 py-4 font-semibold transition hover:border-slate-900">
                Join Bright
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-slate-200 pt-7">
              {[
                ['3', 'Core programs'],
                ['Flexible', 'Batch timings'],
                ['Beginner', 'Friendly teaching'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-3 -top-3 h-28 w-28 rounded-full bg-orange-200/70 blur-2xl"
            />

            <div className="relative rounded-[2rem] bg-[#f0e9dd] p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">THE LEARNING SPACE</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs">01 / 03</span>
              </div>

              <div className="my-8 flex min-h-64 items-center justify-center rounded-2xl bg-[#e4d5c1] p-6">
                <motion.div
                  animate={{ rotate: [-3, -1, -3], y: [0, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Think bigger</p>
                  <h2 className="mt-4 text-4xl font-black leading-tight">Your next chapter starts now.</h2>
                  <div className="mt-6 h-2 w-20 rounded-full bg-orange-500" />
                  <img src="/learning.svg" alt="Books and a graduation cap" className="mt-5 h-24 w-auto" />
                </motion.div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-lg font-bold">Curiosity meets opportunity.</p>
                  <p className="mt-1 text-sm text-slate-600">A better way to learn.</p>
                </div>
                <Star className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="courses" className="scroll-mt-8 bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Explore our courses</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Find the right path for you.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Explore learning options designed to help you build knowledge, practical skills and confidence.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => {
                const Icon = course.icon

                return (
                  <motion.article
                    key={course.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ y: -7 }}
                    className="flex flex-col border border-slate-200 p-7 transition-colors hover:border-orange-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest text-orange-500">{course.category}</span>
                      <span className="flex h-12 w-12 items-center justify-center bg-orange-50 text-orange-500">
                        <Icon size={24} />
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{course.title}</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-600">{course.description}</p>
                    <p className="mt-5 text-sm text-slate-500">{course.duration}</p>
                    <a href="#admission" className="mt-6 inline-flex items-center gap-2 font-bold transition hover:text-orange-500">
                      Enquire about this course <ArrowRight size={17} />
                    </a>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Why Bright</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-5xl">Education should open doors, not create limits.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
              We believe every learner deserves thoughtful guidance, practical knowledge and an environment where asking questions is encouraged.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                'Supportive learning environment',
                'Practical, skill-focused learning',
                'Guidance for your learning goals',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border border-slate-200 p-5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-orange-500" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="reviews" className="scroll-mt-8 bg-[#f0e9dd] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Learner experiences</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Every learner has a story.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                A welcoming learning experience starts with guidance, encouragement and room to improve.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.article
                  key={review.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.12 }}
                  className="bg-white p-7"
                >
                  <div className="flex gap-1 text-orange-500" aria-label="Illustrative rating">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="mt-5 leading-7 text-slate-700">“{review.review}”</p>
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{review.course}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">Sample testimonials shown for layout purposes.</p>
          </div>
        </section>

        <section id="admission" className="scroll-mt-8 mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Admissions</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Your next chapter starts here.</h2>
              <p className="mt-5 max-w-lg leading-7 text-slate-600">
                Interested in joining Bright Academy? Send an enquiry with your details and preferred course.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Tell us which course interests you.',
                  'Share your contact details.',
                  'We can discuss your learning goals.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-orange-500" size={20} />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-slate-200 bg-white p-6 sm:p-8"
            >
              <h3 className="text-2xl font-black">Admission enquiry</h3>
              <p className="mt-2 text-sm text-slate-500">Fill in the details below to prepare your enquiry email.</p>

              <div className="mt-7 space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">Full name</label>
                  <input id="name" name="name" required autoComplete="name" placeholder="Enter your full name" className="w-full border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500" />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold">Phone number</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" className="w-full border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500" />
                </div>

                <div>
                  <label htmlFor="course" className="mb-2 block text-sm font-semibold">Choose a course</label>
                  <select id="course" name="course" required defaultValue="" className="w-full border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500">
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => <option key={course.title} value={course.title}>{course.title}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold">Message (optional)</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us what you would like to learn..." className="w-full resize-y border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500" />
                </div>

                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 bg-orange-500 px-6 py-4 font-semibold text-white transition hover:bg-orange-600">
                  Prepare enquiry <ArrowUpRight size={18} />
                </button>

                {submitted && (
                  <p role="status" className="text-sm text-slate-600">
                    Your email app should open if one is configured. Send the prepared email to complete your enquiry.
                  </p>
                )}
                <p className="text-xs leading-5 text-slate-500">
                  This form opens your email app with the details filled in, so you can send them to the academy.
                </p>
              </div>
            </motion.form>
          </div>
        </section>

        <section id="contact" className="mx-6 mb-12 rounded-3xl bg-slate-900 px-6 py-14 text-center text-white sm:mx-auto sm:max-w-7xl sm:px-12 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">Your next step</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-5xl">Ready to make your next move?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
            Explore a course and get in touch to discuss your learning goals.
          </p>
          <a href="#admission" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-semibold text-white transition hover:bg-orange-600">
            Start an enquiry <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bright Academy. Portfolio concept project: content is sample text.
      </footer>
    </div>
  )
}

export default App