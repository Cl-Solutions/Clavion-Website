import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFound() {
  usePageMeta({
    title: '404 – Seite nicht gefunden | Clavion',
    description: 'Die gesuchte Seite existiert nicht.',
    canonical: 'https://clavion.pro/',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="font-inter text-[#00E5FF] text-sm font-medium uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="font-syne font-bold text-4xl sm:text-5xl text-white mb-4">
        Seite nicht gefunden
      </h1>
      <p className="font-inter text-gray-400 text-lg mb-10 max-w-md">
        Die gesuchte Seite existiert leider nicht. Vielleicht hilft dir die Startseite weiter.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#00E5FF] text-[#0a0a0a] font-inter font-medium text-sm rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
