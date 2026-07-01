import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence  } from 'framer-motion';
import {
  Trophy, MapPin, ArrowUpRight, MoveRight, Timer,
  ShieldCheck, Zap, Users, Instagram, Facebook,
  Linkedin, Mail, Cpu, CalendarDays, Binary, ChevronUp
} from 'lucide-react';

import './App.css';

// new one
const RasaIntro = ({ onComplete }) => {
  const letters = "RASA CLUB".split("");

  // Tactical chess coordinates for the background
  const coordinates = ["A1", "H8", "E4", "C5", "G1", "F3", "D4", "B2"];

  useEffect(() => {
    const timer = setTimeout(onComplete, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden font-sans"
    >
      {/* 1. ULTRA-FAST TACTICAL GRID */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 grid-rows-8 opacity-40">
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.2, delay: Math.random() * 0.5 }}
            className="border-[0.5px] border-brand-orange/20"
          />
        ))}
      </div>

      {/* 2. CHESS COORDINATE FLASHES (Philosophy of Logic) */}
      {coordinates.map((coord, i) => (
        <motion.span
          key={coord}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1, delay: i * 0.1 }}
          className="absolute text-brand-orange/30 text-xs font-mono"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          {coord}
        </motion.span>
      ))}

      <div className="relative flex flex-col items-center">
        {/* 3. THE LOGO: SLICING EFFECT */}
        <div className="flex mb-2">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: i % 2 === 0 ? -40 : 40,
                skewX: 20
              }}
              animate={{
                opacity: 1,
                y: 0,
                skewX: 0
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                ease: [0.23, 1, 0.32, 1]
              }}
              className={`text-6xl md:text-[120px] font-[900] tracking-[ -0.05em] leading-none ${
                char === " " ? "w-4 md:w-10" : "text-white"
              }`}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 4. THE "STRATEGY" LINE (Fast Orange Pulse) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, delay: 0.5, ease: "circOut" }}
          className="h-1 md:h-2 bg-brand-orange w-full"
        />

        {/* 5. MODERN SUBTITLE (The Philosophy) */}
        <div className="overflow-hidden mt-4">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-brand-orange text-[10px] md:text-sm font-bold uppercase tracking-[0.4em]"
          >
            The Art of the Opening
          </motion.p>
        </div>
      </div>

      {/* 6. VECTOR SLICE (Chess move visualization) */}
      <motion.div
        initial={{ x: "-100%", y: "100%" }}
        animate={{ x: "100%", y: "-100%" }}
        transition={{ duration: 0.5, delay: 0.3, ease: "anticipate" }}
        className="absolute inset-0 border-t border-brand-orange/50 rotate-[15deg] origin-center scale-150"
      />

      {/* 7. FINAL FLASH */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, delay: 1.2 }}
        className="absolute inset-0 bg-white z-[10001] pointer-events-none mix-blend-difference"
      />
    </motion.div>
  );
};


