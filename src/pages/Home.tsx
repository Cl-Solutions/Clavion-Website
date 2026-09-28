// ─── REDESIGN V3 — Home.tsx ──────────────────────────────────────────────────
// Branch: redesign-v3  |  Normal scroll layout, 11 sections
// Replaces 3D panel system with scroll-triggered animations per section.
// Nav + Footer + dark/cyan theme + StarField + CustomCursor preserved.

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Clock, TrendingUp, Zap, MessageSquare,
  Search, Cog,
  ArrowRight, ChevronDown,
  Plus, Minus, Menu, X,
  Users, MapPin, Target, CheckCircle,
  Globe, ShieldCheck, Rocket, Check, ShoppingBag, ExternalLink,
} from 'lucide-react';
import { StarField } from '../components/StarField';
import { CustomCursor } from '../components/CustomCursor';
import { Spotlight } from '../components/ui/Spotlight';
import { GlowCard } from '../components/ui/GlowCard';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import { GridBeam } from '../components/ui/GridBeam';
import { AnimatedDemo } from '../components/ui/AnimatedDemo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ContactFormFields } from '../components/ContactForm';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';

// ─── GSAP word carousel ───────────────────────────────────────────────────────



/**
 * GSAP-powered vertical word carousel.
 * No React state → zero re-renders per tick.
 * Words slide out upward (y→-32, fade) and enter from below (y:36→0, fade).
 * onCycle is called each time a new word fully lands — use it to sync other UI.
 */
function useGsapCarousel(words: string[], onCycle?: () => void) {
  const wordRef   = useRef<HTMLSpanElement>(null);
  const alive     = useRef(true);
  const idxRef    = useRef(0);
  const timerRef  = useRef<gsap.core.Tween | null>(null);
  // Keep a stable ref to onCycle so the GSAP closure never captures a stale value
  const onCycleRef = useRef(onCycle);
  useLayoutEffect(() => { onCycleRef.current = onCycle; });

  useLayoutEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    alive.current  = true;
    idxRef.current = 0;
    el.textContent = words[0];
    gsap.set(el, { y: 0, opacity: 1 });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const schedule = () => {
      // Store the delayedCall so cleanup can kill it explicitly
      timerRef.current = gsap.delayedCall(2.6, () => {
        if (!alive.current) return;
        gsap.to(el, {
          y: -32, opacity: 0, duration: 0.38, ease: 'power2.in',
          onComplete() {
            if (!alive.current) return;
            idxRef.current = (idxRef.current + 1) % words.length;
            el.textContent = words[idxRef.current];
            gsap.fromTo(el,
              { y: 36, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.52, ease: 'power3.out',
                onComplete() {
                  // Fire sync callback once the new word is fully visible
                  onCycleRef.current?.();
                  schedule();
                },
              }
            );
          },
        });
      });
    };
    schedule();

    return () => {
      alive.current = false;
      timerRef.current?.kill();   // kills the pending delayedCall
      gsap.killTweensOf(el);      // kills any in-progress tweens on the element
    };
  // `words` comes from the active dictionary and keeps a stable identity for as
  // long as the language does, so this re-runs exactly once per language switch
  // — which is what rebuilds the carousel in the new language.
  }, [words]);

  return wordRef;
}

// ─── Shared helpers ──────────────────────────────────────────────────────────

/** Smooth-scroll to a section by ID, offsetting for the fixed 80px navbar. */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}

// ─── Data ────────────────────────────────────────────────────────────────────

type NavItem = { label: string; id?: string; href?: string };

// Icons stay in code and pair positionally with t.problems.items.
const PROBLEM_ICONS = [Clock, TrendingUp, Zap, MessageSquare];

// Paired positionally with t.services.items.
const SERVICE_ICONS = [Globe, Target, Clock, Zap];

// Paired positionally with t.process.steps.
const STEP_META = [
  { num: '01', icon: Search },
  { num: '02', icon: Cog },
  { num: '03', icon: TrendingUp },
];

