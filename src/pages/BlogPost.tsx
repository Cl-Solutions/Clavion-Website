import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getPostBySlug, formatDate } from '../data/blogPosts';
import { CustomCursor } from '../components/CustomCursor';
import { usePageMeta } from '../hooks/usePageMeta';

function BlogPostMeta({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  usePageMeta({
    title: `${post.title} | Clavion`,
    description: post.excerpt,
    canonical: `https://clavion.pro/blog/${post.slug}`,
  });

  // Inject BlogPosting JSON-LD structured data (rich results + AI citation)
  useEffect(() => {
    const url = `https://clavion.pro/blog/${post.slug}`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'de-DE',
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: post.category,
      image: 'https://clavion.pro/og-image.png',
      author: { '@type': 'Organization', name: 'Clavion', url: 'https://clavion.pro' },
      publisher: {
        '@type': 'Organization',
        name: 'Clavion',
        logo: { '@type': 'ImageObject', url: 'https://clavion.pro/logo.png' },
      },
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'blogposting-jsonld';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => {
      document.getElementById('blogposting-jsonld')?.remove();
    };
  }, [post.slug, post.title, post.excerpt, post.date, post.category]);

  return null;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <BlogPostMeta post={post} />
      <CustomCursor />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] border-b border-[rgba(0,229,255,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Clavion" className="h-16 w-auto" height={64} />
            <span className="font-syne font-bold text-lg text-white">Clavion</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-item font-inter text-sm text-gray-400 hover:text-white transition-colors duration-150">
              Startseite
            </Link>
            <Link to="/blog" className="nav-item font-inter text-sm text-[#00E5FF] transition-colors duration-150">
              Blog
            </Link>
            <a
              href="https://cal.eu/clavion/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#00E5FF] text-[#0a0a0a] font-inter font-medium text-sm rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
            >
              Erstgespräch buchen
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile back button — fixed below navbar, only on small screens */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-40 px-4 py-2 bg-[rgba(10,10,10,0.85)] backdrop-blur-sm">
        <Link
          to="/blog"
          aria-label="Zurück zum Blog"
          className="inline-flex items-center gap-1.5 font-inter text-sm text-[#00E5FF]"
        >
          <span aria-hidden="true">←</span>
          <span>Zurück</span>
        </Link>
      </div>

      {/* Article */}
      <div className="pt-32 md:pt-32 pb-24 px-6" style={{ paddingTop: 'clamp(112px, 16vh, 128px)' }}>
        <div className="max-w-[720px] mx-auto">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-inter text-sm text-gray-500 hover:text-[#00E5FF] transition-colors duration-150 mb-10"
          >
            <span>←</span>
            <span>Zurück zum Blog</span>
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-inter text-xs font-medium text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="font-inter text-xs text-gray-500">
              {formatDate(post.date)}
            </span>
            <span className="font-inter text-xs text-gray-600">·</span>
            <span className="font-inter text-xs text-gray-500">
              {post.readingTime} Lesezeit
            </span>
          </div>

          {/* Title */}
          <h1 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="h-px bg-white/10 mb-10" />

          {/* Content */}
          <div
            className="prose-blog font-inter"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-sm">
            © {new Date().getFullYear()} Clavion. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="font-inter text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="font-inter text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
