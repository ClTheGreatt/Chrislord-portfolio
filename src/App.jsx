import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence, motion,
  useMotionValue, useReducedMotion, useScroll, useSpring,
  useTransform, useInView, useVelocity,
} from "framer-motion";
import {
  AlertCircle, ArrowRight, Award, BadgeCheck, Briefcase,
  CheckCircle2, ChevronRight, Code2, ExternalLink, Eye,
  FolderKanban, GraduationCap, Mail, Menu, Monitor, Moon,
  PenTool, Send, Shield, ShieldCheck, Sparkles, Sun, User,
  X, Zap, Star, Globe, Cpu, MapPin, Clock, TrendingUp,
  ArrowUp, ChevronDown, Terminal, Layers,
} from "lucide-react";
import {
  FaCss3Alt, FaEnvelope, FaFacebookF, FaFigma, FaGitAlt,
  FaGithub, FaHtml5, FaInstagram, FaJs, FaLinkedinIn, FaReact,
} from "react-icons/fa";
import { SiFramer, SiTailwindcss, SiVite } from "react-icons/si";

// ─── DATA ──────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certifications" },
  { label: "Services",     href: "#services" },
  { label: "Contact",      href: "#contact" },
];

const skills = [
  { name: "HTML5",        icon: <FaHtml5 size={32} />,       color: "#E44D26", level: 90, featured: true,  size: "large" },
  { name: "CSS3",         icon: <FaCss3Alt size={32} />,     color: "#264DE4", level: 88, featured: true,  size: "large" },
  { name: "JavaScript",   icon: <FaJs size={32} />,          color: "#F7DF1E", level: 82, featured: true,  size: "large" },
  { name: "React",        icon: <FaReact size={28} />,       color: "#61DAFB", level: 80, featured: true,  size: "medium" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} />, color: "#38B2AC", level: 85, featured: true,  size: "medium" },
  { name: "Framer Motion",icon: <SiFramer size={24} />,      color: "#BB22FF", level: 75, featured: false, size: "small" },
  { name: "Git",          icon: <FaGitAlt size={24} />,      color: "#F05032", level: 78, featured: false, size: "small" },
  { name: "Figma",        icon: <FaFigma size={24} />,       color: "#F24E1E", level: 72, featured: false, size: "small" },
  { name: "Vite",         icon: <SiVite size={24} />,        color: "#646CFF", level: 80, featured: false, size: "small" },
];

const tickerSkills = [
  "JavaScript","HTML","CSS","React","Tailwind CSS",
  "Responsive Design","Animation","Networking Fundamentals",
  "Cybersecurity Basics","UI Structure","Frontend Development","System Design",
];

const timeline = [
  { year: "2023", label: "Started BSIT",    text: "Enrolled at BSPUC, major in Network and Web Application.", icon: <GraduationCap size={14}/> },
  { year: "2024", label: "First Projects",  text: "Built first React projects — IP Calculator, Password Checker.", icon: <Code2 size={14}/> },
  { year: "2025", label: "Certifications",  text: "Earned 10+ certifications in JS, networking, cybersecurity, and AI.", icon: <Award size={14}/> },
  { year: "2026", label: "Now",             text: "Building stronger projects, improving UI/UX, and open to internships.", icon: <Star size={14}/> },
];

const projectFilters = ["All","Featured","React","Security","School","Frontend"];

const projects = [
  {
    id: 1, title: "Campus IT Support Ticketing System",
    category: "Featured", tags: ["React","Frontend","School"],
    image: "/projects/campus-it-supportt.png",
    shortDescription: "A campus IT ticketing platform with authentication, role-based access, technician assignment, comments, and reporting.",
    longDescription: "Campus IT Support Ticketing System is a full-stack service desk web application built to manage campus technology concerns in a structured and secure way.",
    problem: "Campus technical issues are often reported informally, making tracking and follow-up inconsistent.",
    solution: "I built a ticketing workflow with authentication, role-based access, status management, comments, and reporting tools.",
    outcome: "Demonstrates practical system thinking, frontend implementation, and authentication flows for a real school use case.",
    stack: ["React","Vite","Supabase","PostgreSQL","RLS","Framer Motion"],
    live: "https://campus-it-support.vercel.app",
    github: "https://github.com/ClTheGreatt/campus-it-support",
    featured: true, color: "#F7DF1E", accentColor: "#fbbf24",
  },
  {
    id: 2, title: "Portfolio Website",
    category: "Frontend", tags: ["React","Frontend"],
    image: "/profile.png",
    shortDescription: "A personal portfolio site focused on stronger layout hierarchy, motion, and polished project presentation.",
    longDescription: "Designed to present my background, project work, certifications, and technical direction in a professional way.",
    problem: "Many student portfolios feel plain or cluttered, weakening the presentation of actual work.",
    solution: "A portfolio with stronger section pacing, improved card layouts, cleaner modals, and controlled animation.",
    outcome: "Presents my work in a clearer, more credible, and memorable format.",
    stack: ["React","Vite","Tailwind CSS","Framer Motion"],
    live: "#home", github: "https://github.com/ClTheGreatt",
    featured: false, color: "#61DAFB", accentColor: "#22d3ee",
  },
  {
    id: 3, title: "IP Subnet Calculator",
    category: "Frontend", tags: ["Frontend","React","School"],
    image: "/projects/ip-subnet-calculator.jpg",
    shortDescription: "A responsive IPv4 subnet calculator generating subnet masks, host ranges, network addresses, and broadcast addresses.",
    longDescription: "Networking utility built with React that computes subnet information from an IPv4 address and CIDR prefix.",
    problem: "Subnetting calculations done manually are slower and more error-prone.",
    solution: "A calculator that validates input and returns subnet results instantly in a clean layout.",
    outcome: "Shows practical networking knowledge combined with frontend implementation.",
    stack: ["React","Vite","JavaScript","CSS"],
    live: "https://ip-subnet-calculator-five.vercel.app/",
    github: "https://github.com/ClTheGreatt/ip-subnet-calculator",
    featured: false, color: "#38B2AC", accentColor: "#14b8a6",
  },
  {
    id: 4, title: "Password Strength Checker",
    category: "Frontend", tags: ["Frontend","React","Security"],
    image: "/projects/password-strength-checker.jpg",
    shortDescription: "A responsive password checker evaluating quality using length, character variety, and common risk patterns.",
    longDescription: "React-based utility for reviewing password quality in real time with live score, checklist, and suggestions.",
    problem: "Weak passwords are created without clear feedback, leading to predictable credentials.",
    solution: "An interactive tool that scores password quality instantly and highlights improvements.",
    outcome: "Demonstrates frontend UI combined with security-focused logic.",
    stack: ["React","Vite","JavaScript","CSS"],
    live: "https://password-strength-checker-tawny.vercel.app/",
    github: "https://github.com/ClTheGreatt/password-strength-checker",
    featured: false, color: "#F05032", accentColor: "#f97316",
  },
];

const certCategories = ["All","AI","Web Dev","Security","Microsoft","Networking","Language","Management"];
const certCategoryMap = {
  "AI":         ["Google AI","AI for Data Analysis","AI for Writing and Communicating","AI for Research and Insights","AI for Brainstorming and Planning","AI for Content Creation","AI Fundamentals"],
  "Web Dev":    ["IT Specialist - JavaScript","IC3 Digital Literacy Certification"],
  "Security":   ["Introduction to Cybersecurity","Network Security"],
  "Microsoft":  ["Introduction to Computers","Device Configuration and Management (Windows 11)"],
  "Networking": ["Networking","Introduction to Technical Support"],
  "Language":   ["EF SET English Certificate 63/100 (C1 Advanced)"],
  "Management": ["PMI Project Management Ready"],
};

