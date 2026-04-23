import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Eye,
  FolderKanban,
  GraduationCap,
  Mail,
  Menu,
  Monitor,
  Moon,
  PenTool,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  FaCss3Alt,
  FaEnvelope,
  FaFacebookF,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJs,
  FaLinkedinIn,
  FaReact,
} from "react-icons/fa";
import { SiFramer, SiTailwindcss, SiVite } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certifications" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  { name: "HTML5", icon: <FaHtml5 size={24} />, color: "#E44D26" },
  { name: "CSS3", icon: <FaCss3Alt size={24} />, color: "#264DE4" },
  { name: "JavaScript", icon: <FaJs size={24} />, color: "#F7DF1E" },
  { name: "React", icon: <FaReact size={24} />, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={24} />, color: "#38B2AC" },
  { name: "Framer Motion", icon: <SiFramer size={24} />, color: "#BB22FF" },
  { name: "Git", icon: <FaGitAlt size={24} />, color: "#F05032" },
  { name: "Figma", icon: <FaFigma size={24} />, color: "#F24E1E" },
  { name: "Vite", icon: <SiVite size={24} />, color: "#646CFF" },
];

const tickerSkills = [
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Tailwind CSS",
  "Responsive Design",
  "Animation",
  "Networking Fundamentals",
  "Cybersecurity Basics",
  "UI Structure",
  "Frontend Development",
  "System Design",
];

const skillGroups = [
  {
    title: "Frontend",
    text: "React, JavaScript, HTML, CSS, responsive layout, and interface animation.",
  },
  {
    title: "Foundations",
    text: "Networking, cybersecurity basics, and practical problem-solving.",
  },
  {
    title: "Workflow",
    text: "Figma, Git, and an iterative process focused on clarity and polish.",
  },
];


const projectFilters = ["All", "Featured", "React", "Security", "School", "Frontend"];

const projects = [
  {
    id: 1,
    title: "Campus IT Support Ticketing System",
    category: "Featured",
    tags: ["React", "Frontend", "School"],
    image: "/projects/campus-it-supportt.png",
    shortDescription:
      "A campus IT ticketing platform with authentication, role-based access, technician assignment, comments, and reporting.",
    longDescription:
      "Campus IT Support Ticketing System is a full-stack service desk web application built to manage campus technology concerns in a structured and secure way. Users can submit support tickets, track updates, and continue communication through comments, while administrators can manage the queue, assign technicians, update ticket status, and review reports.",
    problem:
      "Campus technical issues are often reported informally, which makes tracking, prioritization, and follow-up inconsistent.",
    solution:
      "I built a ticketing workflow with authentication, database-backed records, role-based access control, status management, comments, activity logs, and reporting tools.",
    outcome:
      "The project demonstrates practical system thinking, frontend implementation, authentication flows, and database integration for a real school use case.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "RLS", "Framer Motion"],
    live: "https://campus-it-support.vercel.app",
    github: "https://github.com/ClTheGreatt/campus-it-support",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Frontend",
    tags: ["React", "Frontend"],
    image: "/profile.png",
    shortDescription:
      "A personal portfolio site focused on stronger layout hierarchy, motion, and polished project presentation.",
    longDescription:
      "This portfolio site was designed to present my background, project work, certifications, and technical direction in a cleaner and more professional way. The build focuses on typography, layout rhythm, motion, and project storytelling.",
    problem:
      "Many student portfolios feel either too plain or too cluttered, which weakens the presentation of the actual work.",
    solution:
      "I designed a portfolio with stronger section pacing, improved card layouts, cleaner project modals, and more controlled animation.",
    outcome:
      "The final site presents my work in a clearer, more credible, and more memorable format.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    live: "#home",
    github: "https://github.com/ClTheGreatt",
    featured: false,
  },
  {
    id: 3,
    title: "IP Subnet Calculator",
    category: "Frontend",
    tags: ["Frontend", "React", "School"],
    image: "/projects/ip-subnet-calculator.jpg",
    shortDescription:
      "A responsive IPv4 subnet calculator for generating subnet masks, host ranges, network addresses, and broadcast addresses.",
    longDescription:
      "IP Subnet Calculator is a networking utility built with React that computes subnet information from an IPv4 address and CIDR prefix. It generates subnet mask, wildcard mask, network address, broadcast address, usable host range, and address capacity in a responsive interface.",
    problem:
      "Subnetting calculations are often done manually, which is slower and more error-prone when reviewing multiple network ranges.",
    solution:
      "I built a calculator that validates input and returns subnet results instantly in a clean, readable layout.",
    outcome:
      "The project shows practical networking knowledge combined with frontend UI implementation.",
    stack: ["React", "Vite", "JavaScript", "CSS"],
    live: "https://ip-subnet-calculator-five.vercel.app/",
    github: "https://github.com/ClTheGreatt/ip-subnet-calculator",
    featured: false,
  },
  {
    id: 4,
    title: "Password Strength Checker",
    category: "Frontend",
    tags: ["Frontend", "React", "Security"],
    image: "/projects/password-strength-checker.jpg",
    shortDescription:
      "A responsive password checker that evaluates password quality using length, character variety, and common risk patterns.",
    longDescription:
      "Password Strength Checker is a React-based utility for reviewing password quality in real time. It evaluates password length, uppercase and lowercase letters, numbers, symbols, repeated patterns, and other common weakness signals, then presents a live score, checklist, warnings, and suggestions in a structured layout.",
    problem:
      "Weak passwords are often created without clear feedback, which leads to predictable or easily guessed credentials.",
    solution:
      "I built an interactive tool that scores password quality instantly and highlights missing requirements, warnings, and practical improvements.",
    outcome:
      "The project demonstrates frontend UI implementation combined with basic security-focused logic.",
    stack: ["React", "Vite", "JavaScript", "CSS"],
    live: "https://password-strength-checker-tawny.vercel.app/",
    github: "https://github.com/ClTheGreatt/password-strength-checker",
    featured: false,
  },
];

