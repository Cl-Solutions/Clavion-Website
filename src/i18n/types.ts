/**
 * Shape of a single language's content.
 *
 * Positional arrays (problems, services, steps, stats, faqs) are paired with
 * icon/behaviour definitions that stay in the components — translators only
 * ever touch text, never JSX. Every locale file is typed against this, so a
 * forgotten key is a build error rather than a blank spot on the live page.
 */
export const LANGS = ['de', 'en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

/** Shown in the language switcher. */
export const LANG_LABELS: Record<Lang, { label: string; long: string }> = {
  de: { label: 'DE', long: 'Deutsch' },
  en: { label: 'EN', long: 'English' },
  es: { label: 'ES', long: 'Español' },
};

export interface Dict {
  /** <html lang> value and hreflang code. */
  htmlLang: string;

  meta: {
    title: string;
    description: string;
  };

  nav: {
    items: { label: string; id?: string; href?: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
  };

  hero: {
    /** Static first half of the headline. */
    headlinePrefix: string;
    /** Words that rotate in the carousel. Keep them short. */
    rotatingWords: string[];
    headlineSuffix: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
    quotes: { quote: string; initials: string; name: string; role: string }[];
  };

  trustBar: string[];

  problems: {
    heading: string;
    items: { title: string; desc: string }[];
  };

  services: {
    heading: string;
    items: { id: string; title: string; text: string; tags: string[] }[];
  };

  about: {
    heading: string;
    body: string;
    highlights: { title: string; desc: string }[];
  };

  demo: {
    heading: string;
    sub: string;
    /** Loose bits of chrome around the demo, case study and tech strip. */
    chatbotHintPrefix: string;
    chatbotHintLink: string;
    aboutBadges: string;
    foundersRole: string;
    caseStatLeads: string;
    caseStatServices: string;
    caseShopLive: string;
    techIntro: string;
  };

  /**
   * The animated product demo. Company names inside it stay German on purpose
   * — they illustrate German trade businesses, which is the point of the scene
   * — but every label around them follows the switcher.
   */
  demoScenes: {
    tabs: string[];
    website: {
      label: string;
      shopBadge: string;
      assistant: string;
      online: string;
      visitorMsg: string;
      botReplyPrefix: string;
      botReplySlot: string;
      botReplySuffix: string;
      bookedToast: string;
    };
    automation: {
      /** "4 Aufgaben · automatisch erledigt · 0 Minuten manuell" */
      tasksCount: string;
      tasksAuto: string;
      tasksManual: string;
      label: string;
      trigger: string;
      triggerEvent: string;
      processing: string;
      actions: string[];
    };
    leads: {
      /** "… und 16.237 weitere Firmen" — {count} is substituted. */
      moreCompanies: string;
      campaignRunning: string;
      campaignDone: string;
      label: string;
      leadsCaption: string;
      stats: string[];
    };
    time: {
      label: string;
      running: string;
      thisWeek: string;
      generating: string;
      sheetTitle: string;
      totalThisWeek: string;
      entries: string[];
      projectWork: string;
      projectBreak: string;
    };
  };

  showcase: {
    heading: string;
    caseTitle: string;
    caseBody: string;
    visitSite: string;
  };

  process: {
    heading: string;
    steps: { title: string; desc: string }[];
  };

  stats: {
    heading: string;
    labels: string[];
    /** Unit shown under the "1–2" figure. */
    weeksUnit: string;
  };

  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };

  contact: {
    heading: string;
    body: string;
    noRisk: string;
    bookTitle: string;
    bookBody: string;
    bookCta: string;
    notSureTitle: string;
    notSureBody: string;
    /** Three reassurance bullets beside the write-to-us button. */
    bullets: string[];
    writeCta: string;
    chatbotHint: string;
  };

  /** Own contact form — replaces the Tally embed. */
  form: {
    title: string;
    intro: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    services: string;
    servicesHint: string;
    serviceOptions: string[];
    timeframe: string;
    timeframeOptions: string[];
    message: string;
    messagePlaceholder: string;
    privacyNotice: string;
    privacyLink: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    required: string;
    invalidEmail: string;
    close: string;
  };

  /**
   * Imprint and privacy policy stay in German: they are the legally binding
   * texts under German law, and a machine translation of a privacy policy can
   * be substantively wrong. Only the page chrome is translated, plus this
   * notice explaining why the body is in German.
   */
  legal: {
    germanBindingNotice: string;
    backHome: string;
  };

  footer: {
    tagline: string;
    navHeading: string;
    legalHeading: string;
    imprint: string;
    privacy: string;
    blog: string;
    rights: string;
    /** Trust line in the bottom bar. */
    badges: string;
  };

  blog: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    home: string;
    bookCta: string;
    heading: string;
    sub: string;
    readMore: string;
    backToBlog: string;
    backHome: string;
    minRead: string;
    /** Shown on EN/ES because posts are only written in German so far. */
    germanOnlyNotice: string;
  };

  /**
   * Visually hidden block for AI crawlers and search engines. Not shown to
   * users, so it stays keyword-dense and factual rather than on-brand.
   */
  geo: {
    heading: string;
    paragraphs: string[];
  };

  notFound: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    body: string;
    cta: string;
  };
}
