import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Images,
  Sparkles,
  X,
} from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
  siFigma,
  siGit,
  siGithub,
  siClaude,
  siBootstrap,
  siDocker,
  siJquery,
  siLaravel,
  siMysql,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
} from 'simple-icons'

const contact = {
  email: 'rickystephpro@gmail.com',
  phone: '+33 7 58 61 24 08',
  location: 'Paris, France',
}

const currentYear = new Date().getFullYear()

const projects = [
  {
    id: 'yamoo-drive',
    name: 'Yamoo Drive',
    category: 'Location de véhicules',
    description:
      'Une application web de location de véhicules avec un espace vitrine pour découvrir les voitures et un espace agence pour suivre la flotte, les réservations et les clients.',
    images: [
      { src: '/yamoo_drive1.png', alt: 'Page d’accueil de Yamoo Drive' },
      { src: '/yamoo_drive2.png', alt: 'Gestion de la flotte automobile Yamoo Drive' },
      { src: '/yamoo_drive3.png', alt: 'Tableau de bord de l’agence Yamoo Drive' },
    ],
    stack: [
      { name: 'Laravel', icon: siLaravel },
      { name: 'React', icon: siReact },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Tailwind CSS', icon: siTailwindcss },
    ],
    githubUrl: '',
  },
  {
    id: 'distrib237',
    name: 'Distrib237',
    category: 'Distribution de boissons',
    description:
      'Une application web pour accompagner une activité de distribution de boissons : Suivie, Stock, Gestion et facturation',
    images: [
      { src: '/Distrib1.png', alt: 'Page d’accueil de Distrib237' },
      { src: '/Distrib2.png', alt: 'Interface de vente et de facturation Distrib237' },
      { src: '/Distrib3.png', alt: 'Tableau de bord de gestion Distrib237' },
      { src: '/Distrib4.png', alt: 'Console d’administration Distrib237' },
    ],
    stack: [
      { name: 'Laravel', icon: siLaravel },
      { name: 'Bootstrap', icon: siBootstrap },
      { name: 'jQuery', icon: siJquery },
      { name: 'MySQL', icon: siMysql },
    ],
    githubUrl: 'https://github.com/RICKY-BRASHER/RM-Drink-Service',
  },
]

const navigation = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Profil', href: '#profil' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Projets', href: '#projets' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Contact', href: '#contact' },
]

const skillGroups: {
  title: string
  description: string
  technologies: { name: string; icon?: SimpleIcon; mark?: string }[]
  note?: string
}[] = [
  {
    title: 'Développement',
    description: 'Langages, frameworks et création d’applications',
    technologies: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'PHP', icon: siPhp },
      { name: 'Laravel', icon: siLaravel },
      { name: 'jQuery', icon: siJquery },
    ],
  },
  {
    title: 'Data & bases de données',
    description: 'Spécialisation actuelle et notions étudiées',
    technologies: [
      { name: 'SQL', mark: 'SQL' },
      { name: 'PostgreSQL', icon: siPostgresql },
    ],
  },
  {
    title: 'Outils & IA',
    description: 'Versioning, conception, conteneurs et assistants IA',
    technologies: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'Figma', icon: siFigma },
      { name: 'Docker', icon: siDocker },
      { name: 'ChatGPT', mark: 'GPT' },
      { name: 'Claude', icon: siClaude },
    ],
    note:
      'Le « vibe coding » m’aide à prototyper avec l’IA ; je vérifie et améliore ensuite le code généré.',
  },
]

