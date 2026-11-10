import { useEffect, useRef, useState, type KeyboardEvent, type FocusEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, MessageCircle, Sheet, Link2, CircleHelp, UserRound, StickyNote } from "lucide-react";

const cards = [
  { number: "01", title: "Scattered Information", description: "Important files, conversations, and decisions are spread across different tools and locations." },
  { number: "02", title: "Lost Project Context", description: "Teams struggle to understand why decisions were made and how work reached its current state." },
  { number: "03", title: "Unstructured Handovers", description: "Critical information gets transferred through incomplete documents, rushed meetings, and informal conversations." },
];

function ScatteredArt() {
  return <div className="qc-problem-art qc-art-scattered" aria-hidden="true">
    <i className="qc-orbit qc-orbit-a" /><i className="qc-orbit qc-orbit-b" />
    <span className="qc-float qc-float-a"><FileText /></span>
    <span className="qc-float qc-float-b"><MessageCircle /></span>
    <span className="qc-float qc-float-c"><Sheet /></span>
    <i className="qc-spark qc-spark-a" /><i className="qc-spark qc-spark-b" /><i className="qc-spark qc-spark-c" />
  </div>;
}
function ContextArt() {
  return <div className="qc-problem-art qc-art-context" aria-hidden="true">
    <div className="qc-context-track"><i /><i className="qc-missing-node" /><i /></div>
    <span className="qc-question"><CircleHelp /></span>
    <div className="qc-context-paper"><i /><i /><i /></div><span className="qc-broken-link"><Link2 /></span>
  </div>;
}
function HandoverArt() {
  return <div className="qc-problem-art qc-art-handover" aria-hidden="true">
    <div className="qc-avatar qc-avatar-a"><UserRound /></div>
    <div className="qc-paper-stack"><span className="qc-paper qc-paper-a" /><span className="qc-paper qc-paper-b" /><span className="qc-paper qc-paper-c"><StickyNote /></span><i>?</i></div>
    <div className="qc-avatar qc-avatar-b"><UserRound /></div><span className="qc-transfer-arrow"><ArrowUpRight /></span>
  </div>;
}
const art = [ScatteredArt, ContextArt, HandoverArt];

