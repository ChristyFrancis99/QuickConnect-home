import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
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
    index === 0 ? [1, 1, 0.55] : [0.28, 1, 0.55],
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
  const fillTarget = useTransform(
    progress,
    [segmentStart, segmentMiddle],
    index === 0 ? [1, 1] : [0, 1],
  );
  const fill = useSpring(fillTarget, {
    stiffness: 180,
    damping: 24,
    mass: 0.45,
  });
  const glowTarget = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    [0, 1, 0],
  );
  const glow = useSpring(glowTarget, {
    stiffness: 180,
    damping: 24,
    mass: 0.45,
  });
  const nodeBackground = useTransform(fill, (value) =>
    value > 0.5 ? "var(--qc-handover-gold)" : "transparent",
  );
  const nodeBorder = useTransform(fill, (value) =>
    value > 0.5 ? "var(--qc-handover-gold)" : "rgba(37,37,37,0.25)",
  );
  const nodeColor = useTransform(fill, (value) =>
    value > 0.5 ? "#FFFFFF" : "#77736C",
  );
  const nodeShadow = useTransform(
    glow,
    (value) => `0 0 0 ${6 * value}px rgba(198,154,77,${0.2 * value})`,
  );
  const descriptionOpacity = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    index === 0 ? [0.7, 0.7, 0.55] : [0.28, 0.7, 0.55],
  );
  const textColor = useTransform(
    progress,
    [segmentStart, segmentMiddle, segmentEnd],
    ["#77736C", "#252525", "#252525"],
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
        className="qc-handover__step-copy"
        style={reducedMotion ? undefined : { color: textColor }}
      >
        <div className="qc-handover__step-heading">
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
          <h3>{step.title}</h3>
        </div>
        <motion.p style={reducedMotion ? undefined : { opacity: descriptionOpacity }}>{step.description}</motion.p>
      </motion.div>
    </motion.li>
  );
}

export default function HandoverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStep = Math.min(
      handoverSteps.length - 1,
      Math.max(0, Math.floor(latest * handoverSteps.length)),
    );
    setActiveStep(nextStep);
  });

  const progressHeight = useTransform(
    scrollYProgress,
    (value) => `${Math.max(0, Math.min(1, value)) * 100}%`,
  );

  return (
    <section
      ref={sectionRef}
      id="handover"
      className="qc-handover"
      aria-labelledby="qc-handover-title"
    >
      <div className="qc-handover__layout">
        <header className="qc-handover__intro">
          <p className="qc-handover__eyebrow">A CLEARER HANDOVER</p>
          <h2 id="qc-handover-title">
            A Smarter Way to Pass Knowledge Forward.
          </h2>
          <p className="qc-handover__subtext">
            A simple, repeatable flow helps teams move from scattered
            information to a confident transition.
          </p>
        </header>

        <div className="qc-handover__timeline">
          <div className="qc-handover__track" aria-hidden="true">
            <div className="qc-handover__track-base" />
            <motion.div
              className="qc-handover__track-progress"
              style={
                reducedMotion
                  ? { height: "100%" }
                  : { height: progressHeight }
              }
            />
          </div>

          <ol className="qc-handover__steps">
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

          <span className="qc-handover__sr-only" aria-live="polite">
            Step {activeStep + 1} of {handoverSteps.length}:{" "}
            {handoverSteps[activeStep].title}
          </span>
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
          top: 20vh;
          padding-top: 10vh;
        }

        .qc-handover__eyebrow {
          margin: 0 0 22px;
          color: var(--qc-handover-gold);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .16em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .qc-handover__intro h2 {
          max-width: 560px;
          margin: 0;
          color: var(--qc-handover-charcoal);
          font-size: clamp(36px, 4.2vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.055em;
        }

        .qc-handover__subtext {
          max-width: 440px;
          margin: 24px 0 0;
          color: rgba(37,37,37,.72);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.85;
        }

        .qc-handover__timeline {
          position: relative;
          min-width: 0;
        }

        .qc-handover__track {
          position: absolute;
          top: 37.5vh;
          bottom: 37.5vh;
          left: 15px;
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
        }

        .qc-handover__track-base {
          height: 100%;
          background: rgba(37,37,37,.12);
        }

        .qc-handover__track-progress {
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
          grid-template-columns: 32px minmax(0, 1fr);
          align-items: start;
          gap: 26px;
          min-height: 75vh;
          padding: calc(37.5vh - 16px) 0 0;
          transform-origin: left center;
        }

        .qc-handover__step:last-child {
          min-height: 75vh;
        }

        .qc-handover__node {
          position: relative;
          z-index: 1;
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 1.5px solid rgba(37,37,37,.25);
          border-radius: 50%;
          background: transparent;
          color: #77736C;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          will-change: box-shadow, background-color;
        }

        .qc-handover__step-copy {
          min-width: 0;
          padding-top: 2px;
        }

        .qc-handover__step-heading {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .qc-handover__step-heading svg {
          flex: 0 0 auto;
          color: var(--qc-handover-gold);
        }

        .qc-handover__step-heading h3 {
          margin: 0;
          color: inherit;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -.035em;
        }

        .qc-handover__step-copy p {
          max-width: 430px;
          margin: 13px 0 0;
          color: inherit;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.8;
          opacity: .7;
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

        @media (max-width: 760px) {
          .qc-handover {
            padding: 76px 22px;
          }

          .qc-handover__layout {
            display: block;
          }

          .qc-handover__intro {
            position: relative;
            top: auto;
            padding-top: 0;
            margin-bottom: 42px;
          }

          .qc-handover__intro h2 {
            max-width: 600px;
            font-size: clamp(34px, 9vw, 44px);
          }

          .qc-handover__subtext {
            margin-top: 17px;
            font-size: 15px;
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

          .qc-handover__step-copy p {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
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
