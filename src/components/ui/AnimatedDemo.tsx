/**
 * AnimatedDemo — Apple Keynote style motion graphics
 * 4 auto-playing scenes, fully responsive (mobile-first per scene).
 *
 * Scene 1 — KI-Chatbot
 * Scene 2 — Prozessautomatisierung
 * Scene 3 — Lead-Pipeline
 * Scene 4 — Systeme verbinden
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, Send } from 'lucide-react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C  = '#00E5FF';
const CL = 'rgba(0,229,255,0.14)';
const CB = 'rgba(0,229,255,0.07)';
const O  = '#E8700A';  // ZeitWerk brand accent (warm orange)
const F  = 'Inter, sans-serif';
const FS = 'Syne, sans-serif';

const TOTAL_SCENES = 4;
// Per-scene duration (ms), same order as SCENE_LABELS / scenes: Lead-Pipeline, Zeiterfassung, KI-Website, Automatisierung
const SCENE_DURATIONS = [10500, 11500, 9500, 8000];

// ─── Mobile detection ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── Shared: scene label ──────────────────────────────────────────────────────
function SceneLabel({ children, color = C }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', top: 14, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}
    >
      <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </motion.div>
  );
}

// ─── SCENE 1 — KI-Website (Chatbot im Browser) ───────────────────────────────
function Scene1({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 450),   // website builds (nav, hero, cards)
      setTimeout(() => setStep(2), 3300),  // chat opens — website had solo time first
      setTimeout(() => setStep(3), 4500),  // bot typing
      setTimeout(() => setStep(4), 5700),  // bot answer with slot
      setTimeout(() => setStep(5), 7100),  // booked toast
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  const barH = isMobile ? 28 : 32;
  const chatVisible = step >= 2 && (!isMobile || step < 5);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '34px 14px 50px' : '44px 32px 56px' }}>
      <SceneLabel>KI-Website · Design, Shop &amp; Chatbot aus einer Hand</SceneLabel>

      {/* Browser window */}
      <motion.div initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        style={{ width: '100%', maxWidth: isMobile ? undefined : 560, height: isMobile ? '100%' : 348, position: 'relative', background: 'rgba(9,11,13,0.92)', border: `1px solid ${C}30`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 22px 60px rgba(0,0,0,0.5)' }}>
        {/* Browser top bar */}
        <div style={{ height: barH, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (<div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.85 }} />))}
          </div>
          <div style={{ flex: 1, maxWidth: 220, margin: '0 auto', height: 17, background: 'rgba(255,255,255,0.05)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <span style={{ fontFamily: F, fontSize: isMobile ? 9 : 10, color: 'rgba(255,255,255,0.5)' }}>🔒 c4f.bio</span>
          </div>
        </div>

        {/* Website content (placeholder hero) */}
        <div style={{ padding: isMobile ? '16px 16px' : '26px 30px', position: 'relative', height: `calc(100% - ${barH}px)` }}>
          {/* Nav */}
          <motion.div initial={{ opacity: 0, y: -6 }} animate={step >= 1 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 12 : 18 }}>
            <div style={{ width: isMobile ? 15 : 20, height: isMobile ? 15 : 20, borderRadius: 5, background: C, opacity: 0.9, flexShrink: 0 }} />
            <div style={{ width: isMobile ? 44 : 58, height: isMobile ? 6 : 8, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: isMobile ? 8 : 12 }}>
              {[0, 1, 2].map(i => (<div key={i} style={{ width: isMobile ? 20 : 30, height: isMobile ? 5 : 6, background: 'rgba(255,255,255,0.18)', borderRadius: 3 }} />))}
            </div>
          </motion.div>

          {/* Hero — text + visual, like a real landing page */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={step >= 1 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: isMobile ? 12 : 20, alignItems: 'center', marginBottom: isMobile ? 12 : 16 }}>
            <div style={{ flex: 1.25, minWidth: 0 }}>
              <div style={{ width: '36%', height: isMobile ? 6 : 8, background: `${C}55`, borderRadius: 4, marginBottom: isMobile ? 8 : 12 }} />
              <div style={{ width: '92%', height: isMobile ? 12 : 18, background: 'rgba(255,255,255,0.22)', borderRadius: 5, marginBottom: 7 }} />
              <div style={{ width: '64%', height: isMobile ? 12 : 18, background: 'rgba(255,255,255,0.12)', borderRadius: 5, marginBottom: isMobile ? 10 : 14 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: isMobile ? 70 : 100, height: isMobile ? 20 : 26, background: C, opacity: 0.9, borderRadius: 6 }} />
                <div style={{ width: isMobile ? 48 : 70, height: isMobile ? 20 : 26, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6 }} />
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={step >= 1 ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.65 }}
              style={{ flex: 1, height: isMobile ? 68 : 96, borderRadius: 10, background: `linear-gradient(135deg, ${C}33, rgba(0,229,255,0.05) 55%, rgba(255,255,255,0.03))`, border: `1px solid ${C}22`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ position: 'absolute', right: -12, bottom: -12, width: isMobile ? 42 : 58, height: isMobile ? 42 : 58, borderRadius: '50%', background: `${C}22` }} />
              <div style={{ position: 'absolute', left: 10, top: 10, width: isMobile ? 26 : 38, height: isMobile ? 5 : 7, background: 'rgba(255,255,255,0.28)', borderRadius: 3 }} />
              <div style={{ position: 'absolute', left: 10, top: isMobile ? 20 : 24, width: isMobile ? 18 : 26, height: isMobile ? 5 : 7, background: 'rgba(255,255,255,0.14)', borderRadius: 3 }} />
            </motion.div>
          </motion.div>

          {/* Feature cards */}
          <div style={{ display: 'flex', gap: isMobile ? 7 : 10 }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={step >= 1 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 + i * 0.12 }}
                style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: isMobile ? 8 : 11 }}>
                <div style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18, borderRadius: 5, background: `${C}35`, marginBottom: isMobile ? 6 : 8 }} />
                <div style={{ width: '82%', height: isMobile ? 5 : 6, background: 'rgba(255,255,255,0.22)', borderRadius: 3, marginBottom: 4 }} />
                <div style={{ width: '58%', height: isMobile ? 5 : 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
              </motion.div>
            ))}
          </div>

          {/* Chat widget (bottom-right) */}
          <AnimatePresence>
            {chatVisible && (
              <motion.div initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 230, damping: 19 }}
                style={{ position: 'absolute', right: isMobile ? 8 : 14, bottom: isMobile ? 8 : 14, width: isMobile ? 172 : 208, background: 'rgba(5,7,9,0.97)', border: `1px solid ${C}45`, borderRadius: 12, overflow: 'hidden', boxShadow: `0 12px 32px rgba(0,0,0,0.55)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 11px', background: CL, borderBottom: `1px solid ${C}25` }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                  <span style={{ fontFamily: FS, fontSize: isMobile ? 10 : 11, color: '#fff', fontWeight: 600 }}>KI-Assistent</span>
                  <span style={{ marginLeft: 'auto', fontFamily: F, fontSize: isMobile ? 7.5 : 8.5, color: 'rgba(255,255,255,0.4)' }}>online</span>
                </div>
                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ alignSelf: 'flex-end', background: CB, border: `1px solid ${C}30`, borderRadius: '9px 9px 2px 9px', padding: '6px 9px', fontFamily: F, fontSize: isMobile ? 10 : 11, color: 'rgba(255,255,255,0.86)', maxWidth: '92%', lineHeight: 1.4 }}>
                    Habt ihr Termine für ein Angebot?
                  </div>
                  {step === 3 && (
                    <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px 9px 9px 2px', padding: '7px 11px', display: 'flex', gap: 4 }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: C }}
                          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }} />
                      ))}
                    </div>
                  )}
                  {step >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px 9px 9px 2px', padding: '6px 9px', fontFamily: F, fontSize: isMobile ? 10 : 11, color: 'rgba(255,255,255,0.86)', maxWidth: '94%', lineHeight: 1.45 }}>
                      Klar! <span style={{ color: C, fontWeight: 600 }}>Di. 14. Mai, 10:00</span> passt — gebucht ✓
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Booked toast (bottom-left) */}
          {step >= 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 240 }}
              style={{ position: 'absolute', left: isMobile ? 10 : 18, bottom: isMobile ? 10 : 18, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 10, padding: isMobile ? '7px 10px' : '9px 13px' }}>
              <span style={{ color: '#34d399', fontSize: isMobile ? 13 : 15 }}>✓</span>
              <span style={{ fontFamily: F, fontSize: isMobile ? 9.5 : 12, color: '#34d399', fontWeight: 600, lineHeight: 1.3 }}>Termin gebucht &amp; im Kalender</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── SCENE 2 — Prozessautomatisierung ────────────────────────────────────────
const PROC_ACTIONS = [
  { label: 'Rechnung erstellt',      icon: '🧾', delay: 2.2 },
  { label: 'Lager aktualisiert',     icon: '📦', delay: 2.8 },
  { label: 'Versand ausgelöst',      icon: '🚚', delay: 3.4 },
  { label: 'Kunden-E-Mail gesendet', icon: '✉️', delay: 4.0 },
];

function Scene2({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 5200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '36px 16px 50px' }}>
        <SceneLabel>Prozessautomatisierung · Kein manueller Aufwand</SceneLabel>

        {/* Trigger */}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 10, padding: '8px 14px', marginBottom: 0 }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <div>
              <div style={{ fontFamily: F, fontSize: 8, color: 'rgba(255,180,0,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger</div>
              <div style={{ fontFamily: FS, fontSize: 12, color: 'white', fontWeight: 600 }}>Neue Bestellung eingegangen</div>
            </div>
          </motion.div>
        )}

        {step >= 2 && (
          <>
            {/* Vertical line + KI node */}
            <div style={{ width: 1.5, height: 12, background: 'rgba(0,212,255,0.3)', margin: '0 auto' }} />
            <motion.div
              animate={{ boxShadow: [`0 0 0px ${C}40`, `0 0 16px ${C}60`, `0 0 0px ${C}40`] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ background: CB, border: `1.5px solid ${C}60`, borderRadius: 10, padding: '6px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: C }} />
              <span style={{ fontFamily: FS, fontSize: 11, color: C, fontWeight: 700 }}>KI verarbeitet</span>
            </motion.div>
            <div style={{ width: 1.5, height: 12, background: 'rgba(0,212,255,0.3)', margin: '0 auto' }} />

            {/* Action cards — vertical stack on mobile */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROC_ACTIONS.map((action, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: action.delay - 1.5, type: 'spring', stiffness: 220, damping: 18 }}
                  style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid rgba(0,212,255,0.18)`, borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                  <span style={{ fontSize: 14 }}>{action.icon}</span>
                  <span style={{ flex: 1, fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{action.label}</span>
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: action.delay - 1.5 + 0.3, type: 'spring', stiffness: 300 }}
                    style={{ color: '#34d399', fontSize: 13, fontWeight: 700 }}>✓</motion.span>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 6 }}>
            4 Aufgaben · <span style={{ color: '#34d399' }}>automatisch erledigt</span>
          </motion.div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '50px 28px 60px' }}>
      <SceneLabel>Prozessautomatisierung · Kein manueller Aufwand</SceneLabel>
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 12, padding: '10px 24px' }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,180,0,0.7)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger</div>
            <div style={{ fontFamily: FS, fontSize: 16, color: 'white', fontWeight: 600 }}>Neue Bestellung eingegangen</div>
          </div>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top' }}>
          <div style={{ width: 2, height: 20, background: 'rgba(0,212,255,0.3)' }} />
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${C}40`, `0 0 18px ${C}60`, `0 0 0px ${C}40`] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ background: CB, border: `1.5px solid ${C}60`, borderRadius: 12, padding: '8px 28px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 9, height: 9, borderRadius: '50%', background: C }} />
            <span style={{ fontFamily: FS, fontSize: 15, color: C, fontWeight: 700 }}>KI verarbeitet</span>
          </motion.div>
          <div style={{ width: 2, height: 20, background: 'rgba(0,212,255,0.3)' }} />
          <svg viewBox="0 0 360 28" style={{ width: 360, height: 28, overflow: 'visible' }}>
            {PROC_ACTIONS.map((_, i) => {
              const targets = [-135, -45, 45, 135];
              return (
                <motion.path key={i} d={`M 180 0 L ${180 + targets[i]} 28`}
                  stroke="rgba(0,212,255,0.25)" strokeWidth={1.5} fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }} />
              );
            })}
          </svg>
        </motion.div>
      )}
      {step >= 2 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PROC_ACTIONS.map((action, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: action.delay - 1.5, type: 'spring', stiffness: 220, damping: 18 }}
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid rgba(0,212,255,0.18)`, borderRadius: 12, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 152 }}>
              <span style={{ fontSize: 18 }}>{action.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, lineHeight: 1.3 }}>{action.label}</div>
              </div>
              <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: action.delay - 1.5 + 0.35, type: 'spring', stiffness: 300 }}
                style={{ color: '#34d399', fontSize: 15, fontWeight: 700 }}>✓</motion.span>
            </motion.div>
          ))}
        </div>
      )}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          4 Aufgaben · <span style={{ color: '#34d399' }}>automatisch erledigt</span> · 0 Minuten manuell
        </motion.div>
      )}
    </div>
  );
}

