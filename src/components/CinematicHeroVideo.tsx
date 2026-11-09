import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw, Eye, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18n';

interface CinematicHeroVideoProps {
  videoUrl: string;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({ videoUrl }) => {
  const { t, lang } = useI18n();
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOculusHovered, setIsOculusHovered] = useState(false);

  // Synchronize playback between background and foreground video
  const syncVideos = useCallback(() => {
    if (bgVideoRef.current && fgVideoRef.current) {
      const diff = Math.abs(bgVideoRef.current.currentTime - fgVideoRef.current.currentTime);
      if (diff > 0.04) {
        fgVideoRef.current.currentTime = bgVideoRef.current.currentTime;
      }
    }
  }, []);

  useEffect(() => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;

    if (bg && fg) {
      const handlePlay = () => {
        setIsPlaying(true);
        fg.play().catch(() => {});
      };
      const handlePause = () => {
        setIsPlaying(false);
        fg.pause();
      };
      const handleTimeUpdate = () => {
        syncVideos();
      };

      bg.addEventListener('play', handlePlay);
      bg.addEventListener('pause', handlePause);
      bg.addEventListener('timeupdate', handleTimeUpdate);

      // Frame-locked continuous synchronization loop
      let animId: number;
      const loopSync = () => {
        if (bg && fg && !bg.paused) {
          const diff = Math.abs(bg.currentTime - fg.currentTime);
          if (diff > 0.04) {
            fg.currentTime = bg.currentTime;
          }
        }
        animId = requestAnimationFrame(loopSync);
      };
      animId = requestAnimationFrame(loopSync);

      bg.play().catch(() => {
        setIsPlaying(false);
      });

      return () => {
        cancelAnimationFrame(animId);
        bg.removeEventListener('play', handlePlay);
        bg.removeEventListener('pause', handlePause);
        bg.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [syncVideos]);

  const togglePlay = () => {
    if (!bgVideoRef.current || !fgVideoRef.current) return;
    if (isPlaying) {
      bgVideoRef.current.pause();
      fgVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      bgVideoRef.current.play();
      fgVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (!bgVideoRef.current || !fgVideoRef.current) return;
    bgVideoRef.current.currentTime = 0;
    fgVideoRef.current.currentTime = 0;
    bgVideoRef.current.play();
    fgVideoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black">

      {/* ============================================================ */}
      {/* LAYER 1: BASE BACKGROUND VIDEO (100% OPACITY, ZERO OVERLAYS) */}
      {/* ============================================================ */}
      <video
        ref={bgVideoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 z-0"
      />

      {/* ============================================================ */}
      {/* LAYER 2: HUGE & BOLD "FUTURE VISION" TYPOGRAPHY (BELOW CHARACTER) */}
      {/* ============================================================ */}
      <div
        id="typography-future-vision"
        className="absolute inset-x-0 bottom-[5%] sm:bottom-[6%] md:bottom-[7%] z-25 flex flex-col items-center justify-center pointer-events-none select-none px-4 text-center"
      >
        <h1
          id="hero-main-title"
          className={`${
            lang === 'ar'
              ? "font-['Noto_Kufi_Arabic',sans-serif] tracking-normal"
              : "font-['Montserrat','Outfit',sans-serif] tracking-[-0.035em]"
          } font-black uppercase text-white leading-none text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[130px] whitespace-nowrap drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]`}
        >
          {t('futureVision')}
        </h1>
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: FOREGROUND CHARACTER VIDEO (OCCLUSION & MASKING) */}
      {/* ============================================================ */}
      <video
        ref={fgVideoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none opacity-100"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 34% 88% at 50% 50%, black 50%, rgba(0,0,0,0.8) 65%, transparent 85%)',
          maskImage:
            'radial-gradient(ellipse 34% 88% at 50% 50%, black 50%, rgba(0,0,0,0.8) 65%, transparent 85%)',
        }}
      />

      {/* ============================================================ */}
      {/* LAYER 4: INTERACTIVE OCULUS HOVER HOTSPOT & GLASS BOX */}
      {/* ============================================================ */}
      {/*
        Invisible interactive trigger area covering the Oculus headset on the character.
        When hovered, displays the small circular dot marker directly on the Oculus,
        a thin directional arrow/line, and a compact frosted glassmorphism info card beside it.
      */}
      <div
        id="oculus-interactive-hotspot"
        onMouseEnter={() => setIsOculusHovered(true)}
        onMouseLeave={() => setIsOculusHovered(false)}
        className="absolute top-[28%] sm:top-[30%] md:top-[32%] left-[44%] sm:left-[46%] md:left-[47%] w-[26%] sm:w-[22%] md:w-[19%] h-[24%] sm:h-[22%] md:h-[20%] z-40 cursor-pointer rounded-full"
        title={t('hotspotTitle')}
      />

      {/* Hover Elements: Circular Dot Marker, Directional Line, and Glass Box Card */}
      <AnimatePresence>
        {isOculusHovered && (
          <div
            className="absolute inset-0 z-40 pointer-events-none select-none overflow-visible"
            aria-live="polite"
          >
            {/* 1. Small Circular Dot Marker directly on the Oculus */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute top-[42.5%] left-[58.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            >
              {/* Outer pulsing ring */}
              <div className="w-5 h-5 rounded-full border border-white/70 animate-ping opacity-60 absolute" />
              {/* Hotspot circular ring */}
              <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                {/* Center solid core dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </motion.div>

            {/* 2. Thin Directional Line / Arrow extending toward the info card */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="absolute top-[35%] left-[58.5%] w-[18vw] max-w-[140px] h-[70px] pointer-events-none hidden sm:block overflow-visible"
            >
              {/* Directional angled line */}
              <path
                d="M 0 45 L 30 12 L 100 12"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.25"
                strokeDasharray="2 2"
              />
              <circle cx="100" cy="12" r="2.5" fill="white" />
            </motion.svg>

            {/* 3. Compact Glassmorphism Information Card beside the Oculus */}
            <motion.div
              initial={{ opacity: 0, x: 14, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[28%] sm:top-[30%] md:top-[31%] left-[64%] sm:left-[66%] md:left-[68%] pointer-events-none"
            >
              <div
                id="oculus-glass-card"
                className="w-[200px] sm:w-[220px] md:w-[230px] p-3 sm:p-3.5 rounded-xl bg-white/[0.16] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">
                      {t('oculusTag')}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-semibold text-white/80 tracking-wide">
                    {t('oculusBadge')}
                  </span>
                </div>

                {/* Sub-headline */}
                <h4 className="text-xs sm:text-[13px] font-bold text-white leading-snug tracking-tight mb-1">
                  {t('oculusHead')}
                </h4>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-1 pt-1.5 mt-1 border-t border-white/20">
                  <div className="flex items-center gap-1 text-[10px] text-white/90">
                    <Eye className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>{t('foveated')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/90">
                    <Cpu className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>{t('latency')}</span>
                  </div>
                </div>

                {/* Micro Footer Accent */}
                <div className="flex items-center justify-between text-[9px] text-white/70 pt-1.5 mt-1.5 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-white/80" />
                    {t('lidar')}
                  </span>
                  <span className="font-semibold text-white/90">{t('active')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* LAYER 5: PLAYBACK CONTROLS (Bottom-Right) */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 right-4 z-30 pointer-events-auto flex items-center gap-2">
        <button
          id="btn-toggle-video-playback"
          onClick={togglePlay}
          title={isPlaying ? t('pauseVideo') : t('playVideo')}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-90 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          id="btn-restart-video"
          onClick={handleRestart}
          title={t('restartVideo')}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-90 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
