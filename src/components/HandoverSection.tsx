import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeftRight,
  FileText,
  Network,
  ShieldCheck,
} from "lucide-react";

const handoverSteps = [
  {
    title: "Capture",
    description:
      "Collect project documents, resources, decisions, and important information.",
    icon: FileText,
  },
  {
    title: "Connect",
    description:
      "Organize information into meaningful project context.",
    icon: Network,
  },
  {
    title: "Handover",
    description:
      "Transfer structured knowledge to the incoming team member.",
    icon: ArrowLeftRight,
  },
  {
    title: "Verify",
    description:
      "Review completeness and ensure the new owner is ready to take over.",
    icon: ShieldCheck,
  },
];

function HandoverStep({
  step,
  index,
  progress,
  reducedMotion,
}: {
  step: (typeof handoverSteps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const segmentStart = index / handoverSteps.length;
  const segmentMiddle = (index + 0.5) / handoverSteps.length;
  const segmentEnd = (index + 1) / handoverSteps.length;

  const opacity = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    index === 0 ? [1, 1, 0.85] : [0.85, 1, 0.85],
  );
  const y = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    index === 0 ? [0, 0, 0] : [12, 0, 0],
  );
  const scale = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    index === 0 ? [1, 1, 1] : [0.98, 1, 1],
  );
  const nodeScale = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    [0.92, 1.08, 1],
  );
  const Icon = step.icon;

  return (
    <motion.li
      className="qc-handover__step"
      style={
        reducedMotion
          ? undefined
          : {
              opacity,
              y,
              scale,
            }
      }
    >
      <motion.span
        className="qc-handover__node"
        aria-hidden="true"
        style={
          reducedMotion
            ? {
                backgroundColor: "var(--qc-handover-gold)",
                borderColor: "var(--qc-handover-gold)",
                color: "#FFFFFF",
                boxShadow: "0 0 0 6px rgba(198,154,77,0.2)",
              }
            : {
                backgroundColor: nodeBackground,
                borderColor: nodeBorder,
                color: nodeColor,
                boxShadow: nodeShadow,
              }
        }
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
      </motion.span>

      <motion.div
        className="qc-handover__step-card"
      >
        <div className="qc-handover__step-heading">
          <span className="qc-handover__icon-badge">
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h3>{step.title}</h3>
        </div>
        <p>{step.description}</p>
      </motion.div>
    </motion.li>
  );
}

