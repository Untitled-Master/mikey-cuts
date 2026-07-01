import React, { useState, useEffect } from 'react';
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
  Youtube
} from 'lucide-react';

import './App.css'

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
          backgroundImage: `radial-gradient(#00FF66 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="flex justify-between items-start text-[10px] text-zinc-500">
        <div>[ PROJECT: MIKEY_PORTFOLIO_2026 ]</div>
        <div>RENDER STAGE: ONLINE</div>
      </div>

      <div className="my-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 bg-green-600 animate-ping rounded-full" />
          <span className="text-xs text-green-500 uppercase tracking-widest">{phase}</span>
        </div>
        
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase select-none">
          MIKEY <br />
          <span className="text-zinc-600">POST_</span>STUDIO.
        </h1>

        <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden relative mb-4">
          <motion.div 
            className="h-full bg-green-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-zinc-400 mt-8 pt-8 border-t border-zinc-900">
          <div>
            <span className="text-zinc-600 block mb-1">PROCESSED</span>
            <span>{frame} / 240 FRAMES</span>
          </div>
          <div>
            <span className="text-zinc-600 block mb-1">BITRATE</span>
            <span>{(bitrate / 1000).toFixed(2)} MBPS</span>
          </div>
          <div>
            <span className="text-zinc-600 block mb-1">CODEC</span>
            <span>APPLE PRORES 422 HQ</span>
          </div>
          <div>
            <span className="text-zinc-600 block mb-1">RESOLUTION</span>
            <span>3840 × 2160 [UHD]</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-zinc-600 text-right">
        STATUS CODE: 0x00FF8E
      </div>
    </motion.div>
  );
};

// --- SYSTEM CURSOR REPLACEMENT ---
const VideoCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 500, mass: 0.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      
      const isLink = target.closest('a') || target.closest('button') || target.tagName === 'INPUT' || target.closest('[data-cursor="interactive"]');
      const isMedia = target.closest('[data-cursor="media"]');
      const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL', 'A', 'TD'].includes(target.tagName) || target.closest('p') || target.closest('h2') || target.closest('h1');

      if (isLink) {
        setCursorType('link');
      } else if (isMedia) {
        setCursorType('media');
      } else if (isText) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Adjust cursor dimensions dynamically based on detected type
  const isTextType = cursorType === 'text';
  const width = isTextType ? 2 : (cursorType === 'link' ? 24 : (cursorType === 'media' ? 28 : 12));
  const height = isTextType ? 22 : (cursorType === 'link' ? 24 : (cursorType === 'media' ? 28 : 12));
  const borderRadius = isTextType ? '0px' : '50%';
  const offsetLeft = -width / 2;
  const offsetTop = -height / 2;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
      style={{
        translateX: x,
        translateY: y,
        left: offsetLeft,
        top: offsetTop,
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
    />
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const projects = [
    {
      id: 1,
      title: "RHYTHM OF THE STREETS",
      category: "commercial",
      duration: "1:30",
      aspect: "Vertical / 9:16",
      meta: "Graded in DaVinci // Cut in Premiere Pro",
      desc: "Fast-paced urban editorial highlighting technical transitions and heavy sound design layers designed for mobile screens.",
      preview: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=640&auto=format&fit=crop",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 2,
      title: "ECHOES OF SILENCE",
      category: "cinematic",
      duration: "4:15",
      aspect: "Anamorphic / 2.39:1",
      meta: "Arri RAW // Color Space: Aces CC",
      desc: "Atmospheric narrative project relying heavily on slow match cuts, custom grain structures, and deep ambient soundscapes.",
      preview: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=640&auto=format&fit=crop",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 3,
      title: "VERTEX CLOTHING CO.",
      category: "commercial",
      duration: "0:45",
      aspect: "Standard / 16:9",
      meta: "ProRes 4444 // VFX Integration",
      desc: "Commercial product sequence mapping high-shutter speed details to synthesized mechanical audio triggers.",
      preview: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=640&auto=format&fit=crop",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 4,
      title: "STREET CULTURE DOCUMENTARY",
      category: "documentary",
      duration: "12:00",
      aspect: "Spherically Cropped / 4:3",
      meta: "16mm Scan // Color Matched",
      desc: "Independent mini-doc detailing skateboard collectives. Raw archival textures matched with multi-cam footage.",
      preview: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=640&auto=format&fit=crop",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 5,
      title: "NEON HEIST",
      category: "cinematic",
      duration: "3:00",
      aspect: "Widescreen / 2.1",
      meta: "RED Komodo // Heavy Grading Suite",
      desc: "Cyberpunk aesthetic with hyper-stylized lighting setups, keyframed retiming, and aggressive split-screens.",
      preview: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=640&auto=format&fit=crop",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  // Channels Worked With (Marquee Data)
  const channels = [
    {
      name: "NEON THREADS",
      views: "14.2M views generated",
      logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    },
    {
      name: "CHRONOS MEDIA",
      views: "8.1M views generated",
      logo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    },
    {
      name: "VORTEX TECH",
      views: "22.7M views generated",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    },
    {
      name: "AURA EDITORIAL",
      views: "5.4M views generated",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    },
    {
      name: "SENSORY GRID",
      views: "11.9M views generated",
      logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    },
    {
      name: "KINETIC CO.",
      views: "18.3M views generated",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=150&auto=format&fit=crop",
      url: "https://youtube.com"
    }
  ];

  // Things He Uses (Software & Hardware Data)
  const setupTools = [
    {
      name: "DaVinci Resolve Studio",
      category: "Software Matrix",
      spec: "Color Correction & Spatial Grade",
      icon: <Sliders className="text-green-500" size={18} />,
      stat: "Primary Suite"
    },
    {
      name: "Premiere Pro CC",
      category: "Software Matrix",
      spec: "Long-form Assembly & Multi-Cam",
      icon: <PremiereIcon size={18} />,
      stat: "Timeline Engine"
    },
    {
      name: "After Effects",
      category: "Software Matrix",
      spec: "Keyframed Kinetics & Masking",
      icon: <AfterEffectsIcon size={18} />,
      stat: "Compositing Pass"
    },
    {
      name: "Apple Mac Studio M2 Ultra",
      category: "Hardware Interface",
      spec: "192GB Unified memory // 60-Core GPU",
      icon: <AppleIcon size={18} />,
      stat: "Zero Proxy Lag"
    },
    {
      name: "Loupedeck Creative Console",
      category: "Hardware Interface",
      spec: "Tactile grading dials & micro-controls",
      icon: <Monitor className="text-green-500" size={18} />,
      stat: "Physical Deck"
    },
    {
      name: "SanDisk Professional PRO-BLADE",
      category: "Hardware Interface",
      spec: "SSD Ecosystem // 40Gbps Thunderbolt",
      icon: <HardDrive className="text-green-500" size={18} />,
      stat: "Direct Edit Storage"
    },
    {
      name: "RED IPP3 Color Space",
      category: "Format & Calibration",
      spec: "Native RAW log workflow calibration",
      icon: <Camera className="text-green-500" size={18} />,
      stat: "Gamut Mapping"
    },
    {
      name: "Arri LogC4 / Alexa",
      category: "Format & Calibration",
      spec: "High dynamic range matching standards",
      icon: <Film className="text-green-500" size={18} />,
      stat: "Raw Decoders"
    },
    {
      name: "Izotope RX 10 Advanced",
      category: "Format & Calibration",
      spec: "Spectral audio restoration & foley match",
      icon: <Volume2 className="text-green-500" size={18} />,
      stat: "Dialogue Polish"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#0b0b0c] text-white selection:bg-green-600 selection:text-white min-h-screen font-sans overflow-x-hidden">
      
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
      `}</style>

      <AnimatePresence mode="wait">
        {showIntro && <EditorIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <VideoCursor />

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
              className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
              <div className="aspect-video w-full bg-black relative z-20">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="relative z-30 bg-[#0c0c0e] border-t border-zinc-800 px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 min-w-0">
                  <div className="h-8 w-px bg-zinc-800 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-white uppercase font-mono tracking-tight truncate">{activeVideo.title}</h3>
                    <p className="text-zinc-500 text-[11px] font-mono mt-0.5 truncate">{activeVideo.meta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      4K UHD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {activeVideo.aspect}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-green-600 border border-zinc-800 hover:border-green-600 text-zinc-400 hover:text-white px-4 py-2 rounded text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-200"
                  >
                    Quit <Minus size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER NAVIGATION --- */}
      <nav className="border-b border-zinc-900 sticky top-0 bg-[#0b0b0c]/90 backdrop-blur-sm z-50">
        <div className="w-11/12 lg:w-[80%] mx-auto py-4 flex justify-between items-center font-mono">
          <div className="flex items-center gap-4">
            <span className="font-black text-lg tracking-tighter text-white">
              MIKEY<span className="text-green-600">.</span>CUTS
            </span>
            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
            <span className="text-[10px] text-zinc-500 hidden sm:block uppercase tracking-wider">
              [ EDITING PORTFOLIO ]
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase">
            <a href="#work" className="text-zinc-400 hover:text-white transition-colors">Showcase</a>
            <a href="#pipeline" className="text-zinc-400 hover:text-white transition-colors">Pipeline</a>
            <a href="#specs" className="text-zinc-400 hover:text-white transition-colors">Hardware</a>
            <a href="#rates" className="text-zinc-400 hover:text-white transition-colors">Rates</a>
          </div>

          <div>
            <a 
              href="#contact" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs uppercase tracking-widest transition-colors inline-block"
            >
              Secure Booking
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO / SHOWREEL SECTION --- */}
      <header className="relative border-b border-zinc-900 min-h-[90vh] flex flex-col justify-between">
        <div className="w-11/12 lg:w-[80%] mx-auto w-full py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-block border border-green-600/30 text-green-500 font-mono text-[10px] px-3 py-1 uppercase tracking-[0.2em] bg-green-600/5">
              [ Post-Production Specialist ]
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white font-mono">
              EDITING WITH<br />
              <span className="text-green-600">PRECISION.</span><br />
              PACING WITH<br />
              <span className="bg-white text-black px-2 py-0.5">INTUITION.</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-xl">
              Specialized in high-tempo commercials, raw narrative films, and clean grading matrices. Shaping footage with structured workflows to build logical, rhythmically complex viewing experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-0 border border-zinc-800 w-fit">
              <a 
                href="#work" 
                className="bg-green-600 text-white font-mono font-bold uppercase text-xs tracking-widest py-5 px-10 hover:bg-green-700 transition-all flex items-center justify-center gap-3"
              >
                View Selected Works <ArrowRight size={14} />
              </a>
              <a 
                href="#contact" 
                className="bg-zinc-950 text-zinc-300 font-mono font-bold uppercase text-xs tracking-widest py-5 px-10 border-t sm:border-t-0 sm:border-l border-zinc-800 hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
              >
                Request Custom Pitch
              </a>
            </div>
          </div>

          {/* Interactive Hero Asset Panel */}
          <div className="lg:col-span-6 relative">
            <div className="border border-zinc-800 bg-[#121214] rounded p-2 relative overflow-hidden group">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2 font-mono text-[10px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse" />
                  <span>MONITOR_A_ACTIVE // 24FPS</span>
                </div>
                <span>TIMECODE: 00:04:12:18</span>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded bg-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1280&auto=format&fit=crop" 
                  alt="Visual Preview" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setActiveVideo(projects[0])}
                    className="size-16 rounded-full bg-green-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg focus:outline-none"
                    data-cursor="interactive"
                  >
                    <Play size={24} className="fill-current text-white ml-1" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded text-[10px] font-mono">
                  CLIP_ID: RAW_REEL_v09
                </div>
              </div>

              {/* Pseudo Editing Timeline Tracks */}
              <div className="mt-3 font-mono space-y-1 text-[9px] text-zinc-500">
                <div className="flex gap-1 items-center">
                  <span className="w-10 text-right">V1 //</span>
                  <div className="flex-grow h-4 bg-zinc-900 relative rounded">
                    <div className="absolute left-[10%] w-[35%] h-full bg-zinc-800 border-r border-zinc-700" />
                    <div className="absolute left-[45%] w-[40%] h-full bg-green-950/40 border-r border-green-500/50" />
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="w-10 text-right">A1 //</span>
                  <div className="flex-grow h-4 bg-zinc-900 relative rounded">
                    <div className="absolute left-[10%] w-[25%] h-full bg-zinc-800" />
                    <div className="absolute left-[35%] w-[20%] h-full bg-zinc-800" />
                    <div className="absolute left-[55%] w-[35%] h-full bg-zinc-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Tape Running Stats Row */}
        <div className="border-t border-zinc-900 py-4 bg-[#08080a] overflow-hidden">
          <div className="w-11/12 lg:w-[80%] mx-auto flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <div>LOC: MILAN // REMOTE WORLDWIDE</div>
            <div className="hidden sm:block">LATEST MASTER STATUS: SIGNED OFF [100%]</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>DA VINCIPROJECT ENGINE ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECTION 1: INTERACTIVE CHANNELS MARQUEE --- */}
      <section className="py-16 border-b border-zinc-900 bg-zinc-950/40 overflow-hidden">
        <div className="w-11/12 lg:w-[80%] mx-auto mb-8 font-mono flex justify-between items-end">
          <div>
            <span className="text-green-500 text-[10px] tracking-[0.3em] uppercase block">// NETWORK REACH</span>
            <h3 className="text-lg font-black text-white mt-1 uppercase">AUDIENCE RETENTION MAP</h3>
          </div>
          <span className="text-[9px] text-zinc-500 uppercase tracking-wider hidden sm:block">[ HOVER TO PAUSE & REVEAL METRICS ]</span>
        </div>

        {/* Outer Framed Strip aligned with the centered 80% container */}
        <div className="w-11/12 lg:w-[80%] mx-auto border border-zinc-900 bg-[#0c0c0e] p-4 rounded relative group overflow-hidden">
          
          {/* Timeline Sprocket Holes styling */}
          <div className="absolute top-1 left-0 right-0 h-1 flex justify-between px-4 opacity-30">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="w-2 h-1 bg-zinc-800 rounded-xs" />
            ))}
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="animate-marquee-scroll flex gap-6 group-hover:[animation-play-state:paused]">
              
              {/* Render the channel list twice for infinite seamless scroll */}
              {[...channels, ...channels].map((chan, idx) => (
                <a
                  key={idx}
                  href={chan.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[200px] shrink-0 bg-zinc-950 border border-zinc-800 rounded p-3 transition-all duration-300 hover:scale-[1.05] hover:border-green-600/50 relative overflow-hidden group/item flex flex-col items-center justify-center text-center select-none"
                  data-cursor="interactive"
                >
                  <div className="size-16 rounded-full overflow-hidden mb-3 border border-zinc-800 bg-zinc-900 relative">
                    <img src={chan.logo} alt={chan.name} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-300" />
                  </div>
                  
                  <span className="font-mono text-xs font-bold text-zinc-300 group-hover/item:text-white transition-colors uppercase tracking-tight">
                    {chan.name}
                  </span>

                  {/* Hover Overlay: Views Generated */}
                  <div className="absolute inset-0 bg-green-600/90 flex flex-col items-center justify-center p-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-black mb-1">AUDIENCE TRAFFIC</span>
                    <span className="text-xs font-mono font-bold text-white text-center leading-tight uppercase">
                      {chan.views}
                    </span>
                    <div className="mt-2 flex items-center gap-1 text-[9px] text-white/90 font-mono">
                      <span>OPEN YT</span> <Youtube size={12} />
                    </div>
                  </div>
                </a>
              ))}

            </div>
          </div>

          <div className="absolute bottom-1 left-0 right-0 h-1 flex justify-between px-4 opacity-30">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="w-2 h-1 bg-zinc-800 rounded-xs" />
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE TOOLKIT & SOFTWARE INTERFACE --- */}
      <section className="py-24 border-b border-zinc-900 bg-[#08080a]">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-green-500 font-mono text-xs tracking-widest uppercase block mb-3">// PRODUCTION GEAR & STACK</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Setup Suite.</h2>
              <p className="text-zinc-500 max-w-md text-sm mt-4 font-sans leading-relaxed">
                The exact digital interfaces, modular physical surfaces, and color space matrices integrated into every post-production cycle.
              </p>
            </div>
            
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 p-3 rounded font-mono text-[10px] text-zinc-400">
              <Activity className="text-green-500 animate-pulse" size={14} />
              <span>CALIBRATED TO REC.709 & DCI-P3 STANDARDS</span>
            </div>
          </div>

          {/* Clean Dashboard Tool Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded overflow-hidden">
            {setupTools.map((tool, idx) => (
              <div 
                key={idx} 
                className="bg-[#0c0c0e] p-6 hover:bg-zinc-950/80 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                      [ CATEGORY: {tool.category} ]
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 font-bold">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 border border-zinc-800 bg-zinc-900 rounded group-hover:border-green-600/30 transition-colors">
                      {tool.icon}
                    </div>
                    <h3 className="text-base font-bold text-white uppercase font-mono tracking-tight group-hover:text-green-500 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-6">
                    {tool.spec}
                  </p>
                </div>

                <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                  <span>METRIC STATUS</span>
                  <span className="bg-green-950/20 text-green-500 border border-green-950 px-2 py-0.5 rounded font-bold">
                    {tool.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SHOWCASE / WORK SECTION (RE-DESIGNED MEDIA BIN) --- */}
      <section id="work" className="py-24 border-b border-zinc-900 bg-[#070708]">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8 border-b border-zinc-900 pb-8">
            <div>
              <div className="flex items-center gap-2 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
                <span className="w-1.5 h-1.5 bg-green-600 animate-pulse rounded-full" />
                <span>// PROJECT MEDIA POOL</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono">
                Selected Cuts<span className="text-green-500">.</span>
              </h2>
              <p className="text-zinc-500 max-w-xl text-sm mt-4 font-sans leading-relaxed">
                Every frame and cut serves a rhythm. Use the filters below to browse high-fidelity exports matching your commercial or film requirements.
              </p>
            </div>

            {/* Filter Hub */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider hidden sm:block">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
              </span>
              <div className="flex flex-wrap gap-1 bg-[#121214] border border-zinc-800 p-1 rounded font-mono text-[10px] uppercase tracking-wider">
                {['all', 'commercial', 'cinematic', 'documentary'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      selectedCategory === cat 
                        ? 'bg-green-600 text-white font-black shadow-lg shadow-green-600/20' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                    data-cursor="interactive"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Media Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    key={project.id}
                    className="border border-zinc-800 bg-[#0d0d0f] rounded overflow-hidden flex flex-col justify-between group hover:border-green-600/40 hover:shadow-xl hover:shadow-green-600/5 transition-all duration-300"
                  >
                    {/* Visual Viewport */}
                    <div className="relative aspect-video bg-black overflow-hidden group/viewport border-b border-zinc-900">
                      <img 
                        src={project.preview} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover/viewport:scale-105 opacity-80 group-hover/viewport:opacity-40" 
                      />
                      
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                      
                      {/* Top bar overlays */}
                      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start p-3">
                        <div className="flex items-center gap-2 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded font-mono text-[9px] text-green-500 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                          {project.category}
                        </div>
                        <div className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded font-mono text-[9px] text-zinc-300 flex items-center gap-1.5">
                          <Clock size={10} className="text-green-500" />
                          <span>{project.duration} MIN</span>
                        </div>
                      </div>

                      {/* Bottom metadata bar overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-3">
                        <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-400">
                          <span>ROLL: <span className="text-zinc-200">A0{idx + 1}</span></span>
                          <span className="w-px h-3 bg-zinc-700" />
                          <span>RES: <span className="text-zinc-200">4K UHD</span></span>
                          <span className="w-px h-3 bg-zinc-700" />
                          <span className="text-green-500">PRORES 422 HQ</span>
                        </div>
                      </div>

                      {/* Centered Play Trigger */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="opacity-0 group-hover/viewport:opacity-100 transition-all duration-300 translate-y-2 group-hover/viewport:translate-y-0">
                          <button 
                            onClick={() => setActiveVideo(project)}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-5 hover:scale-110 transition-transform flex items-center justify-center shadow-2xl shadow-green-600/30 focus:outline-none"
                            data-cursor="media"
                          >
                            <Play size={24} className="fill-current text-white ml-0.5" />
                          </button>
                        </div>
                      </div>

                      {/* Interactive Frame Box Overlay */}
                      <div className="absolute inset-x-4 inset-y-4 border border-white/5 pointer-events-none group-hover/viewport:border-green-500/30 transition-all duration-500" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-3">
                          <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                            PHASE {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="w-px h-3 bg-zinc-800" />
                          <span>{project.aspect}</span>
                        </div>
                        
                        <h3 className="text-2xl font-black text-white font-mono uppercase tracking-tight mb-3 group-hover:text-green-500 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-6">
                          {project.desc}
                        </p>
                      </div>

                      {/* Metadata Strip */}
                      <div className="border-t border-zinc-900 pt-4 mt-auto">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center font-mono text-[10px] text-zinc-500">
                          <span className="text-zinc-300 tracking-tight">{project.meta}</span>
                          <button 
                            onClick={() => setActiveVideo(project)}
                            className="flex items-center gap-2 uppercase font-bold tracking-widest text-[9px] px-3 py-1.5 rounded transition-all duration-200 bg-green-600/10 text-green-500 border border-green-600/20 hover:bg-green-600 hover:text-white hover:border-green-600"
                            data-cursor="interactive"
                          >
                            <Play size={10} className="fill-current" /> PLAY
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pseudo Software Timeline Scrubber Graphic at the base */}
                    <div className="h-1.5 bg-zinc-950 border-t border-zinc-900 relative">
                      <motion.div
                        className="absolute top-0 bottom-0 w-[1.5px] bg-green-500"
                        initial={{ left: "0%" }}
                        whileHover={{ left: "75%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <div className="absolute top-0 bottom-0 left-[12%] w-[8%] bg-zinc-800" />
                      <div className="absolute top-0 bottom-0 left-[50%] w-[15%] bg-zinc-800" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-zinc-800 bg-[#0d0d0f] rounded"
            >
              <div className="font-mono text-zinc-600 text-xs uppercase tracking-widest mb-2">// NO MATCHING PROJECTS</div>
              <p className="text-zinc-500 text-sm">No projects found for category: <span className="text-green-500 font-bold uppercase">{selectedCategory}</span></p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-6 inline-flex items-center gap-2 text-green-500 hover:text-white text-[10px] font-mono uppercase tracking-widest border border-green-600/20 hover:border-green-600 bg-green-600/5 hover:bg-green-600 px-4 py-2 rounded transition-all"
              >
                <ArrowRight size={12} className="rotate-180" /> BACK TO ALL
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- POST-PRODUCTION PIPELINE SEQUENCE --- */}
      <section id="pipeline" className="py-24 bg-[#08080a] border-b border-zinc-900">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-28">
              <span className="text-green-500 font-mono text-xs tracking-[0.3em] uppercase block mb-4">POST PRODUCTION ASSEMBLY</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-mono leading-none">
                The Pipeline Sequence.
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                Structured stages of the editing lifecycle. Maintaining rigorous version control and logical pathways from raw transfer to clean delivery formats.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
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

      {/* --- PRODUCTION / RATES SECTION --- */}
      <section id="rates" className="py-24 bg-[#08080a] border-b border-zinc-900">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-500 font-mono text-xs tracking-[0.3em] uppercase block mb-3">// PROJECT SCOPE & COSTS</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono">Rates & Profiles</h2>
            <p className="text-zinc-500 text-sm mt-4 font-mono">Structured pricing matching varying complexity parameters. Clear definitions of work hours.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            <RateCard 
              title="Social / Short-Form"
              price="450 €"
              unit="per video"
              desc="Optimized dynamic edits mapped explicitly for retention, mobile grids, and short-form loops."
              deliverables={[
                "Delivery in native vertical aspect (9:16)",
                "Full sound foley design included",
                "Color grade and contrast optimization",
                "2 structural correction rounds",
                "Subtitles & graphic details overlay"
              ]}
            />
            <RateCard 
              title="Commercial / Brand"
              price="1 200 €"
              unit="per day"
              desc="High-impact corporate brand films and advertising campaigns with complex pacing constraints."
              deliverables={[
                "Standard 16:9 + custom screen variations",
                "Advanced VFX speed ramps & frame masking",
                "Premium audio spatial balancing",
                "Raw footage processing & organization",
                "Custom visual style lookup matrix"
              ]}
              highlight
            />
            <RateCard 
              title="Creative / Narrative"
              price="On Pitch"
              unit="Project Base"
              desc="Bespoke cinematic structures, independent documentaries, and music video cuts requiring intense creative direction."
              deliverables={[
                "Cinema native scopes (2.39:1 / 4:3)",
                "Custom color correction via Aces CC",
                "Multi-track audio layers with sound effects",
                "In-depth structural consulting sessions",
                "Unlimited critical error adjustments"
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 border-b border-zinc-900">
        <div className="w-11/12 lg:w-[80%] mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-green-500 font-mono text-xs tracking-[0.3em] uppercase block mb-3">// RESOLVING STANDARD PIPELINE QUESTIONS</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white font-mono">FAQ</h2>
            <p className="text-zinc-500 text-sm mt-3">Objective answers detailing raw timeline collaboration patterns.</p>
          </div>

          <div className="space-y-3 font-mono">
            {[
              {
                q: "What raw footage transfer patterns do you work with?",
                a: "I work primarily with cloud file synchronization networks (Frame.io, MASV, Google Drive Enterprise) or direct hardware shipping routes for deep-tier multi-terabyte editing projects. Proxy setups are completed immediately upon ingestion."
              },
              {
                q: "Can you take over project files started by separate editors?",
                a: "Yes. I can ingest standard XML sheets, EDL timelines, or Premiere Pro projects (with full source assets mapped). This allows clear project migration without losing previous organization structures."
              },
              {
                q: "How are correction and revision loops managed?",
                a: "We use Frame.io where you can leave direct, timecode-accurate markup points. Each rate package includes a structured number of revisions to ensure we reach delivery parameters efficiently."
              },
              {
                q: "Do you supply raw sound design and sound effects assets?",
                a: "Yes. Every assembly pass includes deep multitrack sound layers—ranging from background noise and ambient soundscapes to mechanical impact triggers."
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className={`border rounded overflow-hidden transition-all duration-200 ${
                  activeFaq === idx 
                    ? 'border-green-600/50 bg-[#121214]' 
                    : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  data-cursor="interactive"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${activeFaq === idx ? 'text-green-500' : 'text-zinc-600'}`}>
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span className="text-sm font-bold text-white uppercase">{faq.q}</span>
                  </div>
                  <ChevronDown className={`size-4 text-zinc-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-green-500' : ''}`} />
                </button>

                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-2 text-zinc-400 text-xs font-sans leading-relaxed border-t border-zinc-900 mt-0 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOOKING & CONTACT --- */}
      <section id="contact" className="py-24 bg-zinc-950/60">
        <div className="w-11/12 lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <span className="text-green-500 font-mono text-xs tracking-[0.3em] uppercase block">// INITIATE INGEST</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono leading-none">
              Start Your <span className="text-green-600">Cut.</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Secure a space in the post-production rendering queue. Provide structural project parameters below to initiate a direct diagnostic review of your timeline needs.
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-green-600" />
                <span>Response SLA: Within 12 Hours</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-green-600" />
                <a href="mailto:mikey@mikeycuts.com" className="hover:text-white transition-colors">mikey@mikeycuts.com</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border border-zinc-900 bg-[#121214] p-8 rounded">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider block">Project Name / Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g. STREET CAMPAIGN 2026" 
                    className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-white focus:outline-none focus:border-green-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider block">Estimated Raw Runtime</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10 Minutes Total" 
                    className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-white focus:outline-none focus:border-green-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider block">Contact Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. client@brand.com" 
                    className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-white focus:outline-none focus:border-green-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider block">Primary Software Requirement</label>
                  <select className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-white focus:outline-none focus:border-green-600 transition-colors uppercase">
                    <option>Premiere Pro</option>
                    <option>DaVinci Resolve Only</option>
                    <option>No Preference</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-400 uppercase tracking-wider block">Project Description / Technical Needs</label>
                <textarea 
                  rows="4"
                  placeholder="Outline shooting formats, estimated delivery dates, and specific aesthetic inspirations..." 
                  className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-white focus:outline-none focus:border-green-600 transition-colors font-sans"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded uppercase tracking-widest transition-colors flex items-center justify-center gap-3 text-xs"
                data-cursor="interactive"
              >
                Send Request Details <Send size={14} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#070708] text-zinc-500 pt-24 pb-8 border-t border-zinc-900 font-mono text-xs">
        <div className="w-11/12 lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-6 space-y-4">
              <span className="text-white font-black tracking-tighter text-lg uppercase block">
                MIKEY<span className="text-green-600">.</span>CUTS
              </span>
              <p className="text-zinc-500 max-w-sm font-sans text-xs leading-relaxed">
                Focused editing structural operations designed to respect frame limits, sound logic, and raw output purity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-zinc-900 hover:border-green-600 rounded transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Instagram size={16} />
                </a>
                <a href="#" className="p-2 border border-zinc-900 hover:border-green-600 rounded transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Twitter size={16} />
                </a>
                <a href="#" className="p-2 border border-zinc-900 hover:border-green-600 rounded transition-colors text-zinc-400 hover:text-white" data-cursor="interactive">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-white uppercase tracking-widest text-[10px] font-bold text-green-500">[ SERVICES ]</p>
              <ul className="space-y-1.5 uppercase text-[11px]">
                <li>Commercial Cuts</li>
                <li>Cinematic Grading</li>
                <li>Sound Assembly</li>
                <li>Dynamic Ramping</li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-white uppercase tracking-widest text-[10px] font-bold text-green-500">[ SYSTEM STATUS ]</p>
              <ul className="space-y-1.5 uppercase text-[11px] text-zinc-600">
                <li>LAT: 45.4642° N</li>
                <li>LONG: 9.1900° E</li>
                <li>QUEUE: ACCEPTING PROJECTS</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 tracking-wider">
            <p>© 2026 MIKEY POST-STUDIO. ALL EDITING DATA PROCESSED NATIVELY.</p>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
              className="hover:text-white transition-colors uppercase mt-4 md:mt-0"
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

// --- SVG LOGO COMPONENTS FROM SVGL API ---

const PremiereIcon = ({ size }) => (
  <svg viewBox="0 0 83 80" fill="none" width={size} height={size}>
    <g clipPath="url(#premiereClip)">
      <path d="M14.5299 0H67.5214C75.5556 0 82.0513 6.49573 82.0513 14.5299V65.4701C82.0513 73.5043 75.5556 80 67.5214 80H14.5299C6.49573 80 0 73.5043 0 65.4701V14.5299C0 6.49573 6.49573 0 14.5299 0Z" fill="#00005B"/>
      <path d="M19.4872 56.1025V20.923C19.4872 20.6837 19.5897 20.5469 19.8291 20.5469C20.4103 20.5469 20.9573 20.5469 21.7436 20.5127C22.5641 20.4785 23.4188 20.4785 24.3419 20.4444C25.265 20.4102 26.2564 20.4102 27.3162 20.376C28.3761 20.3418 29.4017 20.3418 30.4274 20.3418C33.2308 20.3418 35.5556 20.6837 37.4701 21.4016C39.1795 21.9828 40.7521 22.9401 42.0513 24.205C43.1453 25.2991 44 26.6324 44.547 28.1025C45.0598 29.5384 45.3333 31.0085 45.3333 32.5469C45.3333 35.4871 44.6496 37.9144 43.2821 39.829C41.9145 41.7435 40 43.1794 37.7778 43.9999C35.453 44.8546 32.8889 45.1623 30.0855 45.1623C29.265 45.1623 28.718 45.1623 28.3761 45.1281C28.0342 45.0939 27.5556 45.0939 26.906 45.0939V56.0683C26.9402 56.3076 26.7692 56.5127 26.5299 56.5469C26.4957 56.5469 26.4615 56.5469 26.3932 56.5469H19.8974C19.6239 56.5469 19.4872 56.4102 19.4872 56.1025ZM26.9402 27.1452V38.6324C27.4188 38.6666 27.8633 38.7008 28.2735 38.7008H30.0855C31.4188 38.7008 32.7521 38.4956 34.0171 38.0854C35.1111 37.7777 36.0684 37.1281 36.8205 36.2734C37.5385 35.4187 37.8803 34.2563 37.8803 32.7521C37.9145 31.6922 37.641 30.6324 37.094 29.7093C36.5128 28.8204 35.6923 28.1367 34.7009 27.7606C33.4359 27.2478 32.0684 27.0427 30.6667 27.0768C29.7778 27.0768 28.9915 27.0768 28.3419 27.111C27.6581 27.0768 27.1795 27.111 26.9402 27.1452Z" fill="#9999FF"/>
      <path d="M50.1197 29.128H56.1026C56.4445 29.128 56.718 29.3674 56.8205 29.675C56.9231 29.9485 56.9915 30.2221 57.0257 30.5297C57.094 30.8716 57.1624 31.2477 57.1966 31.5896C57.2308 31.9656 57.265 32.3759 57.265 32.8203C58.2906 31.6238 59.5214 30.6323 60.9231 29.8802C62.4957 28.9913 64.3077 28.5468 66.1197 28.5468C66.359 28.5126 66.5641 28.6836 66.5983 28.9229C66.5983 28.9571 66.5983 28.9913 66.5983 29.0597V35.7263C66.5983 35.9998 66.4274 36.1024 66.0513 36.1024C64.8205 36.0682 63.5556 36.1708 62.359 36.4443C61.3675 36.6494 60.4103 36.9571 59.4872 37.3673C58.8376 37.675 58.2222 38.0853 57.7436 38.6323V56.0682C57.7436 56.4101 57.6069 56.5468 57.2992 56.5468H50.5641C50.2906 56.581 50.0513 56.4101 50.0171 56.1366C50.0171 56.1024 50.0171 56.034 50.0171 55.9998V37.0597C50.0171 36.2391 50.0171 35.3844 49.9829 34.4956C49.9487 33.6067 49.9487 32.7178 49.9145 31.8289C49.9145 31.0426 49.8462 30.2904 49.7778 29.5041C49.7436 29.3332 49.8462 29.1622 50.0171 29.128C50.0171 29.0938 50.0855 29.0938 50.1197 29.128Z" fill="#9999FF"/>
    </g>
    <defs>
      <clipPath id="premiereClip">
        <rect width="82.0513" height="80" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const AfterEffectsIcon = ({ size }) => (
  <svg viewBox="0 0 83 80" fill="none" width={size} height={size}>
    <g clipPath="url(#afterEffectsClip)">
      <path d="M67.5214 0H14.5299C6.50526 0 0 6.50526 0 14.5299V65.4701C0 73.4947 6.50526 80 14.5299 80H67.5214C75.546 80 82.0513 73.4947 82.0513 65.4701V14.5299C82.0513 6.50526 75.546 0 67.5214 0Z" fill="#00005B"/>
      <path d="M32.9624 47.8634H20.2474L17.6604 55.915C17.6252 56.0616 17.54 56.1913 17.4194 56.2817C17.2988 56.3721 17.1504 56.4177 16.9999 56.4104H10.5599C10.1927 56.4104 10.0642 56.2086 10.1746 55.805L21.1832 24.2314C21.2932 23.9012 21.4034 23.5783 21.5134 23.156C21.6576 22.4216 21.7313 21.6752 21.7336 20.9268C21.7261 20.8745 21.731 20.8212 21.7477 20.771C21.7644 20.7209 21.7926 20.6753 21.83 20.6379C21.8674 20.6005 21.9129 20.5723 21.9631 20.5556C22.0132 20.5389 22.0666 20.534 22.1189 20.5415H30.8708C31.127 20.5415 31.2738 20.6332 31.3111 20.8168L43.8058 55.86C43.9158 56.2272 43.8057 56.4107 43.4756 56.4104H36.32C36.1971 56.4241 36.0734 56.3925 35.9721 56.3216C35.8708 56.2507 35.7988 56.1453 35.7696 56.0251L32.9624 47.8634ZM22.2291 41.0745H30.9258C30.7056 40.3409 30.4487 39.5152 30.1551 38.5975C29.861 37.6807 29.5491 36.6991 29.2194 35.6527C28.8892 34.607 28.559 33.5611 28.2287 32.5153C27.8985 31.4695 27.5957 30.4604 27.3204 29.4879C27.0453 28.5161 26.7976 27.6263 26.5774 26.8184H26.5223C26.2126 28.305 25.8268 29.7747 25.3664 31.2218C24.8521 32.8731 24.3292 34.5611 23.7977 36.2857C23.2654 38.011 22.7425 39.6072 22.2291 41.0745Z" fill="#9999FF"/>
      <path d="M64.0619 44.7295H53.2185C53.3513 45.8024 53.7076 46.8355 54.2644 47.7622C54.8799 48.6798 55.7504 49.3973 56.7687 49.8263C58.1487 50.4234 59.6413 50.716 61.1447 50.684C62.3374 50.6611 63.5256 50.5306 64.6949 50.2942C65.7407 50.153 66.7656 49.8858 67.7473 49.4985C67.9304 49.3523 68.0226 49.4435 68.0226 49.7737V55.0028C68.0316 55.1452 68.0031 55.2876 67.9399 55.4156C67.8769 55.5157 67.7923 55.6003 67.6922 55.6632C66.6033 56.1456 65.4574 56.4869 64.2821 56.6791C62.6854 56.979 61.0627 57.1173 59.4383 57.092C56.8323 57.092 54.6489 56.6883 52.8882 55.881C51.2236 55.1477 49.7535 54.0357 48.5949 52.6335C47.5127 51.3123 46.7077 49.7866 46.228 48.1475C45.753 46.5297 45.512 44.8522 45.5125 43.1661C45.5074 41.3251 45.7954 39.4949 46.3657 37.7444C46.9149 36.0369 47.7834 34.4492 48.9252 33.0658C50.0513 31.6985 51.4595 30.5908 53.0534 29.8182C54.6677 29.0296 56.5761 28.7466 58.7778 28.7466C60.6037 28.7005 62.4173 29.0576 64.0894 29.7924C65.4955 30.3921 66.7333 31.3269 67.6947 32.5153C68.5965 33.679 69.2859 34.9927 69.7313 36.3959C70.165 37.7481 70.3878 39.1591 70.3918 40.5791C70.3918 41.3867 70.3643 42.1206 70.3092 42.7808C70.2543 43.4413 70.2084 43.9183 70.1716 44.2119C70.1574 44.3333 70.099 44.4452 70.0077 44.5263C69.9163 44.6075 69.7984 44.6523 69.6762 44.6523C69.456 44.6523 69.0799 44.6798 68.5479 44.7349C68.0155 44.7899 67.355 44.8266 66.5664 44.8449C65.7768 44.8638 64.9426 44.7295 64.0619 44.7295ZM53.2185 39.7153H60.4291C61.3098 39.7153 61.9611 39.7061 62.383 39.6878C62.6654 39.6595 62.938 39.5692 63.1813 39.4232V39.0929C63.1702 38.6624 63.096 38.2359 62.9611 37.827C62.6641 36.8879 62.0671 36.0723 61.2616 35.5055C60.4561 34.9387 59.4869 34.652 58.5027 34.6895C57.5764 34.6335 56.6538 34.8483 55.8474 35.3077C55.0411 35.7671 54.3858 36.4511 53.9616 37.2765C53.5845 38.0442 53.3336 38.8677 53.2185 39.7153Z" fill="#9999FF"/>
    </g>
    <defs>
      <clipPath id="afterEffectsClip">
        <rect width="82.0513" height="80" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const AppleIcon = ({ size }) => (
  <svg viewBox="0 0 814 1000" width={size} height={size} fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
  </svg>
);

// --- SUB-COMPONENTS FOR SYSTEM LAYOUT ---

const PipelineCard = ({ num, title, desc }) => (
  <div className="bg-zinc-950 p-8 hover:bg-zinc-900 transition-colors">
    <span className="text-[10px] text-green-500 font-mono block mb-2 font-bold tracking-widest">STAGE {num}</span>
    <h4 className="text-base font-black uppercase text-white font-mono flex items-center gap-2 mb-3">
      <span className="w-1.5 h-1.5 bg-green-600 shrink-0" /> {title}
    </h4>
    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{desc}</p>
  </div>
);

const HardwareItem = ({ icon, title, desc }) => (
  <div className="p-8 bg-zinc-950/40 hover:bg-zinc-950 transition-colors border-0">
    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-sm font-bold uppercase tracking-tight mb-3 text-white font-mono">{title}</h3>
    <p className="text-zinc-400 font-sans text-xs leading-relaxed">{desc}</p>
  </div>
);

const RateCard = ({ title, price, unit, desc, deliverables, highlight = false }) => (
  <div className={`p-8 flex flex-col justify-between h-full relative ${highlight ? 'bg-zinc-900 border-x-green-600' : 'bg-zinc-950'}`}>
    {highlight && (
      <div className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-green-500 mb-3 block">
        [ POPULAR TIMELINE CONFIG ]
      </div>
    )}
    
    <div>
      <h3 className="text-xl font-black uppercase text-white font-mono mb-1">{title}</h3>
      <div className="mb-4 font-mono">
        <span className="text-2xl font-bold text-white">{price}</span>
        <span className="text-xs text-zinc-500 uppercase ml-1">/ {unit}</span>
      </div>
      <p className="text-[10px] font-mono text-zinc-400 uppercase leading-relaxed mb-6">{desc}</p>

      <div className="space-y-2 mb-8">
        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 font-mono mb-3">Inclusions</h4>
        <ul className="space-y-2">
          {deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[10px] font-mono text-zinc-300 leading-tight">
              <Check size={10} className="text-green-500 shrink-0 mt-0.5" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <a 
      href="#contact" 
      className={`w-full py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest border text-center transition-all rounded block ${
        highlight 
          ? 'bg-green-600 text-white border-green-600 hover:bg-zinc-950 hover:border-zinc-800' 
          : 'border-zinc-800 text-white hover:bg-white hover:text-black hover:border-white'
      }`}
      data-cursor="interactive"
    >
      Request Pitch Scope
    </a>
  </div>
);