const certifications = [
  {
    title: "PMI Project Management Ready",
    issuer: "Project Management Institute",
    issued: "Oct 2025",
    image: "/projects/pmi.png",
    credentialId: "0c4a920d-d9b1-4cbe-8f2e-f5e608fbcd8b",
  },
  {
    title: "Networking",
    issuer: "Certiport - Pearson VUE",
    issued: "Nov 2025",
    image: "/projects/networking.png",
    credentialId: "wN22p-2F9s",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issued: "Oct 2025",
    image: "/projects/introduction-to-cybersecurity.png",
    credentialId: "1584192c-67c2-48db-8f93-1b862bd84c31",
  },
  {
    title: "IT Specialist - JavaScript",
    issuer: "Certiport - Pearson VUE",
    issued: "May 2025",
    image: "/projects/javascript.png",
    credentialId: "a074e955-3b92-44f6-a81e-469692ba1ac5",
  },
  {
    title: "Introduction to Computers",
    issuer: "Microsoft",
    issued: "Apr 2026",
    image: "/projects/introduction-to-computers.png",
    credentialId: "4FR1YMCVS3Q0",
  },
  {
    title: "Introduction to Technical Support",
    issuer: "IBM",
    issued: "Apr 2026",
    image: "/projects/introduction-to-technical-support.png",
    credentialId: "D1RAQ0YUNDZ2",
  },
  {
    title: "Network Security",
    issuer: "Certiport - Pearson VUE",
    issued: "Apr 2026",
    image: "/projects/network-security.png",
    credentialId: "ye7p-uTnU",
    expires: "Apr 2031",
  },
  {
    title: "EF SET English Certificate 63/100 (C1 Advanced)",
    issuer: "EF SET",
    issued: "Apr 2026",
    image: "/projects/efset.png",
    credentialId: "Vvxis3",
  },
  {
    title: "Google AI",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/google-ai.png",
    credentialId: "XFE0KM0OTCHN",
  },
  {
    title: "AI for Data Analysis",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-data-analysis.png",
    credentialId: "6J3CS7L11M0H",
  },
  {
    title: "AI for Writing and Communicating",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-writing.png",
    credentialId: "Q7A88MAPP275",
  },
  {
    title: "AI for Research and Insights",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-research.png",
    credentialId: "YQ7QJZ4I5YPU",
  },
  {
    title: "AI for Brainstorming and Planning",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-brainstorming.png",
    credentialId: "VXBHKJ29S0DE",
  },
  {
    title: "AI for Content Creation",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-content-creation.png",
    credentialId: "17860HTYDC2Y",
  },
  {
    title: "AI Fundamentals",
    issuer: "Google",
    issued: "Apr 2026",
    image: "/projects/ai-fundamentals.png",
    credentialId: "9YMG28VFJGKS",
  },
  {
    title: "IC3 Digital Literacy Certification",
    issuer: "Certiport - Pearson VUE",
    issued: "Nov 2025",
    image: "/projects/ic3.png",
    credentialId: "493406d5-2914-40a2-a8fe-e7a76dced883",
  },
];

const services = [
  {
    title: "Frontend Development",
    text: "Responsive interfaces and practical web builds focused on usability.",
    icon: <Monitor size={22} />,
    num: "01",
  },
  {
    title: "UI / UX Design",
    text: "Clear hierarchy, stronger spacing, and more polished presentation.",
    icon: <PenTool size={22} />,
    num: "02",
  },
  {
    title: "Technical Support Systems",
    text: "Projects informed by networking, security basics, and structured problem-solving.",
    icon: <Shield size={22} />,
    num: "03",
  },
];


const socialLinks = [
  {
    href: "https://github.com/ClTheGreatt",
    icon: <FaGithub size={18} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/chrislord-dizon-ab2420401/",
    icon: <FaLinkedinIn size={18} />,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/chrislorddizon",
    icon: <FaFacebookF size={18} />,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/cld_dz/?hl=en",
    icon: <FaInstagram size={18} />,
    label: "Instagram",
  },
  {
    href: "mailto:chrislorddizon10@gmail.com",
    icon: <FaEnvelope size={18} />,
    label: "Email",
  },
];


const heroHighlights = [
  {
    title: "Interface design",
    text: "Clean layouts, stronger hierarchy, and motion that supports the content.",
  },
  {
    title: "Frontend builds",
    text: "Responsive React projects with clear structure and practical interaction.",
  },
  {
    title: "Technical grounding",
    text: "Web development supported by networking and security fundamentals.",
  },
];

const contactChecklist = [
  "Project or role details",
  "Timeline or urgency",
  "Relevant links or context",
];


const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function ScrollProgress({ darkMode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.25 });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-[80] h-[3px] origin-left ${
        darkMode
          ? "bg-gradient-to-r from-amber-300 via-white to-cyan-300"
          : "bg-gradient-to-r from-amber-500 via-[#0f172a] to-sky-500"
      }`}
    />
  );
}

function IntroScreen({ darkMode, prefersReducedMotion }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${
        darkMode ? "bg-[#050814]" : "bg-[#f6f2ea]"
      }`}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { rotate: 360, scale: [1, 1.04, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute h-[34rem] w-[34rem] rounded-full border border-amber-400/10"
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute h-[22rem] w-[22rem] rounded-full border border-white/10"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.14),transparent_28%)]" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/25 bg-white/5 shadow-[0_0_60px_rgba(251,191,36,0.18)]"
        >
          <ShieldCheck size={28} className="text-amber-400" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className={`font-display text-4xl font-black tracking-tight md:text-6xl ${
            darkMode ? "text-white" : "text-[#09111f]"
          }`}
        >
          Chrislord Dizon
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.46, duration: 0.5 }}
          className={`mt-4 text-xs tracking-[0.35em] uppercase ${
            darkMode ? "text-white/45" : "text-black/45"
          }`}
        >
          Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