export default function HandoverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const progressScale = useTransform(
    scrollYProgress,
    (value) => Math.max(0, Math.min(1, value)),
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="qc-handover"
      aria-labelledby="qc-handover-title"
    >
      <div className="qc-handover__layout">
        <header className="qc-handover__intro">
          <p className="qc-handover__eyebrow">
            <span className="qc-handover__eyebrow-dot" aria-hidden="true" />
            A CLEARER HANDOVER
          </p>
          <h2 id="qc-handover-title">
            A Smarter Way to Pass Knowledge Forward.
          </h2>
          <p className="qc-handover__subtext">
            A simple, repeatable flow helps teams move from scattered
            information to a confident transition.
          </p>
          <figure className="qc-handover__visual">
            <img
              src="https://images.pexels.com/photos/7643742/pexels-photo-7643742.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Colleagues reviewing project information together on a laptop"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>BETTER CONTEXT. STRONGER TEAMS.</span>
              <a
                href="https://www.pexels.com/photo/a-team-looking-at-a-laptop-and-collaborating-7643742/"
                target="_blank"
                rel="noreferrer"
                aria-label="View photo source on Pexels"
              >
                Photo: MART PRODUCTION / Pexels
              </a>
            </figcaption>
          </figure>
        </header>

        <div className="qc-handover__timeline">
          <div className="qc-handover__track" aria-hidden="true">
            <div className="qc-handover__track-base" />
            <motion.div
              className="qc-handover__track-progress"
              style={
                reducedMotion
                  ? { scaleY: 1 }
                  : { scaleY: progressScale }
              }
            />
          </div>

          <ol className="qc-handover__steps" aria-label="Handover steps">
            {handoverSteps.map((step, index) => (
              <HandoverStep
                key={step.title}
                step={step}
                index={index}
                progress={scrollYProgress}
                reducedMotion={Boolean(reducedMotion)}
              />
            ))}
          </ol>

        </div>
      </div>

      <style>{`
        .qc-handover {
          --qc-handover-gold: #C69A4D;
          --qc-handover-lavender: #7785C5;
          --qc-handover-cream: #F4E9D5;
          --qc-handover-off-white: #F5F4F0;
          --qc-handover-charcoal: #252525;
          position: relative;
          width: 100%;
          padding: clamp(80px, 10vw, 140px) clamp(20px, 5vw, 72px);
          color: var(--qc-handover-charcoal);
          font-family: "Plus Jakarta Sans", sans-serif;
          background: transparent;
          isolation: isolate;
        }

        .qc-handover *,
        .qc-handover *::before,
        .qc-handover *::after {
          box-sizing: border-box;
        }

        .qc-handover__layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(48px, 9vw, 140px);
          width: min(100%, 1180px);
          margin: 0 auto;
          align-items: start;
        }

        .qc-handover__intro {
          position: sticky;
          top: clamp(112px, 14svh, 180px);
          padding-top: 0;
        }

        .qc-handover__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 18px;
          color: #8F6B28;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .16em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .qc-handover__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--qc-handover-gold);
        }

        .qc-handover__intro h2 {
          max-width: 560px;
          margin: 0;
          color: var(--qc-handover-charcoal);
          font-size: clamp(34px, 4.2vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.045em;
        }

        .qc-handover__subtext {
          max-width: 440px;
          margin: 20px 0 0;
          color: rgba(37,37,37,.74);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.75;
        }

        .qc-handover__visual {
          position: relative;
          width: min(100%, 470px);
          height: clamp(190px, 22vw, 250px);
          margin: 30px 0 0;
          overflow: hidden;
          border: 5px solid rgba(255, 255, 255, .78);
          border-radius: 22px;
          background: var(--qc-handover-cream);
          box-shadow: 0 18px 42px rgba(37, 37, 37, .10), 0 3px 12px rgba(198, 154, 77, .10);
        }

        .qc-handover__visual::after {
          content: "";
          position: absolute;
          inset: 18% 0 0;
          background: linear-gradient(180deg, transparent 0%, rgba(28, 27, 25, .82) 100%);
          pointer-events: none;
        }

        .qc-handover__visual img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 46%;
          filter: saturate(.78) contrast(1.02);
          transition: transform .65s cubic-bezier(.2, .7, .2, 1);
        }

        .qc-handover__visual:hover img {
          transform: scale(1.035);
        }

        .qc-handover__visual figcaption {
          position: absolute;
          z-index: 1;
          right: 16px;
          bottom: 14px;
          left: 16px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          color: #fff;
        }

        .qc-handover__visual figcaption span {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
          line-height: 1.4;
        }

        .qc-handover__visual figcaption a {
          color: rgba(255, 255, 255, .86);
          font-size: 9px;
          line-height: 1.4;
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
        }

        .qc-handover__timeline {
          position: relative;
          min-width: 0;
        }

        .qc-handover__track {
          position: absolute;
          top: 24svh;
          bottom: 24svh;
          left: 17px;
          width: 2px;
          overflow: visible;
          background: transparent;
          pointer-events: none;
        }

        .qc-handover__track-base,
        .qc-handover__track-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          border-radius: 99px;
          transform-origin: top;
        }

        .qc-handover__track-base {
          height: 100%;
          background: rgba(37,37,37,.12);
        }

        .qc-handover__track-progress {
          height: 100%;
          background: var(--qc-handover-gold);
          transform-origin: top;
        }

        .qc-handover__steps {
          position: relative;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .qc-handover__step {
          position: relative;
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr);
          align-items: start;
          gap: 24px;
          min-height: 48svh;
          padding: calc(24svh - 18px) 0 0;
          transform-origin: left center;
        }

        .qc-handover__step:last-child {
          min-height: 48svh;
        }

        .qc-handover__node {
          position: relative;
          z-index: var(--qc-z-content);
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1.5px solid rgba(37,37,37,.25);
          border-radius: 50%;
          background: #F5F4F0;
          color: #59554E;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
        }

        .qc-handover__step-card {
          position: relative;
          min-width: 0;
          padding: 24px 26px;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1.5px solid rgba(37,37,37,.08);
          box-shadow: 0 4px 18px rgba(37,37,37,.04);
        }

        .qc-handover__icon-badge {
          display: grid;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          place-items: center;
          border-radius: 10px;
          background: rgba(198, 154, 77, 0.12);
          color: var(--qc-handover-gold);
        }

        .qc-handover__step-heading {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .qc-handover__step-heading h3 {
          margin: 0;
          color: inherit;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -.03em;
        }

        .qc-handover__step-card p {
          max-width: 440px;
          margin: 12px 0 0;
          color: inherit;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.7;
          opacity: 1;
        }

        .qc-handover__sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          clip-path: inset(50%);
        }

        @media (max-width: 768px) {
          .qc-handover {
            padding: 76px 22px;
          }

          .qc-handover__layout {
            display: block;
          }

          .qc-handover__intro {
            position: sticky;
            top: calc(var(--qc-nav-height) + 8px);
            z-index: var(--qc-z-sticky);
            padding: 8px 0 0;
            margin-bottom: 24px;
            background: #F5F4F0;
          }

          .qc-handover__intro h2 {
            max-width: 600px;
            font-size: clamp(34px, 9vw, 44px);
          }

          .qc-handover__subtext {
            max-width: calc(100% - 124px);
            margin-top: 14px;
            font-size: 14px;
            line-height: 1.6;
          }

          .qc-handover__visual {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 116px;
            height: 92px;
            margin: 0;
            border-width: 3px;
            border-radius: 14px;
          }

          .qc-handover__visual figcaption {
            right: 5px;
            bottom: 5px;
            left: 5px;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .qc-handover__visual figcaption span {
            font-size: 7px;
            letter-spacing: .08em;
          }

          .qc-handover__visual figcaption a {
            font-size: 8px;
            white-space: normal;
          }

          .qc-handover__track {
            top: 24px;
            bottom: 24px;
            left: 15px;
          }

          .qc-handover__steps {
            gap: 0;
          }

          .qc-handover__step,
          .qc-handover__step:last-child {
            min-height: 0;
            padding: 0 0 68px;
            gap: 20px;
          }

          .qc-handover__step:last-child {
            padding-bottom: 0;
          }

          .qc-handover__step-heading h3 {
            font-size: 21px;
          }

          .qc-handover__step-card p {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .qc-handover__intro {
            position: relative;
            top: auto;
            padding-top: 0;
          }

          .qc-handover__step,
          .qc-handover__node,
          .qc-handover__track-progress {
            transition: none !important;
            animation: none !important;
          }

          .qc-handover__step {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
