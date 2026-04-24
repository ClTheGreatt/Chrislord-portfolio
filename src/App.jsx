import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
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

// ─── DATA ────────────────────────────────────────────────────────────────────

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
  { name: "HTML5", icon: <FaHtml5 size={28} />, color: "#E44D26", level: 90 },
  { name: "CSS3", icon: <FaCss3Alt size={28} />, color: "#264DE4", level: 88 },
  { name: "JavaScript", icon: <FaJs size={28} />, color: "#F7DF1E", level: 82 },
  { name: "React", icon: <FaReact size={28} />, color: "#61DAFB", level: 80 },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} />, color: "#38B2AC", level: 85 },
  { name: "Framer Motion", icon: <SiFramer size={28} />, color: "#BB22FF", level: 75 },
  { name: "Git", icon: <FaGitAlt size={28} />, color: "#F05032", level: 78 },
  { name: "Figma", icon: <FaFigma size={28} />, color: "#F24E1E", level: 72 },
  { name: "Vite", icon: <SiVite size={28} />, color: "#646CFF", level: 80 },
];

const tickerSkills = [
  "JavaScript", "HTML", "CSS", "React", "Tailwind CSS",
  "Responsive Design", "Animation", "Networking Fundamentals",
  "Cybersecurity Basics", "UI Structure", "Frontend Development", "System Design",
];

const skillGroups = [
  { title: "Frontend", text: "React, JavaScript, HTML, CSS, responsive layout, and interface animation." },
  { title: "Foundations", text: "Networking, cybersecurity basics, and practical problem-solving." },
  { title: "Workflow", text: "Figma, Git, and an iterative process focused on clarity and polish." },
];

const projectFilters = ["All", "Featured", "React", "Security", "School", "Frontend"];

const projects = [
  {
    id: 1,
    title: "Campus IT Support Ticketing System",
    category: "Featured",
    tags: ["React", "Frontend", "School"],
    image: "/projects/campus-it-supportt.png",
    shortDescription: "A campus IT ticketing platform with authentication, role-based access, technician assignment, comments, and reporting.",
    longDescription: "Campus IT Support Ticketing System is a full-stack service desk web application built to manage campus technology concerns in a structured and secure way. Users can submit support tickets, track updates, and continue communication through comments, while administrators can manage the queue, assign technicians, update ticket status, and review reports.",
    problem: "Campus technical issues are often reported informally, which makes tracking, prioritization, and follow-up inconsistent.",
    solution: "I built a ticketing workflow with authentication, database-backed records, role-based access control, status management, comments, activity logs, and reporting tools.",
    outcome: "The project demonstrates practical system thinking, frontend implementation, authentication flows, and database integration for a real school use case.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "RLS", "Framer Motion"],
    live: "https://campus-it-support.vercel.app",
    github: "https://github.com/ClTheGreatt/campus-it-support",
    featured: true,
    color: "#F7DF1E",
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Frontend",
    tags: ["React", "Frontend"],
    image: "/profile.png",
    shortDescription: "A personal portfolio site focused on stronger layout hierarchy, motion, and polished project presentation.",
    longDescription: "This portfolio site was designed to present my background, project work, certifications, and technical direction in a cleaner and more professional way. The build focuses on typography, layout rhythm, motion, and project storytelling.",
    problem: "Many student portfolios feel either too plain or too cluttered, which weakens the presentation of the actual work.",
    solution: "I designed a portfolio with stronger section pacing, improved card layouts, cleaner project modals, and more controlled animation.",
    outcome: "The final site presents my work in a clearer, more credible, and more memorable format.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    live: "#home",
    github: "https://github.com/ClTheGreatt",
    featured: false,
    color: "#61DAFB",
  },
  {
    id: 3,
    title: "IP Subnet Calculator",
    category: "Frontend",
    tags: ["Frontend", "React", "School"],
    image: "/projects/ip-subnet-calculator.jpg",
    shortDescription: "A responsive IPv4 subnet calculator for generating subnet masks, host ranges, network addresses, and broadcast addresses.",
    longDescription: "IP Subnet Calculator is a networking utility built with React that computes subnet information from an IPv4 address and CIDR prefix. It generates subnet mask, wildcard mask, network address, broadcast address, usable host range, and address capacity in a responsive interface.",
    problem: "Subnetting calculations are often done manually, which is slower and more error-prone when reviewing multiple network ranges.",
    solution: "I built a calculator that validates input and returns subnet results instantly in a clean, readable layout.",
    outcome: "The project shows practical networking knowledge combined with frontend UI implementation.",
    stack: ["React", "Vite", "JavaScript", "CSS"],
    live: "https://ip-subnet-calculator-five.vercel.app/",
    github: "https://github.com/ClTheGreatt/ip-subnet-calculator",
    featured: false,
    color: "#38B2AC",
  },
  {
    id: 4,
    title: "Password Strength Checker",
    category: "Frontend",
    tags: ["Frontend", "React", "Security"],
    image: "/projects/password-strength-checker.jpg",
    shortDescription: "A responsive password checker that evaluates password quality using length, character variety, and common risk patterns.",
    longDescription: "Password Strength Checker is a React-based utility for reviewing password quality in real time. It evaluates password length, uppercase and lowercase letters, numbers, symbols, repeated patterns, and other common weakness signals, then presents a live score, checklist, warnings, and suggestions in a structured layout.",
    problem: "Weak passwords are often created without clear feedback, which leads to predictable or easily guessed credentials.",
    solution: "I built an interactive tool that scores password quality instantly and highlights missing requirements, warnings, and practical improvements.",
    outcome: "The project demonstrates frontend UI implementation combined with basic security-focused logic.",
    stack: ["React", "Vite", "JavaScript", "CSS"],
    live: "https://password-strength-checker-tawny.vercel.app/",
    github: "https://github.com/ClTheGreatt/password-strength-checker",
    featured: false,
    color: "#F05032",
  },
];

