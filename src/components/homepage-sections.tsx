import { useEffect, useRef, type ReactNode } from "react";
import ContinuitySection from "@/components/ContinuitySection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  FolderKanban,
  FolderOpen,
  Link2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import PlatformSection from "@/components/PlatformSection";
import HandoverSection from "@/components/HandoverSection";
import ProblemSection from "@/components/ProblemSection";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -35px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`qc-reveal ${className}`}>{children}</div>;
}

const steps = [
  { number: "01", title: "Capture", copy: "Collect project documents, resources, decisions, and important information.", icon: FolderOpen },
  { number: "02", title: "Connect", copy: "Organize information into meaningful project context.", icon: Link2 },
  { number: "03", title: "Handover", copy: "Transfer structured knowledge to the incoming team member.", icon: RefreshCw },
  { number: "04", title: "Verify", copy: "Review completeness and ensure the new owner is ready to take over.", icon: CheckCircle2 },
];

const solutionNotes = [
  { number: "01", title: "Centralized Knowledge", copy: "Bring project information, documents, decisions, and resources into one organized space.", icon: FolderKanban, pin: "coral", paper: "peach", side: "left" },
  { number: "02", title: "AI-Powered Analysis", copy: "Support teams in understanding, summarizing, and organizing project knowledge with AI-assisted analysis.", icon: BrainCircuit, pin: "blue", paper: "blue", side: "right" },
  { number: "03", title: "Structured Handovers", copy: "Create clear handover records that help incoming team members understand responsibilities and context.", icon: ClipboardCheck, pin: "violet", paper: "violet", side: "left" },
  { number: "04", title: "Verification & Readiness", copy: "Track handover progress and identify missing information before responsibilities are transferred.", icon: ShieldCheck, pin: "coral", paper: "peach", side: "right" },
];

function SolutionStory() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLArticleElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLArticleElement[];
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!stage || cards.length !== 4 || paths.length !== 3) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 759px)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.set(card, { autoAlpha: 0, y: 30, scale: 0.88, rotation: index % 2 === 0 ? -4 : 4, transformOrigin: "50% 50%" });
      });
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: stage,
          start: "top 14%",
          end: "+=2500",
          pin: stage,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(cards[0], { autoAlpha: 1, y: 0, scale: 1, rotation: -2, duration: 0.65 });
      timeline.to(paths[0], { strokeDashoffset: 0, duration: 0.75, ease: "none" }, ">-0.08");
      timeline.to(cards[1], { autoAlpha: 1, y: 0, scale: 1, rotation: 2, duration: 0.65 });
      timeline.to(paths[1], { strokeDashoffset: 0, duration: 0.75, ease: "none" }, ">-0.08");
      timeline.to(cards[2], { autoAlpha: 1, y: 0, scale: 1, rotation: -2, duration: 0.65 });
      timeline.to(paths[2], { strokeDashoffset: 0, duration: 0.75, ease: "none" }, ">-0.08");
      timeline.to(cards[3], { autoAlpha: 1, y: 0, scale: 1, rotation: 2, duration: 0.65 });
      timeline.to({}, { duration: 0.35 });
      ScrollTrigger.refresh();
    }, stage);

    return () => context.revert();
  }, []);

  return (
    <div className="qc-solution-stage" ref={stageRef}>
      <svg className="qc-solution-paths" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path ref={(node) => { pathRefs.current[0] = node; }} d="M 350 112 C 455 62, 548 158, 650 205" />
        <path ref={(node) => { pathRefs.current[1] = node; }} d="M 650 292 C 555 365, 450 355, 350 418" />
        <path ref={(node) => { pathRefs.current[2] = node; }} d="M 350 482 C 455 540, 548 520, 650 465" />
      </svg>
      {solutionNotes.map((note, index) => {
        const Icon = note.icon;
        return (
          <article
            className={`qc-pin-note qc-pin-note--${note.side} qc-pin-note--${index + 1}`}
            key={note.number}
            ref={(node) => { cardRefs.current[index] = node; }}
          >
            <span className={`qc-pin qc-pin--${note.pin}`} aria-hidden="true"><i /></span>
            <div className={`qc-pin-note__paper qc-pin-note__paper--${note.paper}`}>
              <div className="qc-pin-note__meta"><span>{note.number}</span><Icon size={19} strokeWidth={1.7} /></div>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
            </div>
          </article>
        );
      })}
      <div className="qc-story-caption" aria-hidden="true">
        <span className="qc-story-caption__dot" />
        <span>Knowledge, connected.</span>
      </div>
    </div>
  );
}


function SectionHeading({ eyebrow, title, copy, align = "left", id }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center"; id?: string }) {
  return (
    <div className={`qc-section-heading qc-section-heading--${align}`}>
      <p className="qc-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {copy && <p className="qc-section-copy">{copy}</p>}
    </div>
  );
}

export function HomepageSections() {
  return (
    <>
      <ProblemSection />

      <section className="qc-section qc-solution" id="solution" aria-labelledby="solution-title">
        <div className="qc-container">
          <Reveal>
            <SectionHeading
              eyebrow="THE QUICKCONNECT APPROACH"
              id="solution-title"
              title="Turn Knowledge Into Continuity."
              copy="QuickConnect brings scattered project knowledge together and transforms it into structured, actionable handovers."
              align="center"
            />
          </Reveal>
          <SolutionStory />
        </div>
      </section>

      <HandoverSection />

      <PlatformSection />

      <ContinuitySection />

      <section className="qc-cta-section" id="final-cta" aria-labelledby="final-cta-title">
        <div className="qc-cta-orbit qc-cta-orbit--one" aria-hidden="true" />
        <div className="qc-cta-orbit qc-cta-orbit--two" aria-hidden="true" />
        <Reveal className="qc-cta-content">
          <p className="qc-eyebrow">KEEP KNOWLEDGE MOVING</p>
          <h2 id="final-cta-title">Don't Let Knowledge Walk Out the Door.</h2>
          <p>Keep your projects moving, your teams informed, and your knowledge connected with QuickConnect.</p>
          <div className="qc-cta-actions">
            <a className="qc-button qc-button--gold" href="#footer">Get Started <ArrowRight size={16} /></a>
            <a className="qc-button qc-button--outline" href="#platform">Explore Platform <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
      </section>

      <footer className="qc-footer" id="footer">
        <div className="qc-container">
          <div className="qc-footer-main">
            <div className="qc-footer-brand" id="about">
              <a href="#top" aria-label="QuickConnect home"><img src={logo} alt="QuickConnect" /></a>
              <p>Keep project knowledge connected, so every team can move forward with context.</p>
            </div>
            <div className="qc-footer-links">
              <div><h3>Platform</h3><a href="#platform">Overview</a><a href="#solution">Capabilities</a><a href="#problem">The Challenge</a></div>
              <div><h3>Explore</h3><a href="#how-it-works">How It Works</a><a href="#use-cases">Use Cases</a><a href="#about">About</a></div>
              <div><h3>Get Started</h3><a href="#final-cta">Log In</a><a href="#final-cta">Get Started <ArrowUpRight size={13} /></a></div>
            </div>
          </div>
          <div className="qc-footer-bottom"><span>© {new Date().getFullYear()} QuickConnect. All rights reserved.</span><span>One workspace. Complete context. Seamless transitions.</span></div>
        </div>
      </footer>
    </>
  );
}
