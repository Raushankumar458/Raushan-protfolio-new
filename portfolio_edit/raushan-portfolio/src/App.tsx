import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Code2, Github, Instagram, Linkedin, Mail, MapPin, Phone, Rotate3D, Sparkles } from 'lucide-react'
import CityScene from './CityScene'

const projects = [
  {
    number: '01',
    title: 'SMRT-Box',
    type: 'AI + IoT',
    copy: 'An automatic medicine-dispensing concept built around reminders, automation, and a human-friendly experience.',
    explanation: 'A smart medicine reminder and dispensing system designed to make daily medication routines safer and simpler. The concept combines sensor-driven hardware, scheduled reminders, and automation with a clean user experience.',
    tags: ['AI', 'IoT', 'Python'],
  },
  {
    number: '02',
    title: 'Library Management',
    type: 'MERN Stack',
    copy: 'A full-stack library workflow for cataloguing books, managing users, and keeping the interface fast and intuitive.',
    explanation: 'A full-stack library platform focused on the complete borrowing workflow. React handles the interface, Node.js and Express power the API layer, and MongoDB stores books, users, and transaction data.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    number: '03',
    title: 'Creative Interfaces',
    type: 'Frontend',
    copy: 'Interactive web experiments mixing motion, 3D scenes, and responsive UI to make portfolio experiences feel alive.',
    explanation: 'A collection of frontend experiments exploring motion, 3D composition, responsive interactions, and visual storytelling. The goal is to turn familiar web patterns into immersive experiences without sacrificing usability.',
    tags: ['Three.js', 'Framer Motion', 'TypeScript'],
  },
]