function BrandIcon({ icon, size = 20 }: { icon: SimpleIcon; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [introComplete, setIntroComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const selectedProject = projects.find((project) => project.id === selectedProjectId)
  const introVisible = prefersReducedMotion === false && !introComplete

  useEffect(() => {
    if (prefersReducedMotion !== false) return

    const timeout = window.setTimeout(() => setIntroComplete(true), 2000)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  function showToast(message: string) {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(null), 4000)
  }

  function openProject(projectId: string) {
    setSelectedProjectId(projectId)
    setActiveImageIndex(0)
  }

  function showPreviousImage() {
    if (!selectedProject) return
    setActiveImageIndex((index) => (index - 1 + selectedProject.images.length) % selectedProject.images.length)
  }

  function showNextImage() {
    if (!selectedProject) return
    setActiveImageIndex((index) => (index + 1) % selectedProject.images.length)
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const subject = String(formData.get('subject') ?? '')
    const message = String(formData.get('message') ?? '')
    const body = `${message}\n\n— ${name}\n${email}`

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormSubmitted(true)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100 selection:bg-emerald-400 selection:text-slate-950">
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 1.04 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
                className="mb-5 h-px origin-left bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
              />
              <p className="text-lg font-semibold tracking-[0.18em] text-white sm:text-2xl">
                RICK STEPHANE HENTCHO
                <span className="text-emerald-300">.</span>
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                Portfolio · Data Engineer - Dev IA
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <div
        className="ambient-orb pointer-events-none absolute -left-40 top-40 -z-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="ambient-orb ambient-orb-delayed pointer-events-none absolute -right-40 top-[42rem] -z-0 h-[32rem] w-[32rem] rounded-full bg-cyan-500/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#accueil"
            className="text-sm font-bold tracking-[0.14em] text-white"
            aria-label="Hentcho — accueil"
          >
            HENTCHO RICK STEPHANE<span className="text-emerald-400">.</span>
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-xs font-medium text-slate-400 transition-colors hover:text-emerald-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${contact.email}`}
            className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-4 py-2 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-300/50 hover:bg-emerald-400/[0.14] sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Disponible pour échanger
          </a>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="navigation-mobile"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="navigation-mobile"
              aria-label="Navigation mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/[0.06] bg-slate-950 md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-white/[0.05] py-3 text-sm text-slate-300 last:border-0 hover:text-emerald-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section
          id="accueil"
          className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="mb-6 inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.17em] text-emerald-300">
              <span className="h-px w-8 bg-emerald-400" />
              Data Engineer · Dev IA
              <span className="h-px w-8 bg-emerald-400" />
            </p>
            <h1 className="max-w-3xl text-[2.8rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-[4.25rem]">
              Du développement logiciel
              <span className="mt-1 block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                au BIGDATA.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Je m’intéresse aussi au prototypage assisté par l’IA pour donner
              vie à des idées.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projets"
                className="hover-lift inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Voir mes projets <ArrowDownRight size={16} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="hover-lift inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                Me contacter <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href="/Cv-Portfolio.pdf"
                download="CV-Rick-Stephane-Hentcho-Takougang.pdf"
                className="hover-lift inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-5 py-3 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/[0.1]"
              >
                Télécharger mon CV <Download size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" aria-hidden="true" />
                {contact.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={15} className="text-emerald-400" aria-hidden="true" />
                Master 1 · Data Engineering
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[31rem]"
            whileHover={prefersReducedMotion ? undefined : { y: -5, rotate: 0.5 }}
            style={{ transition: 'box-shadow 250ms ease' }}
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c131d] p-3 shadow-2xl shadow-black/30 sm:p-4">
              <div className="photo-frame relative aspect-[5/5] overflow-hidden rounded-xl border border-white/[0.07] bg-slate-900">
                <img
                  src="/photo_cv.JPG"
                  alt="Photo de profil de Rick Stephane Hentcho Takougang"
                  className="h-full w-full object-cover object-[center_12%]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Rick Stephane Hentcho Takougang
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Master 1 · Data Engineering</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-300">
                  <Database size={19} aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="profil" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                À propos
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Du logiciel à la donnée.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Mon parcours a commencé par trois années de génie logiciel,
                de la L1 à la L3. J’y ai acquis une base en développement et
                appris à concevoir des applications.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Aujourd’hui en Master 1 Data Engineering, je me spécialise dans
                la donnée et construis progressivement mon projet professionnel :
                devenir Data Engineer.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.07] bg-slate-950/60 p-4">
                  <span className="mb-1 block text-[10px] uppercase tracking-wider text-slate-500">
                    Formation actuelle
                  </span>
                  <span className="text-sm text-slate-200">
                    Master 1 · Data Engineering
                  </span>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-slate-950/60 p-4">
                  <span className="mb-1 block text-[10px] uppercase tracking-wider text-slate-500">
                    Objectif
                  </span>
                  <span className="text-sm text-slate-200">Devenir Data Engineer</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="space-y-5"
            >
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c131d] shadow-xl shadow-black/20">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 sm:text-xs">
                    profile_matrix.tsx
                  </span>
                  <Code2 size={14} className="text-slate-500" aria-hidden="true" />
                </div>
                <div className="overflow-x-auto p-4 font-mono text-[10px] leading-6 sm:p-6 sm:text-xs">
                  <p className="whitespace-nowrap text-slate-400">
                    <span className="text-fuchsia-300">const</span>{' '}
                    <span className="text-cyan-200">engineer</span> = {'{'}
                  </p>
                  <p className="whitespace-nowrap pl-3 text-slate-400 sm:pl-5">
                    nom: <span className="text-emerald-300">"RICK STEPHANE HENTCHO TAKOUGANG"</span>,
                  </p>
                  <p className="whitespace-nowrap pl-3 text-slate-400 sm:pl-5">
                    parcours: [
                    <span className="text-cyan-300">"Génie logiciel · L1 à L3"</span>,
                  </p>
                  <p className="whitespace-nowrap pl-3 text-cyan-300 sm:pl-5">
                    <span className="pl-12 sm:pl-16">"Data Engineering · Master 1"</span>],
                  </p>
                  <p className="whitespace-nowrap pl-3 text-slate-400 sm:pl-5">
                    socle: <span className="text-amber-300">"Développement logiciel"</span>,
                  </p>
                  <p className="whitespace-nowrap pl-3 text-slate-400 sm:pl-5">
                    exploration: [
                    <span className="text-amber-300">"Data"</span>,{' '}
                    <span className="text-amber-300">"IA & vibe coding"</span>],
                  </p>
                  <p className="whitespace-nowrap pl-3 text-slate-400 sm:pl-5">
                    objectif: <span className="text-emerald-300">"Devenir Data Engineer"</span>
                  </p>
                  <p className="text-slate-400">{'};'}</p>
                  <p className="mt-2 whitespace-nowrap">
                    <span className="text-purple-300">console</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-blue-300">log</span>
                    <span className="text-slate-400">(engineer.objectif);</span>
                  </p>
                  <p className="whitespace-nowrap font-semibold text-emerald-300">
                    &gt; "Devenir Data Engineer"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="competences" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
              Boîte à outils
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Développement & Data
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
              Trois domaines complémentaires : mon socle en développement,
              ma spécialisation Data en cours et les outils qui m’accompagnent.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:border-emerald-400/20 hover:bg-white/[0.04] sm:p-6"
                whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.015 }}
              >
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-300">
                    {index === 0 ? (
                      <Code2 size={18} aria-hidden="true" />
                    ) : index === 1 ? (
                      <Database size={18} aria-hidden="true" />
                    ) : (
                      <Sparkles size={18} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">{group.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{group.description}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.technologies.map((technology) => (
                    <li
                      key={technology.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-slate-950/70 px-3 py-2 text-xs text-slate-300"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-white">
                        {technology.icon ? (
                          <BrandIcon icon={technology.icon} size={14} />
                        ) : (
                          <span className="text-[6px] font-black tracking-tight text-slate-800">
                            {technology.mark}
                          </span>
                        )}
                      </span>
                      {technology.name}
                    </li>
                  ))}
                </ul>
                {group.note && (
                  <p className="mt-4 flex gap-2 border-t border-white/[0.07] pt-4 text-xs leading-5 text-slate-400">
                    <Sparkles
                      size={14}
                      className="mt-0.5 shrink-0 text-violet-300"
                      aria-hidden="true"
                    />
                    <span>{group.note}</span>
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projets" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-2xl">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  Projets Dev-IA
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Des idées transformées en applications Web.
                </h2>
                
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/60 px-3 py-2 text-xs text-slate-400">
                <Images size={15} className="text-emerald-300" aria-hidden="true" />
                2 projets 
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 transition-colors hover:border-emerald-300/25"
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                >
                  <button
                    type="button"
                    onClick={() => openProject(project.id)}
                    className="cursor-pointer relative block aspect-[16/8] w-full overflow-hidden bg-slate-950 text-left"
                    aria-label={`Ouvrir la galerie du projet ${project.name}`}
                  >
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      className="project-preview-image h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.045]"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-200 backdrop-blur">
                      {project.category}
                    </span>
                  </button>

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-100">
                          <button
                            type="button"
                            onClick={() => openProject(project.id)}
                            className="text-left transition-colors hover:text-emerald-300"
                          >
                            {project.name}
                          </button>
                        </h3>
                        <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((technology) => (
                          <span
                            key={technology.name}
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-slate-950/70 px-2 py-1 text-[10px] text-slate-300 sm:text-xs"
                          >
                            <BrandIcon icon={technology.icon} size={13} />
                            {technology.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex w-full items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:text-xs"
                        >
                          <BrandIcon icon={siGithub} size={14} />
                          Code GitHub
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            showToast(
                              `Le lien GitHub de ${project.name} sera ajouté dès que l’URL du dépôt sera disponible.`,
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:text-xs"
                        >
                          <BrandIcon icon={siGithub} size={14} />
                          Code GitHub
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          showToast(
                            `${project.name} n’est pas encore hébergé. Une démo en ligne sera ajoutée dès sa mise en ligne.`,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-medium text-slate-300 transition-colors hover:border-amber-300/30 hover:text-amber-200 sm:text-xs"
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        Démo en ligne
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="parcours" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                Formation
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Mon parcours
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Trois années de génie logiciel, puis une spécialisation en
                ingénierie des données.
              </p>
            </div>
            <div className="relative border-l border-emerald-400/20 pl-6 sm:pl-8">
              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
              <div className="space-y-4">
                <article className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-300">
                      <GraduationCap size={15} aria-hidden="true" />
                      Cycle de licence
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                      L1 — L3
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    Génie logiciel
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Trois années de formation en développement logiciel, avec
                    un socle en conception et réalisation d’applications.
                  </p>
                </article>

                <div className="relative pl-4">
                  <div className="absolute -left-[29px] top-6 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-950 sm:-left-[37px]" />
                  <article className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.035] p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
                        <GraduationCap size={15} aria-hidden="true" />
                        Formation actuelle
                      </span>
                      <span className="rounded-full border border-emerald-300/20 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-200/70">
                        Master 1
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-100">
                      Data Engineering
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Je poursuis actuellement un Master 1 en Data Engineering
                      Pour explorer mieux la data.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                Contact
              </p>
              <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
                Une idée ou une question ?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                Vous pouvez m’écrire directement. Le formulaire prépare un
                courriel dans votre application de messagerie.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-slate-950/60 p-4 transition-colors hover:border-emerald-400/25"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-300">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                      E-mail
                    </span>
                    <span className="mt-1 block break-all text-sm text-slate-200">
                      {contact.email}
                    </span>
                  </span>
                  <ExternalLink size={14} className="ml-auto shrink-0 text-slate-600" aria-hidden="true" />
                </a>
                <a
                  href={`tel:${contact.phone.replaceAll(' ', '')}`}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-slate-950/60 p-4 transition-colors hover:border-emerald-400/25"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/[0.08] text-cyan-300">
                    <Phone size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                      Téléphone
                    </span>
                    <span className="mt-1 block text-sm text-slate-200">{contact.phone}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-slate-950/60 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-300">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                      Localisation
                    </span>
                    <span className="mt-1 block text-sm text-slate-200">{contact.location}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 shadow-xl shadow-black/10 sm:p-7">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="prepared"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-300">
                      <Check size={25} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-slate-100">
                      Votre message est prêt
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      Votre application de messagerie devrait s’ouvrir avec le
                      courriel prérempli. Il ne vous reste qu’à l’envoyer.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-5 text-xs font-medium text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
                    >
                      Préparer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-2 block text-xs text-slate-400">
                          Nom
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400/60"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-2 block text-xs text-slate-400">
                          Adresse e-mail
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400/60"
                          placeholder="vous@exemple.fr"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="mb-2 block text-xs text-slate-400">
                        Sujet
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400/60"
                        placeholder="Comment puis-je vous aider ?"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-2 block text-xs text-slate-400">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        className="w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-3.5 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400/60"
                        placeholder="Décrivez brièvement votre demande…"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300"
                    >
                      Préparer le courriel <Send size={15} aria-hidden="true" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-2 backdrop-blur-sm sm:p-4"
            onClick={() => setSelectedProjectId(null)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setSelectedProjectId(null)
              if (event.key === 'ArrowLeft') showPreviousImage()
              if (event.key === 'ArrowRight') showNextImage()
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[96dvh] w-full max-w-[96vw] flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50 outline-none"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-3 py-2.5 sm:px-5">
                <h3 id="project-dialog-title" className="text-sm font-medium text-slate-200">
                  {selectedProject.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-slate-400">
                    {activeImageIndex + 1} / {selectedProject.images.length}
                  </span>
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  aria-label="Fermer la galerie"
                  className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <X size={18} aria-hidden="true" />
                </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                  <img
                    src={selectedProject.images[activeImageIndex].src}
                    alt={selectedProject.images[activeImageIndex].alt}
                    className="max-h-[calc(96dvh-7rem)] w-full object-contain"
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Image précédente"
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white backdrop-blur transition-colors hover:bg-slate-800"
                      >
                        <ChevronLeft size={20} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label="Image suivante"
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white backdrop-blur transition-colors hover:bg-slate-800"
                      >
                        <ChevronRight size={20} aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>

                {selectedProject.images.length > 1 && (
                  <div className="mt-2 flex shrink-0 justify-center gap-2 overflow-x-auto pb-1">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Afficher l’image ${index + 1}`}
                        aria-current={activeImageIndex === index}
                        className={`w-16 shrink-0 overflow-hidden rounded-md border transition-colors sm:w-24 ${
                          activeImageIndex === index
                            ? 'border-emerald-300'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image.src}
                          alt=""
                          className="aspect-video w-full object-cover object-top"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-start gap-3 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-100 shadow-2xl shadow-black/40"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
            <p className="flex-1 leading-5">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Fermer la notification"
              className="rounded p-0.5 text-slate-400 hover:text-white"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/[0.06] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © {currentYear} Rick Stephane Hentcho Takougang
          </p>
          <a
            href="#accueil"
            className="inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-emerald-300"
          >
            Retour en haut <ArrowDown size={13} className="rotate-180" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
