import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n';

const Home        = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Impressum   = lazy(() => import('./pages/Impressum').then(m => ({ default: m.Impressum })));
const Datenschutz = lazy(() => import('./pages/Datenschutz').then(m => ({ default: m.Datenschutz })));
const Blog        = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost    = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const NotFound    = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

/**
 * Reset the scroll position on navigation.
 *
 * React Router keeps the window's scroll offset across route changes, so
 * clicking "Blog" halfway down the home page used to land the reader halfway
 * down the blog. A hash is left alone — Home scrolls to it on purpose.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: '#0a0a0a' }} />
);

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00E5FF' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#999', maxWidth: '600px', wordBreak: 'break-word' }}>
            {this.state.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              background: '#00E5FF',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/"            element={<Home />} />
                <Route path="/impressum"   element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/blog"        element={<Blog />} />
                <Route path="/blog/:slug"  element={<BlogPost />} />
                <Route path="*"            element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