// ─── SCENE 3 — Lead-Pipeline (LeadGen → LeadTracker) ─────────────────────────
const LEADGEN_ROWS = [
  { firma: 'Müller Sanitär GmbH', email: 'info@mueller-san.de' },
  { firma: 'Bau Schmidt KG',      email: 'kontakt@bauschmidt.de' },
  { firma: 'Elektro Wagner',      email: 'info@elektro-wagner.de' },
];

function Scene3({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [step,  setStep]  = useState(0);
  const [found, setFound] = useState(0);
  const [open,  setOpen]  = useState(0);
  const [reply, setReply] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 500),   // LeadGen panel
      setTimeout(() => setStep(2), 4000),  // → LeadTracker panel
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  // LeadGen counter — runs once on activation so it never resets when the tracker appears
  useEffect(() => {
    if (!active) { setFound(0); return; }
    let v = 0;
    let iv: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      iv = setInterval(() => { v += 150; if (v >= 16240) { v = 16240; clearInterval(iv); } setFound(v); }, 26);
    }, 700);
    return () => { clearTimeout(start); if (iv) clearInterval(iv); };
  }, [active]);

  // LeadTracker analytics count-up
  useEffect(() => {
    if (!active) { setOpen(0); setReply(0); return; }
    let o = 0, r = 0;
    let iv: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      iv = setInterval(() => {
        if (o < 87) o += 2;
        if (r < 19) r += 1;
        setOpen(Math.min(o, 87));
        setReply(Math.min(r, 19));
        if (o >= 87 && r >= 19) clearInterval(iv);
      }, 55);
    }, 4700);
    return () => { clearTimeout(start); if (iv) clearInterval(iv); };
  }, [active]);

  const fs = (m: number, d: number) => (isMobile ? m : d);
  const MW = isMobile ? undefined : 460;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 8 : 12, padding: isMobile ? '38px 16px 50px' : '44px 28px 56px' }}>
      <SceneLabel>Lead-Pipeline · LeadGen → LeadTracker</SceneLabel>

      {/* LeadGen — scrapt Firmen, extrahiert E-Mails */}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: MW, background: 'rgba(0,0,0,0.35)', border: `1px solid ${C}25`, borderRadius: 12, padding: isMobile ? '10px 12px' : '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Search size={fs(13, 15)} color={C} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: FS, fontSize: fs(11, 13), color: '#fff', fontWeight: 700 }}>LeadGen</span>
            <span style={{ marginLeft: 'auto', fontFamily: FS, fontSize: fs(14, 17), color: C, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{found.toLocaleString('de-DE')}</span>
            <span style={{ fontFamily: F, fontSize: fs(8, 9), color: 'rgba(255,255,255,0.4)' }}>Leads · mit E-Mail</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {LEADGEN_ROWS.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.45 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: fs(9.5, 11) }}>
                <span style={{ flex: 1, fontFamily: F, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.firma}</span>
                <span style={{ fontFamily: F, color: C, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '46%' }}>{r.email}</span>
                <span style={{ color: '#34d399', fontSize: fs(10, 12), fontWeight: 700, flexShrink: 0 }}>✓</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* connector */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0 V11 M4 7 L8 13 L12 7" stroke={C} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.div>
      )}

      {/* LeadTracker — verschickt Kampagne, trackt Analytics */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: MW, background: CB, border: `1px solid ${C}30`, borderRadius: 12, padding: isMobile ? '10px 12px' : '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Send size={fs(13, 15)} color={C} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: FS, fontSize: fs(11, 13), color: '#fff', fontWeight: 700 }}>LeadTracker</span>
            {open >= 87 ? (
              <span style={{ marginLeft: 'auto', fontFamily: F, fontSize: fs(8, 10), color: '#34d399', fontWeight: 700 }}>✓ Kampagne abgeschlossen</span>
            ) : (
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ marginLeft: 'auto', fontFamily: F, fontSize: fs(8, 10), color: '#34d399', fontWeight: 600 }}>● Kampagne läuft</motion.span>
            )}
          </div>
          <div style={{ display: 'flex', gap: isMobile ? 8 : 16 }}>
            {[
              { label: 'Gesendet',    val: found.toLocaleString('de-DE'), col: '#fff' },
              { label: 'Geöffnet',    val: open + '%',  col: C },
              { label: 'Geantwortet', val: reply + '%', col: '#34d399' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ fontFamily: FS, fontSize: fs(17, 23), fontWeight: 700, color: s.col, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: F, fontSize: fs(8, 10), color: 'rgba(255,255,255,0.45)', marginTop: 3, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── SCENE 4 — Zeiterfassung ──────────────────────────────────────────────────
const TIME_ENTRIES = [
  { label: 'Bad-Sanierung Müller', project: 'Arbeit', dur: '3:20', delay: 2.0 },
  { label: 'Anfahrt Baustelle',    project: 'Arbeit', dur: '0:35', delay: 2.5 },
  { label: 'Mittagspause',         project: 'Pause',  dur: '0:30', delay: 3.0 },
  { label: 'Heizung Wagner',       project: 'Arbeit', dur: '2:15', delay: 3.5 },
];

function ClockGlyph({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path d="M12 7.5V12l3 1.8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileGlyph({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3v5h5M8.5 13h7M8.5 16.5h5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Scene4({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const [secs,  setSecs]  = useState(7531);  // running timer base ≈ 2:05:31
  const [step,  setStep]  = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); setSecs(7531); setTotal(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 4800),
      setTimeout(() => setStep(4), 6600),
      setTimeout(() => setStep(5), 8200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [active]);

  // Live timer — fast-forwards so tracked time visibly adds up
  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => setSecs(s => s + 3), 95);
    return () => clearInterval(iv);
  }, [active]);

  // Weekly total counts up once the entries are in
  useEffect(() => {
    if (step < 3) { setTotal(0); return; }
    let v = 0;
    const iv = setInterval(() => { v += 1.15; if (v >= 38.5) { v = 38.5; clearInterval(iv); } setTotal(v); }, 32);
    return () => clearInterval(iv);
  }, [step]);

  const hh = Math.floor(secs / 3600);
  const mm = Math.floor((secs % 3600) / 60);
  const ss = secs % 60;
  const timer = `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  const MW = isMobile ? undefined : 430;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 9 : 13, padding: isMobile ? '38px 16px 50px' : '46px 32px 56px' }}>
      <SceneLabel color={O}>ZeitWerk · Zeiterfassung für Aufträge &amp; Team</SceneLabel>

      {/* Running timer */}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ width: '100%', maxWidth: MW, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(232,112,10,0.07)', border: `1.5px solid ${O}55`, borderRadius: 12, padding: isMobile ? '10px 14px' : '13px 18px' }}>
          <motion.div animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 9, height: 9, borderRadius: '50%', background: '#34d399', flexShrink: 0, boxShadow: '0 0 8px #34d399' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: F, fontSize: isMobile ? 8 : 9, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Läuft · Auftrag Bad Müller</div>
            <div style={{ fontFamily: FS, fontSize: isMobile ? 23 : 30, color: '#fff', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>{timer}</div>
          </div>
          <span style={{ fontFamily: F, fontSize: isMobile ? 8 : 10, color: '#34d399', fontWeight: 700, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 6, padding: '4px 8px', letterSpacing: '0.06em', flexShrink: 0 }}>● REC</span>
        </motion.div>
      )}

      {/* Logged entries */}
      {step >= 2 && step < 5 && (
        <div style={{ width: '100%', maxWidth: MW, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TIME_ENTRIES.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: e.delay - 1.6, type: 'spring', stiffness: 240, damping: 20 }}
              style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: isMobile ? '7px 11px' : '9px 14px' }}>
              <ClockGlyph size={isMobile ? 13 : 15} color={O} />
              <span style={{ flex: 1, fontFamily: F, fontSize: isMobile ? 11 : 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.label}</span>
              <span style={{ fontFamily: F, fontSize: isMobile ? 8 : 10, color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)', borderRadius: 4, padding: '2px 6px', flexShrink: 0 }}>{e.project}</span>
              <span style={{ fontFamily: FS, fontSize: isMobile ? 12 : 14, color: O, fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{e.dur}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Weekly total */}
      {step >= 3 && step < 5 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: MW, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', paddingTop: isMobile ? 6 : 9, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <div style={{ fontFamily: F, fontSize: isMobile ? 8 : 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Diese Woche</div>
            <div style={{ fontFamily: FS, fontSize: isMobile ? 21 : 27, color: '#fff', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{total.toFixed(1).replace('.', ',')} h</div>
          </div>
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}
              style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(232,112,10,0.1)', border: `1px solid ${O}45`, borderRadius: 10, padding: isMobile ? '7px 11px' : '9px 14px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                style={{ width: isMobile ? 11 : 13, height: isMobile ? 11 : 13, borderRadius: '50%', border: `2px solid ${O}`, borderTopColor: 'transparent', flexShrink: 0 }} />
              <span style={{ fontFamily: F, fontSize: isMobile ? 10 : 12, color: O, fontWeight: 600, lineHeight: 1.3 }}>Stundenzettel wird erstellt…</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* PDF Stundenzettel — the entries become a document */}
      {step >= 5 && (
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 190, damping: 20 }}
          style={{ width: '100%', maxWidth: MW, background: '#f4f1ea', borderRadius: 8, padding: isMobile ? '11px 13px' : '14px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.55)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: isMobile ? 7 : 9, borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: isMobile ? 7 : 9 }}>
            <FileGlyph size={isMobile ? 15 : 18} color={O} />
            <span style={{ fontFamily: FS, fontSize: isMobile ? 12 : 14, color: '#1a1a1a', fontWeight: 700 }}>Stundenzettel · KW 27</span>
            <span style={{ marginLeft: 'auto', fontFamily: F, fontSize: isMobile ? 8 : 9, color: '#fff', fontWeight: 700, background: '#d64545', borderRadius: 3, padding: '2px 6px', letterSpacing: '0.04em' }}>PDF</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 3 : 4 }}>
            {TIME_ENTRIES.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', fontSize: isMobile ? 9.5 : 11 }}>
                <span style={{ flex: 1, fontFamily: F, color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.label}</span>
                <span style={{ fontFamily: F, color: '#999', marginRight: isMobile ? 8 : 14 }}>{e.project}</span>
                <span style={{ fontFamily: FS, color: '#1a1a1a', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{e.dur}</span>
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: isMobile ? 7 : 9, paddingTop: isMobile ? 6 : 8, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
            <span style={{ fontFamily: F, fontSize: isMobile ? 9 : 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Gesamt · Diese Woche</span>
            <span style={{ fontFamily: FS, fontSize: isMobile ? 15 : 19, color: O, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>38,5 h</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Scene registry ────────────────────────────────────────────────────────────
const SCENE_LABELS = ['Lead-Pipeline', 'Zeiterfassung', 'KI-Website', 'Automatisierung'];

// ─── AnimatedDemo (main export) ───────────────────────────────────────────────
export function AnimatedDemo() {
  const [scene,    setScene]    = useState(0);
  const [running,  setRunning]  = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView       = useInView(containerRef, { once: false, margin: '-12% 0px' });
  const isMobile     = useIsMobile();

  useEffect(() => {
    if (inView && !running) setRunning(true);
  }, [inView]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setScene(s => (s + 1) % TOTAL_SCENES), SCENE_DURATIONS[scene] ?? 8000);
    return () => clearTimeout(t);
  }, [running, scene, timerKey]);

  const goToScene = (i: number) => {
    setScene(i);
    setTimerKey(k => k + 1);
  };

  const scenes = [
    <Scene3 key="s3" active={running} isMobile={isMobile} />,
    <Scene4 key="s4" active={running} isMobile={isMobile} />,
    <Scene1 key="s1" active={running} isMobile={isMobile} />,
    <Scene2 key="s2" active={running} isMobile={isMobile} />,
  ];

  return (
    <div ref={containerRef} style={{
      position: 'relative',
      width: '100%',
      aspectRatio: isMobile ? undefined : '16/9',
      minHeight: isMobile ? 440 : undefined,
      background: '#080808',
      borderRadius: isMobile ? 12 : 16,
      border: '1px solid rgba(0,212,255,0.12)',
      overflow: 'hidden',
      boxShadow: '0 0 60px rgba(0,212,255,0.04), 0 24px 80px rgba(0,0,0,0.5)',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: [`linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px)`, `linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)`].join(', '),
        backgroundSize: '44px 44px',
      }} />

      {/* Corner dots */}
      {([{ top: '6px', left: '6px' }, { top: '6px', right: '6px' }, { bottom: '6px', left: '6px' }, { bottom: '6px', right: '6px' }] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,212,255,0.22)' }} />
      ))}

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div key={scene}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Bottom tabs */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 6,
        padding: isMobile ? '0 8px 10px' : '0 14px 12px',
      }}>
        {SCENE_LABELS.map((label, i) => (
          <button key={i} onClick={() => goToScene(i)} style={{
            flex: 1,
            height: isMobile ? 26 : 28,
            background: i === scene ? 'rgba(0,212,255,0.12)' : 'transparent',
            border: `1px solid ${i === scene ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 6, cursor: 'pointer',
            fontFamily: F,
            fontSize: isMobile ? 8 : 10,
            fontWeight: i === scene ? 700 : 400,
            color: i === scene ? C : 'rgba(255,255,255,0.3)',
            transition: 'all 0.25s ease',
            letterSpacing: isMobile ? '0.02em' : '0.04em',
            padding: '0 2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {running && (
        <motion.div key={`progress-${scene}`}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: (SCENE_DURATIONS[scene] ?? 8000) / 1000, ease: 'linear' }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: C, transformOrigin: 'left', opacity: 0.4, zIndex: 3 }}
        />
      )}
    </div>
  );
}