export default function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = reduceMotion ?? false;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || hasInteracted || paused) return;
    const timer = window.setInterval(() => setActiveIndex((i) => (i + 1) % cards.length), 4000);
    return () => window.clearInterval(timer);
  }, [reduced, hasInteracted, paused]);

  const choose = (index: number, userAction = false) => {
    setActiveIndex(index);
    if (userAction) setHasInteracted(true);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % cards.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + cards.length - 1) % cards.length;
    if (next !== undefined) {
      event.preventDefault();
      setHasInteracted(true);
      choose(next);
      buttons.current[next]?.focus();
    }
  };
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
  };

  return <section id="problem" className="qc-problem" aria-labelledby="qc-problem-title"
    onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={onBlur}>
    <style>{\`
      .qc-problem{--qc-gold:#C69A4D;--qc-lavender:#7785C5;--qc-cream:#F4E9D5;--qc-off-white:#F5F4F0;--qc-charcoal:#252525;--qc-tint:rgba(198,154,77,.18);width:100%;padding:clamp(64px,8vw,112px) 24px;color:var(--qc-charcoal);font-family:"Plus Jakarta Sans",sans-serif;background:transparent}
      .qc-problem *,.qc-problem *:before,.qc-problem *:after{box-sizing:border-box}
      .qc-problem__inner{width:min(100%,1100px);margin:0 auto}
      .qc-problem__header{display:flex;align-items:flex-end;justify-content:space-between;gap:36px;margin-bottom:38px}
      .qc-problem__heading{max-width:760px;min-width:0}
      .qc-problem__title{margin:0;font-size:clamp(34px,4.4vw,48px);line-height:1.12;letter-spacing:-.055em;font-weight:700;color:var(--qc-charcoal)}
      .qc-problem__accent{display:block;color:var(--qc-gold)}
      .qc-problem__intro{max-width:700px;margin:18px 0 0;color:rgba(37,37,37,.72);font-size:16px;line-height:1.8;font-weight:400}
      .qc-problem__cards{display:flex;gap:16px;width:100%;align-items:stretch}
      .qc-problem-card{position:relative;display:flex;flex:1 1 0%;min-width:0;height:340px;overflow:hidden;padding:27px 25px;border:1px solid transparent;border-radius:24px;background:var(--qc-tint);color:var(--qc-charcoal);text-align:left;cursor:pointer;isolation:isolate;box-shadow:0 10px 40px rgba(198,154,77,.08)}
      .qc-problem-card[data-active=true]{border-color:rgba(198,154,77,.85);background:var(--qc-off-white);box-shadow:0 10px 40px rgba(198,154,77,.15)}
      .qc-problem-card:focus-visible{outline:3px solid var(--qc-lavender);outline-offset:4px}
      .qc-problem-card__wash{position:absolute;z-index:-1;width:230px;height:230px;right:-92px;bottom:-110px;border-radius:50%;background:rgba(255,255,255,.34)}
      .qc-problem-card__inner{position:relative;z-index:1;display:flex;flex-direction:column;width:100%;min-width:0;height:100%}
      .qc-problem-card__top{display:flex;align-items:center;justify-content:space-between;gap:10px}
      .qc-problem-card__index{color:var(--qc-gold);font-size:14px;font-weight:600;letter-spacing:.08em}
      .qc-problem-card__collapsed{display:block;overflow:hidden;margin-top:22px;max-width:100%;font-size:19px;line-height:1.35;font-weight:600;white-space:nowrap;text-overflow:ellipsis}
      .qc-problem-card__expanded{display:flex;flex:1;align-items:center;gap:14px;min-width:0;min-height:0;padding-top:13px}
      .qc-problem-card__copy{display:flex;flex:1 1 48%;flex-direction:column;align-items:flex-start;min-width:0}
      .qc-problem-card__title{margin:0;max-width:100%;font-size:24px;line-height:1.22;letter-spacing:-.035em;font-weight:600}
      .qc-problem-card__description{margin:13px 0 0;max-width:330px;color:rgba(37,37,37,.76);font-size:15px;line-height:1.7;font-weight:400}
      .qc-problem-card__action{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;margin-top:23px;border-radius:50%;background:var(--qc-gold);color:white}
      .qc-problem-card__small-action{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:white;color:var(--qc-charcoal)}
      .qc-problem-art{position:relative;display:block;flex:0 1 48%;min-width:145px;height:220px;overflow:hidden;border-radius:22px;background:var(--qc-cream)}
      .qc-problem-art svg{width:25px;height:25px;stroke-width:1.55}
      .qc-orbit{position:absolute;border:1px solid rgba(198,154,77,.35);border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}
      .qc-orbit-a{width:205px;height:205px}.qc-orbit-b{width:145px;height:145px;border-style:dashed}
      .qc-float{position:absolute;display:grid;place-items:center;width:62px;height:62px;border:1px solid rgba(198,154,77,.28);border-radius:17px;background:var(--qc-off-white);color:var(--qc-gold);box-shadow:0 8px 22px rgba(37,37,37,.08)}
      .qc-float-a{left:16%;top:18%;transform:rotate(-10deg)}.qc-float-b{right:13%;top:24%;color:var(--qc-lavender);transform:rotate(8deg)}.qc-float-c{left:39%;bottom:13%;transform:rotate(5deg)}
      .qc-spark{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--qc-gold)}.qc-spark-a{left:18%;bottom:24%}.qc-spark-b{right:18%;bottom:18%;background:var(--qc-lavender)}.qc-spark-c{right:30%;top:13%;width:5px;height:5px}
      .qc-context-track{position:absolute;left:12%;right:12%;top:48%;display:flex;align-items:center;height:2px;background:linear-gradient(90deg,var(--qc-gold) 0 38%,transparent 38% 44%,var(--qc-lavender) 44% 100%)}
      .qc-context-track i{position:absolute;left:0;width:17px;height:17px;border:4px solid var(--qc-cream);border-radius:50%;background:var(--qc-gold);box-shadow:0 0 0 1px var(--qc-gold)}
      .qc-context-track i:nth-child(2){left:48%;width:21px;height:21px;background:var(--qc-off-white);box-shadow:0 0 0 1px var(--qc-lavender)}
      .qc-context-track i:nth-child(3){left:auto;right:0}
      .qc-question{position:absolute;left:43%;top:16%;display:grid;place-items:center;width:45px;height:45px;border-radius:15px;background:var(--qc-off-white);color:var(--qc-lavender);box-shadow:0 7px 18px rgba(37,37,37,.08)}
      .qc-context-paper{position:absolute;left:13%;bottom:13%;display:flex;flex-direction:column;gap:7px;width:76px;padding:12px;border-radius:12px;background:rgba(255,255,255,.75);transform:rotate(-7deg)}
      .qc-context-paper i{height:4px;width:100%;border-radius:4px;background:rgba(119,133,197,.35)}.qc-context-paper i:first-child{width:88%;background:rgba(198,154,77,.65)}.qc-context-paper i:last-child{width:56%}
      .qc-broken-link{position:absolute;right:15%;bottom:13%;display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--qc-off-white);color:var(--qc-gold);transform:rotate(12deg)}
      .qc-avatar{position:absolute;bottom:26px;display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(198,154,77,.5);border-radius:50%;background:var(--qc-off-white);color:var(--qc-gold)}
      .qc-avatar-a{left:7%}.qc-avatar-b{right:7%;color:var(--qc-lavender);border-color:rgba(119,133,197,.5)}
      .qc-paper-stack{position:absolute;left:50%;top:49%;width:118px;height:120px;transform:translate(-50%,-50%)}
      .qc-paper{position:absolute;display:flex;flex-direction:column;justify-content:center;gap:7px;width:86px;height:76px;padding:12px;border:1px solid rgba(198,154,77,.3);border-radius:9px;background:var(--qc-off-white);box-shadow:0 6px 14px rgba(37,37,37,.08)}
      .qc-paper:before,.qc-paper:after{content:"";display:block;width:100%;height:4px;border-radius:5px;background:rgba(37,37,37,.15)}.qc-paper:after{width:68%}
      .qc-paper-a{left:22px;top:2px;transform:rotate(12deg);background:#EADBBE}.qc-paper-b{left:5px;top:15px;transform:rotate(-9deg);border-color:rgba(119,133,197,.4)}
      .qc-paper-c{left:18px;top:30px;transform:rotate(3deg);color:var(--qc-gold)}.qc-paper-c svg{width:17px;height:17px}
      .qc-paper-stack>i{position:absolute;right:0;top:0;display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:var(--qc-lavender);color:white;font-size:14px;font-style:normal;font-weight:700}
      .qc-transfer-arrow{position:absolute;left:50%;bottom:12px;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--qc-gold);color:white;transform:translateX(-50%)}
      @media(max-width:900px){.qc-problem-card{padding:23px 19px}.qc-problem-card__expanded{gap:10px}.qc-problem-card__title{font-size:21px}.qc-problem-card__description{font-size:14px}.qc-problem-art{min-width:120px;height:190px}}
      @media(max-width:767px){
        .qc-problem{padding:64px 18px}.qc-problem__header{align-items:flex-start;flex-direction:column;gap:20px;margin-bottom:28px}
        .qc-problem__title{font-size:clamp(33px,9vw,43px)}.qc-problem__intro{margin-top:14px;font-size:15px;line-height:1.75}
        .qc-problem__cards{flex-direction:column;gap:12px}.qc-problem-card{flex:0 0 auto;width:100%;height:74px;min-height:74px;padding:17px 20px}
        .qc-problem-card[data-active=true]{height:330px}.qc-problem-card__collapsed{margin-top:8px;font-size:16px}
        .qc-problem-card[data-active=true] .qc-problem-card__collapsed{display:none}
        .qc-problem-card__expanded{gap:12px;padding-top:9px}.qc-problem-card__copy{flex-basis:54%}
        .qc-problem-card__title{font-size:20px}.qc-problem-card__description{margin-top:9px;font-size:13px;line-height:1.55}
        .qc-problem-card__action{width:34px;height:34px;margin-top:14px}.qc-problem-art{flex-basis:46%;min-width:0;height:180px;border-radius:17px}
        .qc-problem-art svg{width:20px;height:20px}.qc-problem-card__small-action{width:36px;height:36px}
      }
      @media(max-width:390px){.qc-problem-card[data-active=true]{height:360px}.qc-problem-card__expanded{align-items:flex-start;flex-direction:column;justify-content:center}.qc-problem-card__copy{flex:0 0 auto;width:100%}.qc-problem-art{flex:0 0 auto;width:100%;height:112px}.qc-problem-card__action{position:absolute;right:0;bottom:0;margin:0}}
      @media(prefers-reduced-motion:reduce){.qc-problem *,.qc-problem *:before,.qc-problem *:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}
    \`}</style>
    <div className="qc-problem__inner">
      <header className="qc-problem__header"><div className="qc-problem__heading">
        <h2 id="qc-problem-title" className="qc-problem__title">When People Leave,<span className="qc-problem__accent">Knowledge Shouldn't.</span></h2>
        <p className="qc-problem__intro">Every project carries valuable context — decisions, processes, documents, and experience. But when people move on, that knowledge often disappears with them.</p>
      </div></header>
      <div className="qc-problem__cards" role="group" aria-label="Knowledge handover challenges">
        {cards.map((card,index)=>{
          const active=activeIndex===index;
          const Illustration=art[index];
          return <motion.button key={card.number} ref={node=>{buttons.current[index]=node}} type="button"
            className="qc-problem-card" data-active={active} aria-expanded={active}
            aria-label={card.number+": "+card.title}
            aria-describedby={active?"qc-problem-description-"+index:undefined}
            onMouseEnter={()=>{setPaused(true);choose(index)}}
            onFocus={()=>setPaused(true)} onClick={()=>choose(index,true)}
            onKeyDown={event=>onKeyDown(event,index)}
            animate={{flexGrow:mobile?0:(active?2.2:1),height:mobile?(active?(window.innerWidth<=390?360:330):74):340}}
            transition={reduced?{duration:0}:{duration:.6,ease:[.22,1,.36,1]}}>
            <span className="qc-problem-card__wash" /><span className="qc-problem-card__inner">
              <span className="qc-problem-card__top"><span className="qc-problem-card__index">{card.number}</span>
                {!active&&<span className="qc-problem-card__small-action"><ArrowUpRight size={18}/></span>}
              </span>
              <AnimatePresence initial={false} mode="wait">
                {active?<motion.span key="open" className="qc-problem-card__expanded"
                  initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}}
                  exit={reduced?undefined:{opacity:0,y:-7}}
                  transition={reduced?{duration:0}:{duration:.32,ease:[.22,1,.36,1]}}>
                  <span className="qc-problem-card__copy">
                    <span className="qc-problem-card__title">{card.title}</span>
                    <span className="qc-problem-card__description" id={"qc-problem-description-"+index}>{card.description}</span>
                    <span className="qc-problem-card__action"><ArrowUpRight size={19}/></span>
                  </span><span className="qc-problem-art"><Illustration/></span>
                </motion.span>:<motion.span key="closed" className="qc-problem-card__collapsed"
                  initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={reduced?undefined:{opacity:0}}
                  transition={{duration:reduced?0:.14}}>{card.title}</motion.span>}
              </AnimatePresence>
            </span>
          </motion.button>;
        })}
      </div>
    </div>
  </section>;
}
