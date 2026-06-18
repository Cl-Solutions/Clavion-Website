import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export function Impressum() {
  usePageMeta({
    title: 'Impressum | Clavion',
    description: 'Impressum der Clavion GbR, Mühlacker – Angaben gemäß § 5 TMG.',
    canonical: 'https://clavion.pro/impressum',
  });

  return (
    <div className="min-h-screen bg-dark">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/90 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Clavion" className="h-16 w-auto" height={64} />
              <span className="font-syne font-bold text-lg text-white">Clavion</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-12">
            Impressum
          </h1>

          <div className="space-y-8 font-inter text-gray-400 leading-relaxed">
            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Clavion GbR<br />
                75417 Mühlacker<br />
                Baden-Württemberg, Deutschland
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                Vertreten durch
              </h2>
              <p>
                Berkay Aksoy & Marios Lysitsas
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                Kontakt
              </h2>
              <p>
                E-Mail: info@clavion.pro<br />
                WhatsApp: <a href="https://wa.me/491743067948" className="text-accent hover:text-accent/80 transition-colors">+49 174 3067948</a>
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                Haftungshinweis
              </h2>
              <p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für
                die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
                ausschließlich deren Betreiber verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
