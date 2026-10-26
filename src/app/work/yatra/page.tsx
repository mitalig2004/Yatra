import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleDashed,
  Clock3,
  Eye,
  Keyboard,
  Map,
  MousePointer2,
  Route,
  Undo2,
  Wallet,
} from "lucide-react";
import { CaseStudyMotion } from "@/components/case-study-motion";
import styles from "./case-study.module.css";

export const metadata: Metadata = {
  title: "YATRA — The Travel Journal Case Study",
  description:
    "An immersive product design case study about making complex travel plans visual, explainable and reversible.",
};

const chapters = [
  ["01", "Journey begins", "journey-begins"],
  ["02", "The problem", "problem"],
  ["03", "The traveler", "traveler"],
  ["04", "Experience map", "experience-map"],
  ["05", "Exploration", "exploration"],
  ["06", "Identity", "identity"],
  ["07", "Product", "product"],
  ["08", "Details", "details"],
  ["09", "Responsive", "responsive"],
  ["10", "Refinement", "refinement"],
  ["11", "Reflection", "reflection"],
];

const illustrations = [
  ["traveler-preparing.svg", "Traveler preparing for a journey"],
  ["friends-planning.svg", "Friends planning a trip"],
  ["goa-map.svg", "Illustrated Goa destination map"],
  ["route-lines.svg", "Travel route line"],
  ["beach-landscape.svg", "Goa beach landscape"],
  ["cafe-destination.svg", "Coastal café destination"],
  ["travel-calendar.svg", "Four-day travel calendar"],
  ["budget-planning.svg", "Travel budget planning"],
  ["luggage.svg", "Luggage and travel accessories"],
  ["passport-stamps.svg", "Goa passport stamps"],
  ["boarding-pass.svg", "Goa boarding pass"],
  ["postcard.svg", "Goa travel postcard"],
  ["destination-markers.svg", "Destination markers"],
  ["itinerary-conflict.svg", "Itinerary timing conflict"],
  ["final-travel-scene.svg", "Final Goa travel scene"],
];

const decisions = [
  {
    number: "01",
    title: "Preview before commitment",
    problem: "One move can quietly alter timing, route and cost.",
    decision: "Keep the accepted itinerary intact until one explicit Apply action.",
    status: "Built and reversible",
  },
  {
    number: "02",
    title: "Explain the arithmetic",
    problem: "‘Schedule conflict’ does not help a traveler decide.",
    decision: "Show café end, travel time, reservation time and the 20-minute result.",
    status: "Built with deterministic data",
  },
  {
    number: "03",
    title: "One revision everywhere",
    problem: "Timeline, map and budget can disagree after an edit.",
    decision: "Commit one revision that updates every accepted surface together.",
    status: "Built and tested",
  },
  {
    number: "04",
    title: "Drag is an enhancement",
    problem: "Dragging is imprecise on touch and unavailable to some users.",
    decision: "Offer Move → day → position as an equal semantic path.",
    status: "Built for keyboard and mobile",
  },
];

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className={styles.chapterLabel}>
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

function Evidence({ children, tone = "built" }: { children: React.ReactNode; tone?: "built" | "simulated" | "future" | "reconstructed" }) {
  return <span className={`${styles.evidence} ${styles[tone]}`}>{children}</span>;
}

function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`${styles.photo} ${className}`} data-photo>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" priority={priority} />
      <span aria-hidden="true" />
    </div>
  );
}