const certifications = [
  { title: "PMI Project Management Ready", issuer: "Project Management Institute", issued: "Oct 2025", image: "/projects/pmi.png", credentialId: "0c4a920d-d9b1-4cbe-8f2e-f5e608fbcd8b" },
  { title: "Networking", issuer: "Certiport - Pearson VUE", issued: "Nov 2025", image: "/projects/networking.png", credentialId: "wN22p-2F9s" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", issued: "Oct 2025", image: "/projects/introduction-to-cybersecurity.png", credentialId: "1584192c-67c2-48db-8f93-1b862bd84c31" },
  { title: "IT Specialist - JavaScript", issuer: "Certiport - Pearson VUE", issued: "May 2025", image: "/projects/javascript.png", credentialId: "a074e955-3b92-44f6-a81e-469692ba1ac5" },
  { title: "Introduction to Computers", issuer: "Microsoft", issued: "Apr 2026", image: "/projects/introduction-to-computers.png", credentialId: "4FR1YMCVS3Q0" },
  { title: "Introduction to Technical Support", issuer: "IBM", issued: "Apr 2026", image: "/projects/introduction-to-technical-support.png", credentialId: "D1RAQ0YUNDZ2" },
  { title: "Network Security", issuer: "Certiport - Pearson VUE", issued: "Apr 2026", image: "/projects/network-security.png", credentialId: "ye7p-uTnU", expires: "Apr 2031" },
  { title: "EF SET English Certificate 63/100 (C1 Advanced)", issuer: "EF SET", issued: "Apr 2026", image: "/projects/efset.png", credentialId: "Vvxis3" },
  { title: "Google AI", issuer: "Google", issued: "Apr 2026", image: "/projects/google-ai.png", credentialId: "XFE0KM0OTCHN" },
  { title: "AI for Data Analysis", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-data-analysis.png", credentialId: "6J3CS7L11M0H" },
  { title: "AI for Writing and Communicating", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-writing.png", credentialId: "Q7A88MAPP275" },
  { title: "AI for Research and Insights", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-research.png", credentialId: "YQ7QJZ4I5YPU" },
  { title: "AI for Brainstorming and Planning", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-brainstorming.png", credentialId: "VXBHKJ29S0DE" },
  { title: "AI for Content Creation", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-content-creation.png", credentialId: "17860HTYDC2Y" },
  { title: "AI Fundamentals", issuer: "Google", issued: "Apr 2026", image: "/projects/ai-fundamentals.png", credentialId: "9YMG28VFJGKS" },
  { title: "IC3 Digital Literacy Certification", issuer: "Certiport - Pearson VUE", issued: "Nov 2025", image: "/projects/ic3.png", credentialId: "493406d5-2914-40a2-a8fe-e7a76dced883" },
];

const services = [
  { title: "Frontend Development", text: "Responsive interfaces and practical web builds focused on usability.", icon: <Monitor size={24} />, num: "01", accent: "#61DAFB" },
  { title: "UI / UX Design", text: "Clear hierarchy, stronger spacing, and more polished presentation.", icon: <PenTool size={24} />, num: "02", accent: "#BB22FF" },
  { title: "Technical Support Systems", text: "Projects informed by networking, security basics, and structured problem-solving.", icon: <Shield size={24} />, num: "03", accent: "#38B2AC" },
];

const socialLinks = [
  { href: "https://github.com/ClTheGreatt", icon: <FaGithub size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/chrislord-dizon-ab2420401/", icon: <FaLinkedinIn size={18} />, label: "LinkedIn" },
  { href: "https://www.facebook.com/chrislorddizon", icon: <FaFacebookF size={18} />, label: "Facebook" },
  { href: "https://www.instagram.com/cld_dz/?hl=en", icon: <FaInstagram size={18} />, label: "Instagram" },
  { href: "mailto:chrislorddizon10@gmail.com", icon: <FaEnvelope size={18} />, label: "Email" },
];

const heroHighlights = [
  { title: "Interface design", text: "Clean layouts, stronger hierarchy, and motion that supports the content." },
  { title: "Frontend builds", text: "Responsive React projects with clear structure and practical interaction." },
  { title: "Technical grounding", text: "Web development supported by networking and security fundamentals." },
];

const contactChecklist = ["Project or role details", "Timeline or urgency", "Relevant links or context"];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ─── PARTICLE SYSTEM ─────────────────────────────────────────────────────────

function ParticleField({ darkMode, prefersReducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.1,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = darkMode
          ? `rgba(251,191,36,${p.opacity})`
          : `rgba(245,158,11,${p.opacity * 0.6})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * (darkMode ? 0.12 : 0.07);
            ctx.strokeStyle = darkMode
              ? `rgba(251,191,36,${alpha})`
              : `rgba(245,158,11,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [darkMode, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────

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

// ─── INTRO SCREEN ────────────────────────────────────────────────────────────

function IntroScreen({ darkMode, prefersReducedMotion }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${
        darkMode ? "bg-[#030610]" : "bg-[#f6f2ea]"
      }`}
    >
      {/* Orbiting rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={prefersReducedMotion ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-amber-400/10"
          style={{ width: `${16 + i * 8}rem`, height: `${16 + i * 8}rem` }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_35%)]" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotateY: -30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber-400/30 bg-white/5 shadow-[0_0_80px_rgba(251,191,36,0.25)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ShieldCheck size={32} className="text-amber-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className={`font-display text-5xl font-black tracking-tight md:text-7xl ${
            darkMode ? "text-white" : "text-[#09111f]"
          }`}
        >
          Chrislord Dizon
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"
          style={{ transformOrigin: "center" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className={`mt-4 text-xs tracking-[0.4em] uppercase ${darkMode ? "text-white/45" : "text-black/45"}`}
        >
          Frontend Developer • Portfolio
        </motion.p>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
              className="h-1.5 w-1.5 rounded-full bg-amber-400"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── MOUSE GLOW ───────────────────────────────────────────────────────────────

function MouseGlow({ darkMode, prefersReducedMotion }) {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const smoothX = useSpring(mouseX, { damping: 38, stiffness: 160 });
  const smoothY = useSpring(mouseY, { damping: 38, stiffness: 160 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const move = (e) => { mouseX.set(e.clientX - 250); mouseY.set(e.clientY - 250); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className={`pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full blur-[130px] md:block ${
        darkMode ? "bg-amber-500/[0.08]" : "bg-amber-400/12"
      }`}
    />
  );
}

// ─── CURSOR FOLLOWER ─────────────────────────────────────────────────────────

function CursorFollower({ darkMode }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { damping: 24, stiffness: 360 });
  const y = useSpring(mouseY, { damping: 24, stiffness: 360 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX - 8); mouseY.set(e.clientY - 8); };
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{ x, y }}
        animate={{ scale: isHovering ? 2.2 : 1, opacity: isHovering ? 0.6 : 1 }}
        transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.2 } }}
        className={`pointer-events-none fixed left-0 top-0 z-[90] hidden h-4 w-4 rounded-full md:block ${
          darkMode ? "bg-amber-300/80" : "bg-amber-500/75"
        }`}
      />
      <motion.div
        style={{ x: useSpring(mouseX, { damping: 40, stiffness: 120 }), y: useSpring(mouseY, { damping: 40, stiffness: 120 }) }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        className={`pointer-events-none fixed left-0 top-0 z-[89] hidden h-4 w-4 rounded-full border md:block ${
          darkMode ? "border-white/20" : "border-black/15"
        }`}
        style={{
          x: useSpring(mouseX, { damping: 40, stiffness: 100 }),
          y: useSpring(mouseY, { damping: 40, stiffness: 100 }),
          translateX: "-4px",
          translateY: "-4px",
          width: "32px",
          height: "32px",
        }}
      />
    </>
  );
}

// ─── AMBIENT BACKGROUND ──────────────────────────────────────────────────────

function AmbientBackground({ darkMode, prefersReducedMotion }) {
  const { scrollYProgress } = useScroll();
  const yOne = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yTwo = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <MouseGlow darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[radial-gradient(ellipse_at_top_left,#0f1f40_0%,#050814_50%,#030610_100%)]"
            : "bg-[radial-gradient(ellipse_at_top,#fff8ef_0%,#f7f1e7_55%,#ede5d8_100%)]"
        }`}
      />

      {/* Orbs */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yOne }}
        className={`absolute -left-[15%] top-[5%] h-[40rem] w-[40rem] rounded-full blur-[140px] ${
          darkMode ? "bg-cyan-500/8" : "bg-sky-400/14"
        }`}
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yTwo }}
        className={`absolute -right-[10%] top-[10%] h-[32rem] w-[32rem] rounded-full blur-[140px] ${
          darkMode ? "bg-amber-500/8" : "bg-amber-400/16"
        }`}
      />
      <div
        className={`absolute bottom-[10%] left-[30%] h-[24rem] w-[24rem] rounded-full blur-[120px] ${
          darkMode ? "bg-violet-600/6" : "bg-violet-400/8"
        }`}
      />

      {/* Geometric rings */}
      <motion.div
        style={prefersReducedMotion ? undefined : { rotate }}
        className={`absolute bottom-[-6rem] left-[8%] h-[26rem] w-[26rem] rounded-full border ${
          darkMode ? "border-white/[0.04]" : "border-black/[0.05]"
        }`}
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className={`absolute right-[-14rem] top-[-14rem] h-[50rem] w-[50rem] rounded-full border ${
          darkMode ? "border-white/[0.035]" : "border-black/[0.04]"
        }`}
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className={`absolute right-[-8rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full border ${
          darkMode ? "border-amber-400/[0.06]" : "border-amber-500/[0.07]"
        }`}
      />

      <div className="noise-layer absolute inset-0 opacity-[0.12]" />
      <div className={`grid-layer absolute inset-0 ${darkMode ? "opacity-[0.07]" : "opacity-[0.05]"}`} />
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[radial-gradient(circle_at_center,transparent_42%,rgba(3,6,14,0.5)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_50%,rgba(237,229,216,0.6)_100%)]"
        }`}
      />
    </div>
  );
}

// ─── SKILL TICKER ────────────────────────────────────────────────────────────

function SkillTicker({ darkMode, prefersReducedMotion }) {
  const items = [...tickerSkills, ...tickerSkills];
  return (
    <div
      className={`mask-fade-x relative overflow-hidden rounded-full border py-3.5 ${
        darkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white/70"
      }`}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10 px-8"
      >
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className={`flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase ${
              darkMode ? "text-white/50" : "text-black/50"
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

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────

function SectionDivider({ darkMode }) {
  return (
    <div className="mx-auto my-2 max-w-7xl px-6">
      <div className="relative h-px overflow-hidden">
        <div className={darkMode ? "h-px w-full bg-white/8" : "h-px w-full bg-black/8"} />
        <motion.div
          animate={{ x: ["-10%", "115%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
        />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border border-amber-400/40 bg-amber-400/20" />
      </div>
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ icon, label, num, title, subtitle, theme }) {
  return (
    <motion.div {...fadeUp} className="relative">
      {num && (
        <div className={`pointer-events-none absolute -top-8 right-0 hidden select-none font-display text-[8rem] font-black leading-none lg:block ${theme.numeral}`}>
          {num}
        </div>
      )}
      <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] tracking-[0.2em] uppercase ${theme.chip}`}>
        {icon}
        {label}
      </div>
      <h2 className={`max-w-4xl font-display text-4xl font-black leading-[0.96] tracking-tight md:text-6xl ${theme.heading}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-5 max-w-2xl text-base leading-8 ${theme.muted}`}>{subtitle}</p> : null}
    </motion.div>
  );
}

// ─── SPOTLIGHT CARD ──────────────────────────────────────────────────────────

function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
      }}
      onMouseLeave={() => setSpot((p) => ({ ...p, visible: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, rgba(251,191,36,0.1), transparent 55%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_30%)] opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── 3D TILT CARD ────────────────────────────────────────────────────────────

function TiltCard({ children, className = "", intensity = 8 }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });
  const glowX = useTransform(springY, [-intensity, intensity], ["0%", "100%"]);
  const glowY = useTransform(springX, [intensity, -intensity], ["0%", "100%"]);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * intensity * 2);
    rotateX.set((0.5 - (e.clientY - rect.top) / rect.height) * intensity * 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(251,191,36,0.08), transparent 60%)`,
          zIndex: 1,
        }}
      />
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </motion.div>
  );
}

// ─── MAGNETIC BUTTON ─────────────────────────────────────────────────────────

function MagneticButton({ children, className = "", href, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.14);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.14);
  };

  const props = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: () => { x.set(0); y.set(0); },
    style: { x: springX, y: springY },
    className,
  };

  return href ? (
    <motion.a href={href} {...props}>{children}</motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...props}>{children}</motion.button>
  );
}

// ─── CERTIFICATE MODAL ───────────────────────────────────────────────────────

function CertificateModal({ cert, onClose, darkMode, theme }) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28, rotateX: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[30px] border ${theme.modal}`}
        style={{ transformStyle: "preserve-3d" }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110 hover:rotate-90 duration-300 ${theme.closeBtn}`}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1.25fr_0.75fr]">
          <div className={`p-4 ${darkMode ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
            <img src={cert.image} alt={cert.title} className="h-full w-full rounded-2xl object-contain" />
          </div>
          <div className="p-7 md:p-9">
            <p className={`text-[10px] uppercase tracking-[0.28em] ${theme.muted2}`}>{cert.issuer}</p>
            <h3 className={`mt-3 font-display text-2xl font-black leading-tight tracking-tight md:text-3xl ${theme.heading}`}>{cert.title}</h3>
            <div className="mt-5 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent" />
            <div className={`mt-5 space-y-2.5 text-sm ${theme.muted}`}>
              <p><span className="font-semibold">Issued:</span> {cert.issued}</p>
              {cert.expires && <p><span className="font-semibold">Expires:</span> {cert.expires}</p>}
              <p className="break-all"><span className="font-semibold">Credential ID:</span> {cert.credentialId}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PROJECT MODAL ───────────────────────────────────────────────────────────

function ProjectModal({ project, onClose, darkMode, theme }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/75 p-4 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 28, rotateX: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[30px] border ${theme.modal}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110 hover:rotate-90 duration-300 ${theme.closeBtn}`}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1fr_0.92fr]">
          <div className={`relative min-h-[320px] ${darkMode ? "border-r border-white/8" : "border-r border-black/8"}`}>
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            {/* Color accent based on project */}
            <div
              className="absolute inset-x-0 bottom-0 h-1"
              style={{ background: `linear-gradient(to right, ${project.color}44, transparent)` }}
            />
          </div>

          <div className="overflow-y-auto p-7 md:p-9">
            <p className={`text-[10px] uppercase tracking-[0.28em] ${theme.muted2}`}>{project.category}</p>
            <h3 className={`mt-3 font-display text-3xl font-black tracking-tight ${theme.heading}`}>{project.title}</h3>
            <p className={`mt-4 text-sm leading-7 ${theme.muted}`}>{project.longDescription}</p>

            <div className="mt-5 space-y-3">
              {[["Problem", project.problem], ["Solution", project.solution], ["Outcome", project.outcome]].map(([label, text]) => (
                <div key={label} className={`rounded-2xl border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{label}</p>
                  <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className={`rounded-full border px-3 py-1 text-xs ${theme.tag}`}>{s}</span>
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

// ─── TOAST ────────────────────────────────────────────────────────────────────

function Toast({ toast, onClose, darkMode }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;
  const success = toast.type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.96 }}
      className="fixed bottom-6 right-6 z-[160]"
    >
      <div
        className={`flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-2xl ${
          darkMode ? "border-white/10 bg-[#0c0e18]/95 text-white" : "border-black/10 bg-white/95 text-[#0a0c14]"
        }`}
      >
        <div className={`mt-0.5 rounded-full p-1.5 ${success ? (darkMode ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-500/12 text-emerald-700") : (darkMode ? "bg-red-400/15 text-red-300" : "bg-red-500/12 text-red-700")}`}>
          {success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
        </div>
        <div className="min-w-[220px]">
          <p className="text-sm font-semibold">{toast.title}</p>
          <p className={`mt-1 text-xs leading-5 ${darkMode ? "text-white/55" : "text-black/55"}`}>{toast.message}</p>
        </div>
        <button onClick={onClose} className={`text-sm ${darkMode ? "text-white/35 hover:text-white" : "text-black/35 hover:text-black"}`} aria-label="Close">
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── 3D PARALLAX PORTRAIT ────────────────────────────────────────────────────

function ParallaxPortrait({ darkMode, theme, prefersReducedMotion }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 90, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 90, damping: 18 });

  const onMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    rotateX.set((0.5 - (e.clientY - rect.top) / rect.height) * 14);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      style={prefersReducedMotion ? undefined : { rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`relative w-full max-w-[440px] rounded-[40px] border p-3 ${theme.portraitFrame}`}
    >
      {/* Floating badges */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -left-5 top-10 hidden rounded-2xl border px-4 py-3 text-sm shadow-2xl lg:block ${
          darkMode ? "border-white/10 bg-[#09101d]/90 text-white" : "border-black/10 bg-white/90 text-[#0a0c14]"
        }`}
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-amber-400" />
          Frontend Focus
        </div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-5 bottom-28 hidden rounded-2xl border px-4 py-3 text-sm shadow-2xl lg:block ${
          darkMode ? "border-white/10 bg-[#09101d]/90 text-white" : "border-black/10 bg-white/90 text-[#0a0c14]"
        }`}
        style={{ transform: "translateZ(40px)" }}
      >
        <div className={`text-[10px] uppercase tracking-[0.22em] text-amber-400`}>Certifications</div>
        <div className="mt-1 font-semibold">16+ completed</div>
      </motion.div>

      {/* Decorative orbs */}
      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-amber-400/25 bg-amber-400/5" />
      <div className="absolute -bottom-3 -left-3 h-12 w-12 rounded-full border border-cyan-400/25 bg-cyan-400/5" />

      {/* Portrait image */}
      <div className="relative overflow-hidden rounded-[34px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%)]" />
        <img src="/profile.png" alt="Chrislord Dizon" className="h-[520px] w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />

        {/* Portrait overlay card */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="rounded-[24px] border border-white/12 bg-black/42 p-4 text-white backdrop-blur-2xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">CHRISLORD DIZON</p>
            <h3 className="mt-1.5 font-display text-xl font-black tracking-tight">BSIT Student</h3>
            <div className="mt-2 flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              <p className="text-xs text-white/70">Network and Web Application</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom card */}
      <motion.div
        style={prefersReducedMotion ? undefined : { transform: "translateZ(24px)" }}
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

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value);
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setDisplayed(num);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {isNaN(parseInt(value)) ? value : displayed}{suffix}
    </span>
  );
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────

function SkillBar({ skill, darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div style={{ color: skill.color }} className="shrink-0">
        {skill.icon}
      </div>
      <div className="flex-1">
        <div className="mb-1.5 flex items-center justify-between">
          <span className={`text-xs font-semibold ${darkMode ? "text-white/80" : "text-black/80"}`}>{skill.name}</span>
          <span className={`text-xs ${darkMode ? "text-white/40" : "text-black/40"}`}>{skill.level}%</span>
        </div>
        <div className={`h-1.5 w-full overflow-hidden rounded-full ${darkMode ? "bg-white/8" : "bg-black/8"}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${skill.color}88, ${skill.color})` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

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
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDarkMode(false);
    const t = setTimeout(() => setShowIntro(false), prefersReducedMotion ? 800 : 1900);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "certifications", "services", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || selectedCert || selectedProject) ? "hidden" : "";
    document.body.classList.toggle("modal-open", Boolean(selectedCert || selectedProject));
    return () => { document.body.style.overflow = ""; document.body.classList.remove("modal-open"); };
  }, [mobileOpen, selectedCert, selectedProject]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactFormRef.current || isSending) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setToast({ type: "error", title: "EmailJS not configured", message: "Add your EmailJS keys in .env and restart." });
      return;
    }
    setIsSending(true);
    try {
      await emailjs.sendForm(serviceId, templateId, contactFormRef.current, { publicKey });
      contactFormRef.current.reset();
      setIsSubmitted(true);
      setToast({ type: "success", title: "Message sent", message: "Thanks for reaching out. I'll reply soon." });
    } catch {
      setToast({ type: "error", title: "Sending failed", message: "Check your EmailJS configuration." });
    } finally {
      setIsSending(false);
    }
  };

  const filteredProjects = projectFilter === "All"
    ? projects
    : projectFilter === "Featured"
    ? projects.filter((p) => p.featured)
    : projects.filter((p) => p.tags.includes(projectFilter));

  const featuredProject = filteredProjects.find((p) => p.featured) ?? filteredProjects[0] ?? null;
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);
  const uniqueIssuers = new Set(certifications.map((c) => c.issuer)).size;

  const theme = useMemo(() =>
    darkMode
      ? {
          bg: "bg-[#030610]",
          text: "text-white",
          heading: "text-white",
          muted: "text-white/62",
          muted2: "text-white/36",
          numeral: "text-white/[0.032]",
          card: "bg-white/[0.042] border-white/[0.085] shadow-[0_12px_48px_rgba(0,0,0,0.28)]",
          cardInner: "bg-white/[0.032] border-white/8",
          cardHover: "hover:bg-white/[0.06] hover:border-white/14 hover:shadow-[0_20px_60px_rgba(0,0,0,0.32)] transition-all duration-300",
          chip: "border-amber-300/22 bg-amber-300/8 text-amber-200",
          tag: "border-white/10 bg-white/[0.045] text-white/65",
          nav: "bg-[#060d1c]/75 border-white/8",
          altBtn: "border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/18 transition-all duration-200",
          primaryBtn: "bg-amber-300 text-[#111111] hover:bg-amber-200 hover:shadow-[0_14px_40px_rgba(251,191,36,0.32)] transition-all duration-200",
          footer: "border-white/8 text-white/38",
          modal: "border-white/10 bg-[#080f1e] text-white",
          closeBtn: "border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-200",
          portraitFrame: "border-white/10 bg-white/[0.025]",
          portraitCard: "border-white/10 bg-white/[0.038]",
          inputBase: "border-white/10 bg-white/[0.04] text-white placeholder:text-white/26 focus:border-amber-300/40 focus:bg-white/[0.07] transition-all duration-200",
          filterActive: "border-amber-300 bg-amber-300 text-[#111111]",
          filterInactive: "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/[0.07] hover:border-white/16",
        }
      : {
          bg: "bg-[#f4ede0]",
          text: "text-[#09111f]",
          heading: "text-[#09111f]",
          muted: "text-black/60",
          muted2: "text-black/38",
          numeral: "text-black/[0.04]",
          card: "bg-white/88 border-black/8 shadow-[0_12px_48px_rgba(51,33,12,0.07)]",
          cardInner: "bg-black/[0.02] border-black/8",
          cardHover: "hover:border-black/12 hover:shadow-[0_18px_50px_rgba(51,33,12,0.12)] transition-all duration-300",
          chip: "border-amber-500/22 bg-amber-500/10 text-amber-700",
          tag: "border-black/10 bg-black/[0.03] text-black/58",
          nav: "bg-white/78 border-black/8",
          altBtn: "border-black/10 bg-white/88 text-[#09111f] hover:bg-black/[0.03] hover:border-black/15 transition-all duration-200",
          primaryBtn: "bg-[#09111f] text-white hover:bg-[#14243e] hover:shadow-[0_14px_38px_rgba(9,17,31,0.2)] transition-all duration-200",
          footer: "border-black/8 text-black/40",
          modal: "border-black/10 bg-[#fdf8f0] text-[#09111f]",
          closeBtn: "border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.07] transition-all duration-200",
          portraitFrame: "border-black/8 bg-white/72",
          portraitCard: "border-black/8 bg-white/90",
          inputBase: "border-black/10 bg-white/90 text-black placeholder:text-black/33 focus:border-amber-500/38 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] transition-all duration-200",
          filterActive: "border-[#09111f] bg-[#09111f] text-white",
          filterInactive: "border-black/10 bg-white/80 text-black/58 hover:bg-black/[0.03]",
        },
  [darkMode]);

  return (
    <div className={`app-shell min-h-screen overflow-x-hidden font-sans ${theme.bg} ${theme.text} ${darkMode ? "theme-dark" : "theme-light"}`}>
      <ScrollProgress darkMode={darkMode} />

      {/* Particle field */}
      <ParticleField darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />

      <AnimatePresence>
        {showIntro && <IntroScreen darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCert && <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} darkMode={darkMode} theme={theme} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} darkMode={darkMode} theme={theme} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} darkMode={darkMode} />}
      </AnimatePresence>

      {!prefersReducedMotion && !selectedCert && !selectedProject && (
        <CursorFollower darkMode={darkMode} />
      )}

      <AmbientBackground darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />

      {/* ── NAVIGATION ─────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${theme.nav}`}>
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
                  className={`relative rounded-full px-4 py-2 text-sm transition duration-200 ${
                    active ? (darkMode ? "text-[#111111]" : "text-white") : theme.muted
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full ${darkMode ? "bg-white" : "bg-[#09111f]"}`}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDarkMode((v) => !v)}
              className={`rounded-full border p-2.5 transition duration-300 hover:scale-110 ${theme.altBtn}`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`rounded-full border p-2.5 md:hidden ${theme.altBtn}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden border-t px-6 py-4 md:hidden ${
                darkMode ? "border-white/8 bg-[#060d1c]/96" : "border-black/8 bg-white/96"
              }`}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${theme.card} ${theme.cardHover}`}
                  >
                    {link.label}
                    <ChevronRight size={14} className={theme.muted2} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section
          id="home"
          className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: showIntro ? 1.1 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: showIntro ? 1.1 : 0, duration: 0.5 }}
              className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${theme.chip}`}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              Open to opportunities
            </motion.div>

            <div className="mt-7 overflow-hidden">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: showIntro ? 1.15 : 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[4rem] font-black leading-[0.86] tracking-[-0.05em] md:text-[5.8rem] xl:text-[7.4rem]"
              >
                Chrislord
                <br />
                <span className="relative">
                  <span className="text-amber-400">Dizon</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: showIntro ? 1.5 : 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-amber-400/40"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.28 : 0.2 }}
              className="mt-7 space-y-4"
            >
              <p className={`text-lg font-semibold tracking-tight ${theme.muted}`}>BSIT Student • Frontend Developer</p>
              <p className={`max-w-2xl text-base leading-8 ${theme.muted}`}>
                I build responsive web interfaces and practical frontend projects with a focus on clarity and usability.
              </p>
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs ${theme.chip}`}>
                <Zap size={12} className="text-amber-400" />
                Open to internships and entry-level opportunities
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.42 : 0.28 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#projects"
                className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 ${theme.primaryBtn}`}
              >
                View Projects
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
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
              transition={{ duration: 0.7, delay: showIntro ? 1.54 : 0.36 }}
              className="mt-8 flex items-center gap-3"
            >
              {socialLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (showIntro ? 1.54 : 0.36) + i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 ${theme.card} ${theme.cardHover}`}
                >
                  {item.icon}
                </motion.a>
              ))}
              <div className={`mx-2 h-5 w-px ${darkMode ? "bg-white/10" : "bg-black/10"}`} />
              <span className={`text-xs tracking-[0.15em] uppercase ${theme.muted2}`}>Connect</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.66 : 0.44 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                ["16", "+", "Certificates"],
                ["BSIT", "", "Program"],
                ["2023", "-27", "Journey"],
              ].map(([value, suffix, label]) => (
                <TiltCard key={label} className={`group rounded-[24px] border p-4 transition ${theme.card} ${theme.cardHover}`}>
                  <div className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>
                    <AnimatedNumber value={value} suffix={suffix} />
                  </div>
                  <div className={`mt-0.5 text-xs ${theme.muted2}`}>{label}</div>
                </TiltCard>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.78 : 0.52 }}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {heroHighlights.map((item) => (
                <SpotlightCard key={item.title} className={`rounded-[24px] border p-4 ${theme.card} ${theme.cardHover}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{item.title}</p>
                  <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>{item.text}</p>
                </SpotlightCard>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: showIntro ? 1.18 : 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center [perspective:1400px] lg:justify-end"
          >
            <ParallaxPortrait darkMode={darkMode} theme={theme} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </section>

        {/* Direction Banner */}
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

        {/* ── ABOUT ──────────────────────────────────────────────────────── */}
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
                  <p>I build projects that combine clean interface design with practical implementation.</p>
                  <p>My current direction blends frontend development with foundations in networking and cybersecurity.</p>
                  <p>I am especially interested in roles where I can keep improving while contributing thoughtful, well-structured work.</p>
                </div>

                {/* Mini skill bars in about */}
                <div className="mt-7 space-y-4">
                  {skills.slice(0, 4).map((skill) => (
                    <SkillBar key={skill.name} skill={skill} darkMode={darkMode} />
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <div className="grid gap-5">
              {[
                { icon: <GraduationCap size={18} />, title: "Education", content: "Bataan Peninsula State University Capitol\nBachelor of Information Technology\nMajor in Network and Web Application\n2023 - 2027" },
                { icon: <Shield size={18} />, title: "Strengths", content: "Problem-solving, critical thinking, team collaboration, time management, and continuous learning through technical projects and certifications." },
                { icon: <Sparkles size={18} />, title: "Current Work", content: "Improving project presentation, strengthening frontend structure, and building more focused case studies." },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
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

        {/* ── SKILLS ─────────────────────────────────────────────────────── */}
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

          {/* 3D skill cards */}
          <motion.div
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariant}>
                <TiltCard intensity={10} className="group h-full">
                  <SpotlightCard className={`h-full rounded-[24px] border p-5 text-center transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    <div
                      className="mb-3 flex justify-center transition duration-300 group-hover:scale-125"
                      style={{ color: skill.color, filter: `drop-shadow(0 0 14px ${skill.color}55)` }}
                    >
                      {skill.icon}
                    </div>
                    <p className={`text-xs font-semibold ${theme.muted}`}>{skill.name}</p>
                    {/* Skill level indicator */}
                    <div className={`mx-auto mt-3 h-1 w-3/4 overflow-hidden rounded-full ${darkMode ? "bg-white/8" : "bg-black/8"}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: skill.color }}
                      />
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <SpotlightCard className={`rounded-[28px] border p-6 ${theme.card} ${theme.cardHover}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{group.title}</p>
                  <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{group.text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── PROJECTS ───────────────────────────────────────────────────── */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            icon={<FolderKanban size={13} />}
            label="Projects"
            num="03"
            title="Selected work"
            subtitle="A curated set of projects focused on real functionality, clear structure, and stronger presentation."
            theme={theme}
          />

          {/* Filters */}
          <motion.div
            className="mt-10 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {projectFilters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition duration-200 ${
                  projectFilter === filter ? theme.filterActive : theme.filterInactive
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured project */}
          <AnimatePresence mode="wait">
            {featuredProject && (
              <motion.div
                key={featuredProject.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <TiltCard intensity={3} className="group">
                  <SpotlightCard className={`rounded-[36px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    <div className="grid overflow-hidden rounded-[36px] lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="relative min-h-[340px] overflow-hidden">
                        <motion.img
                          src={featuredProject.image}
                          alt={featuredProject.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        {/* Color accent */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-1.5"
                          style={{ background: `linear-gradient(to right, ${featuredProject.color}66, transparent)` }}
                        />
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
                        <h3 className={`mt-3 font-display text-3xl font-black tracking-tight md:text-4xl ${theme.heading}`}>{featuredProject.title}</h3>
                        <p className={`mt-4 text-sm leading-7 ${theme.muted}`}>{featuredProject.shortDescription}</p>

                        <div className="mt-6 space-y-3">
                          {[["Problem", featuredProject.problem], ["Solution", featuredProject.solution], ["Outcome", featuredProject.outcome]].map(([label, text]) => (
                            <div key={label} className={`rounded-2xl border p-4 ${theme.cardInner}`}>
                              <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>{label}</p>
                              <p className={`mt-1.5 text-xs leading-6 ${theme.muted}`}>{text}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {featuredProject.stack.map((s) => (
                            <span key={s} className={`rounded-full border px-3 py-1 text-xs ${theme.tag}`}>{s}</span>
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
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secondary projects */}
          <AnimatePresence>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {secondaryProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.65, delay: i * 0.08 }}
                >
                  <TiltCard intensity={6} className="group h-full">
                    <SpotlightCard className={`h-full rounded-[28px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                      <div className="flex h-full flex-col overflow-hidden rounded-[28px]">
                        <div className="relative h-56 overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/48 to-transparent" />
                          {/* Color accent line */}
                          <div
                            className="absolute inset-x-0 bottom-0 h-1"
                            style={{ background: `linear-gradient(to right, ${project.color}66, transparent)` }}
                          />
                          <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                            {project.category}
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <h3 className={`font-display text-lg font-black tracking-tight ${theme.heading}`}>{project.title}</h3>
                          <p className={`mt-2 flex-1 text-sm leading-7 ${theme.muted}`}>{project.shortDescription}</p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.stack.map((s) => (
                              <span key={s} className={`rounded-full border px-2.5 py-1 text-[11px] ${theme.tag}`}>{s}</span>
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
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── CERTIFICATIONS ─────────────────────────────────────────────── */}
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
              [`${certifications.length}`, "+", "Certificates"],
              [`${uniqueIssuers}`, "", "Issuers"],
              ["AI • Web • Security", "", "Focus"],
            ].map(([value, suffix, label]) => (
              <motion.div key={label} {...fadeUp}>
                <TiltCard className={`rounded-[24px] border p-5 ${theme.card} ${theme.cardHover}`}>
                  <p className={`font-display text-3xl font-black tracking-tight ${theme.heading}`}>
                    <AnimatedNumber value={value} suffix={suffix} />
                  </p>
                  <p className={`mt-1 text-sm ${theme.muted}`}>{label}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {certifications.map((cert, i) => (
              <motion.div key={cert.credentialId} variants={itemVariant}>
                <TiltCard intensity={6} className="group h-full">
                  <SpotlightCard className={`h-full rounded-[26px] border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    <div className="overflow-hidden rounded-[26px]">
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/38 to-transparent" />
                        <div className="absolute right-4 top-4 rounded-full border border-amber-400/25 bg-amber-400/12 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 rounded-xl border p-2 ${theme.chip}`}>
                            <BadgeCheck size={15} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted2}`}>{cert.issuer}</p>
                            <h3 className={`mt-1.5 font-display text-base font-black leading-6 tracking-tight ${theme.heading}`}>{cert.title}</h3>
                            <div className={`mt-3 space-y-1 text-xs ${theme.muted}`}>
                              <p>Issued: {cert.issued}</p>
                              {cert.expires && <p>Expires: {cert.expires}</p>}
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
                        <div className="mt-4 h-px bg-gradient-to-r from-amber-400/25 via-amber-400/8 to-transparent" />
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── SERVICES ───────────────────────────────────────────────────── */}
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
              <motion.div key={item.title} variants={itemVariant}>
                <TiltCard intensity={8} className="group h-full">
                  <SpotlightCard className={`h-full rounded-[28px] border p-7 transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    <div className={`mb-4 font-display text-5xl font-black leading-none ${theme.numeral}`}>{item.num}</div>
                    <div
                      className="mb-5 inline-flex rounded-2xl border p-3 transition duration-300 group-hover:scale-110"
                      style={{ borderColor: `${item.accent}33`, background: `${item.accent}12`, color: item.accent }}
                    >
                      {item.icon}
                    </div>
                    <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>{item.title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{item.text}</p>
                    <div className="mt-5 h-px" style={{ background: `linear-gradient(to right, ${item.accent}40, transparent)` }} />
                    <p className={`mt-4 text-xs tracking-[0.18em] uppercase ${theme.muted2}`}>Clean execution</p>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── CONTACT ────────────────────────────────────────────────────── */}
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
                  <a href="mailto:chrislorddizon10@gmail.com" className="mt-2 block text-sm font-semibold transition hover:text-amber-400">
                    chrislorddizon10@gmail.com
                  </a>
                </div>
                <div className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Availability</p>
                  <p className={`mt-2 text-sm ${theme.muted}`}>Open for internships, collaborations, and entry-level roles.</p>
                </div>
                <div className={`rounded-[22px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Helpful details</p>
                  <div className="mt-3 space-y-2">
                    {contactChecklist.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <p className={`text-sm leading-6 ${theme.muted}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={item.label}
                      whileHover={{ y: -4, scale: 1.1 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 ${theme.card} ${theme.cardHover}`}
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              ref={contactFormRef}
              onSubmit={handleContactSubmit}
              onInput={() => { if (isSubmitted) setIsSubmitted(false); }}
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative overflow-hidden rounded-[36px] border p-8 md:p-10 ${theme.card}`}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-amber-400/7 blur-3xl" />
                <div className="absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-cyan-400/7 blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>Send a message</h3>
                    <p className={`mt-1.5 text-sm ${theme.muted}`}>Fill out the form and I'll respond as soon as possible.</p>
                  </div>
                  <span className={`hidden shrink-0 rounded-full border px-3 py-1.5 text-[10px] tracking-wide md:inline-block ${darkMode ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300" : "border-emerald-500/20 bg-emerald-500/8 text-emerald-700"}`}>
                    Available
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className={`rounded-[28px] border p-8 text-center ${darkMode ? "border-emerald-400/15 bg-emerald-400/6" : "border-emerald-500/15 bg-emerald-500/6"}`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${darkMode ? "bg-emerald-400/12 text-emerald-300" : "bg-emerald-500/10 text-emerald-600"}`}
                      >
                        <CheckCircle2 size={26} />
                      </motion.div>
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
                            <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>{field.label}</label>
                            <input
                              type={field.type}
                              name={field.name}
                              required
                              placeholder={field.placeholder}
                              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${theme.inputBase}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          required
                          placeholder="What is this about?"
                          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${theme.inputBase}`}
                        />
                      </div>

                      <div className="mt-4">
                        <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>Message</label>
                        <textarea
                          name="message"
                          required
                          rows={6}
                          placeholder="Write your message here..."
                          className={`w-full resize-y rounded-2xl border px-4 py-3 text-sm outline-none ${theme.inputBase}`}
                        />
                      </div>

                      <input type="hidden" name="to_name" value="Chrislord Dizon" readOnly />

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <motion.button
                          type="submit"
                          disabled={isSending}
                          whileHover={{ y: isSending ? 0 : -2, scale: isSending ? 1 : 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition ${isSending ? "opacity-70" : ""} ${theme.primaryBtn}`}
                        >
                          {isSending ? (
                            <>
                              Sending...
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                              />
                            </>
                          ) : (
                            <>
                              Send Message <Send size={15} />
                            </>
                          )}
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

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
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