const certifications = [
  { title: "PMI Project Management Ready",                     issuer: "Project Management Institute",  issued: "Oct 2025", image: "/projects/pmi.png",                             credentialId: "0c4a920d-d9b1-4cbe-8f2e-f5e608fbcd8b" },
  { title: "Networking",                                       issuer: "Certiport - Pearson VUE",        issued: "Nov 2025", image: "/projects/networking.png",                       credentialId: "wN22p-2F9s" },
  { title: "Introduction to Cybersecurity",                    issuer: "Cisco Networking Academy",       issued: "Oct 2025", image: "/projects/introduction-to-cybersecurity.png",    credentialId: "1584192c-67c2-48db-8f93-1b862bd84c31" },
  { title: "IT Specialist - JavaScript",                       issuer: "Certiport - Pearson VUE",        issued: "May 2025", image: "/projects/javascript.png",                       credentialId: "a074e955-3b92-44f6-a81e-469692ba1ac5" },
  { title: "Introduction to Computers",                        issuer: "Microsoft",                      issued: "Apr 2026", image: "/projects/introduction-to-computers.png",         credentialId: "4FR1YMCVS3Q0" },
  { title: "Introduction to Technical Support",                issuer: "IBM",                            issued: "Apr 2026", image: "/projects/introduction-to-technical-support.png", credentialId: "D1RAQ0YUNDZ2" },
  { title: "Network Security",                                 issuer: "Certiport - Pearson VUE",        issued: "Apr 2026", image: "/projects/network-security.png",                  credentialId: "ye7p-uTnU", expires: "Apr 2031" },
  { title: "EF SET English Certificate 63/100 (C1 Advanced)",  issuer: "EF SET",                         issued: "Apr 2026", image: "/projects/efset.png",                            credentialId: "Vvxis3" },
  { title: "Google AI",                                        issuer: "Google",                         issued: "Apr 2026", image: "/projects/google-ai.png",                         credentialId: "XFE0KM0OTCHN" },
  { title: "AI for Data Analysis",                             issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-data-analysis.png",                  credentialId: "6J3CS7L11M0H" },
  { title: "AI for Writing and Communicating",                 issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-writing.png",                        credentialId: "Q7A88MAPP275" },
  { title: "AI for Research and Insights",                     issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-research.png",                       credentialId: "YQ7QJZ4I5YPU" },
  { title: "AI for Brainstorming and Planning",                issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-brainstorming.png",                  credentialId: "VXBHKJ29S0DE" },
  { title: "AI for Content Creation",                          issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-content-creation.png",               credentialId: "17860HTYDC2Y" },
  { title: "AI Fundamentals",                                  issuer: "Google",                         issued: "Apr 2026", image: "/projects/ai-fundamentals.png",                   credentialId: "9YMG28VFJGKS" },
  { title: "IC3 Digital Literacy Certification",               issuer: "Certiport - Pearson VUE",        issued: "Nov 2025", image: "/projects/ic3.png",                               credentialId: "493406d5-2914-40a2-a8fe-e7a76dced883" },
  { title: "Device Configuration and Management (Windows 11)", issuer: "Certiport - Pearson VUE",        issued: "Apr 2026", image: "/projects/Device-Configuration.jpg",             credentialId: "MLAq-s4qq" },
];

const services = [
  { title: "Frontend Development",      text: "Responsive interfaces and practical web builds focused on usability.",                            icon: <Monitor size={24}/>, num: "01", accent: "#61DAFB" },
  { title: "UI / UX Design",            text: "Clear hierarchy, stronger spacing, and more polished presentation.",                              icon: <PenTool size={24}/>, num: "02", accent: "#BB22FF" },
  { title: "Technical Support Systems", text: "Projects informed by networking, security basics, and structured problem-solving.",                icon: <Shield size={24}/>,  num: "03", accent: "#38B2AC" },
];

const socialLinks = [
  { href: "https://github.com/ClTheGreatt",                          icon: <FaGithub size={18}/>,     label: "GitHub" },
  { href: "https://www.linkedin.com/in/chrislord-dizon-ab2420401/",  icon: <FaLinkedinIn size={18}/>, label: "LinkedIn" },
  { href: "https://www.facebook.com/chrislorddizon",                 icon: <FaFacebookF size={18}/>,  label: "Facebook" },
  { href: "https://www.instagram.com/cld_dz/?hl=en",                icon: <FaInstagram size={18}/>,  label: "Instagram" },
  { href: "mailto:chrislorddizon10@gmail.com",                       icon: <FaEnvelope size={18}/>,   label: "Email" },
];

const loadingSteps = [
  { label: "Booting system...",      pct: 15 },
  { label: "Loading assets...",      pct: 38 },
  { label: "Building interface...",  pct: 62 },
  { label: "Applying animations...", pct: 85 },
  { label: "Ready.",                 pct: 100 },
];

const typewriterWords = [
  "Frontend Developer","UI/UX Enthusiast","React Developer","Tech Student","Problem Solver",
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
};

const itemV = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. IMMERSIVE AURORA BACKGROUND
//    4 large blobs that drift via Framer Motion animate, layered under
//    a noise SVG texture overlay for that "glassmorphism" grain feel.
// ═══════════════════════════════════════════════════════════════════════════

const AURORA_BLOBS = [
  { color: "radial-gradient(circle, rgba(251,191,36,0.28) 0%, transparent 70%)",    size: 700, x: "-5%",  y: "2%",   dur: 18, delay: 0 },
  { color: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, transparent 70%)",    size: 600, x: "65%",  y: "-5%",  dur: 22, delay: 3 },
  { color: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",   size: 650, x: "30%",  y: "55%",  dur: 26, delay: 6 },
  { color: "radial-gradient(circle, rgba(52,211,153,0.14) 0%, transparent 70%)",    size: 550, x: "80%",  y: "70%",  dur: 20, delay: 9 },
];

function AuroraBackground({ darkMode, prefersReducedMotion }) {
  return (
    <div className="aurora-root pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 20% 10%, #0b1a3a 0%, #050912 50%, #010308 100%)"
            : "radial-gradient(ellipse at 20% 10%, #fff9f0 0%, #f5eedd 55%, #ede4d3 100%)",
        }}
      />

      {/* Aurora blobs */}
      {AURORA_BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  blob.size,
            height: blob.size,
            left:   blob.x,
            top:    blob.y,
            background: darkMode ? blob.color
              : blob.color.replace(/rgba\((\d+,\d+,\d+),[\d.]+\)/g, (m, rgb) => `rgba(${rgb},0.12)`),
            filter: "blur(80px)",
            willChange: "transform",
          }}
          animate={prefersReducedMotion ? undefined : {
            x:      [0,  80, -40,  60, 0],
            y:      [0, -60,  80, -30, 0],
            scale:  [1, 1.15, 0.9, 1.1, 1],
            opacity: [0.7, 1, 0.75, 0.95, 0.7],
          }}
          transition={{
            duration: blob.dur,
            repeat:   Infinity,
            ease:     "easeInOut",
            delay:    blob.delay,
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="noise-overlay absolute inset-0 opacity-[0.055]"
        style={{ mixBlendMode: darkMode ? "screen" : "multiply" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "radial-gradient(circle at center, transparent 40%, rgba(1,3,8,0.65) 100%)"
            : "radial-gradient(circle at center, transparent 48%, rgba(237,228,211,0.72) 100%)",
        }}
      />

      {/* Subtle grid */}
      <div className={`grid-layer absolute inset-0 ${darkMode ? "opacity-[0.04]" : "opacity-[0.03]"}`} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. MAGNETIC CUSTOM CURSOR
//    Two-layer cursor: inner dot (instant) + outer ring (spring-lagged).
//    Morphs on hover: expands, shifts color, shows label.
//    Completely hidden on touch/mobile.
// ═══════════════════════════════════════════════════════════════════════════

function MagneticCursor({ darkMode }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Outer ring lags behind with spring
  const ox = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.6 });
  const oy = useSpring(my, { stiffness: 140, damping: 22, mass: 0.6 });

  const [cursorState, setCursorState] = useState("default"); // default | hover | click | text | link
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const onMove  = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const onDown  = ()  => setCursorState((s) => s === "hover" ? "click" : "click");
    const onUp    = ()  => setCursorState((s) => s === "click" ? "default" : s);

    // Detect hoverable elements
    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const label = el.getAttribute("data-cursor-label") || "";
          setCursorLabel(label);
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            setCursorState("text");
          } else if (el.tagName === "A") {
            setCursorState("link");
          } else {
            setCursorState("hover");
          }
        });
        el.addEventListener("mouseleave", () => {
          setCursorState("default");
          setCursorLabel("");
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    attachHover();

    // Re-attach on DOM changes
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      obs.disconnect();
    };
  }, [mx, my]);

  // Dot size & color variants
  const dotConfig = {
    default: { size: 10, color: darkMode ? "#fbbf24" : "#d97706" },
    hover:   { size:  6, color: darkMode ? "#ffffff" : "#0a0c14" },
    click:   { size:  4, color: darkMode ? "#fbbf24" : "#d97706" },
    link:    { size:  5, color: darkMode ? "#67e8f9" : "#0ea5e9" },
    text:    { size:  2, color: darkMode ? "#fbbf24" : "#d97706" },
  };

  // Ring size variants
  const ringConfig = {
    default: { size: 36, borderColor: darkMode ? "rgba(251,191,36,0.35)" : "rgba(9,17,31,0.2)" },
    hover:   { size: 52, borderColor: darkMode ? "rgba(251,191,36,0.7)" : "rgba(9,17,31,0.5)" },
    click:   { size: 28, borderColor: darkMode ? "rgba(251,191,36,0.9)" : "rgba(9,17,31,0.7)" },
    link:    { size: 48, borderColor: darkMode ? "rgba(103,232,249,0.65)" : "rgba(14,165,233,0.55)" },
    text:    { size:  3, borderColor: "transparent" },
  };

  const dot  = dotConfig[cursorState]  || dotConfig.default;
  const ring = ringConfig[cursorState] || ringConfig.default;
  const showLabel = cursorLabel && (cursorState === "hover" || cursorState === "link");

  return (
    <>
      {/* Inner dot — instant tracking */}
      <motion.div
        className="cursor-dot pointer-events-none fixed z-[999] hidden md:block rounded-full"
        style={{
          x: mx, y: my,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: dot.color,
          boxShadow: `0 0 12px 2px ${dot.color}88`,
        }}
        animate={{ width: dot.size, height: dot.size }}
        transition={{ type: "spring", stiffness: 900, damping: 40 }}
      />

      {/* Outer ring — spring-lagged */}
      <motion.div
        className="cursor-ring pointer-events-none fixed z-[998] hidden md:flex items-center justify-center rounded-full border-2"
        style={{
          x: ox, y: oy,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: ring.borderColor,
          backdropFilter: cursorState === "hover" || cursorState === "link" ? "blur(2px)" : "none",
          backgroundColor: cursorState === "hover"
            ? (darkMode ? "rgba(251,191,36,0.08)" : "rgba(9,17,31,0.06)")
            : cursorState === "link"
              ? (darkMode ? "rgba(103,232,249,0.06)" : "rgba(14,165,233,0.05)")
              : "transparent",
        }}
        animate={{ width: ring.size, height: ring.size }}
        transition={{ type: "spring", stiffness: 250, damping: 28 }}
      >
        <AnimatePresence>
          {showLabel && (
            <motion.span
              key={cursorLabel}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="pointer-events-none select-none whitespace-nowrap text-[9px] font-bold uppercase tracking-widest"
              style={{ color: dot.color }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Text cursor beam */}
      {cursorState === "text" && (
        <motion.div
          className="cursor-beam pointer-events-none fixed z-[999] hidden md:block"
          style={{
            x: mx, y: my,
            translateX: "-50%",
            translateY: "-50%",
            width: 2,
            height: 22,
            borderRadius: 2,
            background: darkMode ? "#fbbf24" : "#d97706",
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. 3D TILT PROJECT CARD WITH GLARE
//    useMotionValue + useTransform for real-time 3D tilt.
//    A radial "glare" highlight tracks mouse position inside the card.
//    Works on mouse; touch falls back gracefully.
// ═══════════════════════════════════════════════════════════════════════════

function TiltProjectCard({ children, className = "", accentColor = "#fbbf24", intensity = 14 }) {
  const ref = useRef(null);

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const glareX = useMotionValue(50); // % position
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [ intensity, -intensity]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity,  intensity]), { stiffness: 120, damping: 18 });
  const scale   = useSpring(1, { stiffness: 200, damping: 22 });

  const glareOpacity = useSpring(0, { stiffness: 200, damping: 24 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    glareX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glareY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }, [rawX, rawY, glareX, glareY]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.025);
    glareOpacity.set(1);
  }, [scale, glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }, [rawX, rawY, scale, glareOpacity]);

  // Glare radial gradient follows mouse
  const glareStyle = {
    position: "absolute", inset: 0, borderRadius: "inherit",
    pointerEvents: "none", zIndex: 10,
    opacity: glareOpacity,
    background: useTransform(
      [glareX, glareY],
      ([gx, gy]) =>
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`
    ),
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glare layer */}
      <motion.div style={glareStyle} />

      {/* Accent edge glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: glareOpacity,
          boxShadow: `0 0 0 1px ${accentColor}44, 0 24px 80px ${accentColor}22`,
          zIndex: 1,
        }}
      />

      {/* Card content sits at z:2 so it's above glare */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. MAGNETIC NAV LINK
//    Each nav item has a magnetic attraction: cursor proximity causes
//    the element to drift toward the cursor with a spring.
// ═══════════════════════════════════════════════════════════════════════════

function MagneticNavLink({ href, children, isActive, theme, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const PULL_RADIUS = 70;
    if (dist < PULL_RADIUS) {
      const strength = (1 - dist / PULL_RADIUS) * 0.38;
      x.set(dx * strength);
      y.set(dy * strength);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition duration-200 ${
        isActive ? (theme.darkMode ? "text-[#111]" : "text-white") : theme.muted
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="navPill"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className={`absolute inset-0 rounded-full ${theme.darkMode ? "bg-white" : "bg-[#09111f]"}`}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. SCROLLYTELLING PROJECT IMAGE
//    useScroll (element-based) + useTransform: scale + subtle rotate
//    as the project card enters the viewport.
// ═══════════════════════════════════════════════════════════════════════════

function ScrollyProjectImage({ src, alt, accentColor }) {
  const ref   = useRef(null);
  const { scrollYProgress } = useScroll({
    target:  ref,
    offset: ["start end", "end start"],
  });

  const scale  = useTransform(scrollYProgress, [0, 0.4, 1], [1.12, 1.0, 1.06]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2,   0,   1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.6]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ borderRadius: "inherit" }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ scale, rotate, opacity }}
        className="h-full w-full object-cover object-top"
        transition={{ ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div
        className="absolute inset-x-0 bottom-0 h-1.5"
        style={{ background: `linear-gradient(90deg, ${accentColor}99, transparent)` }}
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// LOADING SCREEN
// ───────────────────────────────────────────────────────────────────────────

function IntroScreen({ darkMode, prefersReducedMotion }) {
  const [stepIdx,  setStepIdx]  = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase,    setPhase]    = useState("draw");
  const [glitch,   setGlitch]   = useState(false);

  const cPath = "M 72 28 C 40 28 18 48 18 72 C 18 96 40 116 72 116 C 88 116 102 110 112 100";
  const lPath = "M 40 28 L 40 116 L 100 116";

  useEffect(() => {
    const total  = prefersReducedMotion ? 700 : 2700;
    const start  = performance.now();
    const steps  = [0, 0.18, 0.40, 0.65, 0.85].map(f => f * total);
    const timers = steps.map((t, i) => setTimeout(() => setStepIdx(i), t));
    let raf;
    const tick = now => {
      const p = Math.min(((now - start) / total) * 100, 100);
      setProgress(p);
      if (p >= 100) setPhase("done"); else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const holdTimer = setTimeout(() => setPhase("hold"), 900);
    let glitchInt;
    if (!prefersReducedMotion) {
      glitchInt = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 60 + Math.random() * 80);
      }, 500 + Math.random() * 500);
    }
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(holdTimer);
      cancelAnimationFrame(raf);
      clearInterval(glitchInt);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none
        ${darkMode ? "bg-[#010308]" : "bg-[#f5f0e8]"}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,#000 2px,#000 4px)" }}
      />
      {!prefersReducedMotion && [1, 2, 3, 4].map(i => (
        <motion.div key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.12, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
          className="absolute rounded-full border border-amber-400/30"
          style={{ width: 180 + i * 90, height: 180 + i * 90 }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15),transparent_55%)]" />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
          style={{ width: 160, height: 160 }}
        >
          <motion.div animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-amber-400/20" />
          <motion.div animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-amber-400/10" />
          {!prefersReducedMotion && [0, 120, 240].map((deg, i) => (
            <motion.div key={i} className="absolute inset-0"
              animate={{ rotate: [deg, deg + 360] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-amber-400"
                style={{ boxShadow: "0 0 8px 3px rgba(251,191,36,0.7)" }} />
            </motion.div>
          ))}
          <svg viewBox="0 0 140 144" className="absolute inset-0 w-full h-full p-4" fill="none">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx="70" cy="72" r="62"
              fill={darkMode ? "rgba(251,191,36,0.06)" : "rgba(251,191,36,0.08)"}
              stroke="rgba(251,191,36,0.25)" strokeWidth="1" />
            <motion.path d={cPath} stroke="#fbbf24" strokeWidth="10" strokeLinecap="round" fill="none" filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
            <motion.path d={lPath} stroke="#fbbf24" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} />
            {phase !== "draw" && (
              <motion.path d={`${cPath} M ${lPath.slice(2)}`} stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0, opacity: 0.8 }} animate={{ pathLength: 1, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }} />
            )}
          </svg>
        </motion.div>
        <motion.h1
          data-text="Chrislord Dizon"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className={`font-display text-5xl md:text-7xl font-black tracking-[-0.04em] leading-none text-center mb-2
            ${glitch ? "intro-glitch" : ""} ${darkMode ? "text-white" : "text-[#09111f]"}`}
        >
          Chrislord <span className="text-amber-400" style={{ filter: "drop-shadow(0 0 20px rgba(251,191,36,0.5))" }}>Dizon</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          className={`mb-10 text-[11px] tracking-[0.42em] uppercase font-semibold ${darkMode ? "text-white/30" : "text-black/30"}`}>
          Frontend Developer · Portfolio
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="w-64 flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <AnimatePresence mode="wait">
              <motion.span key={stepIdx}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className={`text-[10px] tracking-[0.24em] uppercase font-semibold ${darkMode ? "text-white/38" : "text-black/38"}`}>
                {loadingSteps[stepIdx]?.label}
              </motion.span>
            </AnimatePresence>
            <span className={`font-display text-sm font-black tabular-nums ${darkMode ? "text-amber-300" : "text-amber-600"}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={`relative h-[2px] w-full rounded-full overflow-hidden ${darkMode ? "bg-white/8" : "bg-black/10"}`}>
            <motion.div className="h-full rounded-full" style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a,#fbbf24)",
              boxShadow: "0 0 12px rgba(251,191,36,0.65)",
            }} />
            <motion.div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white"
              style={{ left: `calc(${progress}% - 5px)`, boxShadow: "0 0 8px 2px rgba(251,191,36,1)" }} />
          </div>
          <div className="flex justify-between mt-1">
            {loadingSteps.map((_, i) => (
              <motion.div key={i}
                animate={{ scale: i <= stepIdx ? 1 : 0.5, opacity: i <= stepIdx ? 1 : 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                style={i <= stepIdx ? { boxShadow: "0 0 5px rgba(251,191,36,0.8)" } : {}} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────

function ScrollProgress({ darkMode }) {
  const { scrollYProgress } = useScroll();
  const scaleX   = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.2 });
  const velocity = useVelocity(scrollYProgress);
  const skewX    = useTransform(velocity, [-0.5, 0, 0.5], ["-6deg", "0deg", "6deg"]);
  return (
    <>
      <motion.div style={{ scaleX, skewX }}
        className={`fixed inset-x-0 top-0 z-[80] h-[3px] origin-left
          ${darkMode ? "bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-300"
                     : "bg-gradient-to-r from-amber-500 via-amber-400 to-sky-500"}`} />
      <motion.div style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[79] h-[12px] origin-left blur-md bg-gradient-to-r from-amber-400/40 to-cyan-300/30" />
    </>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────

function BackToTop({ darkMode }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    return scrollYProgress.on("change", v => setVisible(v > 0.2));
  }, [scrollYProgress]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center
            rounded-full border shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1
            ${darkMode
              ? "border-white/12 bg-[#0a0d1a]/90 text-white hover:bg-amber-400/20 hover:border-amber-400/40 backdrop-blur-xl"
              : "border-black/10 bg-white/90 text-[#09111f] hover:bg-amber-50 hover:border-amber-400/40 backdrop-blur-xl"}`}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── PARTICLE FIELD ───────────────────────────────────────────────────────

function ParticleField({ darkMode, prefersReducedMotion }) {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const COUNT = 65;
    const mkP = (x, y) => ({
      x: x ?? Math.random() * W, y: y ?? Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4, pulse: Math.random() * Math.PI * 2,
      life: 1, burst: false,
    });
    const pts = Array.from({ length: COUNT }, () => mkP());
    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onClick = e => {
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2, sp = 1.5 + Math.random() * 4;
        const p = mkP(e.clientX, e.clientY);
        p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp;
        p.r = Math.random() * 2.5 + 1; p.burst = true;
        pts.push(p);
      }
    };
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        if (pts[i].burst) { pts[i].life -= 0.022; if (pts[i].life <= 0) pts.splice(i, 1); }
      }
      for (const p of pts) {
        if (!p.burst) {
          const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) { const f = (140 - d) / 140 * 0.55; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        }
        p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy; p.pulse += 0.022;
        if (!p.burst) { if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; }
        const alpha = p.burst ? p.life * 0.85 : 0.11 + Math.sin(p.pulse) * 0.05;
        const rr    = p.r + (p.burst ? 0 : Math.sin(p.pulse) * 0.3);
        ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? `rgba(251,191,36,${alpha})` : `rgba(245,158,11,${alpha * 0.5})`;
        ctx.fill();
      }
      const base = pts.slice(0, COUNT);
      for (let i = 0; i < base.length; i++) {
        for (let j = i + 1; j < base.length; j++) {
          const dx = base[i].x - base[j].x, dy = base[i].y - base[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath(); ctx.moveTo(base[i].x, base[i].y); ctx.lineTo(base[j].x, base[j].y);
            ctx.strokeStyle = darkMode ? `rgba(251,191,36,${(1 - d / 115) * 0.12})` : `rgba(245,158,11,${(1 - d / 115) * 0.05})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        const dx = base[i].x - mx, dy = base[i].y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 210) {
          ctx.beginPath(); ctx.moveTo(base[i].x, base[i].y); ctx.lineTo(mx, my);
          ctx.strokeStyle = darkMode ? `rgba(251,191,36,${(1 - d / 210) * 0.18})` : `rgba(245,158,11,${(1 - d / 210) * 0.09})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, [darkMode, prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.5 }} />;
}

// ─── MOUSE GLOW ───────────────────────────────────────────────────────────

function MouseGlow({ darkMode, prefersReducedMotion }) {
  const mx = useMotionValue(-400), my = useMotionValue(-400);
  const sx = useSpring(mx, { damping: 38, stiffness: 160 });
  const sy = useSpring(my, { damping: 38, stiffness: 160 });
  const ox = useSpring(mx, { damping: 55, stiffness: 80 });
  const oy = useSpring(my, { damping: 55, stiffness: 80 });
  useEffect(() => {
    if (prefersReducedMotion) return;
    const move = e => { mx.set(e.clientX - 250); my.set(e.clientY - 250); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, prefersReducedMotion]);
  if (prefersReducedMotion) return null;
  return (
    <>
      <motion.div style={{ x: sx, y: sy }} className={`pointer-events-none fixed left-0 top-0 z-0 hidden md:block
        h-[480px] w-[480px] rounded-full blur-[130px] ${darkMode ? "bg-amber-500/[0.07]" : "bg-amber-400/10"}`} />
      <motion.div style={{ x: ox, y: oy }} className={`pointer-events-none fixed left-0 top-0 z-0 hidden md:block
        h-[280px] w-[280px] rounded-full blur-[80px] ${darkMode ? "bg-cyan-600/[0.05]" : "bg-sky-400/7"}`} />
    </>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────

function SectionDivider({ darkMode }) {
  return (
    <div className="mx-auto my-2 max-w-7xl px-6">
      <div className="relative h-px">
        <div className={`h-px w-full ${darkMode ? "bg-white/8" : "bg-black/8"}`} />
        <motion.div animate={{ x: ["-5%", "110%"] }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-56 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45
          rounded-[2px] border border-amber-400/50 bg-amber-400/20"
          style={{ boxShadow: "0 0 9px rgba(251,191,36,0.35)" }} />
      </div>
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────

function SectionHeader({ icon, label, num, title, subtitle, theme }) {
  return (
    <motion.div {...fadeUp} className="relative">
      {num && (
        <div className={`pointer-events-none absolute -top-10 right-0 hidden select-none
          font-display text-[9rem] font-black leading-none lg:block ${theme.numeral}`}>{num}</div>
      )}
      <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2
        text-[11px] tracking-[0.22em] uppercase ${theme.chip}`}>{icon}{label}</div>
      <h2 className={`max-w-4xl font-display text-4xl font-black leading-[0.96] tracking-tight md:text-6xl ${theme.heading}`}>{title}</h2>
      {subtitle && <p className={`mt-5 max-w-2xl text-base leading-8 ${theme.muted}`}>{subtitle}</p>}
    </motion.div>
  );
}

// ─── SPOTLIGHT CARD ──────────────────────────────────────────────────────

function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);
  const [s, setS] = useState({ x: 0, y: 0, v: false });
  return (
    <div ref={ref}
      onMouseMove={e => { const r = ref.current?.getBoundingClientRect(); if (r) setS({ x: e.clientX - r.left, y: e.clientY - r.top, v: true }); }}
      onMouseLeave={() => setS(p => ({ ...p, v: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: s.v ? 1 : 0, background: `radial-gradient(260px circle at ${s.x}px ${s.y}px,rgba(251,191,36,0.09),transparent 55%)` }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_30%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── MAGNETIC BUTTON ─────────────────────────────────────────────────────

function MagBtn({ children, className = "", href, onClick, type }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const props = {
    ref, style: { x: sx, y: sy }, className,
    onMouseMove: e => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      x.set((e.clientX - (r.left + r.width / 2)) * 0.17);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.17);
    },
    onMouseLeave: () => { x.set(0); y.set(0); },
  };
  if (href) return <motion.a href={href} {...props}>{children}</motion.a>;
  return <motion.button type={type || "button"} onClick={onClick} {...props}>{children}</motion.button>;
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────

function Typewriter({ words, darkMode }) {
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi]; let t;
    if (!del) {
      if (txt.length < word.length) t = setTimeout(() => setTxt(word.slice(0, txt.length + 1)), 75 + Math.random() * 45);
      else t = setTimeout(() => setDel(true), 1900);
    } else {
      if (txt.length > 0) t = setTimeout(() => setTxt(txt.slice(0, -1)), 38);
      else { setDel(false); setWi(i => (i + 1) % words.length); }
    }
    return () => clearTimeout(t);
  }, [txt, del, wi, words]);
  return <span className={darkMode ? "text-amber-300" : "text-amber-600"}>{txt}<span className="typewriter-cursor" /></span>;
}

// ─── ANIMATED NUMBER ─────────────────────────────────────────────────────

function AnimNum({ value, suffix = "" }) {
  const ref = useRef(null);
  const iv = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!iv) return;
    const num = parseInt(value); if (isNaN(num)) return;
    let s = 0;
    const t = setInterval(() => { s += Math.ceil(num / 65); if (s >= num) { setN(num); clearInterval(t); } else setN(s); }, 16);
    return () => clearInterval(t);
  }, [iv, value]);
  return <span ref={ref}>{isNaN(parseInt(value)) ? value : n}{suffix}</span>;
}

// ─── FORM FIELD ───────────────────────────────────────────────────────────

function FormField({ label, name, type = "text", placeholder, theme, darkMode, multiline, rows = 5 }) {
  const [val, setVal] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const validate = v => {
    if (!v.trim()) return "This field is required";
    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email";
    return "";
  };
  const error   = touched ? validate(val) : "";
  const isValid = touched && !validate(val) && val.trim();
  const baseClass = `w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all duration-200
    ${error
      ? (darkMode ? "border-red-400/50 bg-red-400/5 text-white" : "border-red-400/50 bg-red-50 text-black")
      : isValid
        ? (darkMode ? "border-emerald-400/40 bg-emerald-400/5 text-white" : "border-emerald-500/30 bg-emerald-50 text-black")
        : theme.inputBase}`;
  const sharedProps = {
    name, id: name, required: true,
    placeholder, value: val,
    onChange: e => setVal(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => { setTouched(true); setFocused(false); },
    className: baseClass,
  };
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={name} className={`text-xs font-semibold uppercase tracking-wide ${theme.muted2}`}>{label}</label>
        <AnimatePresence>
          {isValid && (
            <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              className={`text-xs font-medium ${darkMode ? "text-emerald-300" : "text-emerald-600"}`}>
              <CheckCircle2 size={13} className="inline mr-1" />Valid
            </motion.span>
          )}
          {error && (
            <motion.span initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className={`text-xs font-medium ${darkMode ? "text-red-300" : "text-red-500"}`}>{error}</motion.span>
          )}
        </AnimatePresence>
      </div>
      {multiline
        ? <textarea {...sharedProps} rows={rows} style={{ resize: "vertical" }} className={baseClass + " resize-y"} />
        : <input {...sharedProps} type={type} />
      }
      {multiline && (
        <div className={`mt-1 text-right text-[10px] ${darkMode ? "text-white/25" : "text-black/25"}`}>{val.length} chars</div>
      )}
    </div>
  );
}

// ─── MODAL SHELL ─────────────────────────────────────────────────────────

function ModalShell({ children, onClose, accentColor }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/82 p-4 backdrop-blur-2xl"
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40, rotateX: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[28px]"
        style={{
          background: "rgba(6,10,24,0.97)",
          border: `1px solid ${accentColor || "rgba(255,255,255,0.1)"}33`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor || "rgba(255,255,255,0.05)"}18`,
        }}
        role="dialog" aria-modal="true"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-[28px]"
          style={{ background: accentColor
            ? `linear-gradient(90deg,transparent,${accentColor},transparent)`
            : "linear-gradient(90deg,transparent,rgba(251,191,36,0.5),transparent)" }} />
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── CERTIFICATE MODAL ───────────────────────────────────────────────────

function CertModal({ cert, onClose, theme }) {
  if (!cert) return null;
  return (
    <ModalShell onClose={onClose}>
      <button onClick={onClose} aria-label="Close"
        className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center
          rounded-full border hover:scale-110 hover:rotate-90 transition duration-300 ${theme.closeBtn}`}>
        <X size={15} />
      </button>
      <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1.3fr_0.7fr]">
        <div className="p-4 bg-white/[0.02]">
          <img src={cert.image} alt={cert.title} className="h-full w-full rounded-2xl object-contain" />
        </div>
        <div className="p-7 md:p-9 text-white">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">{cert.issuer}</p>
          <h3 className="mt-3 font-display text-2xl font-black leading-tight tracking-tight md:text-3xl">{cert.title}</h3>
          <div className="mt-4 h-px bg-gradient-to-r from-amber-400/50 via-amber-400/12 to-transparent" />
          <div className="mt-4 space-y-2 text-sm text-white/62">
            <p><span className="font-semibold text-white/80">Issued:</span> {cert.issued}</p>
            {cert.expires && <p><span className="font-semibold text-white/80">Expires:</span> {cert.expires}</p>}
            <p className="break-all"><span className="font-semibold text-white/80">Credential ID:</span> {cert.credentialId}</p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

// ─── PROJECT MODAL ───────────────────────────────────────────────────────

function ProjectModal({ project, onClose, theme }) {
  if (!project) return null;
  return (
    <ModalShell onClose={onClose} accentColor={project.accentColor}>
      <button onClick={onClose} aria-label="Close"
        className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center
          rounded-full border hover:scale-110 hover:rotate-90 transition duration-300 ${theme.closeBtn}`}>
        <X size={15} />
      </button>
      <div className="grid max-h-[90vh] overflow-auto lg:grid-cols-[1fr_0.9fr]">
        <div className="relative min-h-[300px] border-r border-white/8">
          <div className="sticky top-0">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/8">
              {["#f05252","#f5a623","#34d399"].map(c => (
                <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
              <div className="ml-2 flex-1 rounded-md bg-white/[0.06] px-3 py-1 text-[10px] text-white/30">
                {project.live.startsWith("http") ? project.live.replace("https://","") : "localhost:5173"}
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ height: "calc(100% - 38px)" }}>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1.5"
                style={{ background: `linear-gradient(90deg,${project.accentColor}77,transparent)` }} />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto p-7 md:p-9 text-white">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">{project.category}</p>
          <h3 className="mt-3 font-display text-2xl font-black tracking-tight md:text-3xl">{project.title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/62">{project.longDescription}</p>
          <div className="mt-5 space-y-3">
            {[["Problem",project.problem],["Solution",project.solution],["Outcome",project.outcome]].map(([l,t]) => (
              <div key={l} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/36">{l}</p>
                <p className="mt-2 text-xs leading-6 text-white/62">{t}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map(s => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">{s}</span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.live} target={project.live.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${theme.primaryBtn}`}>
              Open Project <ExternalLink size={14} />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${theme.altBtn}`}>
              GitHub <FaGithub size={14} />
            </a>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────

function Toast({ toast, onClose, darkMode }) {
  useEffect(() => { if (!toast) return; const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [toast, onClose]);
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.95 }} className="fixed bottom-20 right-6 z-[160]">
      <div className={`flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-2xl
        ${darkMode ? "border-white/10 bg-[#0a0d1a]/96 text-white" : "border-black/10 bg-white/96 text-[#0a0c14]"}`}
        style={{ boxShadow: ok ? "0 20px 60px rgba(16,185,129,0.18)" : "0 20px 60px rgba(239,68,68,0.18)" }}>
        <div className={`mt-0.5 rounded-full p-1.5 ${ok
          ? (darkMode ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-500/12 text-emerald-700")
          : (darkMode ? "bg-red-400/15 text-red-300" : "bg-red-500/12 text-red-700")}`}>
          {ok ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
        </div>
        <div className="min-w-[200px]">
          <p className="text-sm font-semibold">{toast.title}</p>
          <p className={`mt-1 text-xs leading-5 ${darkMode ? "text-white/55" : "text-black/55"}`}>{toast.message}</p>
        </div>
        <button onClick={onClose} className={darkMode ? "text-white/35 hover:text-white" : "text-black/35 hover:text-black"}>
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── PARALLAX PORTRAIT ───────────────────────────────────────────────────

function Portrait({ darkMode, theme, prefersReducedMotion }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 80, damping: 18 });
  const sy = useSpring(ry, { stiffness: 80, damping: 18 });
  const onMove = e => {
    if (prefersReducedMotion) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 15);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={prefersReducedMotion ? undefined : { rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      className={`relative w-full max-w-[420px] rounded-[36px] border p-3 ${theme.portraitFrame}`}>
      <motion.div animate={prefersReducedMotion ? undefined : { y: [0,-13,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -left-6 top-10 hidden rounded-2xl border px-4 py-3 shadow-2xl lg:block
          ${darkMode ? "border-white/10 bg-[#09101d]/95 text-white" : "border-black/10 bg-white/95 text-[#0a0c14]"}`}
        style={{ transform: "translateZ(44px)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={13} className="text-amber-400" />Frontend Focus</div>
      </motion.div>
      <motion.div animate={prefersReducedMotion ? undefined : { y: [0,12,0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-6 bottom-32 hidden rounded-2xl border px-4 py-3 shadow-2xl lg:block
          ${darkMode ? "border-white/10 bg-[#09101d]/95 text-white" : "border-black/10 bg-white/95 text-[#0a0c14]"}`}
        style={{ transform: "translateZ(44px)", backdropFilter: "blur(20px)" }}>
        <div className="text-[10px] uppercase tracking-[0.22em] text-amber-400">Certifications</div>
        <div className="mt-1 font-display text-lg font-black">17+ earned</div>
      </motion.div>
      <motion.div animate={prefersReducedMotion ? undefined : { y: [0,-8,0], x: [0,3,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className={`absolute -right-4 top-6 hidden rounded-2xl border px-3 py-2 text-xs shadow-xl lg:block
          ${darkMode ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-emerald-500/20 bg-emerald-500/8 text-emerald-700"}`}
        style={{ transform: "translateZ(36px)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-1.5">
          <motion.span animate={{ scale: [1,1.4,1] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
          Open to work
        </div>
      </motion.div>
      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-amber-400/25 bg-amber-400/5"
        style={{ boxShadow: "0 0 25px rgba(251,191,36,0.1)" }} />
      <div className="absolute -bottom-3 -left-3 h-12 w-12 rounded-full border border-cyan-400/25 bg-cyan-400/5" />
      <div className="relative overflow-hidden rounded-[30px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_38%)]" />
        <img src="/profile.png" alt="Chrislord Dizon" className="h-[500px] w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/76 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-[20px] border border-white/14 bg-black/46 p-4 text-white backdrop-blur-2xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/48">CHRISLORD DIZON</p>
            <h3 className="mt-1.5 font-display text-xl font-black tracking-tight">BSIT Student</h3>
            <div className="mt-1.5 flex items-center gap-2">
              <motion.span animate={{ scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
              <p className="text-xs text-white/62">Network and Web Application</p>
            </div>
          </div>
        </div>
      </div>
      <div style={prefersReducedMotion ? undefined : { transform: "translateZ(20px)" }}
        className={`mt-3 rounded-[24px] border p-5 ${theme.portraitCard}`}>
        <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Current Focus</p>
        <h3 className={`mt-2 font-display text-lg font-black tracking-tight ${theme.heading}`}>
          Frontend projects with clearer presentation
        </h3>
        <p className={`mt-2 text-sm leading-7 ${theme.muted}`}>
          Building practical interfaces while strengthening web dev, networking, and security foundations.
        </p>
      </div>
    </motion.div>
  );
}

// ─── SKILL TICKER ────────────────────────────────────────────────────────

function SkillTicker({ darkMode, prefersReducedMotion }) {
  const items = [...tickerSkills, ...tickerSkills];
  return (
    <div className={`mask-fade-x relative overflow-hidden rounded-full border py-3.5
      ${darkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white/70"}`}>
      <motion.div animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10 px-8">
        {items.map((item, i) => (
          <div key={`${item}-${i}`}
            className={`flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase
              ${darkMode ? "text-white/48" : "text-black/48"}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" style={{ boxShadow: "0 0 5px rgba(251,191,36,0.7)" }} />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [darkMode,        setDarkMode]       = useState(true);
  const [showIntro,       setShowIntro]      = useState(true);
  const [mobileOpen,      setMobileOpen]     = useState(false);
  const [activeSection,   setActiveSection]  = useState("#home");
  const [selectedCert,    setSelectedCert]   = useState(null);
  const [selectedProject, setSelectedProject]= useState(null);
  const [toast,           setToast]          = useState(null);
  const [isSending,       setIsSending]      = useState(false);
  const [isSubmitted,     setIsSubmitted]    = useState(false);
  const [projectFilter,   setProjectFilter]  = useState("All");
  const [certFilter,      setCertFilter]     = useState("All");
  const formRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDarkMode(false);
    const t = setTimeout(() => setShowIntro(false), prefersReducedMotion ? 700 : 2900);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  useEffect(() => { localStorage.setItem("theme", darkMode ? "dark" : "light"); }, [darkMode]);

  useEffect(() => {
    const ids = ["home","about","skills","projects","certifications","services","contact"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (vis.length) setActiveSection(`#${vis[0].target.id}`);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || selectedCert || selectedProject) ? "hidden" : "";
    document.body.classList.toggle("modal-open", Boolean(selectedCert || selectedProject));
    return () => { document.body.style.overflow = ""; document.body.classList.remove("modal-open"); };
  }, [mobileOpen, selectedCert, selectedProject]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formRef.current || isSending) return;
    const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!sid || !tid || !key) {
      setToast({ type: "error", title: "EmailJS not configured", message: "Add your keys in .env and restart." });
      return;
    }
    setIsSending(true);
    try {
      await emailjs.sendForm(sid, tid, formRef.current, { publicKey: key });
      formRef.current.reset();
      setIsSubmitted(true);
      setToast({ type: "success", title: "Message sent!", message: "Thanks for reaching out. I'll reply soon." });
    } catch {
      setToast({ type: "error", title: "Send failed", message: "Check your EmailJS configuration." });
    } finally { setIsSending(false); }
  };

  const filteredProjects = projectFilter === "All" ? projects
    : projectFilter === "Featured" ? projects.filter(p => p.featured)
    : projects.filter(p => p.tags.includes(projectFilter));
  const featuredProject    = filteredProjects.find(p => p.featured) ?? filteredProjects[0] ?? null;
  const secondaryProjects  = filteredProjects.filter(p => p.id !== featuredProject?.id);

  const filteredCerts  = certFilter === "All" ? certifications
    : certifications.filter(c => (certCategoryMap[certFilter] || []).includes(c.title));
  const uniqueIssuers  = new Set(certifications.map(c => c.issuer)).size;

  const theme = useMemo(() => darkMode ? {
    darkMode: true,
    bg: "bg-[#010308]", text: "text-white", heading: "text-white",
    muted: "text-white/60", muted2: "text-white/35", numeral: "text-white/[0.027]",
    card: "bg-white/[0.04] border-white/[0.08]",
    cardInner: "bg-white/[0.03] border-white/8",
    cardHover: "hover:bg-white/[0.065] hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300",
    chip: "border-amber-300/22 bg-amber-300/8 text-amber-200",
    tag: "border-white/10 bg-white/[0.04] text-white/62",
    nav: "bg-[#050912]/82 border-white/8",
    altBtn: "border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/18 transition-all duration-200",
    primaryBtn: "bg-amber-300 text-[#111] hover:bg-amber-200 hover:shadow-[0_14px_44px_rgba(251,191,36,0.36)] transition-all duration-200",
    footer: "border-white/8 text-white/35",
    closeBtn: "border-white/10 bg-white/5 text-white hover:bg-white/10",
    portraitFrame: "border-white/10 bg-white/[0.025]",
    portraitCard: "border-white/10 bg-white/[0.038]",
    inputBase: "border-white/10 bg-white/[0.04] text-white placeholder:text-white/25 focus:border-amber-300/45 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(251,191,36,0.08)]",
    filterActive: "border-amber-300 bg-amber-300 text-[#111] shadow-[0_6px_20px_rgba(251,191,36,0.3)]",
    filterInactive: "border-white/10 bg-white/[0.04] text-white/52 hover:bg-white/[0.07] hover:border-white/15",
    timelineLine: "bg-white/10", timelineDot: "bg-amber-400 border-amber-400/30",
    timelineCard: "bg-white/[0.035] border-white/8",
  } : {
    darkMode: false,
    bg: "bg-[#f4ede0]", text: "text-[#09111f]", heading: "text-[#09111f]",
    muted: "text-black/58", muted2: "text-black/36", numeral: "text-black/[0.034]",
    card: "bg-white/88 border-black/8",
    cardInner: "bg-black/[0.02] border-black/8",
    cardHover: "hover:border-black/12 hover:shadow-[0_18px_52px_rgba(51,33,12,0.12)] transition-all duration-300",
    chip: "border-amber-500/22 bg-amber-500/10 text-amber-700",
    tag: "border-black/10 bg-black/[0.03] text-black/56",
    nav: "bg-white/80 border-black/8",
    altBtn: "border-black/10 bg-white/88 text-[#09111f] hover:bg-black/[0.03] hover:border-black/14 transition-all duration-200",
    primaryBtn: "bg-[#09111f] text-white hover:bg-[#14243e] hover:shadow-[0_14px_38px_rgba(9,17,31,0.22)] transition-all duration-200",
    footer: "border-black/8 text-black/38",
    closeBtn: "border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.07]",
    portraitFrame: "border-black/8 bg-white/72",
    portraitCard: "border-black/8 bg-white/90",
    inputBase: "border-black/10 bg-white/90 text-black placeholder:text-black/32 focus:border-amber-500/38 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]",
    filterActive: "border-[#09111f] bg-[#09111f] text-white shadow-[0_6px_20px_rgba(9,17,31,0.2)]",
    filterInactive: "border-black/10 bg-white/80 text-black/55 hover:bg-black/[0.03]",
    timelineLine: "bg-black/10", timelineDot: "bg-amber-500 border-amber-400/30",
    timelineCard: "bg-white/80 border-black/8",
  }, [darkMode]);

  return (
    <div className={`app-shell min-h-screen overflow-x-hidden font-sans
      ${theme.bg} ${theme.text} ${darkMode ? "theme-dark" : "theme-light"}`}>

      <ScrollProgress darkMode={darkMode} />
      <ParticleField darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
      <BackToTop darkMode={darkMode} />

      <AnimatePresence>{showIntro && <IntroScreen darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />}</AnimatePresence>
      <AnimatePresence>{selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} theme={theme} />}</AnimatePresence>
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} theme={theme} />}</AnimatePresence>
      <AnimatePresence>{toast && <Toast toast={toast} onClose={() => setToast(null)} darkMode={darkMode} />}</AnimatePresence>

      {/* ── NEW: Aurora background & magnetic cursor ── */}
      <AuroraBackground darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
      {!prefersReducedMotion && !selectedCert && !selectedProject && <MagneticCursor darkMode={darkMode} />}
      <MouseGlow darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-500 ${theme.nav}`}>
        <div className={`absolute inset-x-0 bottom-0 h-px ${darkMode
          ? "bg-gradient-to-r from-transparent via-amber-400/18 to-transparent"
          : "bg-gradient-to-r from-transparent via-amber-500/12 to-transparent"}`} />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a href="#home" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            className={`font-display text-lg font-black tracking-tight ${theme.heading}`}>
            C<span className="text-amber-400" style={{ textShadow: "0 0 18px rgba(251,191,36,0.55)" }}>L</span>
          </motion.a>

          {/* ── MAGNETIC NAV LINKS ── */}
          <div className={`hidden items-center gap-0.5 rounded-full border p-1 md:flex ${theme.card}`}
            style={{ perspective: "600px" }}>
            {navLinks.map(link => (
              <MagneticNavLink
                key={link.href}
                href={link.href}
                isActive={activeSection === link.href}
                theme={theme}
              >
                {link.label}
              </MagneticNavLink>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <motion.button onClick={() => setDarkMode(v => !v)}
              className={`rounded-full border p-2.5 ${theme.altBtn}`}
              aria-label="Toggle theme" whileHover={{ rotate: 20, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait">
                <motion.div key={darkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.22 }}>
                  {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button onClick={() => setMobileOpen(v => !v)}
              className={`rounded-full border p-2.5 md:hidden ${theme.altBtn}`} aria-label="Menu">
              <AnimatePresence mode="wait">
                <motion.div key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {mobileOpen ? <X size={15} /> : <Menu size={15} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden border-t px-6 py-4 md:hidden
                ${darkMode ? "border-white/8 bg-[#050912]/96" : "border-black/8 bg-white/96"}`}>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045 }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium
                      transition border ${theme.card} ${theme.cardHover}`}>
                    {link.label}<ChevronRight size={13} className={theme.muted2} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section id="home" className="mx-auto grid min-h-[100svh] max-w-7xl items-center
          gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: showIntro ? 1.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl">

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: showIntro ? 1.3 : 0, duration: 0.5 }}
              className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2
                text-[11px] tracking-[0.18em] uppercase ${theme.chip}`}>
              <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
              Open to opportunities
            </motion.div>

            <div className="mt-7 overflow-hidden">
              <motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: showIntro ? 1.35 : 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[3.8rem] font-black leading-[0.87] tracking-[-0.05em] md:text-[5.6rem] xl:text-[7rem]">
                Chrislord
                <br />
                <span className="relative">
                  <span className="text-amber-400" style={{ filter: "drop-shadow(0 0 28px rgba(251,191,36,0.38))" }}>Dizon</span>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: showIntro ? 1.7 : 0.42, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-amber-400/40" />
                </span>
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.46 : 0.22 }}
              className={`mt-5 text-lg font-semibold tracking-tight ${theme.muted}`}>
              <Typewriter words={typewriterWords} darkMode={darkMode} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.52 : 0.28 }}
              className={`mt-4 max-w-2xl text-base leading-8 ${theme.muted}`}>
              I build responsive web interfaces and practical frontend projects with a focus on clarity and usability.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: showIntro ? 1.56 : 0.32 }}
              className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: <MapPin size={11}/>,    text: "Bataan, Philippines" },
                { icon: <Clock size={11}/>,     text: "Available for work" },
                { icon: <TrendingUp size={11}/>,text: "Open to internships" },
              ].map(({ icon, text }) => (
                <span key={text} className={`inline-flex items-center gap-1.5 rounded-full border
                  px-3 py-1.5 text-[11px] font-medium ${theme.chip}`}>{icon}{text}</span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.62 : 0.36 }}
              className="mt-8 flex flex-wrap gap-4">
              <MagBtn href="#projects"
                className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                  text-sm font-semibold ${theme.primaryBtn}`}>
                View Projects
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <ArrowRight size={16} />
                </motion.span>
              </MagBtn>
              <MagBtn href="#contact"
                className={`inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5
                  text-sm font-semibold ${theme.altBtn}`}>
                Contact Me
              </MagBtn>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.72 : 0.42 }}
              className="mt-8 flex items-center gap-3">
              {socialLinks.map((item, i) => (
                <motion.a key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer" aria-label={item.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (showIntro ? 1.72 : 0.42) + i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.12 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border
                    transition duration-300 ${theme.card} ${theme.cardHover}`}>
                  {item.icon}
                </motion.a>
              ))}
              <div className={`mx-2 h-5 w-px ${darkMode ? "bg-white/10" : "bg-black/10"}`} />
              <span className={`text-xs tracking-[0.15em] uppercase ${theme.muted2}`}>Connect</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.84 : 0.5 }}
              className="mt-10 grid grid-cols-3 gap-4">
              {[["17","+","Certificates"],["BSIT","","Program"],["2023","-27","Journey"]].map(([v, s, l]) => (
                <TiltProjectCard key={l} className={`group rounded-[24px] border p-4 transition ${theme.card} ${theme.cardHover}`} accentColor="#fbbf24" intensity={10}>
                  <div className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>
                    <AnimNum value={v} suffix={s} />
                  </div>
                  <div className={`mt-0.5 text-xs ${theme.muted2}`}>{l}</div>
                </TiltProjectCard>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: showIntro ? 1.96 : 0.58 }}
              className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { icon: <Star size={13}/>,   title: "Interface design", text: "Clean layouts, stronger hierarchy, motion that supports the content." },
                { icon: <Code2 size={13}/>,  title: "Frontend builds",  text: "Responsive React projects with clear structure." },
                { icon: <Shield size={13}/>, title: "Tech foundations", text: "Networking and security fundamentals." },
              ].map(item => (
                <SpotlightCard key={item.title} className={`rounded-[24px] border p-4 ${theme.card} ${theme.cardHover}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-amber-400">{item.icon}</span>
                    <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{item.title}</p>
                  </div>
                  <p className={`text-sm leading-6 ${theme.muted}`}>{item.text}</p>
                </SpotlightCard>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: showIntro ? 1.4 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center [perspective:1400px] lg:justify-end">
            <Portrait darkMode={darkMode} theme={theme} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader icon={<User size={13}/>} label="About" num="01"
            title="Building practical and polished digital work"
            subtitle="BSIT student majoring in Network and Web Application, focused on frontend development and technical foundations."
            theme={theme} />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <motion.div {...fadeUp}>
              <SpotlightCard className={`h-full rounded-[32px] border p-7 ${theme.card} ${theme.cardHover}`}>
                <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>Profile</p>
                <h3 className={`mt-3 font-display text-2xl font-black tracking-tight ${theme.heading}`}>
                  I focus on clarity, structure, and useful interaction.
                </h3>
                <div className={`mt-4 space-y-3 text-sm leading-8 ${theme.muted}`}>
                  <p>I build projects that combine clean interface design with practical implementation.</p>
                  <p>My direction blends frontend development with foundations in networking and cybersecurity.</p>
                  <p>I'm looking for roles where I can keep improving while contributing thoughtful, structured work.</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[["Education","BSPUC — BSIT 2023–2027"],["Major","Network & Web App"],["Status","3rd Year"],["Location","Bataan, Philippines"]].map(([k,v]) => (
                    <div key={k} className={`rounded-2xl border p-3 ${theme.cardInner}`}>
                      <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>{k}</p>
                      <p className={`mt-1 text-xs font-semibold ${theme.heading}`}>{v}</p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <div className="flex flex-col gap-5">
              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}>
                <SpotlightCard className={`rounded-[28px] border p-6 ${theme.card} ${theme.cardHover}`}>
                  <div className={`mb-4 inline-flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 ${theme.chip}`}>
                    <Sparkles size={15}/><span className="text-sm font-semibold">Strengths</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Problem-solving","Critical thinking","Team collaboration","Time management","Continuous learning","Attention to detail"].map(s => (
                      <span key={s} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${theme.tag}`}>{s}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}>
                <div className={`rounded-[28px] border p-6 ${theme.card} ${theme.cardHover}`}>
                  <div className={`mb-5 inline-flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 ${theme.chip}`}>
                    <TrendingUp size={15}/><span className="text-sm font-semibold">Journey</span>
                  </div>
                  <div className="relative ml-2">
                    <div className={`absolute left-3 top-0 bottom-0 w-px ${theme.timelineLine}`} />
                    <div className="space-y-5">
                      {timeline.map((item, i) => (
                        <motion.div key={item.year}
                          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}>
                          <div className="flex items-start gap-4 relative">
                            <div className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${theme.timelineDot}`}
                              style={{ boxShadow: "0 0 8px rgba(251,191,36,0.4)" }}>
                              <span className="text-[8px] text-[#111] font-black">{item.icon}</span>
                            </div>
                            <div className={`flex-1 rounded-2xl border p-3.5 ${theme.timelineCard}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-amber-400 font-display text-xs font-black">{item.year}</span>
                                <span className={`text-xs font-semibold ${theme.heading}`}>{item.label}</span>
                              </div>
                              <p className={`text-xs leading-5 ${theme.muted}`}>{item.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── SKILLS ───────────────────────────────────────────────── */}
        <section id="skills" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader icon={<Code2 size={13}/>} label="Skills" num="02"
            title="Tools and technologies"
            subtitle="A focused skill set supporting frontend development, interface design, and technical problem-solving."
            theme={theme} />

          <div className="mt-10"><SkillTicker darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} /></div>

          <motion.div className="mt-10 grid grid-cols-6 grid-rows-2 gap-4"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>

            {skills.filter(s => s.size === "large").map((skill, i) => (
              <motion.div key={skill.name} variants={itemV} className="col-span-3 md:col-span-2">
                <TiltProjectCard intensity={8} className="group h-full" accentColor={skill.color}>
                  <SpotlightCard className={`h-full rounded-[28px] border p-6 ${theme.card} ${theme.cardHover}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div style={{ color: skill.color, filter: `drop-shadow(0 0 18px ${skill.color}66)` }}
                        className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {skill.icon}
                      </div>
                      <span className={`text-[10px] font-semibold ${theme.muted2}`}>Core Skill</span>
                    </div>
                    <h3 className={`font-display text-xl font-black tracking-tight ${theme.heading}`}>{skill.name}</h3>
                    <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${darkMode ? "bg-white/8" : "bg-black/8"}`}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, ease: [0.16,1,0.3,1], delay: 0.2 + i * 0.1 }}
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: `linear-gradient(90deg,${skill.color}66,${skill.color})` }}>
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.2, delay: 1.7, ease: "easeInOut" }} />
                      </motion.div>
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${darkMode ? "text-amber-300" : "text-amber-600"}`}>{skill.level}%</p>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            ))}

            {skills.filter(s => s.size === "medium").map((skill, i) => (
              <motion.div key={skill.name} variants={itemV} className="col-span-3">
                <TiltProjectCard intensity={9} className="group h-full" accentColor={skill.color}>
                  <SpotlightCard className={`h-full rounded-[28px] border p-5 ${theme.card} ${theme.cardHover}`}>
                    <div className="flex items-center gap-4">
                      <div style={{ color: skill.color, filter: `drop-shadow(0 0 14px ${skill.color}55)` }}
                        className="transition-all duration-500 group-hover:scale-115 shrink-0">
                        {skill.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-display text-base font-black tracking-tight ${theme.heading}`}>{skill.name}</h3>
                          <span className={`text-xs font-semibold ${darkMode ? "text-amber-300" : "text-amber-600"}`}>{skill.level}%</span>
                        </div>
                        <div className={`h-1.5 w-full overflow-hidden rounded-full ${darkMode ? "bg-white/8" : "bg-black/8"}`}>
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16,1,0.3,1], delay: 0.3 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg,${skill.color}66,${skill.color})` }} />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            ))}

            {skills.filter(s => s.size === "small").map((skill, i) => (
              <motion.div key={skill.name} variants={itemV} className={i < 2 ? "col-span-3 md:col-span-2" : "col-span-2"}>
                <TiltProjectCard intensity={11} className="group h-full" accentColor={skill.color}>
                  <SpotlightCard className={`h-full rounded-[24px] border p-4 text-center ${theme.card} ${theme.cardHover}`}>
                    <div className="mb-2 flex justify-center transition-all duration-500 group-hover:scale-125"
                      style={{ color: skill.color, filter: `drop-shadow(0 0 16px ${skill.color}55)` }}>
                      {skill.icon}
                    </div>
                    <p className={`text-xs font-semibold ${theme.muted}`}>{skill.name}</p>
                    <p className={`mt-0.5 text-[10px] ${theme.muted2}`}>{skill.level}%</p>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: <Globe size={15}/>,  title: "Frontend",    text: "React, JavaScript, HTML, CSS, responsive layout, and interface animation." },
              { icon: <Shield size={15}/>, title: "Foundations", text: "Networking, cybersecurity basics, and practical problem-solving." },
              { icon: <Cpu size={15}/>,    title: "Workflow",    text: "Figma, Git, and an iterative process focused on clarity and polish." },
            ].map((g, i) => (
              <motion.div key={g.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.1 }}>
                <SpotlightCard className={`rounded-[24px] border p-5 ${theme.card} ${theme.cardHover}`}>
                  <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${theme.chip}`}>
                    {g.icon}<span className="font-semibold">{g.title}</span>
                  </div>
                  <p className={`text-sm leading-7 ${theme.muted}`}>{g.text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── PROJECTS ─────────────────────────────────────────────── */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader icon={<FolderKanban size={13}/>} label="Projects" num="03"
            title="Selected work"
            subtitle="A curated set of projects focused on real functionality, clear structure, and stronger presentation."
            theme={theme} />

          <motion.div className="mt-10 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {projectFilters.map(f => (
              <motion.button key={f} onClick={() => setProjectFilter(f)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide
                  transition duration-200 ${projectFilter === f ? theme.filterActive : theme.filterInactive}`}>
                {f}
              </motion.button>
            ))}
          </motion.div>

          {/* ── FEATURED PROJECT with 3D Tilt + Scrollytelling image ── */}
          <AnimatePresence mode="wait">
            {featuredProject && (
              <motion.div key={featuredProject.id} initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }} className="mt-10">
                <TiltProjectCard intensity={4} className="group" accentColor={featuredProject.accentColor}>
                  <SpotlightCard className={`rounded-[32px] border ${theme.card} ${theme.cardHover}`}>
                    <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-[32px]"
                      style={{ background: `linear-gradient(90deg,transparent,${featuredProject.accentColor}77,transparent)` }} />
                    <div className="grid overflow-hidden rounded-[32px] lg:grid-cols-[1.15fr_0.85fr]">

                      {/* ── SCROLLYTELLING IMAGE ── */}
                      <div className="relative min-h-[320px] overflow-hidden rounded-tl-[32px] rounded-bl-[32px]">
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur-sm relative z-10">
                          {["#f05252","#f5a623","#34d399"].map(c => (
                            <div key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
                          ))}
                          <div className="ml-2 flex-1 rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/40">
                            {featuredProject.live.replace("https://","")}
                          </div>
                        </div>
                        <div className="relative" style={{ height: "calc(100% - 30px)" }}>
                          <ScrollyProjectImage
                            src={featuredProject.image}
                            alt={featuredProject.title}
                            accentColor={featuredProject.accentColor}
                          />
                        </div>
                        <div className="absolute left-5 top-12 flex flex-wrap gap-2 z-10">
                          <span className="rounded-full border border-white/14 bg-black/40 px-3 py-1.5
                            text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-xl">Featured</span>
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1.5
                            text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur-xl">Case Study</span>
                        </div>
                      </div>

                      <div className="p-7 md:p-9">
                        <p className={`text-[10px] uppercase tracking-[0.22em] ${theme.muted2}`}>{featuredProject.category}</p>
                        <h3 className={`mt-3 font-display text-2xl font-black tracking-tight md:text-3xl ${theme.heading}`}>{featuredProject.title}</h3>
                        <p className={`mt-4 text-sm leading-7 ${theme.muted}`}>{featuredProject.shortDescription}</p>
                        <div className="mt-5 space-y-3">
                          {[["Problem",featuredProject.problem],["Solution",featuredProject.solution],["Outcome",featuredProject.outcome]].map(([l,t]) => (
                            <div key={l} className={`rounded-2xl border p-3.5 ${theme.cardInner}`}>
                              <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>{l}</p>
                              <p className={`mt-1.5 text-xs leading-6 ${theme.muted}`}>{t}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {featuredProject.stack.map(s => (
                            <span key={s} className={`rounded-full border px-2.5 py-1 text-xs ${theme.tag}`}>{s}</span>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <MagBtn onClick={() => setSelectedProject(featuredProject)}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${theme.primaryBtn}`}>
                            View Details <Eye size={14} />
                          </MagBtn>
                          <a href={featuredProject.github} target="_blank" rel="noreferrer"
                            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${theme.altBtn}`}>
                            GitHub <FaGithub size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SECONDARY PROJECT CARDS — 3D Tilt + Scrollytelling images ── */}
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {secondaryProjects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: i * 0.09 }}>
                <TiltProjectCard intensity={8} className="group h-full" accentColor={p.accentColor}>
                  <SpotlightCard className={`h-full rounded-[28px] border ${theme.card} ${theme.cardHover}`}>
                    <div className="flex h-full flex-col overflow-hidden rounded-[28px]">
                      {/* ── SCROLLYTELLING image on each secondary card ── */}
                      <div className="relative h-52 overflow-hidden rounded-t-[28px]">
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-black/50 backdrop-blur-sm relative z-10">
                          {["#f05252","#f5a623","#34d399"].map(c => (
                            <div key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                          ))}
                        </div>
                        <div className="relative overflow-hidden" style={{ height: "calc(100% - 26px)" }}>
                          <ScrollyProjectImage
                            src={p.image}
                            alt={p.title}
                            accentColor={p.accentColor}
                          />
                          {/* Hover quick-link overlay */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center gap-3
                              bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <button onClick={() => setSelectedProject(p)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/20
                                border border-white/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm
                                hover:bg-white/30 transition">
                              <Eye size={12}/> Details
                            </button>
                            <a href={p.github} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/20
                                border border-white/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm
                                hover:bg-white/30 transition">
                              <FaGithub size={12}/> Code
                            </a>
                          </motion.div>
                        </div>
                        <span className="absolute left-3 top-7 rounded-full border border-white/14
                          bg-black/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-xl z-10">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className={`font-display text-base font-black tracking-tight ${theme.heading}`}>{p.title}</h3>
                        <p className={`mt-1.5 flex-1 text-sm leading-7 ${theme.muted}`}>{p.shortDescription}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.stack.map(s => (
                            <span key={s} className={`rounded-full border px-2.5 py-1 text-[11px] ${theme.tag}`}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
        <section id="certifications" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader icon={<Award size={13}/>} label="Certificates" num="04"
            title="Certificates and achievements"
            subtitle="A selection covering technology, AI, cybersecurity, communication, and programming."
            theme={theme} />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[[`${certifications.length}`,"+","Total Earned"],[`${uniqueIssuers}`,"","Issuers"],["AI • Web • Security","","Focus Areas"]].map(([v,s,l]) => (
              <motion.div key={l} {...fadeUp}>
                <TiltProjectCard className={`rounded-[24px] border p-5 ${theme.card} ${theme.cardHover}`} accentColor="#fbbf24">
                  <p className={`font-display text-3xl font-black tracking-tight ${theme.heading}`}><AnimNum value={v} suffix={s} /></p>
                  <p className={`mt-1 text-sm ${theme.muted}`}>{l}</p>
                </TiltProjectCard>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {certCategories.map(cat => (
              <motion.button key={cat} onClick={() => setCertFilter(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide
                  transition duration-200 ${certFilter === cat ? theme.filterActive : theme.filterInactive}`}>
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]
                    ${certFilter === cat
                      ? (darkMode ? "bg-black/20" : "bg-white/20")
                      : (darkMode ? "bg-white/10" : "bg-black/10")}`}>
                    {(certCategoryMap[cat] || []).length}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={certFilter}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCerts.map((cert, i) => (
                <motion.div key={cert.credentialId}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}>
                  <TiltProjectCard intensity={6} className="group h-full" accentColor="#fbbf24">
                    <SpotlightCard className={`h-full rounded-[24px] border ${theme.card} ${theme.cardHover}`}>
                      <div className="overflow-hidden rounded-[24px]">
                        <div className="relative h-44 overflow-hidden">
                          <motion.img src={cert.image} alt={cert.title}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}
                            onError={e => { e.target.style.display = "none"; }} />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute right-3 top-3 rounded-full border border-amber-400/30
                            bg-amber-400/14 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 rounded-xl border p-2 shrink-0 ${theme.chip}`}><BadgeCheck size={14}/></div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-[9px] uppercase tracking-[0.2em] ${theme.muted2}`}>{cert.issuer}</p>
                              <h3 className={`mt-1 font-display text-sm font-black leading-5 tracking-tight ${theme.heading}`}>{cert.title}</h3>
                              <div className={`mt-2 space-y-0.5 text-xs ${theme.muted}`}>
                                <p>Issued: {cert.issued}</p>
                                {cert.expires && <p className="text-amber-400/70">Expires: {cert.expires}</p>}
                              </div>
                              <button onClick={() => setSelectedCert(cert)}
                                className={`mt-3 inline-flex items-center gap-1.5 rounded-full border
                                  px-3 py-1.5 text-xs font-medium ${theme.altBtn}`}>
                                <Eye size={11}/> Preview
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 h-px bg-gradient-to-r from-amber-400/25 via-amber-400/8 to-transparent" />
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltProjectCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCerts.length === 0 && (
            <div className={`mt-8 rounded-[24px] border p-10 text-center ${theme.card}`}>
              <p className={`text-sm ${theme.muted}`}>No certificates in this category yet.</p>
            </div>
          )}
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section id="services" className="mx-auto max-w-7xl px-6 py-28">
          <SectionHeader icon={<Briefcase size={13}/>} label="Services" num="05"
            title="What I can offer"
            subtitle="Areas where I can contribute while continuing to grow through real-world work."
            theme={theme} />

          <motion.div className="mt-12 grid gap-5 md:grid-cols-3"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {services.map(item => (
              <motion.div key={item.title} variants={itemV}>
                <TiltProjectCard intensity={9} className="group h-full" accentColor={item.accent}>
                  <SpotlightCard className={`relative h-full overflow-hidden rounded-[28px] border p-7 ${theme.card} ${theme.cardHover}`}>
                    <motion.div className="pointer-events-none absolute inset-0 opacity-0
                      transition-opacity duration-500 group-hover:opacity-100 rounded-[28px]"
                      style={{ background: `radial-gradient(circle at 30% 50%,${item.accent}14,transparent 60%)` }} />
                    <div className={`mb-4 font-display text-5xl font-black leading-none ${theme.numeral}`}>{item.num}</div>
                    <div className="mb-5 inline-flex rounded-2xl border p-3.5 transition-all duration-400 group-hover:scale-110"
                      style={{ borderColor: `${item.accent}35`, background: `${item.accent}12`, color: item.accent, boxShadow: `0 0 18px ${item.accent}15` }}>
                      {item.icon}
                    </div>
                    <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>{item.title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{item.text}</p>
                    <div className="mt-5 h-px" style={{ background: `linear-gradient(90deg,${item.accent}45,transparent)` }} />
                    <p className={`mt-4 text-xs tracking-[0.18em] uppercase ${theme.muted2}`}>Clean execution</p>
                  </SpotlightCard>
                </TiltProjectCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider darkMode={darkMode} />

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div {...fadeUp} className={`rounded-[32px] border p-8 md:p-10 ${theme.card}`}>
              <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.18em] uppercase ${theme.chip}`}>
                <Mail size={12}/> Contact
              </div>
              <h2 className={`font-display text-4xl font-black leading-[0.98] tracking-tight md:text-5xl ${theme.heading}`}>Get in touch</h2>
              <p className={`mt-5 text-sm leading-8 ${theme.muted}`}>Open to internships, entry-level opportunities, collaborations, and project work.</p>
              <div className="mt-8 space-y-3">
                <div className={`rounded-[20px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>Email</p>
                  <a href="mailto:chrislorddizon10@gmail.com" className="mt-1.5 block text-sm font-semibold transition hover:text-amber-400">
                    chrislorddizon10@gmail.com
                  </a>
                </div>
                <div className={`rounded-[20px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>Availability</p>
                  <p className={`mt-1.5 text-sm ${theme.muted}`}>Open for internships, collaborations, and entry-level roles.</p>
                </div>
                <div className={`rounded-[20px] border p-4 ${theme.cardInner}`}>
                  <p className={`text-[9px] uppercase tracking-[0.22em] ${theme.muted2}`}>What helps</p>
                  <div className="mt-2.5 space-y-1.5">
                    {["Project or role details","Timeline or urgency","Relevant links or context"].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" style={{ boxShadow: "0 0 5px rgba(251,191,36,0.6)" }} />
                        <p className={`text-sm ${theme.muted}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {socialLinks.map(item => (
                    <motion.a key={item.label} href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer" aria-label={item.label}
                      whileHover={{ y: -4, scale: 1.12 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                      {item.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form ref={formRef} onSubmit={handleSubmit}
              {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative overflow-hidden rounded-[32px] border p-8 md:p-10 ${theme.card}`}>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-400/6 blur-3xl" />
                <div className="absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-cyan-400/6 blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>Send a message</h3>
                    <p className={`mt-1.5 text-sm ${theme.muted}`}>Fill out the form and I'll respond as soon as possible.</p>
                  </div>
                  <span className={`hidden shrink-0 rounded-full border px-3 py-1.5 text-[10px] tracking-wide md:inline-block
                    ${darkMode ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300" : "border-emerald-500/20 bg-emerald-500/8 text-emerald-700"}`}>
                    Available
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.93, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }}
                      className={`rounded-[24px] border p-8 text-center
                        ${darkMode ? "border-emerald-400/15 bg-emerald-400/5" : "border-emerald-500/15 bg-emerald-500/5"}`}>
                      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full
                          ${darkMode ? "bg-emerald-400/12 text-emerald-300" : "bg-emerald-500/10 text-emerald-600"}`}>
                        <CheckCircle2 size={28}/>
                      </motion.div>
                      <h4 className={`mt-5 font-display text-2xl font-black tracking-tight ${theme.heading}`}>Message sent!</h4>
                      <p className={`mx-auto mt-3 max-w-xs text-sm leading-7 ${theme.muted}`}>
                        Thank you for reaching out. I'll get back to you as soon as I can.
                      </p>
                      <button type="button" onClick={() => setIsSubmitted(false)}
                        className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium ${theme.altBtn}`}>
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField label="Your Name" name="from_name" type="text" placeholder="Enter your name" theme={theme} darkMode={darkMode}/>
                        <FormField label="Your Email" name="from_email" type="email" placeholder="Enter your email" theme={theme} darkMode={darkMode}/>
                      </div>
                      <FormField label="Subject" name="subject" type="text" placeholder="What is this about?" theme={theme} darkMode={darkMode}/>
                      <FormField label="Message" name="message" multiline rows={5} placeholder="Write your message here..." theme={theme} darkMode={darkMode}/>
                      <input type="hidden" name="to_name" value="Chrislord Dizon" readOnly/>
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <MagBtn type="submit"
                          className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                            text-sm font-semibold ${isSending ? "opacity-70" : ""} ${theme.primaryBtn}`}>
                          {isSending ? (<>Sending...
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"/></>) : (<>Send Message <Send size={15}/></>)}
                        </MagBtn>
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

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className={`border-t transition-colors duration-500 ${darkMode ? "border-white/8" : "border-black/8"}`}>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
            <div>
              <a href="#home" className={`font-display text-2xl font-black tracking-tight ${theme.heading}`}>
                C<span className="text-amber-400">L</span>
              </a>
              <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>
                Frontend Developer & BSIT Student based in Bataan, Philippines. Building practical and polished digital work.
              </p>
              <div className="mt-4 flex gap-2.5">
                {socialLinks.map(item => (
                  <motion.a key={item.label} href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer" aria-label={item.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 ${theme.card} ${theme.cardHover}`}>
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-[0.24em] font-semibold mb-4 ${theme.muted2}`}>Navigation</p>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} className={`block text-sm transition hover:text-amber-400 ${theme.muted}`}>{link.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-[0.24em] font-semibold mb-4 ${theme.muted2}`}>Status</p>
              <div className="space-y-3">
                <div className={`flex items-center gap-2 text-sm ${theme.muted}`}>
                  <motion.span animate={{ scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}/>
                  Available for work
                </div>
                <div className={`flex items-center gap-2 text-sm ${theme.muted}`}><MapPin size={13} className="text-amber-400"/>Bataan, Philippines</div>
                <div className={`flex items-center gap-2 text-sm ${theme.muted}`}><GraduationCap size={13} className="text-amber-400"/>BSIT 2023–2027</div>
                <div className={`flex items-center gap-2 text-sm ${theme.muted}`}><Award size={13} className="text-amber-400"/>17+ Certifications</div>
              </div>
            </div>
          </div>
          <div className={`mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs md:flex-row ${theme.footer}`}>
            <p>© 2026 Chrislord Dizon. All rights reserved.</p>
            <p className={theme.muted2}>
              Built with React, Tailwind CSS & Framer Motion
              <span className="ml-2 text-amber-400">♥</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}