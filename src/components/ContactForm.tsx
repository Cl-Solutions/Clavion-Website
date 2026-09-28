import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { useLang } from '../i18n';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Fields {
  name: string;
  email: string;
  company: string;
  services: string[];
  timeframe: string;
  message: string;
}

const EMPTY: Fields = {
  name: '',
  email: '',
  company: '',
  services: [],
  timeframe: '',
  message: '',
};

function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/**
 * Contact form, replacing the Tally embed.
 *
 * Tally could not translate its own form content, which left the form stuck in
 * German once the site gained EN and ES. This posts to /api/contact instead,
 * so the fields, validation and confirmation all follow the language switcher.
 */
export function ContactForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  /** Honeypot. Hidden from people, filled in by bots. */
  const [website, setWebsite] = useState('');

  const openedAt = useRef<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  /** Element that had focus before opening, so it can be restored on close. */
  const restoreFocusTo = useRef<Element | null>(null);

  // Reset to a clean slate each time the dialog opens, and note the time so
  // the server can reject submissions that arrive impossibly fast.
  useEffect(() => {
    if (!open) return;
    openedAt.current = Date.now();
    restoreFocusTo.current = document.activeElement;
    setStatus('idle');
    setErrors({});
    setWebsite('');
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [open]);

  // Escape closes; Tab is kept inside the dialog while it is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      (restoreFocusTo.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const toggleService = (option: string) => {
    setFields((f) => ({
      ...f,
      services: f.services.includes(option)
        ? f.services.filter((s) => s !== option)
        : [...f.services, option],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = t.form.required;
    if (!fields.email.trim()) next.email = t.form.required;
    else if (!looksLikeEmail(fields.email.trim())) next.email = t.form.invalidEmail;
    if (!fields.message.trim()) next.message = t.form.required;

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          lang,
          website,
          startedAt: openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setFields(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const labelCls = 'block font-inter text-sm text-gray-300 mb-1.5';
  const inputCls =
    'w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 font-inter text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors';
  const errCls = 'mt-1.5 font-inter text-xs text-red-400';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg my-auto rounded-2xl border border-[rgba(0,229,255,0.14)] bg-[#0d0d0d] p-6 sm:p-8 shadow-2xl shadow-black/60"
          >
            <button
              onClick={onClose}
              aria-label={t.form.close}
              className="absolute right-4 top-4 p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'sent' ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
                <h2
                  id="contact-form-title"
                  className="font-syne font-bold text-xl text-white mb-2"
                >
                  {t.form.successTitle}
                </h2>
                <p className="font-inter text-sm text-gray-400 leading-relaxed mb-7">
                  {t.form.successBody}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-accent text-dark font-inter font-semibold text-sm rounded-xl hover:bg-accent/90 active:scale-[0.97] transition-all"
                >
                  {t.form.close}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2
                  id="contact-form-title"
                  className="font-syne font-bold text-xl sm:text-2xl text-white mb-2 pr-10"
                >
                  {t.form.title}
                </h2>
                <p className="font-inter text-sm text-gray-400 leading-relaxed mb-6">
                  {t.form.intro}
                </p>

                {/* Honeypot — off-screen rather than display:none, which some
                    bots specifically skip. Never announced, never tabbed to. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                  }}
                >
                  <label htmlFor="cf-website">Website</label>
                  <input
                    id="cf-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelCls} htmlFor="cf-name">
                      {t.form.name} <span className="text-accent">*</span>
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      className={inputCls}
                      placeholder={t.form.namePlaceholder}
                      value={fields.name}
                      onChange={(e) => set('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'cf-name-err' : undefined}
                    />
                    {errors.name && (
                      <p id="cf-name-err" className={errCls}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="cf-email">
                      {t.form.email} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      className={inputCls}
                      placeholder={t.form.emailPlaceholder}
                      value={fields.email}
                      onChange={(e) => set('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'cf-email-err' : undefined}
                    />
                    {errors.email && (
                      <p id="cf-email-err" className={errCls}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="cf-company">
                      {t.form.company}
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      autoComplete="organization"
                      className={inputCls}
                      placeholder={t.form.companyPlaceholder}
                      value={fields.company}
                      onChange={(e) => set('company', e.target.value)}
                    />
                  </div>

                  <fieldset>
                    <legend className={labelCls}>
                      {t.form.services}{' '}
                      <span className="text-gray-600">({t.form.servicesHint})</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {t.form.serviceOptions.map((option) => {
                        const active = fields.services.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleService(option)}
                            aria-pressed={active}
                            className={`px-3 py-2 rounded-lg font-inter text-xs border transition-colors ${
                              active
                                ? 'bg-accent/10 border-accent/40 text-accent'
                                : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className={labelCls}>{t.form.timeframe}</legend>
                    <div className="flex flex-wrap gap-2">
                      {t.form.timeframeOptions.map((option) => {
                        const active = fields.timeframe === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              set('timeframe', active ? '' : option)
                            }
                            aria-pressed={active}
                            className={`px-3 py-2 rounded-lg font-inter text-xs border transition-colors ${
                              active
                                ? 'bg-accent/10 border-accent/40 text-accent'
                                : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label className={labelCls} htmlFor="cf-message">
                      {t.form.message} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={4}
                      className={`${inputCls} resize-y min-h-[104px]`}
                      placeholder={t.form.messagePlaceholder}
                      value={fields.message}
                      onChange={(e) => set('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? 'cf-message-err' : undefined
                      }
                    />
                    {errors.message && (
                      <p id="cf-message-err" className={errCls}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/5 p-4"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter font-semibold text-sm text-red-300">
                        {t.form.errorTitle}
                      </p>
                      <p className="font-inter text-xs text-red-300/70 mt-1 leading-relaxed">
                        {t.form.errorBody}
                      </p>
                    </div>
                  </div>
                )}

                <p className="mt-5 font-inter text-xs text-gray-500 leading-relaxed">
                  {t.form.privacyNotice}{' '}
                  <Link
                    to="/datenschutz"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {t.form.privacyLink}
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-dark font-inter font-semibold text-sm rounded-xl hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.form.submitting}
                    </>
                  ) : (
                    <>
                      {t.form.submit}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