function MouseEffects() {
  const coreRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22
      current.current.y += (target.current.y - current.current.y) * 0.22

      const { x, y } = current.current
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMove = (event: globalThis.MouseEvent) => {
      target.current.x = event.clientX
      target.current.y = event.clientY
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div className={`cursor-layer ${visible ? 'is-visible' : ''}`} aria-hidden="true">
        <div ref={coreRef} className="cursor-core" />
        <div ref={ringRef} className="cursor-ring-dot" />
      </div>
    </>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const tiltRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const targetTilt = useRef({ x: 0, y: 0, px: 50, py: 50 })
  const currentTilt = useRef({ x: 0, y: 0, px: 50, py: 50 })
  const frameRef = useRef<number | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const tick = () => {
      const card = tiltRef.current
      if (card) {
        currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.17
        currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.17
        currentTilt.current.px += (targetTilt.current.px - currentTilt.current.px) * 0.17
        currentTilt.current.py += (targetTilt.current.py - currentTilt.current.py) * 0.17

        const { x, y, px, py } = currentTilt.current
        card.style.transform = `rotateX(${x}deg) rotateY(${y}deg) translate3d(0,-4px,0) scale3d(1.015,1.015,1.015)`
        card.style.setProperty('--pointer-x', `${px}%`)
        card.style.setProperty('--pointer-y', `${py}%`)
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const handleMove = (clientX: number, clientY: number) => {
    const card = tiltRef.current
    const panel = panelRef.current
    if (!card || !panel) return
    const rect = panel.getBoundingClientRect()
    const px = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const py = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100))
    targetTilt.current.y = ((px - 50) / 50) * 18
    targetTilt.current.x = ((50 - py) / 50) * 14
    targetTilt.current.px = px
    targetTilt.current.py = py
  }

  const resetTilt = () => {
    targetTilt.current.x = 0
    targetTilt.current.y = 0
    targetTilt.current.px = 50
    targetTilt.current.py = 50
  }

  const isFlipped = hovered

  return (
    <motion.article
      className={`project-card project-card-reveal ${hovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        resetTilt()
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <div
        ref={panelRef}
        className="project-card-perspective"
        onMouseMove={(event) => handleMove(event.clientX, event.clientY)}
        onPointerMove={(event) => { if (event.pointerType !== 'touch') handleMove(event.clientX, event.clientY) }}
      >
        <div
          ref={tiltRef}
          className="project-card-3d"
          tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setHovered((current) => !current)
          }
        }}
          aria-label={`${project.title} project card. Hover for 3D effect and flip, or press Enter to flip.`}
        >
          <div className={`project-flipper ${isFlipped ? 'is-flipped' : ''}`}>
          <section className="project-face project-face-front">
            <div className="project-num">{project.number}</div>
            <div className="project-main">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <span>{project.type}</span>
              </div>
              <p>{project.copy}</p>
              <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-arrow"><ArrowUpRight size={22} /></div>
            <div className="project-hover-hint"><Rotate3D size={14} /> Hover to tilt · click to flip</div>
          </section>

          <section className="project-face project-face-back">
            <div className="project-back-top">
              <span>{project.number} / {project.type}</span>
              <span className="project-back-dot" />
            </div>
            <div className="project-back-content">
              <p className="project-back-kicker">Project explanation</p>
              <h3>{project.title}</h3>
              <p>{project.explanation}</p>
              <div className="tags project-back-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-back-footer">Move away to return <ArrowUpRight size={16} /></div>
          </section>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function App() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.08])
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -80])

  return (
    <main>
      <MouseEffects />
      <div className="mouse-spotlight" aria-hidden="true" />

      <nav className="nav">
        <a href="#top" className="brand">RK<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="mailto:raushankumar32745@gmail.com">Let's talk <ArrowUpRight size={16} /></a>
      </nav>

      <section className="hero" id="top">
        <motion.div className="hero-media" style={{ scale: heroScale, y: heroY }}>
          <video className="hero-video" src="/videos/city-walk.mp4" autoPlay muted loop playsInline poster="/videos/city-walk.mp4" />
          <div className="hero-tint" />
        </motion.div>
        <div className="hero-scene"><CityScene /></div>
        <div className="hero-grain" />

        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow"><span className="dot" /> Creative Developer · India</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.08 }}>
            I build digital<br /><em>worlds</em> that move.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            React · TypeScript · Three.js · Motion<br />A portfolio shaped like a journey through code.
          </motion.p>
          <motion.a href="#projects" className="hero-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Explore projects <ArrowDownRight size={18} />
          </motion.a>
        </div>

        <div className="hero-side"><span>Scroll to explore</span><span className="line" /></div>
        <div className="hero-caption">01 — City / Motion / Code</div>
      </section>

      <section className="intro section" id="about">
        <div className="section-label">02 / ABOUT</div>
        <div className="intro-grid">
          <div>
            <p className="display-copy">I like turning a blank canvas into something <span>human, cinematic, and interactive.</span></p>
          </div>
          <div className="body-copy">
            <p>I’m Raushan Kumar, a developer focused on modern web experiences. My work sits between engineering and visual storytelling—clean systems underneath, memorable interactions on top.</p>
            <div className="mini-stats">
              <div><strong>React</strong><span>Interface</span></div>
              <div><strong>TS</strong><span>Systems</span></div>
              <div><strong>3D</strong><span>Experiences</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="journey section">
        <div className="journey-copy">
          <div className="section-label">03 / THE JOURNEY</div>
          <h2>From sketch<br />to <span>screen.</span></h2>
          <p>The second scene keeps the hand-drawn city feeling alive—perfect for a portfolio that treats development as a visual craft.</p>
        </div>
        <div className="journey-video-card">
          <video src="/videos/sketch-city.mp4" autoPlay muted loop playsInline />
          <div className="video-overlay"><span>08 SEC LOOP</span><ArrowUpRight size={18} /></div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="projects-head">
          <div className="section-label">04 / PROJECTS</div>
          <div><h2>Selected <em>work.</em></h2><p>Three focused builds. Hover a card for depth, then click to explore the story behind it.</p></div>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-glow" />
        <div className="section-label">05 / CONTACT</div>
        <div className="contact-inner">
          <div>
            <h2>Let’s build the<br /><em>next scene.</em></h2>
            <p>Have a project, product, or idea? Reach out and let’s make it real.</p>
          </div>
          <div className="contact-details">
            <a href="mailto:raushankumar32745@gmail.com"><Mail size={19} />raushankumar32745@gmail.com</a>
            <a href="tel:+917645894672"><Phone size={19} />+91 76458 94672</a>
            <span><MapPin size={19} />India</span>
            <div className="socials">
              <a href="https://github.com/Raushankumar458" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
                <Github />
              </a>
              <a href="https://www.linkedin.com/in/raushan-kumar-85ab4229a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                <Linkedin />
              </a>
              <a href="https://instagram.com/royal_raushan_singh_" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" title="Instagram">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer"><div>RAUSHAN KUMAR <span>© 2026</span></div><div className="footer-mark"><Code2 size={15} /> Built with React + Three.js + Framer Motion <Sparkles size={15} /></div></footer>
    </main>
  )
}

export default App