function MouseGlow({ darkMode, prefersReducedMotion }) {
  const mouseX = useMotionValue(-320);
  const mouseY = useMotionValue(-320);
  const smoothX = useSpring(mouseX, { damping: 36, stiffness: 170 });
  const smoothY = useSpring(mouseY, { damping: 36, stiffness: 170 });

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const move = (event) => {
      mouseX.set(event.clientX - 220);
      mouseY.set(event.clientY - 220);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className={`pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full blur-[120px] md:block ${
        darkMode ? "bg-amber-500/10" : "bg-amber-400/14"
      }`}
    />
  );
}

function CursorFollower({ darkMode }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { damping: 28, stiffness: 340 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 340 });

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX - 8);
      mouseY.set(event.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className={`pointer-events-none fixed left-0 top-0 z-[90] hidden h-4 w-4 rounded-full border md:block ${
        darkMode ? "border-white/25 bg-amber-300/80" : "border-black/15 bg-amber-500/75"
      }`}
    />
  );
}

function AmbientBackground({ darkMode, prefersReducedMotion }) {
  const { scrollYProgress } = useScroll();
  const yOne = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yTwo = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <MouseGlow darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[radial-gradient(circle_at_top,#0f1a32_0%,#050814_42%,#04060e_100%)]"
            : "bg-[radial-gradient(circle_at_top,#fff8ef_0%,#f7f1e7_48%,#efe6d9_100%)]"
        }`}
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yOne }}
        className={`absolute left-[-10%] top-[8%] h-[32rem] w-[32rem] rounded-full blur-[120px] ${
          darkMode ? "bg-cyan-400/10" : "bg-sky-400/16"
        }`}
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yTwo }}
        className={`absolute right-[-8%] top-[12%] h-[26rem] w-[26rem] rounded-full blur-[120px] ${
          darkMode ? "bg-amber-400/10" : "bg-amber-400/18"
        }`}
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { rotate }}
        className={`absolute bottom-[-8rem] left-[12%] h-[22rem] w-[22rem] rounded-full border ${
          darkMode ? "border-white/[0.05]" : "border-black/[0.06]"
        }`}
      />
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { rotate: 360, scale: [1, 1.06, 0.98, 1], opacity: [0.28, 0.48, 0.28] }
        }
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className={`absolute right-[-12rem] top-[-12rem] h-[44rem] w-[44rem] rounded-full border ${
          darkMode ? "border-white/[0.045]" : "border-black/[0.05]"
        }`}
      />
      <div className="noise-layer absolute inset-0 opacity-[0.14]" />
      <div className={`grid-layer absolute inset-0 ${darkMode ? "opacity-[0.09]" : "opacity-[0.07]"}`} />
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[radial-gradient(circle_at_center,transparent_45%,rgba(3,6,14,0.44)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_48%,rgba(240,232,219,0.55)_100%)]"
        }`}
      />
    </div>
  );
}

