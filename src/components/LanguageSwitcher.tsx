import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { LANGS, LANG_LABELS, useLang, type Lang } from '../i18n';

/**
 * Language switcher.
 *
 * Two layouts from one component:
 *  - `variant="nav"`    — compact globe + code, opens a dropdown. Used in the
 *                         desktop navbar where horizontal space is scarce.
 *  - `variant="inline"` — all three languages laid out as a row of pills. Used
 *                         in the mobile menu, where a dropdown inside an
 *                         already-open overlay is awkward to operate.
 */
export function LanguageSwitcher({
  variant = 'nav',
  onPick,
}: {
  variant?: 'nav' | 'inline';
  onPick?: () => void;
}) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape. Both listeners are only attached
  // while the menu is actually open.
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (next: Lang) => {
    setLang(next);
    setOpen(false);
    onPick?.();
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2" role="group" aria-label={t.nav.switchLanguage}>
        {LANGS.map((code) => {
          const active = code === lang;
          return (
            <button
              key={code}
              onClick={() => pick(code)}
              aria-current={active ? 'true' : undefined}
              lang={code}
              className={`px-4 py-2 rounded-lg font-inter text-sm transition-colors duration-150 border ${
                active
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {LANG_LABELS[code].long}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.nav.switchLanguage}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-inter text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
      >
        <Globe className="w-4 h-4" />
        {LANG_LABELS[lang].label}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 min-w-[9.5rem] rounded-xl border border-[rgba(0,229,255,0.12)] bg-[rgba(10,10,10,0.95)] backdrop-blur-[16px] p-1.5 shadow-xl shadow-black/40"
        >
          {LANGS.map((code) => {
            const active = code === lang;
            return (
              <button
                key={code}
                role="menuitem"
                onClick={() => pick(code)}
                lang={code}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-inter text-sm text-left transition-colors duration-150 ${
                  active
                    ? 'text-accent bg-accent/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {LANG_LABELS[code].long}
                {active && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
