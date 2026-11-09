import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { GlobeGallery } from "@/game/globe/GlobeGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickConnect — Knowledge that moves with you" },
      { name: "description", content: "Capture scattered information, connect project context and make every handover seamless with QuickConnect." },
      { property: "og:title", content: "QuickConnect — Knowledge that moves with you" },
      { property: "og:description", content: "One workspace. Complete context. Seamless transitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&display=swap" },
    ],
  }),
  ssr: false,
  component: Index,
});

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <main className="hero-scroll-stage">
        <section className="hero-sticky" aria-labelledby="hero-title">
          <header className={`hero-header${isScrolled ? " is-scrolled" : ""}`}>
            <a className="brand-lockup" href="#top" aria-label="QuickConnect home" onClick={closeMenu}>
              <span className="brand-mark"><Layers3 size={17} strokeWidth={2.3} /></span>
              <span className="brand-name">QuickConnect</span>
            </a>

            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#top">Platform</a>
              <a href="#overview">How It Works</a>
              <a href="#overview">Use Cases</a>
              <a href="#overview">About</a>
            </nav>

            <div className="header-actions">
              <a className="header-login" href="#overview">Log In</a>
              <a className="header-cta" href="#overview">Get Started <ArrowRight size={14} /></a>
            </div>

            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>

            {isMenuOpen && (
              <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
                <a href="#top" onClick={closeMenu}>Platform</a>
                <a href="#overview" onClick={closeMenu}>How It Works</a>
                <a href="#overview" onClick={closeMenu}>Use Cases</a>
                <a href="#overview" onClick={closeMenu}>About</a>
                <div className="mobile-nav__actions">
                  <a href="#overview" onClick={closeMenu}>Log In</a>
                  <a className="header-cta" href="#overview" onClick={closeMenu}>Get Started <ArrowRight size={14} /></a>
                </div>
              </nav>
            )}
          </header>
          <div className="hero-main" id="top">
            <div className="hero-copy">
              <p className="hero-eyebrow">THE KNOWLEDGE HANDOVER PLATFORM</p>
              <h1 className="hero-title" id="hero-title">
                <span className="hero-title__line">Don't Let Valuable</span>
                <span className="hero-title__accent">Knowledge Walk Away.</span>
              </h1>
              <p className="hero-description">
                When people leave, projects shouldn't lose their knowledge. QuickConnect captures scattered information, connects project context and makes every handover seamless.
              </p>
              <div className="hero-actions">
                <a className="hero-button hero-button--primary" href="#overview">
                  Explore QuickConnect <ArrowRight size={15} strokeWidth={2.2} />
                </a>
                <a className="hero-button hero-button--secondary" href="#overview">
                  See How It Works <ArrowDown size={14} strokeWidth={2} />
                </a>
              </div>
              <p className="hero-support"><span className="hero-support__line" />One workspace. Complete context. Seamless transitions.</p>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="false">
            <GlobeGallery />
          </div>
        </section>
      </main>
      <section className="overview-section" id="overview" aria-labelledby="overview-title">
        <div className="overview-inner">
          <p className="overview-eyebrow">THE WORK CONTINUES</p>
          <h2 className="overview-title" id="overview-title">Knowledge shouldn't start over <span>when people move on.</span></h2>
          <p className="overview-copy">Keep the decisions, discoveries and project context that help your team move forward—connected, clear and ready for whoever comes next.</p>
        </div>
      </section>
    </>
  );
}
