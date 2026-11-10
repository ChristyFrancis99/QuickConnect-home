import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileStack,
  FolderKanban,
  FolderOpen,
  GraduationCap,
  Link2,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import logo from "@/assets/logo.png";

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

const problems = [
  { icon: FolderOpen, number: "01", title: "Scattered Information", copy: "Important files, conversations, and decisions are spread across different tools and locations.", tone: "gold" },
  { icon: MessageSquareText, number: "02", title: "Lost Project Context", copy: "Teams struggle to understand why decisions were made and how work reached its current state.", tone: "lavender" },
  { icon: FileStack, number: "03", title: "Unstructured Handovers", copy: "Critical information gets transferred through incomplete documents, rushed meetings, and informal conversations.", tone: "ink" },
];

const steps = [
  { number: "01", title: "Capture", copy: "Collect project documents, resources, decisions, and important information.", icon: FolderOpen },
  { number: "02", title: "Connect", copy: "Organize information into meaningful project context.", icon: Link2 },
  { number: "03", title: "Handover", copy: "Transfer structured knowledge to the incoming team member.", icon: RefreshCw },
  { number: "04", title: "Verify", copy: "Review completeness and ensure the new owner is ready to take over.", icon: CheckCircle2 },
];

const capabilities = [
  { icon: FolderKanban, title: "Project Management", detail: "Keep project work and ownership organized." },
  { icon: FileStack, title: "Knowledge Sources", detail: "Bring key resources and reference material together." },
  { icon: BrainCircuit, title: "AI Analysis", detail: "Make project information easier to understand and summarize." },
  { icon: ClipboardCheck, title: "Structured Handovers", detail: "Give every transition a clear record and next steps." },
  { icon: ShieldCheck, title: "Verification", detail: "Review what has been shared and what is still missing." },
  { icon: Activity, title: "Readiness Tracking", detail: "Make handover progress easier to follow." },
  { icon: Users, title: "Team Management", detail: "Keep people and responsibilities connected." },
  { icon: Workflow, title: "Activity Tracking", detail: "Maintain visibility into important project updates." },
];

const useCases = [
  { icon: BriefcaseBusiness, title: "Employee Offboarding", copy: "Preserve valuable knowledge when employees leave the organization.", tint: "gold" },
  { icon: RefreshCw, title: "Role Transitions", copy: "Make it easier for employees to transfer responsibilities when changing roles.", tint: "lavender" },
  { icon: Workflow, title: "Project Ownership Changes", copy: "Keep projects moving when ownership shifts between team members.", tint: "ink" },
  { icon: GraduationCap, title: "Team Onboarding", copy: "Help new team members understand existing projects, decisions, and workflows faster.", tint: "cream" },
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
      const lengths = paths.map((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return length;
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
      <section className="qc-section qc-problem" id="problem" aria-labelledby="problem-title">
        <div className="qc-container">
          <Reveal>
            <SectionHeading
              eyebrow="THE CHALLENGE"
              id="problem-title"
              title="When People Leave, Knowledge Shouldn't."
              copy="Every project carries valuable context — decisions, processes, documents, and experience. But when people move on, that knowledge often disappears with them."
              align="center"
            />
          </Reveal>
          <div className="qc-problem-grid">
            {problems.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal className="qc-grid-reveal" key={item.number}>
                  <article className="qc-problem-card">
                    <div className={`qc-icon-tile qc-tone--${item.tone}`}><Icon size={23} strokeWidth={1.7} /></div>
                    <span className="qc-card-number">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <div className="qc-card-rule" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

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

      <section className="qc-section qc-process" id="how-it-works" aria-labelledby="process-title">
        <div className="qc-container">
          <Reveal>
            <SectionHeading
              eyebrow="A CLEARER HANDOVER"
              id="process-title"
              title="A Smarter Way to Pass Knowledge Forward."
              copy="A simple, repeatable flow helps teams move from scattered information to a confident transition."
              align="center"
            />
          </Reveal>
          <div className="qc-timeline">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Reveal className="qc-step-reveal" key={step.number}>
                  <article className="qc-step">
                    <div className="qc-step__marker"><Icon size={21} strokeWidth={1.7} /></div>
                    <p className="qc-step__number">{step.number}</p>
                    <h3>{step.title}</h3>
                    <p className="qc-step__copy">{step.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="qc-section qc-platform" id="platform" aria-labelledby="platform-title">
        <div className="qc-container">
          <Reveal>
            <SectionHeading
              eyebrow="THE PLATFORM"
              id="platform-title"
              title="Everything Your Team Needs to Stay Connected."
              copy="A connected set of capability areas for organizing project knowledge, managing transitions, and keeping teams aligned."
              align="center"
            />
          </Reveal>
          <div className="qc-platform-layout">
            <Reveal className="qc-platform-intro">
              <div className="qc-platform-note">
                <span className="qc-platform-note__icon"><Sparkles size={18} /></span>
                <p>One connected workflow</p>
              </div>
              <h3>Keep the important details within reach.</h3>
              <p>From the first project resource to the final readiness check, QuickConnect is designed to keep context visible as responsibilities move between people.</p>
              <a className="qc-text-link" href="#how-it-works">Explore the workflow <ArrowUpRight size={16} /></a>
            </Reveal>
            <div className="qc-capability-grid">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal className="qc-capability-reveal" key={item.title}>
                    <article className="qc-capability">
                      <div className="qc-capability__icon"><Icon size={19} strokeWidth={1.8} /></div>
                      <div><span className="qc-capability__index">0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <p className="qc-platform-footnote">Capability overview — AI analysis and workflow tools are presented as product areas, not as a claim of live integrations on this landing page.</p>
        </div>
      </section>

      <section className="qc-section qc-use-cases" id="use-cases" aria-labelledby="use-cases-title">
        <div className="qc-container">
          <Reveal>
            <SectionHeading
              eyebrow="WHERE CONTEXT MATTERS"
              id="use-cases-title"
              title="Knowledge Continuity Across Every Transition."
              copy="Keep work moving through the moments when people, roles, and responsibilities change."
              align="center"
            />
          </Reveal>
          <div className="qc-use-grid">
            {useCases.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="qc-grid-reveal" key={item.title}>
                  <article className="qc-use-card">
                    <div className={`qc-use-card__art qc-tone--${item.tint}`}>
                      <Icon size={31} strokeWidth={1.45} />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="qc-use-card__body"><h3>{item.title}</h3><p>{item.copy}</p></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

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