type StatDef =
  | { kind: 'count';        end: number; suffix: string }
  | { kind: 'static';       display: string }
  | { kind: 'static-white'; display: string }
  | { kind: 'countdown' };

// Numbers and animation kind live here; their labels come from t.stats.labels.
const stats: StatDef[] = [
  { kind: 'count',        end: 48, suffix: 'h'  },
  { kind: 'static-white', display: '1–2'        },
  { kind: 'count',        end: 24, suffix: '/7' },
  { kind: 'countdown'                           },
];

const techLogos: { type: 'img' | 'text'; src?: string; alt?: string; label?: string }[] = [
  { type: 'text', label: 'OpenAI' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/n8n/ffffff',    alt: 'n8n' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/make/ffffff',   alt: 'Make' },
  { type: 'text', label: 'Anthropic' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/zapier/ffffff', alt: 'Zapier' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/python/ffffff', alt: 'Python' },
  { type: 'img',  src: 'https://cdn.simpleicons.org/vercel/ffffff', alt: 'Vercel' },
  { type: 'text', label: 'Voiceflow' },
];


// ─── Utilities ───────────────────────────────────────────────────────────────

/** Mouse glow — follows cursor, tightens during scroll. Desktop only. */
function MouseGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    let rafId: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        if (outerRef.current)
          outerRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        rafId = null;
      });
    };
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setScrolling(false), 150);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timerRef.current);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div ref={outerRef} className="fixed pointer-events-none z-[60] hidden lg:block"
      style={{ width: 300, height: 300, top: 0, left: 0, willChange: 'transform' }}>
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 70%)', opacity: scrolling ? 0 : 1, transition: 'opacity 300ms ease' }} />
      <div className="absolute rounded-full"
        style={{ width: 150, height: 150, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0) 70%)', opacity: scrolling ? 1 : 0, transition: 'opacity 300ms ease' }} />
    </div>
  );
}

/**
 * GSAP SplitText reveal for headings, triggered on first inView.
 * headRef → words drop from above.
 */
function useSplitHeadline(inView: boolean) {
  const headRef = useRef<HTMLElement>(null);
  const done    = useRef(false);

  useLayoutEffect(() => {
    if (headRef.current) headRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const head = headRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (head) gsap.set(head, { opacity: 1 });
      return;
    }
    if (head) {
      gsap.set(head, { opacity: 1 });
      const split = new SplitText(head, { type: 'words' });
      gsap.from(split.words, {
        y: -40,
        rotateX: 55,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        transformOrigin: '50% 0%',
        transformPerspective: 600,
      });
    }
  }, [inView]);

  return { headRef };
}

/** Animated count-up — GSAP proxy, no React state ticking, scale punch on complete. */
function Counter({ end, suffix, label, active }: { end: number; suffix: string; label: string; active: boolean }) {
  const numRef  = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const done    = useRef(false);

  useEffect(() => {
    if (!active || done.current || !numRef.current) return;
    done.current = true;
    const el   = numRef.current;
    const wrap = wrapRef.current;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: end,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate() { el.textContent = String(Math.floor(proxy.val)); },
      onComplete() {
        el.textContent = String(end);
        if (wrap) gsap.fromTo(wrap, { scale: 1 }, { scale: 1.07, yoyo: true, repeat: 1, duration: 0.18, ease: 'power2.out' });
      },
    });
  }, [active, end]);

  return (
    <div className="text-center">
      <div ref={wrapRef} className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white tabular-nums">
        <span ref={numRef}>0</span><span className="text-accent">{suffix}</span>
      </div>
      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{label}</p>
    </div>
  );
}

