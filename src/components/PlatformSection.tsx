import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Circle,
  ClipboardCheck,
  ClipboardList,
  Files,
  FolderKanban,
  Gauge,
  ShieldCheck,
  Users,
} from "lucide-react";

const platformCards = [
  {
    title: "Project Management",
    description: "Keep project work and ownership organized.",
    status: "Active",
    background: "#C69A4D",
    foreground: "#252525",
    icon: FolderKanban,
    preview: "tasks",
  },
  {
    title: "Knowledge Sources",
    description: "Bring key resources and reference material together.",
    status: "Completed",
    background: "#7785C5",
    foreground: "#252525",
    icon: Files,
    preview: "documents",
  },
  {
    title: "AI Analysis",
    description: "Make project information easier to understand and summarize.",
    status: "In Progress",
    background: "#252525",
    foreground: "#FFFFFF",
    icon: BrainCircuit,
    preview: "analysis",
  },
  {
    title: "Structured Handovers",
    description: "Give every transition a clear record and next steps.",
    status: "Active",
    background: "#A87E36",
    foreground: "#171717",
    icon: ClipboardList,
    preview: "handover",
  },
  {
    title: "Verification",
    description: "Review what has been shared and what is still missing.",
    status: "Completed",
    background: "#5A67A6",
    foreground: "#FFFFFF",
    icon: ShieldCheck,
    preview: "checklist",
  },
  {
    title: "Readiness Tracking",
    description: "Make handover progress easier to follow.",
    status: "In Progress",
    background: "#F5F4F0",
    foreground: "#252525",
    border: true,
    icon: Gauge,
    preview: "progress",
  },
  {
    title: "Team Management",
    description: "Keep people and responsibilities connected.",
    status: "Active",
    background: "#E3C98F",
    foreground: "#252525",
    icon: Users,
    preview: "team",
  },
  {
    title: "Activity Tracking",
    description: "Maintain visibility into important project updates.",
    status: "Pending",
    background: "#EADBBE",
    foreground: "#252525",
    icon: Activity,
    preview: "activity",
  },
] as const;

type PlatformCardData = (typeof platformCards)[number];

const statusColors: Record<string, string> = {
  Active: "#C69A4D",
  "In Progress": "#7785C5",
  Completed: "#7CB342",
  Pending: "#8A8A8A",
};

