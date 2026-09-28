import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LANGS, type Dict, type Lang } from './types';
import { de } from './de';
import { en } from './en';
import { es } from './es';

export { LANGS, LANG_LABELS } from './types';
export type { Dict, Lang } from './types';

const DICTS: Record<Lang, Dict> = { de, en, es };

const STORAGE_KEY = 'clavion.lang';

function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LANGS as readonly string[]).includes(v);
}

/**
 * Language for the first paint, in order of confidence:
 *   1. an explicit choice this visitor made before
 *   2. the browser's preferred languages
 *   3. German
 *
 * Both reads can throw (Safari private mode blocks localStorage; `languages`
 * is absent in some embedded webviews), so each is guarded — a failure here
 * would take the whole page down with it.
 */
function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage unavailable — fall through to browser preference */
  }

  try {
    const prefs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    for (const pref of prefs) {
      const base = pref.slice(0, 2).toLowerCase();
      if (isLang(base)) return base;
    }
  } catch {
    /* no navigator languages — fall through to the default */
  }

  return 'de';
}

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice still applies for this visit */
    }
  }, []);

  /**
   * Keep <html lang> in sync. This is not cosmetic: screen readers pick their
   * pronunciation from it, and the Chatbase widget reads it to decide its own
   * interface language (it passes it through as `hostLang` on the iframe), so
   * the chatbot follows the switcher for free.
   */
  useEffect(() => {
    document.documentElement.lang = DICTS[lang].htmlLang;
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: DICTS[lang] }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLang must be used inside <LanguageProvider>');
  }
  return ctx;
}
