import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Layers3 } from "lucide-react";
import { GlobeGallery } from "@/game/globe/GlobeGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickFlow — Knowledge that moves with you" },
      { name: "description", content: "Capture scattered information, connect project context and make every handover seamless with QuickFlow." },
      { property: "og:title", content: "QuickFlow — Knowledge that moves with you" },
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
  return (
    <>
      <main className="hero-scroll-stage">
        <section className="hero-sticky" aria-labelledby="hero-title">
          <header className="hero-header">
            <a className="brand-lockup" href="#top" aria-label="QuickFlow home">
              <span className="brand-mark"><Layers3 size={17} strokeWidth={2.3} /></span>
              <span className="brand-name">quickflow</span>
            </a>
            <span className="header-note"><span className="header-note__dot" /> KNOWLEDGE, CONNECTED</span>
          </header>
          <div className="hero-main" id="top">
            <div className="hero-copy">
              <p className="hero-eyebrow">THE KNOWLEDGE HANDOVER PLATFORM</p>
              <h1 className="hero-title" id="hero-title">
                <span className="hero-title__line">Don't Let Valuable</span>
                <span className="hero-title__accent">Knowledge Walk Away.</span>
              </h1>
              <p className="hero-description">
                When people leave, projects shouldn't lose their knowledge. QuickFlow captures scattered information, connects project context and makes every handover seamless.
              </p>
              <div className="hero-actions">
                <a className="hero-button hero-button--primary" href="#overview">
                  Explore QuickFlow <ArrowRight size={15} strokeWidth={2.2} />
                </a>
                <a className="hero-button hero-button--secondary" href="#overview">
                  See How It Works <ArrowDown size={14} strokeWidth={2} />
                </a>
              </div>
              <p className="hero-support"><span className="hero-support__line" />One workspace. Complete context. Seamless transitions.</p>
            </div>
            <div className="hero-visual">
              <GlobeGallery />
            </div>
          </div>
          <footer className="hero-footer">
            <span>BUILT FOR THE MOMENTS BETWEEN</span>
            <span className="scroll-hint"><span className="scroll-hint__mouse"><span className="scroll-hint__wheel" /></span> SCROLL TO EXPLORE</span>
          </footer>
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