function StatusChip({ status }: { status: string }) {
  return (
    <span className="qcp__status">
      <span
        className="qcp__status-dot"
        style={{ backgroundColor: statusColors[status] }}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

function PreviewTile({ type }: { type: PlatformCardData["preview"] }) {
  return (
    <div className="qcp__preview" aria-hidden="true">
      {type === "tasks" && (
        <>
          <div className="qcp__preview-heading">
            <span>Project tasks</span>
            <ClipboardCheck size={14} />
          </div>
          {["Project scope", "Team assignment", "Next milestone"].map(
            (label, index) => (
              <div className="qcp__task" key={label}>
                <span className="qcp__check">
                  {index < 2 && <Check size={9} />}
                </span>
                <span>{label}</span>
              </div>
            )
          )}
        </>
      )}

      {type === "documents" && (
        <>
          <div className="qcp__preview-heading">
            <span>Knowledge library</span>
            <Files size={14} />
          </div>
          {["Project brief", "Research notes", "Team resources"].map((name) => (
            <div className="qcp__document" key={name}>
              <span className="qcp__document-icon">
                <Files size={12} />
              </span>
              <span>{name}</span>
              <ArrowUpRight size={11} />
            </div>
          ))}
        </>
      )}

      {type === "analysis" && (
        <>
          <div className="qcp__preview-heading">
            <span>Analysis summary</span>
            <BrainCircuit size={14} />
          </div>
          <div className="qcp__analysis-line wide" />
          <div className="qcp__analysis-line" />
          <div className="qcp__analysis-line short" />
          <div className="qcp__analysis-tag">Example summary view</div>
        </>
      )}

      {type === "handover" && (
        <>
          <div className="qcp__preview-heading">
            <span>Handover record</span>
            <ClipboardList size={14} />
          </div>
          {[
            ["Responsibilities", "04"],
            ["Next steps", "03"],
            ["Resources", "08"],
          ].map(([label, count]) => (
            <div className="qcp__handover-row" key={label}>
              <span>{label}</span>
              <b>{count}</b>
            </div>
          ))}
        </>
      )}

      {type === "checklist" && (
        <>
          <div className="qcp__preview-heading">
            <span>Review checklist</span>
            <ShieldCheck size={14} />
          </div>
          {["Information shared", "Documents reviewed", "Owner confirmed"].map(
            (label) => (
              <div className="qcp__check-row" key={label}>
                <Check size={12} />
                <span>{label}</span>
              </div>
            )
          )}
        </>
      )}

      {type === "progress" && (
        <>
          <div className="qcp__preview-heading">
            <span>Readiness overview</span>
            <Gauge size={14} />
          </div>
          <div className="qcp__progress-value">78%</div>
          <div className="qcp__progress-track">
            <span />
          </div>
          <div className="qcp__progress-caption">
            Illustrative progress
          </div>
        </>
      )}

      {type === "team" && (
        <>
          <div className="qcp__preview-heading">
            <span>Team members</span>
            <Users size={14} />
          </div>
          <div className="qcp__avatars">
            {["A", "J", "M", "S"].map((letter, index) => (
              <span
                key={letter}
                style={{ "--avatar-index": index } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="qcp__team-caption">
            People and responsibilities
          </div>
        </>
      )}

      {type === "activity" && (
        <>
          <div className="qcp__preview-heading">
            <span>Recent activity</span>
            <Activity size={14} />
          </div>
          {["Project updated", "Resource added", "Handover reviewed"].map(
            (label, index) => (
              <div className="qcp__activity-row" key={label}>
                <Circle size={8} />
                <span>{label}</span>
                <small>{index + 1}h</small>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

function PlatformCard({
  item,
  index,
  progress,
  reducedMotion,
}: {
  item: PlatformCardData;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const total = platformCards.length;
  const enter = index / total;
  const exit = (index + 1) / total;
  const settleStart = Math.max(0, enter - 0.035);
  const exitEnd = Math.min(1, exit + 0.10);
  const isLast = index === total - 1;

  const scale = useTransform(
    progress,
    [settleStart, enter, exit, exitEnd],
    reducedMotion ? [1, 1, 1, 1] : [0.97, 1, 1, 0.93]
  );
  const rotateX = useTransform(
    progress,
    [settleStart, enter, exit, exitEnd],
    reducedMotion ? [0, 0, 0, 0] : [5, 0, 0, 5]
  );
  const y = useTransform(
    progress,
    [exit, exitEnd],
    reducedMotion ? [0, 0] : [0, -8]
  );
  const brightnessValue = useTransform(
    progress,
    [exit, exitEnd],
    reducedMotion ? [1, 1] : [1, 0.88]
  );
  const filter = useTransform(
    brightnessValue,
    (value) => `brightness(${value})`
  );

  const Icon = item.icon;

  return (
    <motion.li
      className="qcp__card-slot"
      style={{ zIndex: `calc(var(--qc-z-sticky) + ${index})` }}
    >
      <motion.article
        className={`qcp__card${
          item.border ? " qcp__card--border" : ""
        }`}
        style={{
          backgroundColor: item.background,
          color: item.foreground,
          scale: isLast ? 1 : scale,
          rotateX: isLast ? 0 : rotateX,
          y: isLast ? 0 : y,
          filter: isLast ? "none" : filter,
        }}
      >
        <div className="qcp__orbit" aria-hidden="true" />

        <div className="qcp__card-top">
          <div className="qcp__card-heading">
            <div className="qcp__icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <h3>{item.title}</h3>
          </div>

          <span className="qcp__index">
            [{String(index + 1).padStart(2, "0")}]
          </span>
        </div>

        <div className="qcp__card-content">
          <p>{item.description}</p>
          <StatusChip status={item.status} />
        </div>

        <div className="qcp__card-bottom">
          <div className="qcp__card-meta" aria-hidden="true">
            <span>QUICKCONNECT</span>
            <span>PLATFORM / {String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className="qcp__preview-wrap">
            <PreviewTile type={item.preview} />
            <a
              className="qcp__learn"
              href="#platform"
              aria-label={`Return to The Platform section: ${item.title}`}
            >
              Learn More <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

export default function PlatformSection() {
  const stackRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="platform"
      className="qcp"
      aria-labelledby="qcp-heading"
    >
      <div className="qcp__intro">
        <span className="qcp__eyebrow">
          <span aria-hidden="true" />
          THE PLATFORM
        </span>

        <h2 id="qcp-heading">
          Everything Your Team Needs
          <br />
          to Stay Connected.
        </h2>

        <p>
          A connected set of capability areas for organizing project
          knowledge, managing transitions, and keeping teams aligned.
        </p>
      </div>

      <ol ref={stackRef} className="qcp__stack">
        {platformCards.map((item, index) => (
          <PlatformCard
            key={item.title}
            item={item}
            index={index}
            progress={scrollYProgress}
            reducedMotion={Boolean(reducedMotion)}
          />
        ))}
      </ol>

      <style>{`
        .qcp {
          --qc-gold: #C69A4D;
          --qc-lavender: #7785C5;
          --qc-cream: #F4E9D5;
          --qc-off-white: #F5F4F0;
          --qc-charcoal: #252525;
          --qc-green: #7CB342;
          --qc-gray: #8A8A8A;
          --qc-shadow: 0 10px 40px rgba(198,154,77,.15);
          position: relative;
          isolation: isolate;
          width: 100%;
          padding: clamp(80px, 10vw, 140px) 20px 8vh;
          color: var(--qc-charcoal);
          font-family: "Plus Jakarta Sans", sans-serif;
          scroll-margin-top: 20px;
        }

        .qcp *,
        .qcp *::before,
        .qcp *::after {
          box-sizing: border-box;
        }

        .qcp__intro {
          width: min(100%, 900px);
          margin: 0 auto 70px;
          text-align: center;
        }

        .qcp__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          color: var(--qc-gold);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
        }

        .qcp__eyebrow > span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--qc-gold);
        }

        .qcp__intro h2 {
          margin: 0;
          font-size: clamp(34px, 5.3vw, 64px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.055em;
        }

        .qcp__intro p {
          max-width: 620px;
          margin: 22px auto 0;
          color: #77736c;
          font-size: 16px;
          line-height: 1.8;
          font-weight: 400;
        }

        .qcp__stack {
          position: relative;
          width: min(100%, 1100px);
          margin: 0 auto;
          padding: 0 0 30svh;
          list-style: none;
        }

        .qcp__card-slot {
          position: sticky;
          top: calc(var(--qc-nav-height) + 16px);
          height: min(70svh, 620px);
          min-height: min(70svh, 460px);
          margin-bottom: 30svh;
          perspective: 1200px;
        }

        .qcp__card-slot:last-child {
          margin-bottom: 0;
        }

        .qcp__card {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 24px;
          padding: clamp(26px, 4.2vw, 56px);
          box-shadow: var(--qc-shadow);
          transition: box-shadow .22s ease;
          transform-origin: center top;
          transform-style: preserve-3d;
        }

        .qcp__card:hover { box-shadow: 0 24px 56px rgba(37,37,37,.2); }

        .qcp__card--border {
          border: 1px solid var(--qc-gold);
        }

        .qcp__orbit {
          position: absolute;
          top: -35%;
          right: -10%;
          width: 75%;
          aspect-ratio: 1;
          border: 1px solid currentColor;
          border-radius: 50%;
          opacity: .10;
          pointer-events: none;
        }

        .qcp__orbit::before,
        .qcp__orbit::after {
          position: absolute;
          content: "";
          inset: 12%;
          border: 1px solid currentColor;
          border-radius: 50%;
        }

        .qcp__orbit::after {
          inset: 25%;
        }

        .qcp__card-top {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .qcp__card-heading {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .qcp__icon {
          display: grid;
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 17px;
          background: rgba(255,255,255,.10);
          color: var(--qc-gold);
        }

        .qcp__card h3 {
          margin: 0;
          font-size: clamp(23px, 3vw, 32px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -.04em;
        }

        .qcp__index {
          padding-top: 7px;
          color: inherit;
          font-size: 15px;
          font-weight: 600;
          opacity: .6;
        }

        .qcp__card-content {
          position: relative;
          z-index: 1;
          max-width: 530px;
          margin-top: 28px;
        }

        .qcp__card-content p {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 1.75;
          font-weight: 400;
          opacity: .9;
        }

        .qcp__status {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid currentColor;
          border-radius: 999px;
          padding: 9px 15px;
          background: rgba(255,255,255,.13);
          font-size: 12px;
          font-weight: 600;
        }

        .qcp__status-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 8px;
          border-radius: 50%;
        }

        .qcp__card-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-top: 30px;
        }

        .qcp__card-meta {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding-bottom: 5px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
          opacity: .7;
        }

        .qcp__preview-wrap {
          display: flex;
          align-items: flex-end;
          gap: 16px;
        }

        .qcp__preview {
          width: 245px;
          min-height: 150px;
          border: 1px solid rgba(37,37,37,.08);
          border-radius: 16px;
          padding: 17px;
          background: var(--qc-off-white);
          color: var(--qc-charcoal);
          box-shadow: 0 8px 28px rgba(37,37,37,.10);
        }

        .qcp__preview-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          font-size: 11px;
          font-weight: 700;
        }

        .qcp__task {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 10px 0;
          font-size: 9px;
          color: #55514a;
        }

        .qcp__check {
          display: grid;
          width: 13px;
          height: 13px;
          flex: 0 0 13px;
          place-items: center;
          border: 1px solid var(--qc-gold);
          border-radius: 4px;
          color: var(--qc-gold);
        }

        .qcp__document {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: 9px;
          font-weight: 500;
        }

        .qcp__document > span:nth-child(2) {
          flex: 1;
        }

        .qcp__document-icon {
          display: grid;
          width: 23px;
          height: 23px;
          place-items: center;
          border-radius: 6px;
          background: var(--qc-cream);
          color: var(--qc-gold);
        }

        .qcp__analysis-line {
          width: 75%;
          height: 6px;
          margin: 10px 0;
          border-radius: 10px;
          background: #dedbd3;
        }

        .qcp__analysis-line.wide { width: 100%; }
        .qcp__analysis-line.short { width: 50%; }

        .qcp__analysis-tag {
          display: inline-block;
          margin-top: 8px;
          border-radius: 99px;
          padding: 5px 9px;
          background: #e8e2d5;
          color: #514a3d;
          font-size: 9px;
          font-weight: 600;
        }

        .qcp__handover-row {
          display: flex;
          justify-content: space-between;
          margin-top: 9px;
          border-bottom: 1px solid #e8e5de;
          padding-bottom: 7px;
          font-size: 10px;
        }

        .qcp__handover-row b { color: #8d682b; }

        .qcp__check-row {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 12px 0;
          font-size: 10px;
        }

        .qcp__check-row svg { color: #477b21; }

        .qcp__progress-value {
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -.05em;
        }

        .qcp__progress-track {
          height: 8px;
          margin-top: 9px;
          overflow: hidden;
          border-radius: 20px;
          background: #e3dfd5;
        }

        .qcp__progress-track span {
          display: block;
          width: 78%;
          height: 100%;
          border-radius: inherit;
          background: var(--qc-gold);
        }

        .qcp__progress-caption,
        .qcp__team-caption {
          margin-top: 9px;
          color: #625e56;
          font-size: 9px;
        }

        .qcp__avatars {
          display: flex;
          padding-left: 5px;
        }

        .qcp__avatars span {
          display: grid;
          width: 34px;
          height: 34px;
          margin-left: -5px;
          place-items: center;
          border: 2px solid var(--qc-off-white);
          border-radius: 50%;
          background: var(--qc-cream);
          color: var(--qc-charcoal);
          font-size: 10px;
          font-weight: 700;
        }

        .qcp__avatars span:nth-child(even) {
          background: #d9dff2;
        }

        .qcp__activity-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 11px 0;
          font-size: 9px;
        }

        .qcp__activity-row svg {
          color: var(--qc-gold);
          fill: var(--qc-gold);
        }

        .qcp__activity-row span { flex: 1; }

        .qcp__activity-row small {
          color: #625e56;
        }

        .qcp__learn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 12px 17px;
          background: var(--qc-off-white);
          color: var(--qc-charcoal);
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .qcp__learn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37,37,37,.14);
        }

        .qcp__learn:hover svg { transform: translate(2px,-2px); }

        .qcp__learn svg {
          transition: transform .25s ease;
        }

        .qcp__learn:focus-visible {
          outline: 3px solid var(--qc-lavender);
          outline-offset: 4px;
        }

        @media (max-width: 760px) {
          .qcp { padding: 75px 14px 5vh; }
          .qcp__intro { margin-bottom: 45px; }
          .qcp__intro h2 br { display: none; }
          .qcp__intro p { font-size: 14px; }

          .qcp__stack { padding-bottom: 0; }

          .qcp__card-slot {
            position: relative;
            top: auto;
            height: auto;
            min-height: 0;
            margin-bottom: 20px;
            perspective: none;
          }

          .qcp__card {
            height: auto;
            min-height: 390px;
            padding: 25px;
            border-radius: 20px;
            transform: none !important;
            filter: none !important;
          }

          .qcp__card-heading { gap: 13px; }

          .qcp__icon {
            width: 46px;
            height: 46px;
            flex-basis: 46px;
            border-radius: 13px;
          }

          .qcp__card h3 { font-size: 22px; }
          .qcp__card-content { margin-top: 24px; }
          .qcp__card-content p { font-size: 14px; }

          .qcp__card-bottom {
            align-items: flex-start;
            flex-direction: column;
            margin-top: 28px;
          }

          .qcp__preview-wrap {
            width: 100%;
            align-items: stretch;
            flex-direction: column;
          }

          .qcp__preview { width: 100%; }
          .qcp__learn { align-self: flex-start; }
        }

        @media (max-width: 420px) {
          .qcp__card-top { gap: 10px; }
          .qcp__index { font-size: 12px; }
          .qcp__card h3 { font-size: 19px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .qcp__card {
            transform: none !important;
            filter: none !important;
          }

          .qcp__learn,
          .qcp__learn svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