export default function CaseStudyPage() {
  return (
    <CaseStudyMotion>
      <main id="main" className={`${styles.page} case-study-page`}>
        <aside className={styles.chapterRail} aria-label="Case study chapters">
          <strong>YATRA / {chapters.length} CHAPTERS</strong>
          <nav>
            {chapters.map(([number, label, id]) => (
              <a key={id} href={`#${id}`}><span>{number}</span>{label}</a>
            ))}
          </nav>
        </aside>

        <section id="journey-begins" className={styles.hero} data-export-panel="01-cover">
          <Photo src="/case-study/photos/mandrem-sunset.jpg" alt="Sunset over Mandrem Beach in Goa" className={styles.heroPhoto} priority />
          <div className={styles.heroShade} />
          <div className={styles.heroTop}>
            <p><span>Product design</span><strong>Case study</strong><span>· 2026</span></p>
          </div>
          <div className={styles.heroTitle} data-hero-title>
            <span>YATRA</span>
            <h1>Every great journey begins <em>before the journey.</em></h1>
          </div>
          <div className={styles.heroJournal} data-postcard>
            <Image src="/case-study/photos/goa-architecture.jpg" alt="Historic Goan architecture in warm afternoon light" fill sizes="380px" />
            <small>FIELD NOTE 01 · OLD GOA</small>
          </div>
          <div className={styles.heroTicket} data-postcard>
            <Image src="/case-study/illustrations/boarding-pass.svg" alt="Illustrated YATRA boarding pass from Mumbai to Goa" width={640} height={420} />
          </div>
          <div className={styles.heroSummary}>
            <p>YATRA turns scattered inspiration, constraints and places into one editable visual itinerary—then explains every consequence before a traveler commits.</p>
            <div>
              <Link href="/trip/goa/plan" className="button primary">Explore prototype <ArrowUpRight size={16} /></Link>
              <a href="#problem">Open the journal <ArrowDown size={15} /></a>
            </div>
          </div>
          <dl className={styles.heroMeta}>
            <div><dt>Designer</dt><dd>Mitali Giri</dd></div>
            <div><dt>Role</dt><dd>Product design · UX · Frontend</dd></div>
            <div><dt>Scope</dt><dd>Concept to functional prototype</dd></div>
            <div><dt>Timeline</dt><dd>Self-directed · 2026</dd></div>
            <div><dt>Platform</dt><dd>Responsive web</dd></div>
          </dl>
        </section>

        <section id="overview" className={styles.overviewStrip} data-export-panel="02-overview" data-reveal>
          <p className={styles.marginNote}>PROJECT OVERVIEW</p>
          <div>
            <h2>A travel planner designed around the moment plans change.</h2>
            <p>The four-day Goa prototype connects itinerary, route and budget in one calm planning context. Its signature behavior is a café move that creates a real scheduling decision, not another regeneration prompt.</p>
          </div>
          <div className={styles.evidenceLegend}>
            <p><Evidence>Built</Evidence> Core entry, timeline, map, budget and revision flow.</p>
            <p><Evidence tone="simulated">Simulated</Evidence> AI generation and travel estimates use deterministic fixtures.</p>
            <p><Evidence tone="future">Future</Evidence> Real-time collaboration, live travel data and booking.</p>
          </div>
        </section>

        <section id="problem" className={`${styles.chapter} ${styles.problem}`} data-export-panel="03-problem" data-chaos-story>
          <div className={styles.chapterHead} data-reveal>
            <ChapterLabel number="02">Planning shouldn’t feel like work</ChapterLabel>
            <h2>Seven open tabs.<br />One fragile plan.</h2>
            <p>Travelers discover in one place, compare in another, decide in chat and calculate in notes. The itinerary loses the relationship between desire and what the day can realistically hold.</p>
          </div>
          <div className={styles.chaosStage} aria-label="Scattered travel information becoming one itinerary">
            <Photo src="/case-study/photos/goa-street.jpg" alt="A street in Goa with local shops and palm trees" className={styles.chaosPhoto} />
            {[
              ["SAVED REEL", "Hidden café in Assagao", "−8deg"],
              ["GROUP CHAT", "Can we still make sunset?", "6deg"],
              ["MAP PIN", "Chapora Fort · saved", "−3deg"],
              ["BUDGET NOTE", "₹40,000 shared", "8deg"],
              ["RESERVATION", "Dinner · 5:00 pm", "−6deg"],
            ].map(([label, text, rotate], i) => (
              <article key={label} data-chaos-card style={{ "--i": i, "--r": rotate } as React.CSSProperties}><span>{label}</span><strong>{text}</strong></article>
            ))}
            <div className={styles.organizedPlan} data-organized-plan>
              <span>DAY 02 · ANJUNA</span><strong>A little local life</strong>
              <p><Clock3 size={15} /> Time</p><p><Map size={15} /> Route</p><p><Wallet size={15} /> Budget</p>
            </div>
          </div>
          <div className={styles.painRibbon} data-reveal>
            <article><span>01</span><h3>Fragmented context</h3><p>A saved place has no day, route or budget meaning.</p></article>
            <article><span>02</span><h3>Invisible ripple effects</h3><p>One moved stop can break a fixed reservation.</p></article>
            <article><span>03</span><h3>Group ambiguity</h3><p>Ideas, suggestions and accepted decisions blur together.</p></article>
          </div>
        </section>

        <section id="traveler" className={`${styles.chapter} ${styles.traveler}`} data-export-panel="04-research" data-reveal>
          <div className={styles.travelerLead}>
            <div>
              <ChapterLabel number="03">Understanding the traveler</ChapterLabel>
              <h2>Design the riskiest decision, then learn.</h2>
              <p>No primary interview study is documented for this concept. The starting point is a requirements-led hypothesis about young independent travelers who gather inspiration across tools and repeatedly reshape their plans.</p>
            </div>
            <Photo src="/case-study/photos/morjim-friends-sunset.jpg" alt="Friends standing together at Morjim Beach during sunset" className={styles.travelerPhoto} />
          </div>
          <div className={styles.researchLedger}>
            <article><Eye size={18} /><span>Observed in product ecology</span><strong>Planning spans maps, messages, notes and booking tools.</strong></article>
            <article><CircleDashed size={18} /><span>Assumption to test</span><strong>Travelers value a clear impact preview more than full regeneration.</strong></article>
            <article><Check size={18} /><span>Verified in prototype</span><strong>One revision can keep timeline, map and budget synchronized.</strong></article>
          </div>
          <div className={styles.goalSpread}>
            <div><span>TRAVELER NEED</span><strong>Change a plan without losing confidence in the rest of the trip.</strong></div>
            <div><span>PRODUCT OBJECTIVE</span><strong>Make complex planning understandable, reversible and worth returning to.</strong></div>
            <small>Business viability and retention remain hypotheses; no commercial result is claimed.</small>
          </div>
          <div className={styles.competitorStrip}>
            <div className={styles.competitorIntro}><span>CURRENT CATEGORY SCAN · OCT 2026</span><h3>Strong tools solve parts of the journey.</h3><p>YATRA explores the decision boundary between them.</p></div>
            {[
              ["Google Maps", "Discovery + shared lists", "Connect a saved place to time and spend.", "https://support.google.com/maps/answer/7280933"],
              ["Wanderlog", "Broad planning + collaboration", "Make one edit’s impact unusually explicit.", "https://wanderlog.com/"],
              ["TripIt", "Booked itinerary organization", "Support flexible exploration before booking.", "https://www.tripit.com/web/free/trip-planner"],
              ["Shared docs", "Familiar co-editing", "Add travel-specific chronology and route logic.", "https://www.notion.com/en-GB/product/projects"],
            ].map(([name, strength, opportunity, href], i) => (
              <article key={name}><span>0{i + 1}</span><h4>{name}</h4><strong>{strength}</strong><p>{opportunity}</p><a href={href} target="_blank" rel="noreferrer">Source <ArrowUpRight size={12} /></a></article>
            ))}
          </div>
          <p className={styles.sourceNote}>Directional comparison based on public product documentation; it is not a usability benchmark.</p>
        </section>

        <section id="experience-map" className={`${styles.chapter} ${styles.mapping}`} data-export-panel="05-journey-map" data-route-story>
          <div className={styles.mappingTitle} data-reveal>
            <ChapterLabel number="04">Mapping the experience</ChapterLabel>
            <h2>From scattered ideas to one accepted trip.</h2>
          </div>
          <div className={styles.mapJournal}>
            <Image src="/case-study/illustrations/goa-map.svg" alt="Original illustrated map of the Goa planning journey" width={640} height={420} />
            <svg className={styles.journeyRoute} viewBox="0 0 1000 420" aria-hidden="true"><path data-route-line d="M38 330C162 88 278 326 406 142S664 314 955 82" /></svg>
            {[
              ["01", "Decide", "Destination · pace · budget"],
              ["02", "Collect", "Saved places enter one context"],
              ["03", "Organize", "Ideas become days and routes"],
              ["04", "Review", "Conflicts and spend become visible"],
              ["05", "Prepare", "Return to one accepted plan"],
            ].map(([n, title, copy], i) => <article key={n} style={{ "--i": i } as React.CSSProperties}><span>{n}</span><strong>{title}</strong><p>{copy}</p></article>)}
          </div>
          <div className={styles.iaSpread}>
            <div><span>ENTRY</span><strong>Landing</strong><strong>Sign up / Log in</strong><strong>Trips home</strong></div>
            <i aria-hidden="true" />
            <div><span>CREATE</span><strong>Trip brief</strong><strong>Review</strong><strong>Generation</strong></div>
            <i aria-hidden="true" />
            <div><span>TRIP CONTEXT</span><strong>Overview</strong><strong>Plan · Timeline / Map</strong><strong>Budget</strong></div>
          </div>
          <div className={styles.signatureFlow}>
            <span>SIGNATURE FLOW</span>
            <ol>{["Select café", "Choose Day 2", "Preview impact", "See 20 min conflict", "Choose resolution", "Apply revision", "Undo if needed"].map((step, i) => <li key={step}><b>{String(i + 1).padStart(2, "0")}</b><strong>{step}</strong></li>)}</ol>
          </div>
        </section>

        <section id="exploration" className={`${styles.chapter} ${styles.exploration}`} data-export-panel="06-wireframes" data-wireframe-story>
          <div className={styles.chapterHead} data-reveal>
            <ChapterLabel number="05">From ideas to itinerary</ChapterLabel>
            <h2>Three ways to hold a day.</h2>
            <p>Original historical wireframes were not retained. These alternatives reconstruct the key structural decision from the implemented architecture and are labeled accordingly.</p>
          </div>
          <div className={styles.sketchbook}>
            <div className={styles.sketchPhoto}><Photo src="/case-study/photos/goa-beach-hut.jpg" alt="View of a Goa beach from a coastal hut" /></div>
            {[
              ["A", "Calendar grid", "Precise, but too rigid for relaxed travel and route context.", "calendar"],
              ["B", "Card board", "Easy to rearrange, but chronology and travel time recede.", "board"],
              ["C", "Timeline + map", "Sequence and geography remain visible together.", "timeline"],
            ].map(([letter, title, copy, kind], i) => (
              <article key={letter} data-wireframe-layer className={styles[`sketch${letter}`]}>
                <Evidence tone="reconstructed">Reconstructed option {letter}</Evidence>
                {kind === "calendar" ? (
                  <div className={`${styles.conceptVisual} ${styles.calendarVisual}`}>
                    <Image src="/case-study/illustrations/travel-calendar.svg" alt="Illustrated four-day calendar grid concept" width={640} height={420} />
                  </div>
                ) : kind === "timeline" ? (
                  <div className={`${styles.conceptVisual} ${styles.timelineVisual}`}>
                    <Image src="/case-study/plan-desktop.png" alt="YATRA timeline and map planning workspace" width={1600} height={1000} />
                  </div>
                ) : (
                  <div className={`${styles.wireframe} ${styles[kind]}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
                )}
                <span>{i === 2 ? "SELECTED" : "REJECTED"}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
            <aside className={styles.fieldNote} aria-label="Design field note">
              <span>YATRA FIELD NOTE 07</span>
              <p>Sequence explains <em>when.</em><br />Geography reveals <em>whether.</em></p>
              <div><b>Selected direction</b><strong>Timeline + map</strong></div>
            </aside>
          </div>
          <div className={styles.decisionJournal}>
            {decisions.map((item) => (
              <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p><b>Problem</b>{item.problem}</p><p><b>Decision</b>{item.decision}</p><small>{item.status}</small></div></article>
            ))}
          </div>
        </section>

        <section id="identity" className={`${styles.chapter} ${styles.identity}`} data-export-panel="07-identity">
          <div className={styles.identityLead} data-reveal>
            <ChapterLabel number="06">The YATRA identity</ChapterLabel>
            <h2>Warm travel editorial.<br /><em>Quiet product precision.</em></h2>
            <p>Instrument Serif holds the destination emotion. Manrope carries every functional decision. Photography supplies most of the color; forest green identifies action and accepted state.</p>
          </div>
          <div className={styles.palette}>
            {[["Canvas", "#F7F5EF"], ["Paper", "#FCFBF7"], ["Sand", "#EDE4D2"], ["Forest", "#1F513F"], ["Ocean", "#76949A"], ["Clay", "#B7795E"], ["Ink", "#20211D"]].map(([name, hex]) => <div key={name} style={{ "--swatch": hex } as React.CSSProperties}><i /><strong>{name}</strong><code>{hex}</code></div>)}
          </div>
          <div className={styles.typePoster}>
            <div><span>INSTRUMENT SERIF · EDITORIAL</span><strong>Leave room<br />for the journey.</strong></div>
            <div><span>MANROPE · PRODUCT</span><strong>Day 2 · A little local life</strong><p>Clear labels, quiet metadata and 44px preferred controls.</p></div>
            <Photo src="/case-study/photos/goa-architecture.jpg" alt="Historic Goan architecture" />
          </div>
          <div className={styles.illustrationIntro}><span>ORIGINAL FIELD-NOTE LIBRARY · 15 ASSETS</span><p>A consistent line, muted accent fills and numbered field-note frames connect UX diagrams to the travel-journal world.</p></div>
          <div className={styles.illustrationWall}>
            {illustrations.map(([file, alt], i) => <figure key={file} data-illustration><Image src={`/case-study/illustrations/${file}`} alt={alt} width={640} height={420} /><figcaption>{String(i + 1).padStart(2, "0")} · {alt}</figcaption></figure>)}
          </div>
        </section>

        <section id="product" className={`${styles.chapter} ${styles.product}`} data-export-panel="08-product">
          <div className={styles.productIntro} data-reveal>
            <ChapterLabel number="07">Meet the product</ChapterLabel>
            <h2>Inspiration enters.<br />A workable trip leaves.</h2>
          </div>
          <div className={styles.productGallery}>
            <figure className={styles.productLanding} data-product-shot><Image src="/case-study/landing-desktop.png" alt="YATRA editorial landing page" width={1440} height={1000} /><figcaption><b>01 · DISCOVER</b><span>Travel photography opens the experience; one action begins planning.</span></figcaption></figure>
            <figure className={styles.productCreate} data-product-shot><Image src="/case-study/create-desktop.png" alt="YATRA create trip experience" width={1440} height={980} /><figcaption><b>02 · FRAME</b><span>Budget, pace, interests and companions become a shared brief.</span></figcaption></figure>
            <figure className={styles.productOverview} data-product-shot><Image src="/case-study/overview-desktop.png" alt="YATRA Goa trip overview" width={1440} height={1000} /><figcaption><b>03 · ORIENT</b><span>Four days become an editorial overview before detailed planning.</span></figcaption></figure>
            <figure className={styles.productPlan} data-product-shot><Image src="/case-study/plan-desktop.png" alt="YATRA planning workspace with timeline and Goa map" width={1440} height={1000} /><figcaption><b>04 · PLAN</b><span>Chronology and geography remain one connected decision surface.</span></figcaption></figure>
          </div>
        </section>

        <section id="details" className={`${styles.chapter} ${styles.details}`} data-export-panel="10-details" data-reveal>
          <div className={styles.detailsHead}>
            <ChapterLabel number="08">Beautiful details, thoughtful decisions</ChapterLabel>
            <h2>Intelligence stays visible, reversible and under traveler control.</h2>
          </div>
          <div className={styles.detailGrid}>
            <article><Image src="/case-study/illustrations/itinerary-conflict.svg" alt="Original timing conflict illustration" width={640} height={420} /><div><span>CONFLICT LANGUAGE</span><h3>Show the math, not a warning code.</h3><p>Amber signals a planning decision. Error red remains reserved for actual failures.</p></div></article>
            <article><Image src="/case-study/illustrations/budget-planning.svg" alt="Original budget planning illustration" width={640} height={420} /><div><span>COST INTEGRITY</span><h3>The café moved. It was not charged twice.</h3><p>Before/after day totals reconcile to a +₹400 trip change explained as transport.</p></div></article>
            <article><Image src="/case-study/illustrations/destination-markers.svg" alt="Original destination marker illustration" width={640} height={420} /><div><span>SELECTION SYNC</span><h3>Timeline and map tell the same story.</h3><p>Activity selection, active day and accepted revision remain synchronized.</p></div></article>
          </div>
          <div className={styles.accessBand}>
            <div><Keyboard size={21} /><strong>Equal non-drag path</strong><span>Move → day → position</span></div>
            <div><MousePointer2 size={21} /><strong>Visible focus</strong><span>Keyboard location remains clear</span></div>
            <div><Eye size={21} /><strong>More than color</strong><span>Labels, icons and structure carry state</span></div>
            <div><Clock3 size={21} /><strong>Reduced motion</strong><span>All content remains readable</span></div>
          </div>
        </section>

        <section id="responsive" className={`${styles.chapter} ${styles.responsive}`} data-export-panel="11-responsive">
          <div className={styles.responsiveCopy} data-reveal>
            <ChapterLabel number="09">Designed for every journey</ChapterLabel>
            <h2>Focused mobile tasks.<br />A connected desktop canvas.</h2>
            <p>Desktop lets timeline and map share the hero workspace. Mobile switches between them and turns Impact Review into a focused decision task while preserving selection and proposal state.</p>
          </div>
          <div className={styles.responsiveStage}>
            <Photo src="/case-study/photos/goa-palm-coast.jpg" alt="Palm-lined Goa coastline" className={styles.responsivePhoto} />
            <div className={styles.deviceStage} data-device-stage>
              <div className={styles.desktopDevice}><Image src="/case-study/plan-desktop.png" alt="YATRA desktop planning workspace" width={1440} height={1000} /></div>
              <div className={styles.phoneDevice}><Image src="/case-study/plan-mobile.png" alt="YATRA mobile timeline" width={390} height={844} /></div>
              <div className={`${styles.phoneDevice} ${styles.phoneMap}`}><Image src="/case-study/map-mobile.png" alt="YATRA mobile map" width={390} height={844} /></div>
            </div>
          </div>
          <div className={styles.breakpointNotes}>
            <p><span>320–390</span> Vertical chapters · single-view planner · touch-first controls</p>
            <p><span>768–1024</span> Rebalanced collages · simplified motion · readable diagrams</p>
            <p><span>1440–1920</span> Cinematic imagery · layered product compositions · scroll narrative</p>
          </div>
        </section>

        <section id="refinement" className={`${styles.chapter} ${styles.refinement}`} data-export-panel="12-refinement" data-compare-story>
          <div className={styles.refinementLead} data-reveal>
            <ChapterLabel number="10">Refining the experience</ChapterLabel>
            <h2>A clearer next action, without inventing user evidence.</h2>
            <p>No moderated usability study was conducted. This comparison reflects documented internal review and implementation history.</p>
          </div>
          <div className={styles.beforeAfter}>
            <article><Evidence tone="reconstructed">Earlier wording · reconstructed</Evidence><div><strong>20-minute conflict</strong><p>The proposal cannot be applied yet.</p><button disabled>Resolve conflict to apply</button></div><small>A disabled CTA described the restriction but not the immediate task.</small></article>
            <article data-compare-after><Evidence>Implemented refinement</Evidence><div><strong>You’re 20 minutes short.</strong><p>Choose one feasible resolution, then review again.</p><button>Choose a resolution</button></div><small>Concrete timing and an action-led CTA clarify the next decision.</small></article>
          </div>
          <div className={styles.validationPlan}>
            <div><span>NEXT: FORMATIVE TESTING</span><h3>The next milestone is evidence, not more surface area.</h3></div>
            <ol>{[
              ["Create", "Set up a four-day trip with a shared budget."],
              ["Interpret", "Explain the ₹400 increase without prompting."],
              ["Resolve", "Move the café and protect the reservation."],
              ["Recover", "Undo and verify full restoration."],
              ["Switch", "Find the selected place between mobile views."],
            ].map(([title, task], i) => <li key={title}><span>0{i + 1}</span><strong>{title}</strong><p>{task}</p></li>)}</ol>
          </div>
        </section>

        <section id="reflection" className={`${styles.chapter} ${styles.reflection}`} data-export-panel="13-closing">
          <Photo src="/case-study/photos/mandrem-sunset.jpg" alt="The Arabian Sea at sunset from Mandrem, Goa" className={styles.reflectionPhoto} />
          <div className={styles.reflectionShade} />
          <div className={styles.reflectionCopy} data-reveal>
            <ChapterLabel number="11">The journey continues</ChapterLabel>
            <blockquote>The most useful intelligence was not generating more ideas. It was helping a traveler understand the consequence of one decision.</blockquote>
          </div>
          <div className={styles.outcomeGrid}>
            <article><span>DESIGNED</span><strong>End-to-end entry, itinerary and decision architecture</strong></article>
            <article><span>BUILT</span><strong>11 core product routes and a synchronized revision prototype</strong></article>
            <article><span>EVALUATED</span><strong>Automated desktop and mobile journeys with accessibility checks</strong></article>
            <article><span>UNPROVEN</span><strong>Recommendation quality, real collaboration and planning efficiency</strong></article>
          </div>
          <div className={styles.learningNotes}>
            <article><h3>What I learned</h3><p>Shared planning needs visible ownership and revision boundaries. Explainable proposals form a credible foundation before real-time presence is added.</p></article>
            <article><h3>What I would change</h3><p>Begin formative testing earlier, especially around transport deltas, preview state and Apply confidence.</p></article>
            <article><h3>What comes next</h3><p>Test the signature flow, define collaborator roles and validate group decision patterns before building a backend.</p></article>
          </div>
          <div className={styles.finalCta}>
            <p>YATRA · A product exploration by Mitali Giri</p>
            <h2>Make room for the journey.</h2>
            <div><Link href="/trip/goa/plan" className="button primary">Open the prototype <ArrowUpRight size={17} /></Link><Link href="/" className="button secondary">Visit YATRA</Link></div>
          </div>
        </section>

        <footer className={styles.credits}>
          <p>YATRA case study · Product design, UX and frontend by Mitali Giri</p>
          <p>Goa photography sourced from Pexels. Full creator credits are stored with the project assets.</p>
          <a href="#journey-begins">Back to the beginning ↑</a>
        </footer>
      </main>
    </CaseStudyMotion>
  );
}
