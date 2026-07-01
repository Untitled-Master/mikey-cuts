import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
  Play,
  Sliders,
  Volume2,
  Film,
  ArrowRight,
  Minus,
  Check,
  Send,
  Clock,
  Instagram,
  Twitter,
  Mail,
  ChevronDown,
  Monitor,
  Maximize2,
  HardDrive,
  Camera,
  Activity,
  Youtube,
  Home,
  Layers,
  Cpu,
  Scissors,
  Users,
  Smartphone,
  MessageSquare,
  Star
} from 'lucide-react';

import './App.css'
import projects from './data/projects'
import longFormProjects from './data/longFormProjects'
import channels from './data/channels'
import shorts from './data/shorts'
import reviews from './data/reviews'
import faq from './data/faq'

// --- HIGH-SPEED VIDEO RENDERING INTRO LOADER ---
const EditorIntro = ({ onComplete }) => {
  const [frame, setFrame] = useState(0);
  const [bitrate, setBitrate] = useState(25000);
  const [phase, setPhase] = useState("INITIALIZING DECODERS");

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrame((prev) => {
        if (prev >= 240) {
          clearInterval(frameInterval);
          return 240;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 45);

    const bitrateInterval = setInterval(() => {
      setBitrate(() => Math.floor(Math.random() * 8000) + 22000);
    }, 150);

    const phases = [
      { t: 0, text: "INGESTING RAW RAW_LOG_V2..." },
      { t: 400, text: "MAPPING TIMELINE SEGMENTS..." },
      { t: 800, text: "CACHING COLOR LUT MATRICES..." },
      { t: 1200, text: "EXPORTING MASTER PROFILE..." }
    ];

    phases.forEach((p) => {
      setTimeout(() => setPhase(p.text), p.t);
    });

    const finishTimeout = setTimeout(onComplete, 1600);

    return () => {
      clearInterval(frameInterval);
      clearInterval(bitrateInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[10000] bg-[#070708] flex flex-col justify-between p-6 md:p-12 font-mono overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3e46fb 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="flex justify-between items-start text-[10px] text-[#656df7]">
        <div>[ PROJECT: MIKEY_PORTFOLIO_2026 ]</div>
        <div>RENDER STAGE: ONLINE</div>
      </div>

      <div className="my-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 bg-[#3e46fb] animate-ping rounded-full" />
          <span className="text-xs text-[#3e46fb] uppercase tracking-widest">{phase}</span>
        </div>
        
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase select-none">
          MIKEY <br />
          <span className="text-[#656df7]">POST_</span>STUDIO.
        </h1>

        <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden relative mb-4">
          <motion.div 
            className="h-full bg-[#3e46fb]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-zinc-400 mt-8 pt-8 border-t border-zinc-900">
          <div>
            <span className="text-[#656df7] block mb-1 font-bold">PROCESSED</span>
            <span>{frame} / 240 FRAMES</span>
          </div>
          <div>
            <span className="text-[#656df7] block mb-1 font-bold">BITRATE</span>
            <span>{(bitrate / 1000).toFixed(2)} MBPS</span>
          </div>
          <div>
            <span className="text-[#656df7] block mb-1 font-bold">CODEC</span>
            <span>APPLE PRORES 422 HQ</span>
          </div>
          <div>
            <span className="text-[#656df7] block mb-1 font-bold">RESOLUTION</span>
            <span>3840 × 2160 [UHD]</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-[#656df7] text-right">
        STATUS CODE: 0x00FF8E
      </div>
    </motion.div>
  );
};

// --- SYSTEM CURSOR REPLACEMENT ---
const VideoCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const [textSize, setTextSize] = useState(16);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trail spring configuration
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.2 });
  const ringX = useSpring(mouseX, { damping: 24, stiffness: 120, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 24, stiffness: 120, mass: 0.6 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      
      const isLink = target.closest('a') || target.closest('button') || target.tagName === 'INPUT' || target.closest('[data-cursor="interactive"]');
      const isMedia = target.closest('[data-cursor="media"]');
      const textEl = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, label, td, blockquote, em, strong, a');
      const isText = textEl || ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL', 'A', 'TD'].includes(target.tagName);

      if (isLink) {
        setCursorType('link');
      } else if (isMedia) {
        setCursorType('media');
      } else if (isText) {
        const el = textEl || target;
        const fs = parseFloat(window.getComputedStyle(el).fontSize) || 16;
        setTextSize(fs);
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const isTextType = cursorType === 'text';
  const ringSize = isTextType ? 0 : (cursorType === 'link' ? 36 : (cursorType === 'media' ? 42 : 24));
  const dotSize = isTextType ? 0 : 7;
  const textCursorH = isTextType ? textSize : 0;
  const textCursorW = isTextType ? Math.max(2, textSize * 0.1) : 0;
  const showRing = !isTextType;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: dotX,
          translateY: dotY,
          width: isTextType ? textCursorW : dotSize,
          height: isTextType ? textCursorH : dotSize,
          borderRadius: isTextType ? '1px' : '50%',
          marginLeft: isTextType ? -textCursorW/2 : -dotSize/2,
          marginTop: isTextType ? -textCursorH/2 : -dotSize/2,
          background: isTextType ? 'rgba(0,255,102,0.9)' : 'white',
          boxShadow: isTextType ? '0 0 4px rgba(0,255,102,0.3)' : '0 0 0 1.5px rgba(0,0,0,0.6), 0 0 6px rgba(0,0,0,0.3)',
          transition: 'width 0.15s, height 0.15s, borderRadius 0.15s, background 0.15s',
        }}
      />
      {showRing && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            translateX: ringX,
            translateY: ringY,
            width: ringSize,
            height: ringSize,
            borderRadius: '50%',
            marginLeft: -ringSize/2,
            marginTop: -ringSize/2,
            border: '1.5px solid rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 0 8px rgba(255,255,255,0.05), 0 0 0 1px rgba(0,0,0,0.3)',
            transition: 'width 0.2s, height 0.2s, borderColor 0.2s',
          }}
        />
      )}
    </>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('sec-hero');
  const [shortIndex, setShortIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollGallery = (direction) => {
    const amount = direction === 'left' ? -650 : 650;
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  // Scroll-Spy Section Highlight Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sec-hero', 'clients', 'work', 'shorts', 'reviews'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const setupTools = [
    { name: "DaVinci Resolve Studio", category: "Software Matrix", spec: "Color Correction & Spatial Grade", icon: <Sliders className="text-[#3e46fb]" size={18} />, stat: "Primary Suite" },
    { name: "Premiere Pro CC", category: "Software Matrix", spec: "Long-form Assembly & Multi-Cam", icon: <Premiere size={18} />, stat: "Timeline Engine" },
    { name: "After Effects", category: "Software Matrix", spec: "Keyframed Kinetics & Masking", icon: <AfterEffects size={18} />, stat: "Compositing Pass" },
    { name: "Adobe Media Encoder", category: "Software Matrix", spec: "Batch Export & Encoding", icon: <MediaEncoder size={18} />, stat: "Render Pass" },
    { name: "Loupedeck Creative Console", category: "Hardware Interface", spec: "Tactile grading dials & micro-controls", icon: <Monitor className="text-[#3e46fb]" size={18} />, stat: "Physical Deck" },
    { name: "SanDisk Professional PRO-BLADE", category: "Hardware Interface", spec: "SSD Ecosystem // 40Gbps Thunderbolt", icon: <HardDrive className="text-[#3e46fb]" size={18} />, stat: "Direct Edit Storage" }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#070708] text-[#F3F4F4] selection:bg-[#3e46fb] selection:text-white min-h-screen font-sans overflow-x-hidden md:pl-[68px]">
      
      {/* INJECT MARQUEE ANIMATION CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        section, header {
          scroll-margin-top: 50px;
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .framer-shadow-premium {
          box-shadow: 0px 15px 30px -8px rgba(62, 70, 251, 0.15);
        }
      `}</style>

      <AnimatePresence mode="wait">
        {showIntro && <EditorIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>


      {/* --- FLOATING VIDEO PLAYOVERLAY MODAL --- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[11000] flex items-center justify-center p-2 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-6xl bg-[#0c0c0e] border border-zinc-800 rounded-[30px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
              <div className="aspect-video w-full bg-black relative z-20">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="relative z-30 bg-[#070708] border-t border-zinc-800 px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 min-w-0">
                  <div className="h-8 w-px bg-zinc-800 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-white uppercase font-mono tracking-tight truncate">{activeVideo.title}</h3>
                    <p className="text-[#656df7] text-[11px] font-mono mt-0.5 truncate">{activeVideo.meta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-[#656df7] uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3e46fb]" />
                      4K UHD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3e46fb]" />
                      {activeVideo.aspect}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-[#3e46fb] border border-zinc-800 hover:border-[#3e46fb] text-zinc-400 hover:text-white px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-200"
                  >
                    Quit <Minus size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ LEFT VERTICAL NAVIGATION (THE ESSENTIAL NAVBAR) ════ */}
      <nav className="fixed left-0 top-0 bottom-0 w-[68px] z-[200] hidden md:flex flex-col items-center justify-center gap-1 bg-[#0c0c0e]/72 backdrop-filter backdrop-blur-xl border-r border-white/5">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono font-black text-xs text-[#3e46fb]">
          M.C
        </div>
        
        {[
          { id: 'sec-hero', label: 'Home', icon: <Home size={18} /> },
          { id: 'clients', label: 'Clients', icon: <Users size={18} /> },
          { id: 'work', label: 'Work', icon: <Film size={18} /> },
          { id: 'shorts', label: 'Shorts', icon: <Smartphone size={18} /> },
          { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={18} /> },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`w-[56px] py-3.5 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 ${
              activeSection === item.id 
                ? 'text-[#3e46fb] bg-[#3e46fb]/10' 
                : 'text-zinc-500 hover:text-[#3e46fb] hover:bg-[#3e46fb]/10 hover:scale-110 hover:shadow-[0_0_16px_rgba(62,70,251,0.2)]'
            }`}
            data-cursor="interactive"
          >
            {item.icon}
            <span className="text-[8px] font-black tracking-widest uppercase mt-0.5">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* --- HERO / SHOWREEL SECTION --- */}
      <header className="relative min-h-screen flex flex-col overflow-hidden" id="sec-hero">
        
        {/* Full viewport hero with animated background */}
        <div className="relative flex-grow min-h-screen flex items-center overflow-hidden">
          
          {/* Moving Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#070708]" />
            <div 
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `url(https://yt3.googleusercontent.com/euzOI5lKmMPlvKb8Th18pNtbakZAYFPciyQvj67IlIRyucDQDoEIM3RmpTht4VJtR2m6MVN4x3s=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: ''
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#070708] via-transparent to-[#070708]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent" />
            <motion.div
              animate={{ x: [0, 120, -60, 0], y: [0, -100, 80, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#3e46fb]/10 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{ x: [0, -80, 100, 0], y: [0, 60, -120, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#656df7]/10 rounded-full blur-[100px]"
            />
          </div>

          {/* Floating Software SVGs with elevated z-index (z-50) */}
          <div className="absolute inset-0 pointer-events-none z-50">
            {[
              { SVG: "https://skillicons.dev/icons?i=ae", x: '20%', y: '10%', delay: 0, duration: 4 },
              { SVG: "https://skillicons.dev/icons?i=pr", x: '20%', y: '30%', delay: 0.5, duration: 5 },
              { SVG: "https://skillicons.dev/icons?i=ps", x: '70%', y: '20%', delay: 1, duration: 6 },
              { SVG: "https://skillicons.dev/icons?i=ai", x: '80%', y: '30%', delay: 1.5, duration: 4.5 },
              { SVG: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2d/6d/98/2d6d98bd-564f-9307-d476-9e4000ab18d7/Resolve.png/400x400ib-75.webp", x: '80%', y: '10%', delay: 2, duration: 5.5 },
              { SVG: "https://www.audacityteam.org/_astro/Audacity_Logo.DK8H7nvr.svg", x: '10%', y: '20%', delay: 0.3, duration: 5 },

            ].map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                className="absolute opacity-[0.4] hover:opacity-100 transition-opacity duration-1000"
                style={{ left: item.x, top: item.y }}
              >

                <img src={item.SVG} alt="" className="w-20 h-20 object-contain" />
              </motion.div>
            ))}
          </div>

          {/* Hero Content: Centered Title + Video Below */}
          <div className="relative z-30 w-11/12 lg:w-[80%] mx-auto flex flex-col items-center text-center pt-16 pb-8 lg:pt-20 lg:pb-4">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 border border-[#3e46fb]/30 text-[#3e46fb] font-mono text-[10px] px-4 py-1.5 uppercase tracking-[0.2em] bg-[#3e46fb]/5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 bg-[#3e46fb] rounded-full animate-pulse" />
                Post-Production Specialist
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white font-sans mt-6 uppercase"
            >
              <span className="underline">EDITING </span>WITH<br />
              <span className="text-[#3e46fb] italic">PRECISION.</span><br />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-xl mt-6"
            >
              Specialized in high-tempo commercials, raw narrative films, and clean grading matrices.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
                <a 
                  href="#work" 
                  className="bg-[#3e46fb] text-white font-mono font-bold uppercase text-xs tracking-widest py-3.5 px-8 rounded-full hover:bg-[#656df7] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#3e46fb]/25"
                  data-cursor="interactive"
                >
                  View Selected Works <ArrowRight size={14} />
                </a>
                <a 
                  href="#contact" 
                  className="bg-[#0c0c0e] text-[#3e46fb] font-mono font-bold uppercase text-xs tracking-widest py-3.5 px-8 border border-zinc-800 rounded-full hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
                  data-cursor="interactive"
                >
                  Request Custom Pitch
                </a>
            </motion.div>

            {/* Minimalistic Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative w-full max-w-5xl mt-10"
            >
              <div className="rounded-[30px] overflow-hidden border border-zinc-800 bg-[#0c0c0e] p-4 framer-shadow-premium">
                <video 
                  src={projects[0].videoUrl}
                  controls
                  className="w-full aspect-video object-cover rounded-[20px]"
                  poster={projects[0].preview}
                />
              </div>
            </motion.div>

          </div>

        </div>

        {/* Global Tape Running Stats Row */}
        <div className="relative z-20 border-t border-zinc-800 py-5 bg-[#0c0c0e]">
          <div className="w-11/12 lg:w-[80%] mx-auto flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
            <div>LOC: MILAN // REMOTE WORLDWIDE</div>
            <div className="hidden sm:block">LATEST MASTER STATUS: SIGNED OFF [100%]</div>
            <div className="flex items-center gap-2 text-[#3e46fb]">
              <span className="w-2.5 h-2.5 bg-[#68ff1c] rounded-full animate-ping" />
              <span>DA VINCIPROJECT ENGINE ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CLIENTS SECTION --- */}
      <section id="clients" className="py-24 border-b border-zinc-800 bg-[#070708] overflow-hidden">
        <div className="w-11/12 lg:w-[80%] mx-auto mb-12 font-mono flex justify-between items-end">
          <div>
            <span className="text-[#3e46fb] text-[10px] tracking-[0.3em] uppercase block font-bold">// NETWORK REACH</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-1 uppercase font-mono">TRUSTED CREATORS</h2>
          </div>
          <span className="text-[9px] text-[#656df7] uppercase tracking-wider hidden sm:block font-bold">[ HOVER FOR DETAILS ]</span>
        </div>

        {/* Grid of trusted creator cards */}
        <div className="w-11/12 lg:w-[80%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {channels.map((chan, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-[#0c0c0e] rounded-[30px] p-6 flex flex-col items-center justify-center text-center relative group hover:border-[#3e46fb]/40 transition-all duration-300 framer-shadow-premium"
            >
              {/* Creator AV */}
              <div className="size-20 rounded-full overflow-hidden border border-zinc-800 group-hover:border-[#3e46fb] group-hover:shadow-[0_0_20px_rgba(62,70,251,0.2)] transition-all duration-300 relative mb-4">
                <img src={chan.logo} alt={chan.name} className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-300" />
              </div>
              
              <h3 className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">
                {chan.name}
              </h3>
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">
                {chan.views}
              </p>

              {/* Hover Tooltip/Detail overlay */}
              <div className="absolute inset-0 bg-[#3e46fb] rounded-[30px] flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] font-mono text-[#68ff1c] uppercase tracking-[0.2em] font-black mb-1">METRICS</span>
                <span className="text-xs font-mono font-bold text-white uppercase">{chan.views} Generated</span>
                <a
                  href={chan.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-[9px] text-[#101011] bg-[#68ff1c] px-4 py-2 rounded-full font-mono font-bold uppercase transition-transform hover:scale-105 shadow-sm"
                  data-cursor="interactive"
                >
                  YOUTUBE <Youtube size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SELECTED WORK (YOUTUBE-STYLE GRID) --- */}
      <section id="work" className="py-24 border-b border-zinc-800 bg-[#070708]">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#3e46fb] font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
                <span className="w-1.5 h-1.5 bg-[#3e46fb] rounded-full" />
                <span>// PROJECT MEDIA POOL</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono">
                Selected <span className="text-[#3e46fb]">Work.</span>
              </h2>
              <p className="text-zinc-500 max-w-xl text-sm mt-3 font-sans leading-relaxed">
                Every frame and cut serves a rhythm. Browse projects featuring premium editing integrations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider hidden sm:block font-bold">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'VIDEO' : 'VIDEOS'}
              </span>
              <div className="flex flex-wrap gap-1 bg-[#0c0c0e] border border-zinc-800 p-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider">
                {['all', 'commercial', 'cinematic', 'documentary'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      selectedCategory === cat 
                        ? 'bg-[#3e46fb] text-white font-black' 
                        : 'text-zinc-450 hover:text-white hover:bg-zinc-900'
                    }`}
                    data-cursor="interactive"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* YouTube-style Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    key={project.id}
                    className="group cursor-pointer flex flex-col gap-2"
                    onClick={() => setActiveVideo(project)}
                    data-cursor="media"
                  >
                    {/* Thumbnail Viewport */}
                    <div className="relative aspect-video bg-[#0c0c0e] rounded-[24px] overflow-hidden border border-zinc-800 group-hover:border-[#3e46fb]/40 transition-all duration-300 shadow-md">
                      <img 
                        src={project.preview} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102 opacity-95 group-hover:opacity-85" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                      
                      {/* Duration badge */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/90 px-2 py-0.5 rounded font-mono text-[10px] text-white font-bold">
                        {project.duration}
                      </div>

                      {/* Video Category Indicator */}
                      <div className="absolute top-2.5 left-2.5 bg-[#0c0c0e] border border-zinc-800 text-[#3e46fb] px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest font-black">
                        {project.category}
                      </div>

                      {/* Play Hover State Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="size-12 rounded-full bg-[#3e46fb] text-white flex items-center justify-center shadow-lg shadow-[#3e46fb]/30">
                          <Play size={18} className="fill-current text-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* YouTube Slate Text Metadata info details */}
                    <div className="flex gap-3 mt-2.5 px-1.5">
                      <div className="size-9 rounded-full overflow-hidden shrink-0 border border-zinc-800 bg-[#0c0c0e] flex items-center justify-center">
                        <img src={project.channelLogo} alt={project.channel} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#3e46fb] transition-colors uppercase font-sans">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-sans font-medium">
                          {project.channel}
                          <VerifiedBadge />
                        </p>
                        <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{project.views} &bull; {project.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-zinc-800 bg-[#0c0c0e] rounded-[24px]"
            >
              <p className="text-zinc-500 text-sm">No projects found for category: <span className="text-[#3e46fb] font-bold uppercase">{selectedCategory}</span></p>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- SHORTS / REELS ACTIVE-CENTERED CAROUSEL --- */}
      <section id="shorts" className="py-24 border-b border-zinc-800 bg-[#0c0c0e] overflow-hidden">
        <div className="w-11/12 lg:w-[80%] mx-auto mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <span className="text-[#3e46fb] font-mono text-xs tracking-[0.3em] uppercase block font-bold">// SHORT-FORM CUTS</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono">
                Reels & <span className="text-[#3e46fb]">Shorts.</span>
              </h2>
              <p className="text-zinc-500 text-sm mt-3 max-w-lg">
                Vertical-optimized social media edits built for retention. Scroll through the loop.
              </p>
            </div>
            <div className="flex items-center gap-2 border border-zinc-800 bg-[#0c0c0e] px-4 py-2 rounded-full font-mono text-[10px] text-[#656df7] font-bold shadow-sm">
              <span className="w-2 h-2 bg-[#3e46fb] rounded-full animate-pulse" />
              <span>CAROUSEL // {shortIndex + 1} / {shorts.length}</span>
            </div>
          </div>
        </div>

        {(() => {
          const len = shorts.length;

          const getItem = (offset) => {
            const idx = ((shortIndex + offset) % len + len) % len;
            return shorts[idx];
          };

          return (
            <div className="relative flex items-center justify-center">
              {/* Left arrow */}
              <button
                onClick={() => setShortIndex((prev) => ((prev - 1) % len + len) % len)}
                className="absolute left-4 lg:left-12 z-20 size-12 bg-[#0c0c0e]/95 backdrop-blur-sm border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#3e46fb]/50 hover:bg-[#3e46fb]/5 transition-all shadow-md"
                data-cursor="interactive"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              {/* Carousel items wrapper */}
              <div className="relative w-full max-w-5xl h-[420px] md:h-[520px] flex items-center justify-center">
                {/* Position -2: far left side blur */}
                <motion.div
                  key={`short-${shortIndex}-2`}
                  initial={{ x: -60 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-[2%] md:left-[8%] w-[100px] md:w-[160px] aspect-[9/16] rounded-xl overflow-hidden border border-zinc-800 pointer-events-none"
                  style={{ filter: 'blur(2px)' }}
                >
                  <img src={getItem(-2).src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#070708]/60" />
                </motion.div>

                {/* Position -1: left side intermediate */}
                <motion.div
                  key={`short-${shortIndex}-1`}
                  initial={{ x: -40 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                  className="absolute left-[18%] md:left-[28%] w-[130px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-zinc-800 cursor-pointer shadow-sm"
                  onClick={() => setShortIndex((prev) => ((prev - 1) % len + len) % len)}
                  data-cursor="interactive"
                >
                  <img src={getItem(-1).src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/95 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase">{getItem(-1).title}</p>
                  </div>
                </motion.div>

                {/* Position 0: center - active highlighted */}
                <motion.div
                  key={`short-${shortIndex}-0`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                  className="relative z-10 w-[180px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#3e46fb]/60 shadow-2xl shadow-[#3e46fb]/15 cursor-pointer bg-[#0c0c0e]"
                  onClick={() => setActiveVideo(projects[shortIndex % projects.length])}
                  data-cursor="media"
                >
                  <img src={getItem(0).src} alt={getItem(0).title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/95 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-[#3e46fb] text-white px-3 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-wider">
                    {getItem(0).platform}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0c0c0e] text-white border border-zinc-800 px-3 py-1 rounded-full font-mono text-[9px] font-bold shadow-sm">
                    {getItem(0).views}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="font-mono font-bold text-base text-white uppercase tracking-tight">{getItem(0).title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[11px] text-zinc-500">{getItem(0).duration}</span>
                      <span className="w-1.5 h-1.5 bg-[#3e46fb] rounded-full" />
                      <span className="font-mono text-[11px] text-[#3e46fb] font-black">{getItem(0).views} views</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-14 rounded-full bg-[#3e46fb] text-white flex items-center justify-center shadow-lg shadow-[#3e46fb]/30">
                      <Play size={22} className="fill-current text-white ml-0.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Position +1: right side intermediate */}
                <motion.div
                  key={`short-${shortIndex}+1`}
                  initial={{ x: 40 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                  className="absolute right-[18%] md:right-[28%] w-[130px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-zinc-800 cursor-pointer shadow-sm"
                  onClick={() => setShortIndex((prev) => (prev + 1) % len)}
                  data-cursor="interactive"
                >
                  <img src={getItem(1).src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/95 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-mono text-[10px] text-zinc-500 font-bold uppercase">{getItem(1).title}</p>
                  </div>
                </motion.div>

                {/* Position +2: far right side blur */}
                <motion.div
                  key={`short-${shortIndex}+2`}
                  initial={{ x: 60 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute right-[2%] md:right-[8%] w-[100px] md:w-[160px] aspect-[9/16] rounded-xl overflow-hidden border border-zinc-800 pointer-events-none"
                  style={{ filter: 'blur(2px)' }}
                >
                  <img src={getItem(2).src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#070708]/60" />
                </motion.div>
              </div>

              {/* Right arrow */}
              <button
                onClick={() => setShortIndex((prev) => (prev + 1) % len)}
                className="absolute right-4 lg:right-12 z-20 size-12 bg-white/95 backdrop-blur-sm border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 hover:text-[#3e46fb] hover:border-[#3e46fb]/50 hover:bg-[#3e46fb]/5 transition-all shadow-md"
                data-cursor="interactive"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          );
        })()}
      </section>

      {/* --- REVIEWS / TESTIMONIALS --- */}
      <section id="reviews" className="py-24 border-b border-zinc-800 bg-[#070708]">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#3e46fb] font-mono text-xs tracking-[0.3em] uppercase block font-bold">// CLIENT FEEDBACK</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono">
              What Clients <span className="text-[#3e46fb]">Say.</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-3 max-w-lg mx-auto">
              Direct feedback from productions and brand collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-[30px] overflow-hidden shadow-md">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-[#0c0c0e] p-8 flex flex-col justify-between group hover:bg-[#070708]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#3e46fb] text-[#3e46fb]" />
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-6 italic font-medium">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-zinc-800 pt-4">
                  <div className="font-mono text-xs font-black text-white uppercase tracking-tight">
                    {review.author}
                  </div>
                  <div className="font-mono text-[10px] text-[#656df7] mt-0.5 font-bold">
                    {review.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PIPELINE CARD RENDERS SYSTEM --- */}
      <section id="pipeline" className="py-24 bg-[#0c0c0e] border-b border-zinc-800">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-28">
              <span className="text-[#3e46fb] font-mono text-xs tracking-[0.3em] uppercase block font-bold">POST PRODUCTION ASSEMBLY</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-mono leading-none">
                The Pipeline Sequence.
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                Structured stages of the editing lifecycle. Maintaining rigorous version control and logical pathways from raw transfer to clean delivery formats.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border-2 border-zinc-800 rounded-[30px] overflow-hidden shadow-md">
              <PipelineCard 
                num="01" 
                title="Raw Ingest & Proxy Setup" 
                desc="Acquiring source material, mapping high-bitrate raw sequences, and building lightweight 1080p proxy drives to maintain seamless real-time processing." 
              />
              <PipelineCard 
                num="02" 
                title="Rhythmic Rough Cut" 
                desc="Drafting the key storytelling sequence. Syncing structural beats, sorting frame selection, and building pace maps matching selected scores." 
              />
              <PipelineCard 
                num="03" 
                title="VFX and Sound Pass" 
                desc="Seamless integration of visual details, speed ramps, customized dynamic transitions, and specialized multitrack foley sound engineering." 
              />
              <PipelineCard 
                num="04" 
                title="DaVinci Precision Color" 
                desc="Correcting brightness distributions and building dynamic contrast parameters. Establishing custom LUT grids tailored to exact project moods." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 border-b border-zinc-800 bg-[#070708]">
        <div className="w-11/12 lg:w-[80%] mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-[#3e46fb] font-mono text-xs tracking-[0.3em] uppercase block font-bold">// RESOLVING STANDARD PIPELINE QUESTIONS</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white font-mono">FAQ</h2>
            <p className="text-zinc-500 text-sm mt-3">Objective answers detailing raw timeline collaboration patterns.</p>
          </div>

          <div className="space-y-3 font-mono">
            {faq.map((item, idx) => (
              <div 
                key={idx}
                className={`border rounded-[20px] overflow-hidden transition-all duration-200 ${
                  activeFaq === idx 
                    ? 'border-[#3e46fb]/50 bg-[#0c0c0e] shadow-sm' 
                    : 'border-zinc-850 bg-[#0c0c0e]/40 hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  data-cursor="interactive"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold ${activeFaq === idx ? 'text-[#3e46fb]' : 'text-zinc-500'}`}>
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span className="text-sm font-bold text-white uppercase">{item.q}</span>
                  </div>
                  <ChevronDown className={`size-4 text-zinc-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#3e46fb]' : ''}`} />
                </button>

                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-2 text-zinc-400 text-xs font-sans leading-relaxed border-t border-zinc-800 mt-0 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOOKING & CONTACT --- */}
      <section id="contact" className="py-24 bg-[#0c0c0e]/60">
        <div className="w-11/12 lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <span className="text-[#3e46fb] font-mono text-xs tracking-[0.3em] uppercase block font-bold">// INITIATE INGEST</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono leading-none">
              Start Your <span className="text-[#3e46fb] italic">Cut.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              Secure a space in the post-production rendering queue. Provide structural project parameters below to initiate a direct diagnostic review of your timeline needs.
            </p>

            <div className="space-y-4 font-mono text-xs text-[#656df7] font-bold">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#3e46fb]" />
                <span className="text-zinc-400">Response SLA: Within 12 Hours</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#3e46fb]" />
                <a href="mailto:mikey@mikeycuts.com" className="text-zinc-400 hover:text-[#3e46fb] transition-colors font-bold">mikey@mikeycuts.com</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border border-zinc-800 bg-[#0c0c0e] p-8 rounded-[30px] shadow-md">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-550 uppercase font-bold block">Project Name / Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g. STREET CAMPAIGN 2026" 
                    className="w-full bg-[#070708] border border-zinc-800 rounded-[12px] p-4 text-white focus:outline-none focus:border-[#3e46fb] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-550 uppercase font-bold block">Estimated Raw Runtime</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10 Minutes Total" 
                    className="w-full bg-[#070708] border border-zinc-800 rounded-[12px] p-4 text-white focus:outline-none focus:border-[#3e46fb] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-550 uppercase font-bold block">Contact Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. client@brand.com" 
                    className="w-full bg-[#070708] border border-zinc-800 rounded-[12px] p-4 text-white focus:outline-none focus:border-[#3e46fb] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-550 uppercase font-bold block">Primary Software Requirement</label>
                  <select className="w-full bg-[#070708] border border-zinc-800 rounded-[12px] p-4 text-white focus:outline-none focus:border-[#3e46fb] transition-colors uppercase font-bold">
                    <option>Premiere Pro</option>
                    <option>DaVinci Resolve Only</option>
                    <option>No Preference</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-550 uppercase font-bold block">Project Description / Technical Needs</label>
                <textarea 
                  rows="4"
                  placeholder="Outline shooting formats, estimated delivery dates, and specific aesthetic inspirations..." 
                  className="w-full bg-[#070708] border border-zinc-800 rounded-[12px] p-4 text-white focus:outline-none focus:border-[#3e46fb] transition-colors font-sans"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#3e46fb] hover:bg-[#656df7] text-white font-bold py-4.5 rounded-full uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-xs shadow-md shadow-[#3e46fb]/25"
                data-cursor="interactive"
              >
                Send Request Details <Send size={14} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050528] text-zinc-500 pt-24 pb-8 border-t border-zinc-850 font-mono text-xs">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-6 space-y-4">
              <span className="text-white font-black tracking-tighter text-lg uppercase block">
                MIKEY<span className="text-[#3e46fb]">.</span>CUTS
              </span>
              <p className="text-zinc-500 max-w-sm font-sans text-xs leading-relaxed font-semibold">
                Focused editing structural operations designed to respect frame limits, sound logic, and raw output purity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-zinc-850 hover:border-[#3e46fb] rounded-full transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Instagram size={16} />
                </a>
                <a href="#" className="p-2 border border-zinc-850 hover:border-[#3e46fb] rounded-full transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Twitter size={16} />
                </a>
                <a href="#" className="p-2 border border-zinc-850 hover:border-[#3e46fb] rounded-full transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-white uppercase tracking-widest text-[10px] font-bold text-[#68ff1c]">[ SERVICES ]</p>
              <ul className="space-y-1.5 uppercase text-[11px] font-semibold">
                <li>Commercial Cuts</li>
                <li>Cinematic Grading</li>
                <li>Sound Assembly</li>
                <li>Dynamic Ramping</li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-white uppercase tracking-widest text-[10px] font-bold text-[#68ff1c]">[ SYSTEM STATUS ]</p>
              <ul className="space-y-1.5 uppercase text-[11px] text-zinc-600 font-semibold">
                <li>LAT: 45.4642° N</li>
                <li>LONG: 9.1900° E</li>
                <li>QUEUE: ACCEPTING PROJECTS</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-zinc-850 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-500 tracking-wider font-semibold">
            <p>© 2026 MIKEY POST-STUDIO. ALL EDITING DATA PROCESSED NATIVELY.</p>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
              className="hover:text-white transition-colors uppercase mt-4 md:mt-0 font-bold"
              data-cursor="interactive"
            >
              Back to Ingest Top //
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- LOGO SVG HELPERS ---

const VerifiedBadge = () => (
  <svg className="w-3.5 h-3.5 text-[#3e46fb] inline-block fill-current shrink-0" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="10" fill="rgba(62, 70, 251, 0.1)" />
    <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const AfterEffects = ({ size, ...props }) => (
  <svg {...props} viewBox="0 0 83 80" fill="none" width={size} height={size}>
    <g clipPath="url(#afterEffectsClip)">
      <path d="M67.5214 0H14.5299C6.50526 0 0 6.50526 0 14.5299V65.4701C0 73.4947 6.50526 80 14.5299 80H67.5214C75.546 80 82.0513 73.4947 82.0513 65.4701V14.5299C82.0513 6.50526 75.546 0 67.5214 0Z" fill="#3e46fb"/>
      <text x="41" y="48" textAnchor="middle" fill="#68ff1c" fontSize="24" fontFamily="Courier, monospace" fontWeight="black">Ae</text>
    </g>
    <defs>
      <clipPath id="afterEffectsClip"><rect width="82.0513" height="80" fill="white"/></clipPath>
    </defs>
  </svg>
);

const Premiere = ({ size, ...props }) => (
  <svg {...props} viewBox="0 0 83 80" fill="none" width={size} height={size}>
    <g clipPath="url(#premiereClip)">
      <path d="M14.5299 0H67.5214C75.5556 0 82.0513 6.49573 82.0513 14.5299V65.4701C82.0513 73.5043 75.5556 80 67.5214 80H14.5299C6.49573 80 0 73.5043 0 65.4701V14.5299C0 6.49573 6.49573 0 14.5299 0Z" fill="#3e46fb" strokeWidth="2"/>
      <text x="41" y="48" textAnchor="middle" fill="#68ff1c" fontSize="24" fontFamily="Courier, monospace" fontWeight="black">Pr</text>
    </g>
    <defs>
      <clipPath id="premiereClip">
        <rect width="82.0513" height="80" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const MediaEncoder = ({ size, ...props }) => (
  <svg {...props} viewBox="0 0 32 32" fill="none" width={size} height={size}>
    <g clipPath="url(#mediaEncoderClip)">
      <path d="M26.3333 0H5.66667C2.53705 0 0 2.53705 0 5.66667V25.5333C0 28.6629 2.53705 31.2 5.66667 31.2H26.3333C29.4629 31.2 32 28.6629 32 25.5333V5.66667C32 2.53705 29.4629 0 26.3333 0Z" fill="#3e46fb"/>
      <text x="16" y="21" textAnchor="middle" fill="#68ff1c" fontSize="11" fontFamily="Courier, monospace" fontWeight="black">Me</text>
    </g>
    <defs>
      <clipPath id="mediaEncoderClip"><rect width="32" height="31.2" fill="white"/></clipPath>
    </defs>
  </svg>
);

const DaVinciIcon = ({ size }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
    <circle cx="50" cy="50" r="48" fill="#3e46fb" />
    <text x="50" y="55" textAnchor="middle" fill="#68ff1c" fontSize="12" fontFamily="Courier, monospace" fontWeight="bold" letterSpacing="1">DV</text>
    <text x="50" y="68" textAnchor="middle" fill="white" fontSize="6" fontFamily="Courier, monospace" fontWeight="bold" letterSpacing="0.5">RESOLVE</text>
  </svg>
);

const BlenderIcon = ({ size }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
    <circle cx="50" cy="50" r="48" fill="#3e46fb" />
    <text x="50" y="58" textAnchor="middle" fill="#68ff1c" fontSize="16" fontFamily="Courier, monospace" fontWeight="black">B</text>
  </svg>
);

const PipelineCard = ({ num, title, desc }) => (
  <div className="bg-[#0c0c0e] p-8 hover:bg-[#070708]/40 transition-colors border-b border-zinc-800">
    <span className="text-[10px] text-[#3e46fb] font-mono block mb-2 font-bold tracking-widest">STAGE {num}</span>
    <h4 className="text-base font-extrabold uppercase text-white font-mono flex items-center gap-2 mb-3">
      <span className="w-1.5 h-1.5 bg-[#68ff1c] shrink-0 rounded-full" /> {title}
    </h4>
    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{desc}</p>
  </div>
);

const RateCard = ({ title, price, unit, desc, deliverables, highlight }) => (
  <div className={`p-8 flex flex-col justify-between h-full relative ${highlight ? 'bg-zinc-900 border-x-[#3e46fb]' : 'bg-[#0c0c0e]'}`}>
    {highlight && (
      <div className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#3e46fb] mb-3 block">
        [ POPULAR CONFIG ]
      </div>
    )}
    
    <div>
      <h3 className="text-xl font-black uppercase text-white font-mono mb-1">{title}</h3>
      <div className="mb-4 font-mono">
        <span className="text-2xl font-bold text-[#3e46fb]">{price}</span>
        <span className="text-xs text-zinc-400 uppercase ml-1">/ {unit}</span>
      </div>
      <p className="text-[10px] font-mono text-zinc-400 uppercase leading-relaxed mb-6">{desc}</p>

      <div className="space-y-2 mb-8">
        <h4 className="text-[9px] font-black uppercase tracking-widest text-[#656df7] font-mono mb-3">Inclusions</h4>
        <ul className="space-y-2">
          {deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[10px] font-mono text-zinc-300 leading-tight">
              <Check size={10} className="text-[#68ff1c] shrink-0 mt-0.5" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <a 
      href="#contact" 
      className={`w-full py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest border text-center transition-all rounded-full block ${
        highlight 
          ? 'bg-[#3e46fb] text-white border-none hover:bg-[#656df7] shadow-sm' 
          : 'border-2 border-zinc-800 text-white hover:bg-white hover:text-black'
      }`}
      data-cursor="interactive"
    >
      Request Pitch Scope
    </a>
  </div>
);