/** Countdown — accelerating 10 → 0, cyan glow burst at zero. */
function CountdownStat({ label, active }: { label: string; active: boolean }) {
  const numRef  = useRef<HTMLSpanElement>(null);
  const done    = useRef(false);
  const alive   = useRef(true);
  const [atZero, setAtZero] = useState(false);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  useEffect(() => {
    if (!active || done.current || !numRef.current) return;
    done.current = true;
    const el = numRef.current;
    let c = 10;
    el.textContent = '10';

    const step = () => {
      if (!alive.current) return;
      c -= 1;
      el.textContent = String(c);
      // Bounce on each tick
      gsap.fromTo(el, { scale: 1.22 }, { scale: 1, duration: 0.24, ease: 'power3.out' });
      if (c > 0) {
        // Accelerate: 380ms → 75ms over 10 steps
        const delay = Math.max(0.075, 0.38 - (10 - c) * 0.031);
        gsap.delayedCall(delay, step);
      } else {
        if (alive.current) setAtZero(true);
        // Final punch
        gsap.fromTo(el, { scale: 1 }, { scale: 1.15, yoyo: true, repeat: 1, duration: 0.22, ease: 'power2.out' });
      }
    };
    gsap.delayedCall(0.55, step);
  }, [active]);

  return (
    <div className="text-center">
      <div
        className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl tabular-nums transition-colors duration-500"
        style={{
          color: atZero ? '#00D4FF' : 'white',
          textShadow: atZero ? '0 0 28px rgba(0,212,255,0.75), 0 0 56px rgba(0,212,255,0.35)' : undefined,
        }}>
        <span ref={numRef}>10</span>
      </div>
      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{label}</p>
    </div>
  );
}

