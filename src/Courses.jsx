import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { courses, CONTACT_EMAIL } from './data'


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Courses() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-2xl font-black tracking-tight">
          bright<span className="text-orange-500">.</span>
        </a>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-orange-500">
          <ArrowLeft size={17} /> Back to home
        </a>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Learn something new
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Find the course that moves you <span className="text-orange-500">forward.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore our learning options, discover what you can learn and enquire
            about the course that matches your goals.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon

            return (
              <motion.article
                key={course.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="flex flex-col border border-slate-200 bg-white p-7 transition-colors hover:border-orange-300 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-orange-500">
                    {course.number} / {course.category}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center bg-orange-50 text-orange-500">
                    <Icon size={24} />
                  </span>
                </div>

                <h2 className="mt-7 text-2xl font-black">{course.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {course.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="mb-3 text-sm font-bold">What you'll explore</p>
                  <ul className="space-y-3">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} />
                  {course.duration}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500">Course fees</p>
                  <p className="mt-1 text-xl font-black">Contact for fees</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry: ${course.title}`)}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Enquire now <ArrowUpRight size={18} />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="mx-6 mb-12 bg-slate-900 px-6 py-12 text-center text-white sm:mx-auto sm:max-w-7xl sm:px-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
          Need help choosing?
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
          Let's find the right learning path for you.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
          Tell us what you want to learn and enquire about the best course for your goals.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Course%20guidance%20enquiry`}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-semibold transition hover:bg-orange-600"
        >
          Contact Bright Academy <ArrowUpRight size={18} />
        </a>
      </section>

      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bright Academy. All rights reserved.
      </footer>
    </main>
  )
}