// another intro
const AestheticIntro = ({ onComplete }) => {
  const letters = "RASA CLUB".split("");

  useEffect(() => {
    const timer = setTimeout(onComplete, 2200); // Slightly more time for the "art" to breathe
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* 1. THE CHESS GRID (Subtle Background) */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20 pointer-events-none">
        {[...Array(64)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 1.5,
              delay: Math.random() * 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="border-[0.5px] border-white/10"
          />
        ))}
      </div>

      {/* 2. THE PHILOSOPHICAL VOID (Grain Texture Overlay) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light">
        <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* 3. THE "KNIGHT'S MOVE" GEOMETRY */}
        <motion.div
          initial={{ width: 0, height: 1 }}
          animate={{ width: "200px", height: "1px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-white/40 mb-8"
        />

        <div className="flex overflow-hidden px-4">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1], // Custom "Expo" ease
              }}
              className={`
                text-5xl md:text-8xl font-serif tracking-tight
                ${char === " " ? "w-4 md:w-8" : "text-zinc-100"}
                drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]
              `}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* 4. THE SUBTITLE (Philosophical hook) */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 0.6, letterSpacing: "0.2em" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-[10px] md:text-xs uppercase font-light text-zinc-400"
        >
          Tabula Rasa • Strategic Art
        </motion.p>
      </div>

      {/* 5. CINEMATIC LIGHT STREAK (The "Move") */}
      <motion.div
        initial={{ top: "100%", left: "-10%", rotate: -45 }}
        animate={{ top: "-100%", left: "110%" }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        className="absolute w-[30vw] h-[200vh] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
      />

      {/* 6. VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
    </motion.div>
  );
};

// --- HIGH-SPEED CINEMATIC INTRO ---
const NetflixIntro = ({ onComplete }) => {
  const letters = "RASA CLUB".split("");

  useEffect(() => {
    const timer = setTimeout(onComplete, 1200); // Super fast total time
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.4, ease: "circIn" }}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex overflow-hidden py-4">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              // Glitch flicker effect
              filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.04, // Very tight stagger for "writing" feel
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className={`text-6xl md:text-[140px] font-black uppercase tracking-tighter inline-block ${
              char === " " ? "w-6 md:w-12" : "text-brand-orange"
            }`}
          >
            {char}
          </motion.span>
        ))}

        {/* The "Scanner" Line effect that passes over the text */}
        <motion.div
          initial={{ left: "-10%" }}
          animate={{ left: "110%" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent skew-x-12 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};


// --- SYSTEM CURSOR REPLACEMENT ---
const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 500, mass: 0.3 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'SPAN', 'LI', 'LABEL'].includes(target.tagName);
      const isLink = target.closest('a') || target.closest('button') || target.tagName === 'INPUT';

      if (isLink) setCursorType('link');
      else if (isText) setCursorType('text');
      else setCursorType('default');
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white"
      style={{
        translateX: x,
        translateY: y,
        left: cursorType === 'text' ? 0 : (cursorType === 'link' ? -30 : -20),
        top: cursorType === 'text' ? -24 : (cursorType === 'link' ? -30 : -20),
        width: cursorType === 'text' ? 2 : (cursorType === 'link' ? 60 : 40),
        height: cursorType === 'text' ? 48 : (cursorType === 'link' ? 60 : 40),
        borderRadius: cursorType === 'text' ? '0px' : '100%',
      }}
    />
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <div className="bg-white text-black selection:bg-brand-orange selection:text-white overflow-x-hidden font-sans">

      <AnimatePresence mode="wait">
        {showIntro && <NetflixIntro key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <CustomCursor />

      {/* --- HERO SECTION --- */}
      <header className="max-w-7xl mx-auto p-6 min-h-screen flex flex-col justify-between">
        <div className="flex justify-between items-start font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black/10 pb-4">
          <div className="flex gap-8">
            <span className="font-bold text-brand-orange">RASA × ESTIN</span>
            <span className="text-gray-400 hidden md:block">Cultural Club // Bejaia</span>
          </div>
          <div className="text-right">
             [ 30-31 JAN 2026 ]
          </div>
        </div>

        <div className="py-8">
          <h1 className="text-end text-[13vw]/[0.8] xl:text-[190px]/[0.8] font-black tracking-tighter uppercase">
            GRAND <br /> <span className="text-brand-orange">MASTER.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mt-4">
          <div className="relative overflow-hidden bg-brand-gray border border-black group">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://i.pinimg.com/736x/6a/b5/f1/6ab5f166469738b514a4c0689563d1f5.jpg"
              alt="Chess Arena"
              className="w-full h-[300px] lg:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-4 left-4 bg-black text-brand-orange px-3 py-1 font-mono text-xs uppercase italic font-bold">
              ESTIN_ARENA.RAW
            </div>
          </div>

          <div className="flex flex-col justify-between py-2">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-[0.9] uppercase tracking-tighter italic">
                Where <span className="text-brand-orange">Algorithm</span> <br /> meets <br /> intuition.
              </h2>
              <p className="text-xl font-light text-justify leading-snug max-w-lg">
                Rasa is a cultural club based at the Higher School of Computer Sciences and Digital Technologies - Bejaia. We transform students into makers by fostering the strategic depth required for both code and the 64 squares.
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-black pt-8 gap-4 font-mono uppercase text-xs">
               <div className="flex items-center gap-3">
                 <div className="size-2 bg-brand-orange rounded-full animate-ping" />
                 <span>Registration Open</span>
               </div>
               <div className="text-right text-gray-400">
                 Available Slots: 64/128
               </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mt-12 pb-4">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
            ESTIN // Digital District
          </div>
          <div className="group overflow-hidden">
            <div className="flex items-center gap-4 text-4xl font-black italic group-hover:text-brand-orange transition-all duration-500">
              EXPLORE <MoveRight size={40} className="group-hover:translate-x-4 transition-transform" />
            </div>
          </div>
        </div>
      </header>

      {/* --- SCOREBOARD --- */}
      <section className="bg-brand-gray border-y border-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <h2 className="text-[10vw] lg:text-8xl font-black uppercase tracking-tighter leading-none">
                Score <br/> Board.
            </h2>
            <p className="font-mono text-sm max-w-xs text-gray-500 italic text-right">
                Real-time technical tracking for the 2026 Grand Master Series.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-black">
            <StatItem number="09" label="ROUNDS" sub="Swiss System Calculation" />
            <StatItem number="01" label="Big Final" sub="Best Of 2" isOrange />
            <StatItem number="128" label="MAX" sub="Participant Capacity" />
            <StatItem number="15'" label="TIME" sub="Rapid Time Control" />
          </div>
        </div>
      </section>

      {/* --- TECHNICALS & SCHEDULE --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-12 space-y-12">
            <div className="space-y-4">
                <span className="text-brand-orange font-mono font-bold tracking-[0.5em] text-xs uppercase underline decoration-2 underline-offset-4">Tournament Specs</span>
                <h3 className="text-7xl font-black uppercase tracking-tighter leading-none">
                    Bold <br/> Logic. <br/> <span className="bg-black text-white px-2">Act Well.</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
               <TechRow icon={<Timer/>} title="15+5 Rapid" desc="FIDE-standard time control for professional pacing." />
               <TechRow icon={<Zap/>} title="Live Stream" desc="The grand finals broadcasted." />
               <TechRow icon={<Cpu/>} title="Analysis" desc="Stockfish 16 cloud engine analysis for the grand finals." />
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-10 border-4 border-black bg-white shadow-[20px_20px_0px_0px_#FF5F00]">
                <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-6">
                    <h4 className="text-4xl font-black uppercase italic tracking-tighter">Timeline</h4>
                    <CalendarDays size={40} />
                </div>
                <div className="space-y-8 font-mono">
                    <ScheduleRow day="30 JAN" time="08:30" event="Identification & Seating" />
                    <ScheduleRow day="30 JAN" time="10:00" event="Rounds 01 - 04" />
                    <ScheduleRow day="31 JAN" time="09:00" event="Rounds 05 - 09" />
                    <ScheduleRow day="31 JAN" time="15:00" event="Grand Final Showdown" />
                    <ScheduleRow day="31 JAN" time="17:00" event="Awards & Closing" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UPDATED CTA SECTION --- */}
      <section className="bg-black py-0 border-t border-black overflow-hidden">
        {/* Marquee effect */}
        <div className="bg-brand-orange py-4 border-b-2 border-black flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 text-black font-mono font-black uppercase text-xl"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                THINK RIGHT • ACT WELL • JOIN THE ARENA <Binary size={20}/>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-white text-6xl md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              THE 64 <br/> <span className="text-brand-orange">SQUARES</span> <br/> ARE WAITING.
            </h2>
            <p className="text-gray-400 text-xl max-w-md font-light">
              Limited slots available for the 2026 Season. Secure your rank among the best tech-minds in Bejaia.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <button className="group relative bg-brand-orange text-black px-12 py-10 font-black text-4xl uppercase transition-transform hover:-translate-x-2 hover:-translate-y-2 border-4 border-white shadow-[10px_10px_0px_0px_#fff] active:shadow-none active:translate-x-1 active:translate-y-1">
              ENTER ARENA
              <ArrowUpRight className="inline-block ml-4 group-hover:rotate-45 transition-transform" size={48} />
            </button>
            <div className="mt-8 font-mono text-brand-orange text-xs tracking-widest uppercase animate-pulse">
              System Status: Acceptable_Participants_Only
            </div>
          </div>
        </div>
      </section>

      {/* --- UPDATED FOOTER SECTION --- */}
      <footer className="bg-white text-black pt-32 pb-8 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            {/* Brand Block */}
            <div className="md:col-span-5 space-y-8">
              <div className="text-6xl font-black tracking-tighter uppercase italic">
                RASA<span className="text-brand-orange">.</span>
              </div>
              <p className="text-xl font-medium leading-tight max-w-xs">
                Feel the emotion. Live the expression. Join Rasa Cultural Club and be part of a vibrant community where creativity meets culture.
              </p>
              <div className="flex gap-4">
                  <SocialIcon variant="dark" icon={<Instagram />} />
                  <SocialIcon variant="dark" icon={<Facebook />} />
                  <SocialIcon variant="dark" icon={<Linkedin />} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 font-mono text-sm space-y-4">
              <p className="font-black uppercase tracking-widest text-brand-orange">Navigation</p>
              <ul className="space-y-2 uppercase font-bold">
                <li><a href="#" className="hover:line-through underline-offset-4">Home</a></li>
                <li><a href="#" className="hover:line-through underline-offset-4">Tournament Rules</a></li>
                <li><a href="#" className="hover:line-through underline-offset-4">Player List</a></li>
                <li><a href="#" className="hover:line-through underline-offset-4">Hall of Fame</a></li>
              </ul>
            </div>

            {/* Contact / Venue */}
            <div className="md:col-span-4 space-y-6 md:text-right flex flex-col md:items-end">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400">Direct Contact</p>
              <a href="mailto:rasa.club@estin.dz" className="text-2xl md:text-3xl font-black hover:text-brand-orange transition-colors break-all">
                rasa.club@estin.dz
              </a>
              <div className="pt-4">
                <p className="font-bold uppercase tracking-tighter">ESTIN Amizour Campus</p>
                <p className="text-gray-500 italic">Bejaia, Algeria 06000</p>
              </div>
            </div>
          </div>



          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-[0.2em] pt-8 text-gray-500 border-t border-black">
            <p>© 2026 RASA CULTURAL CLUB • ALL RIGHTS RESERVED</p>
            <div className="flex gap-8 mt-4 md:mt-0">
               <span>LAT: 36.6406° N</span>
               <span>LONG: 4.9014° E</span>
               <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 hover:text-black">
                 BACK TO TOP <ChevronUp size={12}/>
               </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- COMPONENTS ---

const StatItem = ({ number, label, sub, isOrange }) => (
  <div className="p-10 border-r border-b border-black last:border-r-0 hover:bg-black group transition-colors duration-500">
    <div className={`text-8xl font-black tracking-tighter mb-4 ${isOrange ? 'text-brand-orange' : 'group-hover:text-brand-orange transition-colors'}`}>
      {number}
    </div>
    <div className="font-mono group-hover:text-white transition-colors">
      <p className="text-lg font-bold uppercase tracking-tighter">{label}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{sub}</p>
    </div>
  </div>
);

const TechRow = ({ icon, title, desc }) => (
  <div className="flex items-start gap-6 border-b border-black/10 pb-6 group">
    <div className="p-4 bg-brand-gray group-hover:bg-brand-orange group-hover:text-white transition-colors rounded-full">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h4 className="text-xl font-black uppercase tracking-tight">{title}</h4>
      <p className="text-gray-500 italic text-sm">{desc}</p>
    </div>
  </div>
);

const ScheduleRow = ({ day, time, event }) => (
  <div className="flex justify-between items-center border-b border-black/5 pb-4 group hover:bg-brand-gray transition-colors">
    <div className="flex flex-col">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">{day}</span>
        <span className="text-gray-400 italic text-xs">{time}</span>
    </div>
    <span className="text-xl font-bold uppercase group-hover:italic transition-all">{event}</span>
  </div>
);

const SocialIcon = ({ icon, variant = 'light' }) => (
  <a
    href="#"
    className={`p-4 border rounded-full transition-all duration-300 ${
      variant === 'light'
        ? 'border-white/20 hover:bg-brand-orange hover:border-brand-orange'
        : 'border-black/20 hover:bg-black hover:text-white'
    }`}
  >
    {React.cloneElement(icon, { size: 20 })}
  </a>
);

export default App;