/** Thin scroll-progress bar pinned to top of viewport. */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%`, background: 'linear-gradient(to right, #00E5FF, #00b8ff)' }}
      />
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-inter text-accent text-xs font-semibold tracking-[0.18em] uppercase block mb-3">
      {children}
    </span>
  );
}

// ─── Scroll-triggered fly-in wrapper ─────────────────────────────────────────
// Cards fly in from below (or sides) when they enter the viewport.
// Use `delay` to stagger siblings.
function FlyIn({
  children, delay = 0, from = 'bottom', className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
  className?: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  const initial =
    from === 'left'   ? { opacity: 0, x: -56, y: 0,  scale: 0.96 } :
    from === 'right'  ? { opacity: 0, x:  56, y: 0,  scale: 0.96 } :
                        { opacity: 0, x:   0, y: 56, scale: 0.96 };

  const animate = inView
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleNav = (item: NavItem) => {
    if (item.id) scrollToId(item.id);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.80)] backdrop-blur-[16px] border-[rgba(0,229,255,0.08)]'
            : 'bg-[rgba(10,10,10,0.50)] backdrop-blur-[16px] border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <img src="/logo.png" alt="Clavion" className="h-16 w-auto" height={64} />
            <span className="font-syne font-bold text-lg text-white">Clavion</span>
          </button>

          <div className="hidden xl:flex items-center gap-8">
            {t.nav.items.map((item) => (
              item.href
                ? <Link key={item.href} to={item.href}
                    className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    {item.label}
                  </Link>
                : <button key={item.id} onClick={() => handleNav(item)}
                    className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    {item.label}
                  </button>
            ))}
            <LanguageSwitcher />
            <button onClick={() => scrollToId('kontakt')}
              className="px-5 py-2.5 bg-accent text-dark font-inter font-semibold text-sm rounded-lg hover:bg-accent/90 active:scale-[0.97] transition-all duration-150">
              {t.nav.cta}
            </button>
          </div>

          <button
            className="xl:hidden text-white p-3 -mr-1 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 flex flex-col items-center gap-6 p-8 xl:hidden">
            {t.nav.items.map((item, i) => (
              item.href
                ? <motion.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={item.href} onClick={() => setOpen(false)} className="font-inter text-white text-xl">{item.label}</Link>
                  </motion.div>
                : <motion.button key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => handleNav(item)} className="font-inter text-white text-xl">{item.label}
                  </motion.button>
            ))}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: t.nav.items.length * 0.05 }}
              className="mt-2">
              <LanguageSwitcher variant="inline" />
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (t.nav.items.length + 1) * 0.05 }}
              onClick={() => { scrollToId('kontakt'); setOpen(false); }}
              className="mt-2 px-8 py-3 bg-accent text-dark font-inter font-semibold rounded-lg">
              {t.nav.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero rotating quote strip ────────────────────────────────────────────────
function HeroQuoteStrip({ idx }: { idx: number }) {
  const { t } = useLang();
  const q = t.hero.quotes[idx % t.hero.quotes.length];

  return (
    /* Apex style: no card/border — raw text directly on the background */
    <div className="text-center max-w-sm sm:max-w-md mx-auto px-4">
      {/* Fixed-height box prevents layout jump; AnimatePresence fades between quotes */}
      <div style={{ minHeight: '3.2rem' }} className="flex items-center justify-center mb-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="font-inter italic text-white/75 text-sm sm:text-base leading-relaxed line-clamp-2">
            „{q.quote}"
          </motion.p>
        </AnimatePresence>
      </div>
      {/* Avatar + name + role — also fades in sync */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`meta-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          className="flex items-center justify-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
            <span className="font-syne font-bold text-[10px] text-accent">{q.initials}</span>
          </div>
          <span className="font-inter font-semibold text-white text-sm">{q.name}</span>
          <span className="font-inter text-xs text-gray-400 bg-white/[0.06] px-2.5 py-0.5 rounded-full">
            {q.role}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── SECTION 1 — Hero ────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useLang();
  const staticRef      = useRef<HTMLSpanElement>(null);
  const gsapDone       = useRef(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quoteCount     = t.hero.quotes.length;
  const wordRef        = useGsapCarousel(
    t.hero.rotatingWords,
    useCallback(() => setQuoteIdx((i) => (i + 1) % quoteCount), [quoteCount]),
  );
  const [arrowVisible, setArrowVisible] = useState(true);

  useLayoutEffect(() => {
    if (gsapDone.current || !staticRef.current) return;
    gsapDone.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const split = new SplitText(staticRef.current, { type: 'words' });
    gsap.from(split.words, { y: -60, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', delay: 0.1 });
  }, []);

  useEffect(() => {
    const h = () => { if (window.scrollY > 120) setArrowVisible(false); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden" style={{ scrollMarginTop: 80 }}>
      {/* Spotlight follows cursor within hero */}
      <Spotlight />

      {/* Subtle radial gradient backdrop — fixed, centred on hero */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <Label>{t.hero.badge}</Label>
        </motion.div>

        <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 sm:mb-10">
          <span ref={staticRef} className="block">{t.hero.headlinePrefix}</span>
          <span className="hero-tw-line block" style={{ color: '#00E5FF', overflow: 'hidden' }}>
            <span ref={wordRef} style={{ display: 'inline-block' }} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-inter text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          {t.hero.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ShimmerButton as="button" onClick={() => scrollToId('kontakt')}>
            {t.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </ShimmerButton>
        </motion.div>

        {/* Social proof quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-10">
          <HeroQuoteStrip idx={quoteIdx} />
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <AnimatePresence>
        {arrowVisible && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.8 }}
            onClick={() => scrollToId('problem')}
            aria-label={t.hero.ctaSecondary}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-accent/50 hover:text-accent/80 transition-colors animate-scroll-bounce">
            <ChevronDown className="w-5 h-5" />
            <ChevronDown className="w-5 h-5 -mt-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── SECTION 2 — Trust Bar ───────────────────────────────────────────────────
function TrustBar() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  const { t } = useLang();
  const icons = [MapPin, ShieldCheck, Zap, Rocket];
  const items = t.trustBar.map((text, i) => ({ icon: icons[i], text }));

  return (
    <div ref={ref} className="border-y border-white/5 bg-[rgba(0,229,255,0.02)] py-5 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2 text-center">
              <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="font-inter text-sm text-gray-300 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION 3 — Problem ─────────────────────────────────────────────────────
function ProblemSection() {
  const { t } = useLang();
  const items = t.problems.items.map((p, i) => ({ ...p, icon: PROBLEM_ICONS[i] }));
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="problem" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            {t.problems.heading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((p, i) => (
            <FlyIn key={i} delay={0.1 + i * 0.1}>
              <GlowCard className="p-6 sm:p-7 h-full hover:-translate-y-1.5 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                  <p.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-syne font-semibold text-base sm:text-lg text-white mb-2 leading-snug">{p.title}</h3>
                <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed">{p.desc}</p>
              </GlowCard>
            </FlyIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4 — Services / Personalisierung ─────────────────────────────────
function ServicesSection() {
  const { t } = useLang();
  const items = t.services.items.map((sv, i) => ({ ...sv, icon: SERVICE_ICONS[i] }));
  const [activeIdx, setActiveIdx] = useState(0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  const active = items[activeIdx];

  return (
    <section id="leistungen" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            {t.services.heading}
          </h2>
        </div>

        {/* 4 clickable tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {items.map((s, i) => (
            <FlyIn key={s.id} delay={0.05 + i * 0.09} className="h-full">
              <motion.button
                onClick={() => setActiveIdx(i)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className={`w-full h-full text-left p-4 rounded-2xl border transition-colors duration-300 ${
                  activeIdx === i
                    ? 'bg-accent/10 border-accent/50 shadow-[0_0_24px_rgba(0,212,255,0.15),0_0_0_1px_rgba(0,212,255,0.3)]'
                    : 'glass-card glass-card-interactive'
                }`}>
                <s.icon className="w-6 h-6 text-accent mb-2" />
                <span className="font-syne font-semibold text-white text-sm sm:text-base leading-tight block">{s.title}</span>
              </motion.button>
            </FlyIn>
          ))}
        </div>

        {/* Expanding content — AnimatePresence for smooth swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}>
          <GlowCard className="p-6 sm:p-8" intensity="high">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <active.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-syne font-bold text-xl text-white">{active.title}</h3>
            </div>
            <p className="font-inter text-gray-300 text-base sm:text-lg leading-relaxed mb-6">{active.text}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span key={tag} className="font-inter text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            {/* Chatbot hint — only on the communication tile */}
            {activeIdx === 0 && (
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span className="font-inter text-sm text-gray-400">
                  Unser KI-Chatbot ist live —{' '}
                  <button
                    onClick={() => (window as Window & { chatbase?: (a: string) => void }).chatbase?.('open')}
                    className="text-accent hover:text-accent/70 transition-colors font-medium">
                    jetzt rechts unten testen ↓
                  </button>
                </span>
              </div>
            )}
          </GlowCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── SECTION 5 — Über uns ─────────────────────────────────────────────────────
// Paired positionally with t.about.highlights.
const ABOUT_ICONS = [Users, MapPin, Target];

function AboutSection() {
  const { t } = useLang();
  const highlights = t.about.highlights.map((h, i) => ({ ...h, icon: ABOUT_ICONS[i] }));
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="ueber-uns" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — label + headline + text (matches main layout exactly) */}
          <div>
            <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
              className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
              {t.about.heading}
            </h2>
            <div className="space-y-3 sm:space-y-5 font-inter text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
              {t.about.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <p className="font-inter text-gray-400 text-sm">Made in Germany · DSGVO-konform · Ergebnisorientiert</p>
          </div>

          {/* Right — 3 highlight cards + B/M avatar row (matches main layout exactly) */}
          <div className="space-y-3 sm:space-y-4">
            {highlights.map((h, i) => (
              <FlyIn key={i} from="right" delay={0.15 + i * 0.1}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <GlowCard className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <h.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-syne font-semibold text-white text-sm sm:text-base mb-0.5">{h.title}</h3>
                      <p className="font-inter text-gray-400 text-xs sm:text-sm">{h.desc}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              </FlyIn>
            ))}

            {/* Avatar row — identical to main */}
            <FlyIn from="right" delay={0.45}>
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">B</div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-dark font-syne font-bold ring-2 ring-[#0a0a0a]">M</div>
                </div>
                <div>
                  <p className="font-inter text-white text-sm">Berkay &amp; Marios</p>
                  <p className="font-inter text-gray-500 text-xs">Gründer, Clavion</p>
                </div>
              </div>
            </FlyIn>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6 — Demo Placeholder ────────────────────────────────────────────
function DemoSection() {
  const { t } = useLang();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="demo" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center">
            {t.demo.heading}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedDemo />
        </motion.div>

        {/* Chatbot nudge — sits below demo, always visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-5"
        >
          <MessageSquare className="w-4 h-4 text-accent flex-shrink-0" />
          <p className="font-inter text-sm text-gray-400">
            Den KI-Chatbot live erleben —{' '}
            <button
              onClick={() => (window as Window & { chatbase?: (a: string) => void }).chatbase?.('open')}
              className="text-accent hover:text-accent/70 transition-colors font-medium">
              jetzt rechts unten öffnen ↓
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 7 — Showcase Slideshow ──────────────────────────────────────────
function ShowcaseSection() {
  const { t } = useLang();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  const deliverables = [
    { icon: Globe,       label: 'Webseite',      sub: 'c4f.bio' },
    { icon: ShoppingBag, label: 'Shopify-Store', sub: 'Onlineshop' },
    { icon: Search,      label: 'LeadGen',       sub: 'Lead-Recherche' },
    { icon: Users,       label: 'LeadTracker',   sub: 'CRM & Outreach' },
  ];

  return (
    <section id="showcase" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center">
            {t.showcase.heading}
          </h2>
        </div>

        {/* Real case study — Carbon4Future */}
        <FlyIn>
          <GlowCard className="p-7 sm:p-10" intensity="medium">

            {/* Client header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 p-2">
                <img src="/clients/c4f-logo.png" alt="Carbon4Future Logo"
                  className="w-full h-full object-contain" width={64} height={64} loading="lazy" />
              </div>
              <div className="min-w-0">
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white leading-tight">Carbon4Future</h3>
                <p className="font-inter text-sm text-gray-400">{t.showcase.caseTitle}</p>
              </div>
              <a href="https://www.c4f.bio" target="_blank" rel="noopener noreferrer"
                className="ml-auto hidden sm:inline-flex items-center gap-1.5 font-inter text-sm text-accent hover:text-accent/70 transition-colors flex-shrink-0">
                c4f.bio <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* What we built */}
            <p className="font-inter text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {t.showcase.caseBody}
            </p>

            {/* Deliverables */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {deliverables.map((d) => (
                <div key={d.label} className="glass-card rounded-xl p-4 flex flex-col gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <d.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-syne font-semibold text-white text-sm leading-tight">{d.label}</div>
                    <div className="font-inter text-gray-400 text-xs mt-0.5">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Result strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-5 border-t border-white/[0.06]">
              <div>
                <div className="font-syne font-bold text-2xl sm:text-3xl leading-none" style={{ color: '#00E5FF' }}>40.000</div>
                <div className="font-inter text-gray-300 text-xs mt-1 font-medium">Leads · Recherche &amp; Outreach</div>
              </div>
              <div>
                <div className="font-syne font-bold text-2xl sm:text-3xl leading-none" style={{ color: '#00E5FF' }}>4</div>
                <div className="font-inter text-gray-300 text-xs mt-1 font-medium">Leistungen aus einer Hand</div>
              </div>
              <span className="sm:ml-auto font-inter text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0" /> Shop live auf c4f.bio
              </span>
            </div>
          </GlowCard>
        </FlyIn>

      </div>
    </section>
  );
}

// ─── SECTION 8 — Prozess ─────────────────────────────────────────────────────
function ProcessSection() {
  const { t } = useLang();
  const steps = t.process.steps.map((st, i) => ({ ...st, ...STEP_META[i] }));
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="prozess" style={{ scrollMarginTop: 80 }}
      className="relative py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)] overflow-hidden">
      <GridBeam />
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            {t.process.heading}
          </h2>
        </div>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5"
            style={{ left: 19, background: 'linear-gradient(to bottom, #00E5FF, rgba(0,229,255,0.2))', transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          />

          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 sm:gap-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}>
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: '#00E5FF', boxShadow: '0 0 16px rgba(0,212,255,0.5), 0 0 32px rgba(0,212,255,0.2)' }}>
                  <span className="font-syne font-bold text-sm" style={{ color: '#0a0a0a' }}>{step.num}</span>
                </div>
                <div className="pt-1 pb-2">
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-white mb-2">{step.title}</h3>
                  <p className="font-inter text-gray-400 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9 — Zahlen / Stats ──────────────────────────────────────────────
function StatsSection() {
  const { t } = useLang();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="zahlen" style={{ scrollMarginTop: 80 }}
      className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <GridBeam />
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            {t.stats.heading}
          </h2>
        </div>

        <div className="glass-card rounded-2xl p-8 sm:p-12">
          {/* 4 stats — 2×2 mobile, 4-col desktop. Each cell gets equal min-width. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                {s.kind === 'count'
                  ? <Counter end={s.end} suffix={s.suffix} label={t.stats.labels[i]} active={inView} />
                  : s.kind === 'countdown'
                  ? <CountdownStat label={t.stats.labels[i]} active={inView} />
                  : <div className="text-center">
                      <div className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl text-white tabular-nums leading-none">{s.display}</div>
                      <div className="font-syne font-semibold text-lg sm:text-xl text-accent mt-1">{t.stats.weeksUnit}</div>
                      <p className="font-inter text-gray-400 text-base sm:text-lg mt-3">{t.stats.labels[i]}</p>
                    </div>
                }
              </motion.div>
            ))}
          </div>

          {/* Tech logo scrolling banner */}
          <div className="border-t border-white/10 pt-8 overflow-hidden">
            <p className="font-inter text-gray-500 text-sm text-center mb-5">Womit wir arbeiten</p>
            <div className="relative" style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}>
              <div className="logo-track">
                {[...techLogos, ...techLogos].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center flex-shrink-0 mx-7 sm:mx-9">
                    {logo.type === 'img'
                      ? <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" style={{ height: 26, width: 'auto', opacity: 0.65 }} />
                      : <span className="font-inter font-semibold text-white/60 text-sm tracking-wide whitespace-nowrap">{logo.label}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10 — FAQ ─────────────────────────────────────────────────────────
function FAQSection() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const { headRef } = useSplitHeadline(inView);

  return (
    <section id="faq" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6 bg-[rgba(0,229,255,0.015)]">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Two-column layout: sticky left title · right accordion */}
        <div className="grid lg:grid-cols-[1fr_1.7fr] gap-10 lg:gap-20 items-start">

          {/* ── Left: label + heading (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-28">
            <h2 ref={headRef as React.RefObject<HTMLHeadingElement>}
              className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
              {t.faq.heading}
            </h2>
            <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              Noch etwas unklar? Schreib uns einfach — wir antworten innerhalb von 24h.
            </p>
            <button
              onClick={() => scrollToId('kontakt')}
              className="inline-flex items-center gap-2 font-inter text-sm text-accent hover:text-accent/80 transition-colors font-medium">
              Frage stellen →
            </button>
          </div>

          {/* ── Right: accordion ── */}
          <div className="space-y-2">
            {t.faq.items.map((faq, i) => (
              <FlyIn key={i} delay={0.07 + i * 0.06}>
              <div
                className="glass-card rounded-xl px-5 hover:border-accent/25 hover:shadow-[0_0_20px_rgba(0,212,255,0.06)] transition-all duration-300">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full py-5 flex items-center justify-between text-left group">
                  <span className="font-syne font-semibold text-sm sm:text-base text-white group-hover:text-accent transition-colors pr-6">
                    {faq.q}
                  </span>
                  <div className="w-11 h-11 bg-white/[0.05] rounded-lg flex items-center justify-center flex-shrink-0">
                    {open === i
                      ? <Minus className="w-4 h-4 text-accent" />
                      : <Plus  className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                    }
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <p className="font-inter text-gray-400 leading-relaxed pb-5 text-sm sm:text-base">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </FlyIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 11 — Finaler CTA ─────────────────────────────────────────────────
function CTASection() {
  const { t } = useLang();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section id="kontakt" style={{ scrollMarginTop: 80 }}
      className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden">

          <div className="grid lg:grid-cols-[0.85fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[rgba(0,229,255,0.12)]">

            {/* ── Left: why it is worth writing ── */}
            <div className="p-7 sm:p-10 flex flex-col">
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4 leading-tight">
                {t.contact.heading}
              </h2>
              <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed mb-7">
                {t.contact.body}
              </p>

              <ul className="space-y-3 mb-7">
                {t.contact.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="font-inter text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3">
                <p className="font-inter text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {t.contact.noRisk}
                </p>
                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                  <MessageSquare className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="font-inter text-gray-400 text-xs sm:text-sm">
                    {t.contact.chatbotHint}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: the form itself, no click required ── */}
            <div className="p-7 sm:p-10">
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                {t.form.title}
              </h3>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
                {t.form.intro}
              </p>
              <ContactFormFields idPrefix="cf" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── GEO: AI-crawlable about block ───────────────────────────────────────────
// Visually hidden (sr-only), fully readable by AI crawlers and search engines.
function GeoAboutBlock() {
  const { t } = useLang();
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      <h2>{t.geo.heading}</h2>
      {t.geo.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export function Home() {
  const { t, lang } = useLang();

  // Links from the blog and llms.txt point at /#kontakt. The browser resolves
  // a hash at document load, when this SPA has not rendered its sections yet,
  // so nothing would scroll — re-run it once they exist.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timer = window.setTimeout(() => scrollToId(id), 120);
    return () => window.clearTimeout(timer);
  }, []);

  // Title and description follow the switcher. There is a single URL per page
  // (no /en/ or /es/ prefixes), so the canonical stays the same for all three.
  usePageMeta({
    title: t.meta.title,
    description: t.meta.description,
    canonical: 'https://clavion.pro/',
  });

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX    = useSpring(rawMouseX, { stiffness: 60, damping: 25 });
  const mouseY    = useSpring(rawMouseY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawMouseX.set(((e.clientX / window.innerWidth)  - 0.5) * 60);
    rawMouseY.set(((e.clientY / window.innerHeight) - 0.5) * 60);
  };

  const footer = (
    <footer className="bg-[#0a0a0a] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Clavion Logo" className="h-16 w-auto" height={64} loading="lazy" decoding="async" />
              <span className="font-syne font-bold text-lg text-white">Clavion</span>
            </div>
            <p className="font-inter text-gray-500 leading-relaxed max-w-sm text-sm">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4 text-sm">{t.footer.navHeading}</h4>
            <ul className="space-y-3">
              {t.nav.items.map((item) => (
                <li key={item.href ?? item.id}>
                  {item.href
                    ? <Link to={item.href} className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{item.label}</Link>
                    : <button onClick={() => scrollToId(item.id!)} className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{item.label}</button>
                  }
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-4 text-sm">{t.footer.legalHeading}</h4>
            <ul className="space-y-3">
              <li><Link to="/impressum"   className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{t.footer.imprint}</Link></li>
              <li><Link to="/datenschutz" className="font-inter text-gray-500 hover:text-accent transition-colors text-sm">{t.footer.privacy}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-sm">© {new Date().getFullYear()} Clavion. {t.footer.rights}</p>
          <p className="font-inter text-gray-600 text-sm">{t.footer.badges}</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-[#0a0a0a] overflow-x-clip" onMouseMove={handleMouseMove}>
      <CustomCursor />
      <ScrollProgressBar />
      <MouseGlow />

      {/* Fixed starfield background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarField mouseX={mouseX} mouseY={mouseY} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 32%, rgba(10,10,10,0.82) 100%)' }} />
      </div>

      {/* All content above starfield.
          Keyed on `lang` so every section remounts on a language switch —
          SplitText and the GSAP carousel bake their text in at mount, and
          re-running them is far simpler than teaching each to re-split. */}
      <div className="relative z-10" key={lang}>
        <GeoAboutBlock />
        <Nav />
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <ServicesSection />
        <AboutSection />
        <DemoSection />
        <ShowcaseSection />
        <ProcessSection />
        <StatsSection />
        <FAQSection />
        <CTASection />
        {footer}
      </div>
    </div>
  );
}
