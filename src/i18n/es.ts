import type { Dict } from './types';

/**
 * Spanish.
 *
 * Uses the neutral "ustedes / su" register rather than peninsular "vosotros",
 * so the same copy reads naturally to a business audience in Spain and in
 * Latin America. Claims, numbers and names match the German exactly; only the
 * phrasing is free. Note that GDPR is "RGPD" in Spanish.
 */
export const es: Dict = {
  htmlLang: 'es',

  meta: {
    title: 'Clavion | Automatización con IA para pequeñas y medianas empresas',
    description:
      'Creamos sitios web que generan solicitudes, herramientas de ventas que encuentran clientes y automatizaciones que se ocupan del trabajo rutinario. Conforme al RGPD, hecho en Alemania.',
  },

  nav: {
    items: [
      { label: 'Servicios', id: 'leistungen' },
      { label: 'Nosotros', id: 'ueber-uns' },
      { label: 'Casos', id: 'showcase' },
      { label: 'Proceso', id: 'prozess' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', id: 'kontakt' },
    ],
    cta: 'Primera consulta',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLanguage: 'Cambiar idioma',
  },

  hero: {
    headlinePrefix: 'Su empresa funciona. Se acabó',
    rotatingWords: [
      'el tiempo perdido.',
      'las solicitudes sin responder.',
      'el trabajo manual.',
      'los procesos lentos.',
      'el papeleo.',
    ],
    headlineSuffix: '',
    subline:
      'Creamos sitios web que generan solicitudes, herramientas de ventas que encuentran clientes nuevos y automatizaciones que se ocupan del trabajo rutinario — todo desde un mismo equipo, para pequeñas y medianas empresas.',
    ctaPrimary: 'Solicitar análisis gratuito',
    ctaSecondary: 'Desplazarse hacia abajo',
    badge: 'Automatización con IA · Hecho en Alemania',
    quotes: [
      {
        quote:
          'LeadGen sustituyó por completo nuestra investigación comercial. 5× más contactos cualificados, valorados de forma automática.',
        initials: 'AU',
        name: 'Alfred U.',
        role: 'Director comercial',
      },
      {
        quote:
          'El primer resultado en marcha a los 9 días. Sin trabajo de TI y sin reuniones interminables.',
        initials: 'MS',
        name: 'Miriam S.',
        role: 'Directora general',
      },
    ],
  },

  trustBar: [
    'Hecho en Alemania',
    'Conforme al RGPD',
    'Propuesta en 48 h',
    'Primeros resultados en 1–2 semanas',
  ],

  problems: {
    heading: '¿Les suena de algo?',
    items: [
      {
        title: 'Perder tiempo cada día',
        desc: 'Tareas rutinarias, procesos manuales, copiar y pegar — su jornada está llena de trabajo que nadie debería tener que hacer.',
      },
      {
        title: 'Crecer sin aumentar la carga',
        desc: 'Más clientes y más facturación, pero sin contratar en la misma proporción. La automatización es su mayor palanca.',
      },
      {
        title: 'Sistemas que no se hablan',
        desc: 'Herramientas sin conectar. Datos que se trasladan a mano. Eso cuesta tiempo, dinero y paciencia todos los días.',
      },
      {
        title: 'Solicitudes que se pierden',
        desc: 'Sin respuesta fuera del horario de oficina. Oportunidades atendidas tarde o directamente olvidadas.',
      },
    ],
  },

  services: {
    heading: 'Lo que construimos para ustedes',
    items: [
      {
        id: 'webseite',
        title: 'Sitio web y tienda online',
        text: 'Una web que no solo luce bien, sino que genera solicitudes: diseño claro, tienda online si la necesitan y un chatbot integrado que cualifica visitantes las 24 horas y agenda citas.',
        tags: ['Diseño', 'Shopify', 'Chatbot', 'SEO'],
      },
      {
        id: 'leads',
        title: 'LeadGen y LeadTracker',
        text: 'Nuestro dúo comercial: LeadGen localiza empresas adecuadas con datos de contacto verificados. LeadTracker envía sus campañas y muestra quién abre, hace clic y responde — hasta el cierre.',
        tags: ['Investigación de leads', 'Campañas de correo', 'Analítica', 'CRM'],
      },
      {
        id: 'zeitwerk',
        title: 'ZeitWerk',
        text: 'Control horario para talleres y equipos pequeños: un temporizador por encargo, vista de equipo, horas semanales de un vistazo — y al final un parte de horas listo en PDF.',
        tags: ['Control horario', 'Encargos', 'Equipo', 'Exportar a PDF'],
      },
      {
        id: 'automatisierung',
        title: 'Automatización a medida',
        text: '¿Ninguna herramienta estándar encaja? Conectamos los sistemas que ya usan y creamos flujos que funcionan solos — de la factura al correo al cliente, adaptados a su proceso.',
        tags: ['n8n', 'Make', 'APIs', 'IA a medida'],
      },
    ],
  },

  about: {
    heading: 'Somos Clavion',
    body:
      'Dos fundadores jóvenes con una misión clara: acercar la tecnología de IA moderna a las empresas alemanas, sin palabrería y sin nada superfluo.\n\nComo ingenieros industriales y controllers titulados, combinamos un sólido conocimiento técnico con una comprensión profunda del funcionamiento real de un negocio.',
    highlights: [
      {
        title: 'Berkay Aksoy y Marios Lysitsas',
        desc: 'Primero entendemos su negocio. Después lo automatizamos.',
      },
      { title: 'Hecho en Alemania', desc: 'Alemán, fiable, conforme al RGPD' },
      { title: 'Orientados a resultados', desc: 'Nos medimos por su retorno' },
    ],
  },

  demo: {
    heading: 'Menos explicar. Más mostrar.',
    sub: '',
  },

  showcase: {
    heading: 'Casos reales',
    caseTitle: 'Productos sostenibles para el suelo · Biocarbón',
    caseBody:
      'Para Carbon4Future construimos toda la presencia digital: sitio web y tienda Shopify para sus productos de biocarbón que fijan CO₂, además de un sistema comercial formado por LeadGen y LeadTracker. Con él ayudamos a investigar, enriquecer y contactar clientes potenciales dentro de una campaña de 40.000 leads.',
    visitSite: 'Ver el sitio web',
  },

  process: {
    heading: 'Así empezamos juntos',
    steps: [
      {
        title: 'Conocernos y analizar',
        desc: 'En una primera reunión analizamos sus procesos, identificamos las mayores palancas y entendemos su objetivo — sin compromiso y de igual a igual.',
      },
      {
        title: 'Concepto y propuesta',
        desc: 'En un plazo de 48 horas reciben un concepto a medida con propuestas concretas y costes transparentes — sin partidas ocultas.',
      },
      {
        title: 'Desarrollo y puesta en marcha',
        desc: 'Desarrollamos, probamos e implementamos. Los primeros flujos automatizados suelen estar en marcha en 1–2 semanas.',
      },
    ],
  },

  stats: {
    heading: 'Nuestro compromiso',
    weeksUnit: 'semanas',
    labels: [
      'Hasta la primera propuesta',
      'Hasta la primera solución en marcha',
      'Disponibilidad de su IA',
      'Pasos manuales tras automatizar',
    ],
  },

  faq: {
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Para qué sectores funciona esto?',
        a: 'La automatización de procesos funciona con independencia del sector — allí donde las tareas se repiten, los sistemas no están conectados o la comunicación se hace a mano. Hemos implantado soluciones para empresas de servicios, comercio, oficios y compañías B2B.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Cada proyecto es distinto: el alcance, la complejidad y el soporte continuo influyen en el precio. Lo que sí podemos decir: un proceso automatizado suele amortizarse en pocas semanas. En la primera consulta gratuita les damos cifras concretas, sin sorpresas después.',
      },
      {
        q: '¿Cuánto tarda la implantación?',
        a: 'Los primeros resultados suelen verse en 1–2 semanas. Los sistemas más complejos con varias integraciones llevan más tiempo — lo detallamos de forma transparente en el concepto.',
      },
      {
        q: '¿Necesitamos conocimientos técnicos?',
        a: 'No. Ustedes describen su proceso y nosotros nos ocupamos de todo lo técnico. Al entregar reciben documentación comprensible y una sesión de introducción.',
      },
      {
        q: '¿Cumple con el RGPD?',
        a: 'Sí. Somos una empresa alemana y desarrollamos todas las soluciones conforme al RGPD. El almacenamiento, el tratamiento y los accesos a los datos quedan documentados de forma transparente.',
      },
      {
        q: '¿Qué pasa después de la puesta en marcha?',
        a: 'Acompañamos el lanzamiento, resolvemos los problemas iniciales y quedamos disponibles para ajustes. Si lo desean, ofrecemos soporte continuo y evolución del sistema.',
      },
      {
        q: '¿Y si no quedo satisfecho con el resultado?',
        a: 'Trabajamos por resultados, no por horas ni por proyecto cerrado. Si algo no encaja, lo ajustamos. Lo dejamos por contrato antes de empezar.',
      },
    ],
  },

  contact: {
    heading: 'Muéstrennos un proceso que les cueste tiempo cada día.',
    body:
      'En 30 minutos analizamos juntos qué se puede automatizar — concreto, gratuito y sin discurso de venta.',
    noRisk:
      'Sin riesgo: la primera consulta es gratuita y totalmente sin compromiso.',
    bookTitle: 'Agendar una cita',
    bookBody: '30 min, gratis y sin compromiso',
    bookCta: 'Reservar cita ahora',
    notSureTitle: '¿Todavía no lo tienen claro?',
    notSureBody:
      'Cuéntennos brevemente qué les preocupa y vemos juntos si podemos ayudar y cómo.',
    bullets: [
      'Respuesta en 24 horas',
      'Sin discurso de venta ni presión',
      'No tienen que preparar nada',
    ],
    writeCta: 'Escribir un mensaje',
    chatbotHint:
      '¿Necesitan una respuesta rápida? Nuestro chatbot con IA está abajo a la derecha.',
  },

  form: {
    title: 'Escríbannos',
    intro: 'Cuéntennos brevemente de qué se trata — respondemos en 24 horas.',
    name: 'Nombre',
    namePlaceholder: 'Nombre y apellidos',
    email: 'Correo electrónico',
    emailPlaceholder: 'nombre@empresa.com',
    company: 'Empresa',
    companyPlaceholder: 'Nombre de la empresa y sector',
    services: '¿Sobre qué tema?',
    servicesHint: 'Puede elegir varias opciones',
    serviceOptions: [
      'Sitio web y tienda online',
      'LeadGen y LeadTracker',
      'ZeitWerk (control horario)',
      'Automatización a medida',
      'Aún no lo tengo claro',
    ],
    timeframe: '¿Cuándo les viene bien hablar?',
    timeframeOptions: ['Esta semana', 'La semana que viene', 'Flexible'],
    message: 'Mensaje',
    messagePlaceholder: '¿Qué proceso les cuesta ahora mismo más tiempo?',
    privacyNotice:
      'Al enviar, aceptan que tratemos sus datos para gestionar su solicitud. Más información en nuestra',
    privacyLink: 'política de privacidad',
    submit: 'Enviar solicitud',
    submitting: 'Enviando …',
    successTitle: '¡Gracias, lo hemos recibido!',
    successBody:
      'Hemos recibido su solicitud y les responderemos en un plazo de 24 horas.',
    errorTitle: 'No ha funcionado',
    errorBody:
      'Vuelvan a intentarlo en un momento — o escríbannos directamente a webmaster@clavion.pro.',
    required: 'Este campo es obligatorio',
    invalidEmail: 'Introduzca una dirección de correo válida',
    close: 'Cerrar',
  },

  legal: {
    germanBindingNotice:
      'Esta página solo está disponible en alemán. Como empresa alemana, nuestro aviso legal y nuestra política de privacidad son jurídicamente vinculantes en alemán y una traducción podría ser inexacta en puntos importantes. Si algo no queda claro, escríbannos y se lo explicamos en español.',
    backHome: 'Ir al inicio',
  },

  footer: {
    tagline:
      'Automatización con IA para pequeñas y medianas empresas. Hacemos la tecnología utilizable, sin palabrería.',
    navHeading: 'Navegación',
    legalHeading: 'Legal',
    imprint: 'Aviso legal',
    privacy: 'Privacidad',
    blog: 'Blog',
    rights: 'Todos los derechos reservados.',
    badges: 'Conforme al RGPD · Hecho en Alemania · Remote-first',
  },

  blog: {
    metaTitle: 'Blog – automatización con IA y procesos | Clavion',
    metaDescription:
      'Conocimiento práctico sobre automatización con IA, chatbots y optimización de procesos para pymes.',
    eyebrow: 'Ideas y práctica',
    home: 'Inicio',
    bookCta: 'Análisis gratuito',
    heading: 'Blog',
    sub: 'Conocimiento práctico sobre automatización con IA para pequeñas y medianas empresas.',
    readMore: 'Seguir leyendo',
    backToBlog: 'Volver al blog',
    backHome: 'Ir al inicio',
    minRead: 'min de lectura',
    germanOnlyNotice:
      'Por ahora, nuestros artículos del blog solo están disponibles en alemán.',
  },

  notFound: {
    metaTitle: '404 – Página no encontrada | Clavion',
    metaDescription: 'La página que buscan no existe.',
    title: 'Página no encontrada',
    body: 'Esta página no existe — o ya no existe.',
    cta: 'Ir al inicio',
  },

  geo: {
    heading: 'Sobre Clavion – automatización con IA para empresas alemanas',
    paragraphs: [
      'Clavion es una agencia alemana de automatización con IA con sede en Alemania, fundada por Berkay Aksoy y Marios Lysitsas. Ayudamos a pequeñas y medianas empresas (pymes), talleres y proveedores de servicios de Alemania, Austria y Suiza (DACH) a sustituir procesos de trabajo manuales por automatización asistida por IA.',
      'Nuestros servicios incluyen: automatización de procesos con n8n, Make y Zapier; integración de sistemas mediante API REST y webhooks; chatbots de IA y agentes de voz para atención al cliente 24/7 y reserva de citas; y soluciones de IA a medida con agentes LLM, RAG e IA documental.',
      'Todas las soluciones cumplen el RGPD y se operan en servidores de la UE. Los proyectos empiezan desde 2.000 EUR. Tras una primera consulta gratuita de 30 minutos, los clientes reciben una propuesta transparente en 48 horas. Los primeros resultados suelen verse en 1–2 semanas.',
      'Fundadores: Berkay Aksoy y Marios Lysitsas – ingenieros industriales especializados en tecnología de IA y optimización de procesos empresariales. Clavion trabaja orientada a resultados: el ahorro de tiempo medible y el retorno para el cliente son el objetivo principal.',
      'Palabras clave principales: automatización con IA Alemania, automatización de procesos pymes, chatbot de IA empresa alemana, automatización de flujos DACH, agente de voz Alemania, agencia de automatización n8n, agencia de IA DACH.',
    ],
  },
};
