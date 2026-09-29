import type { Dict } from './types';

/**
 * English.
 *
 * Written as marketing copy rather than a literal translation of `de` — the
 * German addresses companies as "ihr/euer", which has no English equivalent,
 * so this uses a direct "you/your". Claims, numbers and names are kept
 * identical to the German; only the phrasing is free.
 */
export const en: Dict = {
  htmlLang: 'en',

  meta: {
    title: 'Clavion | AI automation for small and mid-sized businesses',
    description:
      'We build websites that bring in enquiries, sales tools that find new customers, and automations that handle your routine work. GDPR-compliant, made in Germany.',
  },

  nav: {
    items: [
      { label: 'Services', id: 'leistungen' },
      { label: 'About', id: 'ueber-uns' },
      { label: 'Work', id: 'showcase' },
      { label: 'Process', id: 'prozess' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', id: 'kontakt' },
    ],
    cta: 'Book a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Change language',
  },

  hero: {
    headlinePrefix: 'Your business runs. No more',
    rotatingWords: [
      'wasted time.',
      'missed enquiries.',
      'manual work.',
      'slow processes.',
      'paperwork.',
    ],
    headlineSuffix: '',
    subline:
      'We build websites that bring in enquiries, sales tools that find new customers, and automations that take over your routine work — all from one team, for small and mid-sized businesses.',
    ctaPrimary: 'Request a free process review',
    ctaSecondary: 'Scroll down',
    badge: 'AI automation · Made in Germany',
    quotes: [
      {
        quote:
          'LeadGen completely replaced our sales research. 5× more qualified contacts, scored automatically.',
        initials: 'AU',
        name: 'Alfred U.',
        role: 'Head of Sales',
      },
      {
        quote:
          'First result live after 9 days. No IT effort, no more drawn-out meetings.',
        initials: 'MS',
        name: 'Miriam S.',
        role: 'Managing Director',
      },
    ],
  },

  trustBar: [
    'Made in Germany',
    'GDPR-compliant',
    'Quote within 48h',
    'First results in 1–2 weeks',
  ],

  problems: {
    heading: 'Sound familiar?',
    items: [
      {
        title: 'Losing time every day',
        desc: 'Routine tasks, manual steps, copy-paste — your day is full of work no person should have to do.',
      },
      {
        title: 'Growing without growing overhead',
        desc: 'More customers, more revenue — without hiring in proportion. Automation is your strongest lever.',
      },
      {
        title: 'Systems that ignore each other',
        desc: 'Tools that are not connected. Data moved by hand. That costs time, money and patience every single day.',
      },
      {
        title: 'Enquiries slipping through',
        desc: 'No response outside office hours. Leads handled too late, or never at all.',
      },
    ],
  },

  services: {
    heading: 'What we build for you',
    items: [
      {
        id: 'webseite',
        title: 'Website & online shop',
        text: 'A website that does more than look good — it brings in enquiries: clean design, an online shop if you need one, and a built-in chatbot that qualifies visitors around the clock and books appointments.',
        tags: ['Design', 'Shopify', 'Chatbot', 'SEO'],
      },
      {
        id: 'leads',
        title: 'LeadGen & LeadTracker',
        text: 'Our sales duo: LeadGen finds matching companies with verified contact details. LeadTracker sends your campaigns and shows who opens, clicks and replies — right through to the close.',
        tags: ['Lead research', 'Email campaigns', 'Analytics', 'CRM'],
      },
      {
        id: 'zeitwerk',
        title: 'ZeitWerk',
        text: 'Time tracking for trades businesses and small teams: a timer per job, a team overview, weekly hours at a glance — and a finished timesheet as a PDF at the end.',
        tags: ['Time tracking', 'Jobs', 'Team', 'PDF export'],
      },
      {
        id: 'automatisierung',
        title: 'Custom automation',
        text: 'No off-the-shelf tool fits? We connect the systems you already have and build workflows that run on their own — from invoicing to customer email, shaped around your process.',
        tags: ['n8n', 'Make', 'APIs', 'Custom AI'],
      },
    ],
  },

  about: {
    heading: 'We are Clavion',
    body:
      'Two young founders with one clear mission: give German businesses access to modern AI technology – no buzzwords, nothing you do not need.\n\nAs qualified industrial engineers and controllers, we combine solid technical know-how with a deep understanding of how a business actually works.',
    highlights: [
      {
        title: 'Berkay Aksoy & Marios Lysitsas',
        desc: 'First we understand your business. Then we automate it.',
      },
      { title: 'Made in Germany', desc: 'German, dependable, GDPR-compliant' },
      { title: 'Results-driven', desc: 'We measure ourselves against your ROI' },
    ],
  },

  demo: {
    heading: 'Less explaining. More showing.',
    sub: '',
    chatbotHintPrefix: 'Try the AI chatbot for yourself — ',
    chatbotHintLink: 'open it bottom right ↓',
    aboutBadges: 'Made in Germany · GDPR-compliant · Results-driven',
    foundersRole: 'Founders, Clavion',
    caseStatLeads: 'Leads · research & outreach',
    caseStatServices: 'Services from one team',
    caseShopLive: 'Shop live at c4f.bio',
    techIntro: 'What we work with',
  },

  demoScenes: {
    tabs: ['Lead pipeline', 'Time tracking', 'Website', 'Automation'],
    website: {
      label: 'Website · Design, shop & chatbot from one team',
      shopBadge: 'Shop',
      assistant: 'AI assistant',
      online: 'online',
      visitorMsg: 'Do you have a slot for a quote?',
      botReplyPrefix: 'Of course! ',
      botReplySlot: 'Tue 14 May, 10:00',
      botReplySuffix: ' works — booked ✓',
      bookedToast: 'Appointment booked & in the calendar',
    },
    automation: {
      label: 'Process automation · No manual work',
      trigger: 'Trigger',
      triggerEvent: 'New order received',
      processing: 'AI processing',
      actions: ['Invoice created', 'Stock updated', 'Shipping triggered', 'Customer email sent'],
    },
    leads: {
      label: 'Lead pipeline · LeadGen → LeadTracker',
      leadsCaption: 'Leads · with email',
      stats: ['Sent', 'Opened', 'Replied'],
    },
    time: {
      label: 'ZeitWerk · Time tracking for jobs & teams',
      running: 'Running · Job Bad Müller',
      thisWeek: 'This week',
      generating: 'Creating timesheet…',
      sheetTitle: 'Timesheet · week 27',
      totalThisWeek: 'Total · this week',
      entries: ['Bathroom refit Müller', 'Travel to site', 'Lunch break', 'Heating Wagner'],
      projectWork: 'Work',
      projectBreak: 'Break',
    },
  },

  showcase: {
    heading: 'From our work',
    caseTitle: 'Sustainable soil products · Biochar',
    caseBody:
      'For Carbon4Future we built the entire digital presence: a website and Shopify store for their CO₂-binding biochar products, plus a sales system made up of LeadGen and LeadTracker. With it we helped research, enrich and reach potential customers as part of a 40,000-lead campaign.',
    visitSite: 'Visit website',
  },

  process: {
    heading: 'How we start together',
    steps: [
      {
        title: 'Intro & analysis',
        desc: 'In a first meeting we look at your processes, identify the biggest levers and understand your goal — no obligation, as equals.',
      },
      {
        title: 'Concept & quote',
        desc: 'Within 48 hours you receive a tailored concept with concrete proposals and transparent costs — no hidden items.',
      },
      {
        title: 'Build & go live',
        desc: 'We develop, test and implement. The first automated workflows are usually live within 1–2 weeks.',
      },
    ],
  },

  stats: {
    heading: 'Our promise',
    weeksUnit: 'weeks',
    labels: [
      'Until your first quote',
      'Until your first live solution',
      'Availability of your AI',
      'Manual steps after automation',
    ],
  },

  faq: {
    heading: 'Frequently asked',
    items: [
      {
        q: 'Which industries does this work for?',
        a: 'Process automation works regardless of industry — anywhere tasks repeat, systems are disconnected or communication runs by hand. We have delivered solutions for service providers, retail, trades and B2B companies.',
      },
      {
        q: 'What does it cost?',
        a: 'Every project is different — scope, complexity and ongoing support all affect the price. What we can say: an automated process typically pays for itself within a few weeks. In the free intro call we give you concrete figures — with no surprises afterwards.',
      },
      {
        q: 'How long does it take?',
        a: 'First results are often visible in 1–2 weeks. More complex systems with several integrations take correspondingly longer — we set that out transparently in the concept.',
      },
      {
        q: 'Do we need technical knowledge?',
        a: 'No. You describe your process, we handle everything technical. On handover you get clear documentation and an introduction.',
      },
      {
        q: 'Is this GDPR-compliant?',
        a: 'Yes. We are a German company and build every solution to be GDPR-compliant. Data storage, processing and access are documented transparently.',
      },
      {
        q: 'What happens after go-live?',
        a: 'We support the launch, fix teething problems and stay available for adjustments. On request we offer ongoing support and further development.',
      },
      {
        q: 'What if I am not happy with the result?',
        a: 'We work towards outcomes — not by the hour or by the project. If something is not right, we adjust it. We agree that contractually before the project starts.',
      },
    ],
  },

  contact: {
    heading: 'Show us one process that costs you time every day.',
    body:
      'In 30 minutes we work out together what can be automated — concrete, free, and not a sales pitch.',
    noRisk:
      'No risk — the intro call is free and entirely without obligation.',
    bookTitle: 'Book a meeting',
    bookBody: '30 min, free & no obligation',
    bookCta: 'Book a slot now',
    notSureTitle: 'Not sure yet?',
    notSureBody:
      'Tell us briefly what is on your mind — we will work out together whether and how we can help.',
    bullets: [
      'A reply within 24 hours',
      'No sales pitch, no pressure',
      'Nothing for you to prepare',
    ],
    writeCta: 'Send a message instead',
    chatbotHint:
      'Need a quick answer? Our AI chatbot in the bottom right is there right now.',
  },

  form: {
    title: 'Send us a message',
    intro: 'Tell us briefly what this is about — we reply within 24 hours.',
    name: 'Name',
    namePlaceholder: 'First and last name',
    email: 'Email',
    emailPlaceholder: 'name@company.com',
    company: 'Company',
    companyPlaceholder: 'Company name and industry',
    services: 'What is this about?',
    servicesHint: 'Select all that apply',
    serviceOptions: [
      'Website & online shop',
      'LeadGen & LeadTracker',
      'ZeitWerk (time tracking)',
      'Custom automation',
      'Not sure yet',
    ],
    timeframe: 'When suits you for a call?',
    timeframeOptions: ['This week', 'Next week', 'Flexible'],
    message: 'Message',
    messagePlaceholder: 'Which process currently costs you the most time?',
    privacyNotice:
      'By submitting, you agree that we may process your details in order to handle your enquiry. More on this in our',
    privacyLink: 'privacy policy',
    submit: 'Send enquiry',
    submitting: 'Sending …',
    successTitle: 'Thank you — received!',
    successBody:
      'We have your enquiry and will get back to you within 24 hours.',
    errorTitle: 'That did not work',
    errorBody:
      'Please try again in a moment — or email us directly at webmaster@clavion.pro.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    close: 'Close',
  },

  legal: {
    germanBindingNotice:
      'This page is available in German only. As a German company, our legal notice and privacy policy are legally binding in German — a translation could be inaccurate on points that matter. If anything is unclear, write to us and we will explain it in English.',
    backHome: 'Back to home',
  },

  footer: {
    tagline:
      'AI automation for small and mid-sized businesses. We make technology usable — without the buzzwords.',
    navHeading: 'Navigation',
    legalHeading: 'Legal',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    blog: 'Blog',
    rights: 'All rights reserved.',
    badges: 'GDPR-compliant · Made in Germany · Remote-first',
  },

  blog: {
    metaTitle: 'Blog – AI automation & processes | Clavion',
    metaDescription:
      'Practical knowledge on AI automation, chatbots and process optimisation for small and mid-sized businesses.',
    eyebrow: 'Insights & practice',
    home: 'Home',
    bookCta: 'Free process review',
    heading: 'Blog',
    sub: 'Practical knowledge on AI automation for small and mid-sized businesses.',
    readMore: 'Read more',
    backToBlog: 'Back to the blog',
    backHome: 'Back to home',
    minRead: 'min read',
    germanOnlyNotice:
      'Our blog articles are currently available in German only.',
  },

  notFound: {
    metaTitle: '404 – Page not found | Clavion',
    metaDescription: 'The page you are looking for does not exist.',
    title: 'Page not found',
    body: 'This page does not exist — or does not exist any more.',
    cta: 'Back to home',
  },

  geo: {
    heading: 'About Clavion – AI automation for German businesses',
    paragraphs: [
      'Clavion is a German AI automation agency based in Germany, founded by Berkay Aksoy and Marios Lysitsas. We help small and mid-sized businesses (SMEs), trades businesses and service providers in Germany, Austria and Switzerland (DACH) replace manual work processes with AI-supported automation.',
      'Our services include: process automation with n8n, Make and Zapier; system integration via REST APIs and webhooks; AI chatbots and voice agents for 24/7 customer service and appointment booking; and custom AI solutions using LLM agents, RAG and document AI.',
      'All solutions are GDPR-compliant and run on EU servers. Projects start from EUR 2,000. After a free 30-minute intro call, clients receive a transparent quote within 48 hours. First results are typically visible within 1–2 weeks.',
      'Founders: Berkay Aksoy and Marios Lysitsas – industrial engineers specialising in AI technology and business process optimisation. Clavion works towards outcomes: measurable time savings and ROI for clients are the primary goal.',
      'Main keywords: AI automation Germany, process automation SME, AI chatbot German company, workflow automation DACH, voice agent Germany, n8n automation agency, AI agency DACH.',
    ],
  },
};
