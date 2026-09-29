import type { Dict } from './types';

/**
 * German — the source of truth.
 *
 * Every string here was lifted verbatim from the components it replaced, so
 * switching the site to this dictionary must not change a single rendered
 * character. Translate from here, never from en/es.
 */
export const de: Dict = {
  htmlLang: 'de',

  meta: {
    title: 'Clavion | KI-Automatisierung für deutsche Unternehmen',
    description:
      'Wir bauen Webseiten, die Anfragen bringen, Vertriebstools, die neue Kunden finden, und Automatisierungen, die eure Routinearbeit erledigen. DSGVO-konform, made in Germany.',
  },

  nav: {
    items: [
      { label: 'Leistungen', id: 'leistungen' },
      { label: 'Über uns', id: 'ueber-uns' },
      { label: 'Referenzen', id: 'showcase' },
      { label: 'Prozess', id: 'prozess' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', id: 'kontakt' },
    ],
    cta: 'Erstgespräch',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    switchLanguage: 'Sprache wechseln',
  },

  hero: {
    headlinePrefix: 'Euer Unternehmen läuft. Schluss mit',
    rotatingWords: [
      'Zeitverlust.',
      'verpassten Anfragen.',
      'manueller Arbeit.',
      'langsamen Prozessen.',
      'Papierkram.',
    ],
    headlineSuffix: '',
    subline:
      'Wir bauen Webseiten, die Anfragen bringen, Vertriebstools, die neue Kunden finden, und Automatisierungen, die eure Routinearbeit erledigen — aus einer Hand, für kleine und mittlere Unternehmen.',
    ctaPrimary: 'Kostenlose Prozessanalyse anfragen',
    ctaSecondary: 'Nach unten scrollen',
    badge: 'KI-Automatisierung · Made in Germany',
    quotes: [
      {
        quote:
          'LeadGen hat unsere Vertriebsrecherche komplett ersetzt. 5× mehr qualifizierte Kontakte, vollautomatisch bewertet.',
        initials: 'AU',
        name: 'Alfred U.',
        role: 'Vertriebsleiter',
      },
      {
        quote:
          'Erstes Ergebnis nach 9 Tagen live. Kein IT-Aufwand, keine langen Abstimmungen mehr.',
        initials: 'MS',
        name: 'Miriam S.',
        role: 'Geschäftsführerin',
      },
    ],
  },

  trustBar: [
    'Made in Germany',
    'DSGVO-konform',
    'Angebot in 48h',
    'Erste Ergebnisse in 1–2 Wochen',
  ],

  problems: {
    heading: 'Kommt euch das bekannt vor?',
    items: [
      {
        title: 'Täglich Zeit verlieren',
        desc: 'Routineaufgaben, manuelle Prozesse, Copy-Paste — euer Tag steckt voller Arbeit, die kein Mensch erledigen müsste.',
      },
      {
        title: 'Wachsen ohne mehr Aufwand',
        desc: 'Mehr Kunden, mehr Umsatz — aber nicht proportional mehr Personal. Automatisierung ist euer stärkster Hebel.',
      },
      {
        title: 'Systeme reden nicht miteinander',
        desc: 'Tools die nicht verbunden sind. Daten die manuell übertragen werden. Das kostet täglich Zeit, Geld und Nerven.',
      },
      {
        title: 'Anfragen fallen durchs Raster',
        desc: 'Keine Reaktion außerhalb der Bürozeiten. Leads die zu spät oder gar nicht bearbeitet werden.',
      },
    ],
  },

  services: {
    heading: 'Was wir für euch bauen',
    items: [
      {
        id: 'webseite',
        title: 'Webseite & Onlineshop',
        text: 'Eine Website, die nicht nur gut aussieht, sondern Anfragen bringt: klares Design, auf Wunsch mit Onlineshop — und einem integrierten Chatbot, der Besucher rund um die Uhr qualifiziert und Termine bucht.',
        tags: ['Design', 'Shopify', 'Chatbot', 'SEO'],
      },
      {
        id: 'leads',
        title: 'LeadGen & LeadTracker',
        text: 'Unser Vertriebs-Duo: LeadGen findet passende Firmen samt geprüfter Kontaktdaten. LeadTracker verschickt eure Kampagnen und zeigt, wer öffnet, klickt und antwortet — bis zum Abschluss.',
        tags: ['Lead-Recherche', 'E-Mail-Kampagnen', 'Analytics', 'CRM'],
      },
      {
        id: 'zeitwerk',
        title: 'ZeitWerk',
        text: 'Zeiterfassung für Handwerksbetriebe und kleine Teams: Timer je Auftrag, Team-Übersicht, Wochenstunden auf einen Blick — und am Ende ein fertiger Stundenzettel als PDF.',
        tags: ['Zeiterfassung', 'Aufträge', 'Team', 'PDF-Export'],
      },
      {
        id: 'automatisierung',
        title: 'Individuelle Automatisierung',
        text: 'Kein Standardtool passt? Wir verbinden eure bestehenden Systeme und bauen Abläufe, die von allein laufen — von der Rechnung bis zur Kunden-E-Mail, zugeschnitten auf euren Prozess.',
        tags: ['n8n', 'Make', 'APIs', 'Custom KI'],
      },
    ],
  },

  about: {
    heading: 'Wir sind Clavion',
    body:
      'Zwei junge Gründer mit einer klaren Mission: Deutschen Unternehmen den Zugang zu moderner KI-Technologie ermöglichen – ohne Buzzwords, ohne Überflüssiges.\n\nAls studierte Wirtschaftsingenieure und Controller verbinden wir fundiertes technisches Know-how mit tiefem Verständnis für betriebswirtschaftliche Zusammenhänge.',
    highlights: [
      {
        title: 'Berkay Aksoy & Marios Lysitsas',
        desc: 'Wir verstehen euer Business. Dann automatisieren wir es.',
      },
      { title: 'Made in Germany', desc: 'Deutsch, zuverlässig, DSGVO-konform' },
      { title: 'Ergebnisorientiert', desc: 'Wir messen uns an eurem ROI' },
    ],
  },

  demo: {
    heading: 'Nicht erklären. Zeigen.',
    sub: '',
    chatbotHintPrefix: 'Den KI-Chatbot live erleben — ',
    chatbotHintLink: 'jetzt rechts unten öffnen ↓',
    aboutBadges: 'Made in Germany · DSGVO-konform · Ergebnisorientiert',
    foundersRole: 'Gründer, Clavion',
    caseStatLeads: 'Leads · Recherche & Outreach',
    caseStatServices: 'Leistungen aus einer Hand',
    caseShopLive: 'Shop live auf c4f.bio',
    techIntro: 'Womit wir arbeiten',
  },

  demoScenes: {
    tabs: ['Lead-Pipeline', 'Zeiterfassung', 'Webseite', 'Automatisierung'],
    website: {
      label: 'Webseite · Design, Shop & Chatbot aus einer Hand',
      shopBadge: 'Shop',
      assistant: 'KI-Assistent',
      online: 'online',
      visitorMsg: 'Habt ihr Termine für ein Angebot?',
      botReplyPrefix: 'Klar! ',
      botReplySlot: 'Di. 14. Mai, 10:00',
      botReplySuffix: ' passt — gebucht ✓',
      bookedToast: 'Termin gebucht & im Kalender',
    },
    automation: {
      tasksCount: '4 Aufgaben',
      tasksAuto: 'automatisch erledigt',
      tasksManual: '0 Minuten manuell',
      label: 'Prozessautomatisierung · Kein manueller Aufwand',
      trigger: 'Trigger',
      triggerEvent: 'Neue Bestellung eingegangen',
      processing: 'KI verarbeitet',
      actions: ['Rechnung erstellt', 'Lager aktualisiert', 'Versand ausgelöst', 'Kunden-E-Mail gesendet'],
    },
    leads: {
      moreCompanies: '… und {count} weitere Firmen',
      campaignRunning: '● Kampagne läuft',
      campaignDone: '✓ Kampagne abgeschlossen',
      label: 'Lead-Pipeline · LeadGen → LeadTracker',
      leadsCaption: 'Leads · mit E-Mail',
      stats: ['Gesendet', 'Geöffnet', 'Geantwortet'],
    },
    time: {
      label: 'ZeitWerk · Zeiterfassung für Aufträge & Team',
      running: 'Läuft · Auftrag Bad Müller',
      thisWeek: 'Diese Woche',
      generating: 'Stundenzettel wird erstellt…',
      sheetTitle: 'Stundenzettel · KW 27',
      totalThisWeek: 'Gesamt · Diese Woche',
      entries: ['Bad-Sanierung Müller', 'Anfahrt Baustelle', 'Mittagspause', 'Heizung Wagner'],
      projectWork: 'Arbeit',
      projectBreak: 'Pause',
    },
  },

  showcase: {
    heading: 'Aus der Praxis',
    caseTitle: 'Nachhaltige Bodenprodukte · Pflanzenkohle',
    caseBody:
      'Für Carbon4Future haben wir die komplette digitale Präsenz aufgebaut: Website und Shopify-Onlineshop für ihre CO₂-bindenden Pflanzenkohle-Produkte, dazu ein Vertriebssystem aus LeadGen und LeadTracker. Damit haben wir geholfen, als Teil einer 40.000-Leads-Kampagne potenzielle Kunden zu recherchieren, anzureichern und anzuschreiben.',
    visitSite: 'Website ansehen',
  },

  process: {
    heading: 'So starten wir zusammen',
    steps: [
      {
        title: 'Kennenlernen & Analyse',
        desc: 'In einem ersten Meeting analysieren wir eure Prozesse, identifizieren die größten Hebel und verstehen euer Ziel — unverbindlich und auf Augenhöhe.',
      },
      {
        title: 'Konzept & Angebot',
        desc: 'Innerhalb von 48 Stunden erhaltet ihr ein maßgeschneidertes Konzept mit konkreten Lösungsvorschlägen und transparenten Kosten — ohne versteckte Posten.',
      },
      {
        title: 'Umsetzung & Live-Schaltung',
        desc: 'Wir entwickeln, testen und implementieren. Erste automatisierte Abläufe sind in der Regel innerhalb von 1–2 Wochen live.',
      },
    ],
  },

  stats: {
    heading: 'Unser Versprechen',
    weeksUnit: 'Wochen',
    labels: [
      'Bis zum ersten Angebot',
      'Bis zur ersten Live-Lösung',
      'Verfügbarkeit eurer KI',
      'Manuelle Schritte nach Automatisierung',
    ],
  },

  faq: {
    heading: 'Häufige Fragen',
    items: [
      {
        q: 'Für welche Branchen funktioniert das?',
        a: 'Prozessautomatisierung funktioniert branchenunabhängig — überall wo Aufgaben wiederholt werden, Systeme nicht verbunden sind oder Kommunikation manuell läuft. Wir haben Lösungen für Dienstleister, Handel, Handwerk und B2B-Unternehmen umgesetzt.',
      },
      {
        q: 'Was kostet das?',
        a: 'Jedes Projekt ist individuell — Umfang, Komplexität und laufende Betreuung beeinflussen den Preis. Was wir sagen können: Ein automatisierter Prozess rechnet sich in der Regel innerhalb weniger Wochen. Im kostenlosen Erstgespräch nennen wir euch konkrete Zahlen — ohne Überraschungen danach.',
      },
      {
        q: 'Wie lange dauert die Umsetzung?',
        a: 'Erste Ergebnisse sind oft in 1–2 Wochen sichtbar. Komplexere Systeme mit mehreren Integrationen dauern entsprechend länger — das besprechen wir im Konzept transparent.',
      },
      {
        q: 'Brauchen wir technisches Wissen?',
        a: 'Nein. Ihr beschreibt euren Prozess, wir übernehmen alles Technische. Nach Übergabe bekommt ihr eine verständliche Dokumentation und Einführung.',
      },
      {
        q: 'Ist das DSGVO-konform?',
        a: 'Ja. Wir sind ein deutsches Unternehmen und setzen alle Lösungen DSGVO-konform um. Datenspeicherung, Verarbeitung und Zugriffe werden transparent dokumentiert.',
      },
      {
        q: 'Was passiert nach der Umsetzung?',
        a: 'Wir begleiten den Go-Live, beheben Startschwierigkeiten und stehen für Anpassungen zur Verfügung. Auf Wunsch bieten wir laufende Betreuung und Weiterentwicklung.',
      },
      {
        q: 'Was, wenn ich mit dem Ergebnis nicht zufrieden bin?',
        a: 'Wir arbeiten ergebnisorientiert — nicht stunden- oder projektbasiert. Wenn etwas nicht passt, passen wir es an. Das klären wir vor Projektstart vertraglich.',
      },
    ],
  },

  contact: {
    heading: 'Zeigt uns einen Prozess, der euch täglich Zeit kostet.',
    body:
      'In 30 Minuten analysieren wir gemeinsam, was sich automatisieren lässt — konkret, kostenlos, ohne Verkaufsgespräch.',
    noRisk:
      'Kein Risiko — das Erstgespräch ist kostenlos & vollständig unverbindlich.',
    bookTitle: 'Termin vereinbaren',
    bookBody: '30 Min., kostenlos & unverbindlich',
    bookCta: 'Jetzt Termin buchen',
    notSureTitle: 'Noch nicht sicher?',
    notSureBody:
      'Schreib uns kurz, was euch beschäftigt — wir schauen gemeinsam, ob und wie wir helfen können.',
    bullets: [
      'Antwort innerhalb von 24h',
      'Kein Verkaufsgespräch, kein Druck',
      'Ihr müsst nichts vorbereiten',
    ],
    writeCta: 'Unverbindlich schreiben',
    chatbotHint:
      'Schnelle Antwort? Unser KI-Chatbot rechts unten ist sofort da.',
  },

  form: {
    title: 'Schreibt uns',
    intro:
      'Erzählt kurz, worum es geht — wir melden uns innerhalb von 24 Stunden.',
    name: 'Name',
    namePlaceholder: 'Vor- und Nachname',
    email: 'E-Mail',
    emailPlaceholder: 'name@firma.de',
    company: 'Unternehmen',
    companyPlaceholder: 'Firmenname und Branche',
    services: 'Worum geht es?',
    servicesHint: 'Mehrfachauswahl möglich',
    serviceOptions: [
      'Webseite & Onlineshop',
      'LeadGen & LeadTracker',
      'ZeitWerk (Zeiterfassung)',
      'Individuelle Automatisierung',
      'Noch unklar',
    ],
    timeframe: 'Wann passt ein Gespräch?',
    timeframeOptions: ['Diese Woche', 'Nächste Woche', 'Flexibel'],
    message: 'Nachricht',
    messagePlaceholder:
      'Welcher Prozess kostet euch aktuell am meisten Zeit?',
    privacyNotice:
      'Mit dem Absenden willigst du ein, dass wir deine Angaben zur Bearbeitung deiner Anfrage verarbeiten. Mehr dazu in der',
    privacyLink: 'Datenschutzerklärung',
    submit: 'Anfrage senden',
    submitting: 'Wird gesendet …',
    successTitle: 'Danke — angekommen!',
    successBody:
      'Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden.',
    errorTitle: 'Das hat leider nicht geklappt',
    errorBody:
      'Bitte versuch es gleich noch einmal — oder schreib uns direkt an webmaster@clavion.pro.',
    required: 'Dieses Feld wird benötigt',
    invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein',
    close: 'Schließen',
  },

  legal: {
    germanBindingNotice: '',
    backHome: 'Zur Startseite',
  },

  footer: {
    tagline:
      'KI-Automatisierung für deutsche Unternehmen. Wir machen Technologie nutzbar — ohne Buzzwords.',
    navHeading: 'Navigation',
    legalHeading: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    blog: 'Blog',
    rights: 'Alle Rechte vorbehalten.',
    badges: 'DSGVO-konform · Made in Germany · Remote-first',
  },

  blog: {
    metaTitle: 'Blog – KI-Automatisierung & Prozesse | Clavion',
    metaDescription:
      'Praxiswissen zu KI-Automatisierung, Chatbots und Prozessoptimierung für KMU in Deutschland.',
    eyebrow: 'Insights & Praxis',
    home: 'Startseite',
    bookCta: 'Kostenlose Prozessanalyse',
    heading: 'Blog',
    sub: 'Praxiswissen zu KI-Automatisierung für kleine und mittlere Unternehmen.',
    readMore: 'Weiterlesen',
    backToBlog: 'Zurück zum Blog',
    backHome: 'Zur Startseite',
    minRead: 'Min. Lesezeit',
    germanOnlyNotice: '',
  },

  notFound: {
    metaTitle: '404 – Seite nicht gefunden | Clavion',
    metaDescription: 'Die gesuchte Seite existiert nicht.',
    title: 'Seite nicht gefunden',
    body: 'Diese Seite gibt es nicht — oder nicht mehr.',
    cta: 'Zur Startseite',
  },

  geo: {
    heading: 'Über Clavion – KI-Automatisierung für deutsche Unternehmen',
    paragraphs: [
      'Clavion ist eine deutsche KI-Automatisierungsagentur mit Sitz in Deutschland, gegründet von Berkay Aksoy und Marios Lysitsas. Wir helfen kleinen und mittelständischen Unternehmen (KMU), Handwerkern und Dienstleistern in Deutschland, Österreich und der Schweiz (DACH), manuelle Arbeitsprozesse durch KI-gestützte Automatisierung zu ersetzen.',
      'Unsere Leistungen umfassen: Prozessautomatisierung mit n8n, Make und Zapier; System-Integration via REST APIs und Webhooks; KI-Chatbots und Voice Agents für 24/7-Kundenservice und Terminvereinbarung; sowie individuelle Custom-KI-Lösungen mit LLM-Agenten, RAG und Dokumenten-KI.',
      'Alle Lösungen sind DSGVO-konform und werden auf EU-Servern betrieben. Projekte starten ab 2.000 EUR. Nach einem kostenlosen 30-minütigen Erstgespräch erhalten Kunden innerhalb von 48 Stunden ein transparentes Angebot. Erste Ergebnisse sind typischerweise in 1–2 Wochen sichtbar.',
      'Gründer: Berkay Aksoy und Marios Lysitsas – Wirtschaftsingenieure mit Spezialisierung auf KI-Technologie und betriebswirtschaftliche Prozessoptimierung. Clavion arbeitet ergebnisorientiert: Messbare Zeitersparnis und ROI für Kunden sind das primäre Ziel.',
      'Hauptkeywords: KI-Automatisierung Deutschland, Prozessautomatisierung KMU, KI-Chatbot deutsches Unternehmen, Workflow Automatisierung DACH, Voice Agent Deutschland, n8n Automatisierung Agentur, KI Agentur DACH.',
    ],
  },
};
