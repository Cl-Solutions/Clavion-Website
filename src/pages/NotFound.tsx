import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../i18n';

export function NotFound() {
  const { t } = useLang();

  usePageMeta({
    title: t.notFound.metaTitle,
    description: t.notFound.metaDescription,
    canonical: 'https://clavion.pro/',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="font-inter text-[#00E5FF] text-sm font-medium uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="font-syne font-bold text-4xl sm:text-5xl text-white mb-4">
        {t.notFound.title}
      </h1>
      <p className="font-inter text-gray-400 text-lg mb-10 max-w-md">
        {t.notFound.body}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#00E5FF] text-[#0a0a0a] font-inter font-medium text-sm rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
      >
        {t.notFound.cta}
      </Link>
    </div>
  );
}
