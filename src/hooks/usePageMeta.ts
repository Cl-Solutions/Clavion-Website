import { useEffect } from 'react';

interface PageMetaConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

const DEFAULT_META = {
  title: 'KI-Automatisierung für deutsche Unternehmen | CL-Solutions',
  description: 'Wir automatisieren Prozesse, verbinden Systeme und bauen KI-Agenten für KMU in Deutschland. DSGVO-konform. Angebot in 48h.',
  canonical: 'https://cl-solutions.pro/',
};

function getOrCreateMeta(selector: string, attr: string, value: string): void {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const [attrName, attrValue] = attr.split('=').map(s => s.replace(/"/g, ''));
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function getOrCreateLink(rel: string, href: string): void {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export function usePageMeta(config: PageMetaConfig) {
  useEffect(() => {
    const { title, description, canonical, ogTitle, ogDescription, ogUrl } = config;

    document.title = title;
    getOrCreateMeta('meta[name="description"]', 'name="description"', description);
    getOrCreateLink('canonical', canonical);
    getOrCreateMeta('meta[property="og:title"]', 'property="og:title"', ogTitle ?? title);
    getOrCreateMeta('meta[property="og:description"]', 'property="og:description"', ogDescription ?? description);
    getOrCreateMeta('meta[property="og:url"]', 'property="og:url"', ogUrl ?? canonical);

    return () => {
      document.title = DEFAULT_META.title;
      getOrCreateMeta('meta[name="description"]', 'name="description"', DEFAULT_META.description);
      getOrCreateLink('canonical', DEFAULT_META.canonical);
      getOrCreateMeta('meta[property="og:title"]', 'property="og:title"', DEFAULT_META.title);
      getOrCreateMeta('meta[property="og:description"]', 'property="og:description"', DEFAULT_META.description);
      getOrCreateMeta('meta[property="og:url"]', 'property="og:url"', DEFAULT_META.canonical);
    };
  }, [config.title, config.description, config.canonical, config.ogTitle, config.ogDescription, config.ogUrl]); // eslint-disable-line react-hooks/exhaustive-deps
}