function SkillTicker({ darkMode, prefersReducedMotion }) {
  const items = [...tickerSkills, ...tickerSkills];

  return (
    <div
      className={`mask-fade-x relative overflow-hidden rounded-full border py-3.5 ${
        darkMode ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white/70"
      }`}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10 px-8"
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase ${
              darkMode ? "text-white/55" : "text-black/55"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SectionDivider({ darkMode }) {
  return (
    <div className="mx-auto my-2 max-w-7xl px-6">
      <div className="relative h-px overflow-hidden">
        <div className={darkMode ? "h-px w-full bg-white/8" : "h-px w-full bg-black/8"} />
        <motion.div
          animate={{ x: ["-10%", "115%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-56 bg-gradient-to-r from-transparent via-amber-400/45 to-transparent"
        />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border border-amber-400/40 bg-amber-400/20" />
      </div>
    </div>
  );
}

function SectionHeader({ icon, label, num, title, subtitle, theme }) {
  return (
    <motion.div {...fadeUp} className="relative">
      {num && (
        <div
          className={`pointer-events-none absolute -top-8 right-0 hidden select-none font-display text-[8rem] font-black leading-none lg:block ${theme.numeral}`}
        >
          {num}
        </div>
      )}
      <div
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] tracking-[0.2em] uppercase ${theme.chip}`}
      >
        {icon}
        {label}
      </div>
      <h2 className={`max-w-4xl font-display text-4xl font-black leading-[0.98] tracking-tight md:text-6xl ${theme.heading}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-5 max-w-2xl text-base leading-8 ${theme.muted}`}>{subtitle}</p> : null}
    </motion.div>
  );
}

function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setSpot({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          visible: true,
        });
      }}
      onMouseLeave={() => setSpot((prev) => ({ ...prev, visible: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(251,191,36,0.12), transparent 52%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_28%)] opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function MagneticButton({ children, className = "", href, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.12);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const props = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: springX, y: springY },
    className,
  };

  return href ? (
    <motion.a href={href} {...props}>
      {children}
    </motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...props}>
      {children}
    </motion.button>
  );
}

function CertificateModal({ cert, onClose, darkMode, theme }) {
  useEffect(() => {
    if (!cert) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[30px] border ${theme.modal}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110 ${theme.closeBtn}`}
          aria-label="Close certificate preview"
        >
          <X size={16} />
        </button>

        <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1.25fr_0.75fr]">
          <div className={`p-4 ${darkMode ? "bg-white/[0.03]" : "bg-black/[0.02]"}`}>
            <img src={cert.image} alt={cert.title} className="h-full w-full rounded-2xl object-contain" />
          </div>

          <div className="p-7 md:p-9">
            <p className={`text-[10px] uppercase tracking-[0.28em] ${theme.muted2}`}>{cert.issuer}</p>
            <h3 className={`mt-3 font-display text-2xl font-black leading-tight tracking-tight md:text-3xl ${theme.heading}`}>
              {cert.title}
            </h3>

            <div className="mt-5 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />

            <div className={`mt-5 space-y-2.5 text-sm ${theme.muted}`}>
              <p>
                <span className="font-semibold">Issued:</span> {cert.issued}
              </p>
              {cert.expires ? (
                <p>
                  <span className="font-semibold">Expires:</span> {cert.expires}
                </p>
              ) : null}
              <p className="break-all">
                <span className="font-semibold">Credential ID:</span> {cert.credentialId}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose, darkMode, theme }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[30px] border ${theme.modal}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110 ${theme.closeBtn}`}
          aria-label="Close project preview"
        >
          <X size={16} />
        </button>

        <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1fr_0.92fr]">
          <div className={`relative min-h-[320px] ${darkMode ? "border-r border-white/8" : "border-r border-black/8"}`}>
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="overflow-y-auto p-7 md:p-9">
            <p className={`text-[10px] uppercase tracking-[0.28em] ${theme.muted2}`}>{project.category}</p>
            <h3 className={`mt-3 font-display text-3xl font-black tracking-tight ${theme.heading}`}>
              {project.title}
            </h3>
            <p className={`mt-4 text-sm leading-7 ${theme.muted}`}>{project.longDescription}</p>

            <div className="mt-5 space-y-3">
              {[
                ["Problem", project.problem],
                ["Solution", project.solution],
                ["Outcome", project.outcome],
              ].map(([label, text]) => (
                <div key={label} className={`rounded-2xl border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{label}</p>
                  <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className={`rounded-full border px-3 py-1 text-xs ${theme.tag}`}>
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.live}
                target={project.live.startsWith("http") ? "_blank" : undefined}
                rel={project.live.startsWith("http") ? "noreferrer" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${theme.primaryBtn}`}
              >
                Open Project <ExternalLink size={14} />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${theme.altBtn}`}
              >
                GitHub <FaGithub size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Toast({ toast, onClose, darkMode }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(onClose, 3500);
    return () => clearTimeout(timeout);
  }, [toast, onClose]);

  if (!toast) return null;
  const success = toast.type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      className="fixed bottom-6 right-6 z-[160]"
    >
      <div
        className={`flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-2xl ${
          darkMode ? "border-white/10 bg-[#0c0e18]/95 text-white" : "border-black/10 bg-white/95 text-[#0a0c14]"
        }`}
      >
        <div
          className={`mt-0.5 rounded-full p-1.5 ${
            success
              ? darkMode
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-emerald-500/12 text-emerald-700"
              : darkMode
                ? "bg-red-400/15 text-red-300"
                : "bg-red-500/12 text-red-700"
          }`}
        >
          {success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
        </div>

        <div className="min-w-[220px]">
          <p className="text-sm font-semibold">{toast.title}</p>
          <p className={`mt-1 text-xs leading-5 ${darkMode ? "text-white/55" : "text-black/55"}`}>
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className={`text-sm ${darkMode ? "text-white/35 hover:text-white" : "text-black/35 hover:text-black"}`}
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function ParallaxPortrait({ darkMode, theme, prefersReducedMotion }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 16 });

  const onMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 11);
    rotateX.set((0.5 - (event.clientY - rect.top) / rect.height) * 11);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={prefersReducedMotion ? undefined : { rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`relative w-full max-w-[440px] rounded-[40px] border p-3 ${theme.portraitFrame}`}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -left-4 top-10 hidden rounded-2xl border px-4 py-3 text-sm shadow-2xl lg:block ${
          darkMode ? "border-white/10 bg-[#09101d]/90 text-white" : "border-black/10 bg-white/90 text-[#0a0c14]"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-amber-400" />
          Frontend Focus
        </div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-4 bottom-24 hidden rounded-2xl border px-4 py-3 text-sm shadow-2xl lg:block ${
          darkMode ? "border-white/10 bg-[#09101d]/90 text-white" : "border-black/10 bg-white/90 text-[#0a0c14]"
        }`}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-amber-400">Certifications</div>
        <div className="mt-1 font-semibold">16+ completed</div>
      </motion.div>

      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-amber-400/20 bg-amber-400/5" />
      <div className="absolute -bottom-3 -left-3 h-12 w-12 rounded-full border border-cyan-400/20 bg-cyan-400/5" />

      <div className="relative overflow-hidden rounded-[34px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.2),transparent_30%)]" />
        <img src="/profile.png" alt="Chrislord Dizon" className="h-[520px] w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 text-white backdrop-blur-2xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">CHRISLORD DIZON</p>
            <h3 className="mt-1.5 font-display text-xl font-black tracking-tight">BSIT Student</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <p className="text-xs text-white/70">Network and Web Application</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        style={prefersReducedMotion ? undefined : { transform: "translateZ(28px)" }}
        className={`mt-3 rounded-[28px] border p-5 ${theme.portraitCard}`}
      >
        <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Current Focus</p>
        <h3 className={`mt-2 font-display text-xl font-black tracking-tight ${theme.heading}`}>
          Frontend projects with clearer presentation
        </h3>
        <p className={`mt-2.5 text-sm leading-7 ${theme.muted}`}>
          Building practical interfaces while strengthening foundations in web development, networking, and security.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [darkMode, setDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");

  const contactFormRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
    const timeout = setTimeout(() => setShowIntro(false), prefersReducedMotion ? 900 : 1700);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "certifications", "services", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hasOverlay = mobileOpen || selectedCert || selectedProject;
    const hasModal = selectedCert || selectedProject;

    document.body.style.overflow = hasOverlay ? "hidden" : "";
    document.body.classList.toggle("modal-open", Boolean(hasModal));

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [mobileOpen, selectedCert, selectedProject]);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (!contactFormRef.current || isSending) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setToast({
        type: "error",
        title: "EmailJS not configured",
        message: "Add your EmailJS keys in .env and restart.",
      });
      return;
    }

    setIsSending(true);

    try {
      await emailjs.sendForm(serviceId, templateId, contactFormRef.current, { publicKey });
      contactFormRef.current.reset();
      setIsSubmitted(true);
      setToast({
        type: "success",
        title: "Message sent",
        message: "Thanks for reaching out. I'll reply soon.",
      });
    } catch {
      setToast({
        type: "error",
        title: "Sending failed",
        message: "Check your EmailJS configuration.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projectFilter === "Featured"
      ? projects.filter((project) => project.featured)
      : projects.filter((project) => project.tags.includes(projectFilter));

  const featuredProject = filteredProjects.find((project) => project.featured) ?? filteredProjects[0] ?? null;
  const secondaryProjects = filteredProjects.filter((project) => project.id !== featuredProject?.id);
  const uniqueIssuers = new Set(certifications.map((cert) => cert.issuer)).size;

  const theme = useMemo(
    () =>
      darkMode
        ? {
            bg: "bg-[#050814]",
            text: "text-white",
            heading: "text-white",
            muted: "text-white/65",
            muted2: "text-white/38",
            numeral: "text-white/[0.035]",
            card: "bg-white/[0.045] border-white/10 shadow-[0_10px_45px_rgba(0,0,0,0.24)]",
            cardInner: "bg-white/[0.035] border-white/8",
            cardHover: "hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_18px_55px_rgba(0,0,0,0.28)]",
            chip: "border-amber-300/20 bg-amber-300/8 text-amber-200",
            tag: "border-white/10 bg-white/[0.05] text-white/70",
            nav: "bg-[#07101c]/72 border-white/8",
            altBtn: "border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]",
            primaryBtn:
              "bg-amber-300 text-[#111111] hover:bg-amber-200 hover:shadow-[0_12px_38px_rgba(251,191,36,0.28)]",
            footer: "border-white/8 text-white/40",
            modal: "border-white/10 bg-[#09111e] text-white",
            closeBtn: "border-white/10 bg-white/5 text-white hover:bg-white/10",
            portraitFrame: "border-white/10 bg-white/[0.03]",
            portraitCard: "border-white/10 bg-white/[0.04]",
            inputBase:
              "border-white/10 bg-white/[0.04] text-white placeholder:text-white/28 focus:border-amber-300/35 focus:bg-white/[0.06]",
            filterActive: "border-amber-300 bg-amber-300 text-[#111111]",
            filterInactive: "border-white/10 bg-white/[0.04] text-white/58 hover:bg-white/[0.07]",
          }
        : {
            bg: "bg-[#f6f0e5]",
            text: "text-[#09111f]",
            heading: "text-[#09111f]",
            muted: "text-black/62",
            muted2: "text-black/40",
            numeral: "text-black/[0.045]",
            card: "bg-white/85 border-black/8 shadow-[0_10px_45px_rgba(51,33,12,0.08)]",
            cardInner: "bg-black/[0.02] border-black/8",
            cardHover: "hover:border-black/12 hover:shadow-[0_16px_45px_rgba(51,33,12,0.12)]",
            chip: "border-amber-500/22 bg-amber-500/10 text-amber-700",
            tag: "border-black/10 bg-black/[0.03] text-black/60",
            nav: "bg-white/75 border-black/8",
            altBtn: "border-black/10 bg-white/88 text-[#09111f] hover:bg-black/[0.03]",
            primaryBtn:
              "bg-[#09111f] text-white hover:bg-[#13233a] hover:shadow-[0_12px_35px_rgba(9,17,31,0.18)]",
            footer: "border-black/8 text-black/42",
            modal: "border-black/10 bg-[#fffaf3] text-[#09111f]",
            closeBtn: "border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.06]",
            portraitFrame: "border-black/8 bg-white/70",
            portraitCard: "border-black/8 bg-white/88",
            inputBase:
              "border-black/10 bg-white/88 text-black placeholder:text-black/35 focus:border-amber-500/35 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]",
            filterActive: "border-[#09111f] bg-[#09111f] text-white",
            filterInactive: "border-black/10 bg-white/80 text-black/60 hover:bg-black/[0.03]",
          },
    [darkMode]
  );

  return (
    <div
      className={`app-shell min-h-screen overflow-x-hidden font-sans ${theme.bg} ${theme.text} ${
        darkMode ? "theme-dark" : "theme-light"
      }`}
    >
      <ScrollProgress darkMode={darkMode} />

      <AnimatePresence>
        {showIntro ? <IntroScreen darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCert ? (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
            darkMode={darkMode}
            theme={theme}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            darkMode={darkMode}
            theme={theme}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} darkMode={darkMode} /> : null}
      </AnimatePresence>

      {!prefersReducedMotion && !selectedCert && !selectedProject ? (
        <CursorFollower darkMode={darkMode} />
      ) : null}

      <AmbientBackground darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${theme.nav}`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className={`font-display text-base font-black tracking-tight ${theme.heading}`}>
            C<span className="text-amber-400">L</span>
          </a>

          <div className={`hidden items-center gap-0.5 rounded-full border p-1 md:flex ${theme.card}`}>
            {navLinks.map((link) => {
              const active = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${
                    active ? (darkMode ? "text-[#111111]" : "text-white") : theme.muted
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full ${darkMode ? "bg-white" : "bg-[#09111f]"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10 font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className={`rounded-full border p-2.5 transition ${theme.altBtn}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen((value) => !value)}
              className={`rounded-full border p-2.5 md:hidden ${theme.altBtn}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden border-t px-6 py-4 md:hidden ${
                darkMode ? "border-white/8 bg-[#07101c]/96" : "border-black/8 bg-white/96"
              }`}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${theme.card} ${theme.cardHover}`}
                  >
                    {link.label}
                    <ChevronRight size={14} className={theme.muted2} />
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: showIntro ? 1 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-3xl"
          >
            <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${theme.chip}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Open to opportunities
            </div>

            <div className="mt-7 overflow-hidden">
              <motion.h1
                initial={{ y: 84, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: showIntro ? 1.08 : 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[4.2rem] font-black leading-[0.86] tracking-[-0.05em] md:text-[6rem] xl:text-[7.6rem]"
              >
                Chrislord
                <br />
                <span className="text-amber-400">Dizon</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.26 : 0.18 }}
              className="mt-7 space-y-4"
            >
              <p className={`text-lg font-semibold tracking-tight ${theme.muted}`}>
                BSIT Student • Frontend Developer
              </p>

              <p className={`max-w-2xl text-base leading-8 ${theme.muted}`}>
                I build responsive interfaces and practical web projects with a focus on clarity, motion, and usability.
              </p>

              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs ${theme.chip}`}>
                <Zap size={12} />
                Focused on frontend, networking, and utility systems
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.4 : 0.26 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#projects"
                className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 ${theme.primaryBtn}`}
              >
                View Projects <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className={`inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition duration-300 ${theme.altBtn}`}
              >
                Contact Me
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.52 : 0.34 }}
              className="mt-8 flex items-center gap-3"
            >
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={item.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 hover:-translate-y-1 ${theme.card} ${theme.cardHover}`}
                >
                  {item.icon}
                </a>
              ))}
              <div className={`mx-2 h-5 w-px ${darkMode ? "bg-white/10" : "bg-black/10"}`} />
              <span className={`text-xs tracking-[0.15em] uppercase ${theme.muted2}`}>Connect</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.64 : 0.42 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                ["16+", "Certificates"],
                ["BSIT", "Program"],
                ["2023-27", "Journey"],
              ].map(([value, label]) => (
                <div key={label} className={`rounded-[24px] border p-4 transition ${theme.card} ${theme.cardHover}`}>
                  <div className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>{value}</div>
                  <div className={`mt-0.5 text-xs ${theme.muted2}`}>{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.76 : 0.5 }}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {heroHighlights.map((item) => (
                <div key={item.title} className={`rounded-[24px] border p-4 ${theme.card}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{item.title}</p>
                  <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>{item.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: showIntro ? 1.14 : 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex justify-center [perspective:1200px] lg:justify-end"
          >
            <ParallaxPortrait darkMode={darkMode} theme={theme} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8">
          <motion.div
            {...fadeUp}
            className={`grid gap-4 rounded-[36px] border p-6 md:grid-cols-[1.2fr_0.8fr] md:p-7 ${theme.card}`}
          >
            <div>
              <p className={`text-[10px] uppercase tracking-[0.24em] ${theme.muted2}`}>Direction</p>
              <h2 className={`mt-3 font-display text-3xl font-black tracking-tight md:text-4xl ${theme.heading}`}>
                Cleaner structure, stronger presentation
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-8 ${theme.muted}`}>
                The portfolio is structured for readability, stronger pacing, and clearer project presentation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              {[
                ["Navigation", "Sticky navigation with active section feedback."],
                ["Motion", "Controlled motion and background depth without visual noise."],
                ["Project View", "Cleaner project cards and more readable modal details."],
              ].map(([title, text]) => (
                <div key={title} className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-xs font-semibold ${theme.heading}`}>{title}</p>
                  <p className={`mt-1.5 text-xs leading-6 ${theme.muted}`}>{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="about" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<User size={13} />}
            label="About"
            num="01"
            title="Building practical and polished digital work"
            subtitle="Bachelor of Information Technology student majoring in Network and Web Application, with a focus on frontend projects and technical foundations."
            theme={theme}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp}>
              <SpotlightCard className={`h-full rounded-[32px] border p-7 md:p-8 ${theme.card} ${theme.cardHover}`}>
                <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Profile</p>
                <h3 className={`mt-3 font-display text-3xl font-black tracking-tight ${theme.heading}`}>
                  I focus on clarity, structure, and useful interaction.
                </h3>

                <div className={`mt-5 space-y-4 text-sm leading-8 ${theme.muted}`}>
                  <p>
                    I build projects that combine clean interface design with practical implementation.
                  </p>
                  <p>
                    My current direction blends frontend development with foundations in networking and cybersecurity.
                  </p>
                  <p>
                    I am especially interested in roles where I can keep improving while contributing thoughtful, well-structured work.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <div className="grid gap-5">
              {[
                {
                  icon: <GraduationCap size={18} />,
                  title: "Education",
                  content:
                    "Bataan Peninsula State University Capitol\nBachelor of Information Technology\nMajor in Network and Web Application\n2023 - 2027",
                },
                {
                  icon: <Shield size={18} />,
                  title: "Strengths",
                  content:
                    "Problem-solving, critical thinking, team collaboration, time management, and continuous learning through technical projects and certifications.",
                },
                {
                  icon: <Sparkles size={18} />,
                  title: "Current Work",
                  content:
                    "Improving project presentation, strengthening frontend structure, and building more focused case studies.",
                },
              ].map((card) => (
                <motion.div key={card.title} {...fadeUp}>
                  <SpotlightCard className={`rounded-[28px] border p-6 transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    <div className={`mb-4 inline-flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 ${theme.chip}`}>
                      {card.icon}
                      <span className="text-sm font-semibold">{card.title}</span>
                    </div>
                    <p className={`whitespace-pre-line text-sm leading-8 ${theme.muted}`}>{card.content}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="skills" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<Code2 size={13} />}
            label="Skills"
            num="02"
            title="Tools and technologies"
            subtitle="A focused skill set that supports frontend development, interface design, and technical problem-solving."
            theme={theme}
          />

          <div className="mt-10">
            <SkillTicker darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
          </div>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariant} whileHover={{ y: -6, scale: 1.02 }}>
                <SpotlightCard className={`group rounded-[24px] border p-5 text-center transition duration-300 ${theme.card} ${theme.cardHover}`}>
                  <div
                    className="mb-3 flex justify-center transition duration-300 group-hover:scale-110"
                    style={{ color: skill.color, filter: `drop-shadow(0 0 12px ${skill.color}40)` }}
                  >
                    {skill.icon}
                  </div>
                  <p className={`text-xs font-semibold ${theme.muted}`}>{skill.name}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {skillGroups.map((group) => (
              <motion.div key={group.title} {...fadeUp}>
                <SpotlightCard className={`rounded-[28px] border p-6 ${theme.card} ${theme.cardHover}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{group.title}</p>
                  <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{group.text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<FolderKanban size={13} />}
            label="Projects"
            num="03"
            title="Selected work"
            subtitle="A curated set of projects focused on real functionality, clear structure, and stronger presentation."
            theme={theme}
          />

          <div className="mt-10 flex flex-wrap gap-2.5">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition duration-200 ${
                  projectFilter === filter ? theme.filterActive : theme.filterInactive
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {featuredProject ? (
            <motion.div {...fadeUp} className="mt-10">
              <SpotlightCard className={`group rounded-[36px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                <div className="grid overflow-hidden rounded-[36px] lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative min-h-[340px] overflow-hidden">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent" />
                    <div className="absolute left-6 top-6 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-white/12 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                        Featured Project
                      </span>
                      <span className="rounded-full border border-amber-400/25 bg-amber-400/12 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur-xl">
                        Case Study
                      </span>
                    </div>
                  </div>

                  <div className="p-7 md:p-9 lg:p-10">
                    <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{featuredProject.category}</p>
                    <h3 className={`mt-3 font-display text-3xl font-black tracking-tight md:text-4xl ${theme.heading}`}>
                      {featuredProject.title}
                    </h3>
                    <p className={`mt-4 text-sm leading-7 ${theme.muted}`}>{featuredProject.shortDescription}</p>

                    <div className="mt-6 space-y-3">
                      {[
                        ["Problem", featuredProject.problem],
                        ["Solution", featuredProject.solution],
                        ["Outcome", featuredProject.outcome],
                      ].map(([label, text]) => (
                        <div key={label} className={`rounded-2xl border p-4 ${theme.cardInner}`}>
                          <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>{label}</p>
                          <p className={`mt-1.5 text-xs leading-6 ${theme.muted}`}>{text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredProject.stack.map((stack) => (
                        <span key={stack} className={`rounded-full border px-3 py-1 text-xs ${theme.tag}`}>
                          {stack}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <MagneticButton
                        onClick={() => setSelectedProject(featuredProject)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${theme.primaryBtn}`}
                      >
                        View Details <Eye size={14} />
                      </MagneticButton>

                      <a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${theme.altBtn}`}
                      >
                        GitHub <FaGithub size={14} />
                      </a>

                      <a
                        href={featuredProject.live}
                        target={featuredProject.live.startsWith("http") ? "_blank" : undefined}
                        rel={featuredProject.live.startsWith("http") ? "noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${theme.altBtn}`}
                      >
                        Preview <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ) : null}

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {secondaryProjects.map((project) => (
              <motion.div key={project.id} {...fadeUp} whileHover={{ y: -8 }}>
                <SpotlightCard className={`group h-full rounded-[28px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                  <div className="flex h-full flex-col overflow-hidden rounded-[28px]">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className={`font-display text-lg font-black tracking-tight ${theme.heading}`}>{project.title}</h3>
                      <p className={`mt-2 flex-1 text-sm leading-7 ${theme.muted}`}>{project.shortDescription}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.map((stack) => (
                          <span key={stack} className={`rounded-full border px-2.5 py-1 text-[11px] ${theme.tag}`}>
                            {stack}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-2.5">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition ${theme.altBtn}`}
                        >
                          Preview <Eye size={12} />
                        </button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition ${theme.altBtn}`}
                        >
                          Code <FaGithub size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="certifications" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<Award size={13} />}
            label="Certificates"
            num="04"
            title="Certificates and achievements"
            subtitle="A selection of certifications covering technology, AI, cybersecurity, communication, and programming."
            theme={theme}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [`${certifications.length}+`, "Certificates"],
              [`${uniqueIssuers}`, "Issuers"],
              ["AI • Web • Security", "Focus"],
            ].map(([value, label]) => (
              <motion.div key={label} {...fadeUp} className={`rounded-[24px] border p-5 ${theme.card}`}>
                <p className={`font-display text-3xl font-black tracking-tight ${theme.heading}`}>{value}</p>
                <p className={`mt-1 text-sm ${theme.muted}`}>{label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.credentialId} variants={itemVariant} whileHover={{ y: -6 }}>
                <SpotlightCard className={`group h-full rounded-[26px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                  <div className="overflow-hidden rounded-[26px]">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <div className="absolute right-4 top-4 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-xl border p-2 ${theme.chip}`}>
                          <BadgeCheck size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted2}`}>{cert.issuer}</p>
                          <h3 className={`mt-1.5 font-display text-base font-black leading-6 tracking-tight ${theme.heading}`}>
                            {cert.title}
                          </h3>
                          <div className={`mt-3 space-y-1 text-xs ${theme.muted}`}>
                            <p>Issued: {cert.issued}</p>
                            {cert.expires ? <p>Expires: {cert.expires}</p> : null}
                            <p className="break-all opacity-70">ID: {cert.credentialId}</p>
                          </div>
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${theme.altBtn}`}
                          >
                            <Eye size={12} /> Preview
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 h-px bg-gradient-to-r from-amber-400/25 via-amber-400/10 to-transparent" />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="services" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<Briefcase size={13} />}
            label="Services"
            num="05"
            title="What I can offer"
            subtitle="Areas where I can contribute while continuing to grow through real-world work."
            theme={theme}
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((item) => (
              <motion.div key={item.title} variants={itemVariant} whileHover={{ y: -6 }}>
                <SpotlightCard className={`h-full rounded-[28px] border p-7 transition duration-300 ${theme.card} ${theme.cardHover}`}>
                  <div className={`mb-4 font-display text-5xl font-black leading-none ${theme.numeral}`}>{item.num}</div>
                  <div className={`mb-5 inline-flex rounded-2xl border p-3 ${theme.chip}`}>{item.icon}</div>
                  <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{item.text}</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-amber-400/25 via-amber-400/10 to-transparent" />
                  <p className={`mt-4 text-xs tracking-[0.18em] uppercase ${theme.muted2}`}>Clean execution</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div {...fadeUp} className={`rounded-[36px] border p-8 md:p-10 ${theme.card}`}>
              <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.18em] uppercase ${theme.chip}`}>
                <Mail size={12} /> Contact
              </div>

              <h2 className={`font-display text-4xl font-black leading-[0.98] tracking-tight md:text-5xl ${theme.heading}`}>
                Get in touch
              </h2>

              <p className={`mt-5 text-sm leading-8 ${theme.muted}`}>
                I'm open to internships, entry-level opportunities, collaborations, and project work.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Email</p>
                  <a
                    href="mailto:chrislorddizon10@gmail.com"
                    className="mt-2 block text-sm font-semibold transition hover:text-amber-400"
                  >
                    chrislorddizon10@gmail.com
                  </a>
                </div>

                <div className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Availability</p>
                  <p className={`mt-2 text-sm ${theme.muted}`}>
                    Open for internships, collaborations, and entry-level roles.
                  </p>
                </div>

                <div className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Helpful details</p>
                  <div className="mt-3 space-y-2">
                    {contactChecklist.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <p className={`text-sm leading-6 ${theme.muted}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={item.label}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 hover:-translate-y-1 ${theme.card} ${theme.cardHover}`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form
              ref={contactFormRef}
              onSubmit={handleContactSubmit}
              onInput={() => {
                if (isSubmitted) setIsSubmitted(false);
              }}
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative overflow-hidden rounded-[36px] border p-8 md:p-10 ${theme.card}`}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/8 blur-3xl" />
                <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>Send a message</h3>
                    <p className={`mt-1.5 text-sm ${theme.muted}`}>Fill out the form and I'll respond as soon as possible.</p>
                  </div>

                  <span
                    className={`hidden shrink-0 rounded-full border px-3 py-1.5 text-[10px] tracking-wide md:inline-block ${
                      darkMode
                        ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300"
                        : "border-emerald-500/20 bg-emerald-500/8 text-emerald-700"
                    }`}
                  >
                    Available
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`rounded-[28px] border p-8 text-center ${
                        darkMode ? "border-emerald-400/15 bg-emerald-400/6" : "border-emerald-500/15 bg-emerald-500/6"
                      }`}
                    >
                      <div
                        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                          darkMode ? "bg-emerald-400/12 text-emerald-300" : "bg-emerald-500/10 text-emerald-600"
                        }`}
                      >
                        <CheckCircle2 size={26} />
                      </div>
                      <h4 className={`mt-5 font-display text-2xl font-black tracking-tight ${theme.heading}`}>Message sent</h4>
                      <p className={`mx-auto mt-3 max-w-xs text-sm leading-7 ${theme.muted}`}>
                        Thank you for reaching out. I'll get back to you as soon as I can.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${theme.altBtn}`}
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { label: "Your Name", name: "from_name", type: "text", placeholder: "Enter your name" },
                          { label: "Your Email", name: "from_email", type: "email", placeholder: "Enter your email" },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              required
                              placeholder={field.placeholder}
                              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.inputBase}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          placeholder="What is this about?"
                          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.inputBase}`}
                        />
                      </div>

                      <div className="mt-4">
                        <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={6}
                          placeholder="Write your message here..."
                          className={`w-full resize-y rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.inputBase}`}
                        />
                      </div>

                      <input type="hidden" name="to_name" value="Chrislord Dizon" readOnly />

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <motion.button
                          type="submit"
                          disabled={isSending}
                          whileHover={{ y: isSending ? 0 : -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition ${
                            isSending ? "opacity-70" : ""
                          } ${theme.primaryBtn}`}
                        >
                          {isSending ? "Sending..." : "Send Message"}
                          <Send size={15} />
                        </motion.button>

                        <p className={`text-xs ${theme.muted2}`}>Powered by EmailJS</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-10">
        <div className={`flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs md:flex-row ${theme.footer}`}>
          <p className="font-medium">© 2026 Chrislord Dizon. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["#home", "#projects", "#contact"].map((href) => (
              <a key={href} href={href} className="capitalize transition hover:text-amber-400">
                {href.replace("#", "")}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
