import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  Eye,
  Map,
  Route,
  Wallet,
} from "lucide-react";
import styles from "./case-study.module.css";

export const metadata: Metadata = {
  title: "YATRA Case Study — Mitali Giri",
  description:
    "A product design case study about making complex travel plans easier to understand, change and share.",
};

const nav = [
  ["01", "Overview", "overview"],
  ["02", "Problem", "problem"],
  ["03", "Strategy", "strategy"],
  ["04", "Architecture", "architecture"],
  ["05", "Key decisions", "decisions"],
  ["06", "Solution", "solution"],
  ["07", "System", "system"],
  ["08", "Reflection", "reflection"],
];

const principles = [
  ["Clarity", "Show the day, route and spend as one connected plan."],
  ["Control", "Preview every ripple before the accepted itinerary changes."],
  ["Flexibility", "Make editing easier than starting again."],
  ["Enjoyment", "Let travel imagery and calm pacing soften a complex task."],
];

const decisions = [
  {
    number: "01",
    title: "Separate a proposal from the accepted plan",
    challenge: "A small itinerary edit can quietly change timing, route and cost.",
    solution: "Every move becomes a reviewable proposal. Apply is the single commit point; Undo restores the prior revision.",
    evidence: "The café remains in Day 1 while Impact Review is open, then timeline, map and budget update together.",
    limitation: "The prototype uses one deterministic scenario rather than live travel data.",
  },
  {
    number: "02",
    title: "Explain consequences in the traveler’s language",
    challenge: "A warning such as “schedule conflict” does not help someone decide.",
    solution: "The interface shows café end time, travel time, reservation time and the resulting 20-minute delay.",
    evidence: "Users can compare feasible resolutions before choosing one; no suggestion is applied silently.",
    limitation: "Real-world transport variance still requires external validation.",
  },
  {
    number: "03",
    title: "Keep timeline, map and budget on one revision",
    challenge: "Disconnected planning surfaces make it hard to trust what is current.",
    solution: "A shared local state model synchronizes active day, selection, route, daily totals and trip estimate.",
    evidence: "Apply changes ₹37,600 to ₹38,000 and selects the moved café across the plan and map.",
    limitation: "Persistence is browser-local; multi-device sync is not implemented.",
  },
  {
    number: "04",
    title: "Design an equal non-drag editing path",
    challenge: "Drag-and-drop is imprecise on touch and unavailable to some keyboard users.",
    solution: "Move opens semantic day and position choices with the same preview and review model.",
    evidence: "The automated mobile journey completes the entire flow without dragging.",
    limitation: "Manual screen-reader testing remains part of the validation plan.",
  },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className={styles.sectionLabel}>
      <span>{number}</span>
      {children}
    </p>
  );
}

function EvidenceBadge({ children, tone = "built" }: { children: React.ReactNode; tone?: "built" | "hypothesis" | "future" }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}

export default function CaseStudyPage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTopline}>
          <span>Product design case study · 2026</span>
          <span>Concept to functional prototype</span>
        </div>
        <div className={styles.heroCopy}>
          <div>
            <p className={styles.kicker}>YATRA · COLLABORATIVE TRAVEL PLANNER</p>
            <h1>
              Great trips begin with
              <em> better planning together.</em>
            </h1>
          </div>
          <div className={styles.heroIntro}>
            <p>
              YATRA brings scattered ideas, day-by-day planning, routes and
              budget into one calm workspace—then explains what changes before
              the traveler commits to it.
            </p>
            <div className={styles.heroActions}>
              <Link href="/trip/goa/plan" className="button primary">
                Explore the prototype <ArrowUpRight size={17} />
              </Link>
              <a href="#overview" className={styles.scrollLink}>
                Read the story <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.heroStage} aria-label="YATRA product screens">
          <div className={styles.heroDesktop}>
            <Image
              src="/case-study/plan-desktop.png"
              alt="YATRA desktop planning workspace with timeline and illustrative Goa map"
              width={1440}
              height={1000}
              priority
            />
          </div>
          <div className={styles.heroMobile}>
            <Image
              src="/case-study/plan-mobile.png"
              alt="YATRA mobile itinerary timeline"
              width={390}
              height={844}
              priority
            />
          </div>
          <div className={styles.heroNote}>
            <Route size={18} />
            <span>One plan. Every consequence visible.</span>
          </div>
        </div>

        <dl className={styles.metadata}>
          <div><dt>Role</dt><dd>Product design · UX · Frontend</dd></div>
          <div><dt>Owner</dt><dd>Mitali Giri</dd></div>
          <div><dt>Platform</dt><dd>Responsive web</dd></div>
          <div><dt>Status</dt><dd>Functional portfolio prototype</dd></div>
          <div><dt>Stack</dt><dd>Next.js · TypeScript · React</dd></div>
        </dl>
      </section>

      <div className={styles.storyLayout}>
        <aside className={styles.storyNav} aria-label="Case study sections">
          <p>Inside the project</p>
          {nav.map(([number, label, id]) => (
            <a key={id} href={`#${id}`}>
              <span>{number}</span>{label}
            </a>
          ))}
        </aside>

        <div className={styles.story}>
          <section id="overview" className={styles.section}>
            <SectionLabel number="01">Project overview</SectionLabel>
            <div className={styles.splitLead}>
              <h2>A travel planner built around the moment plans change.</h2>
              <div>
                <p className={styles.lead}>
                  YATRA is a self-initiated product concept for independent
                  travelers who collect ideas across social media, maps, blogs,
                  notes and chats, then struggle to turn them into one workable trip.
                </p>
                <p>
                  The prototype focuses on a four-day Goa trip for two people.
                  Its strongest interaction is adaptive itinerary editing: move
                  one café, understand the route, time and budget impact, resolve
                  a reservation conflict, and apply one coherent revision.
                </p>
              </div>
            </div>
            <div className={styles.statusGrid}>
              <article><EvidenceBadge>Built</EvidenceBadge><strong>Trip creation, overview, timeline, map, budget and revision flow</strong></article>
              <article><EvidenceBadge tone="hypothesis">Simulated</EvidenceBadge><strong>AI generation, travel estimates and local prototype authentication</strong></article>
              <article><EvidenceBadge tone="future">Future</EvidenceBadge><strong>Real collaboration, live travel data, booking and multi-device sync</strong></article>
            </div>
          </section>

          <section id="problem" className={`${styles.section} ${styles.darkSection}`}>
            <SectionLabel number="02">The problem</SectionLabel>
            <h2>Planning together often means managing information everywhere.</h2>
            <p className={styles.problemStatement}>
              The design hypothesis: when ideas, locations, budgets and group
              decisions live in separate tools, travelers lose the relationship
              between <em>what they want to do</em> and <em>what the day can hold.</em>
            </p>
            <div className={styles.fragmentation}>
              <div className={styles.scatter} aria-label="Fragmented planning tools">
                {["Saved reel", "Map pin", "Group chat", "Notes", "Booking tab"].map((item, i) => (
                  <span key={item} style={{ "--i": i } as React.CSSProperties}>{item}</span>
                ))}
              </div>
              <div className={styles.transformArrow}><ChevronRight size={26} /><span>intended approach</span></div>
              <div className={styles.unified}>
                <span>DAY 02 · ANJUNA</span>
                <strong>One shared planning context</strong>
                <div><Clock3 size={16} /> Time</div>
                <div><Map size={16} /> Route</div>
                <div><Wallet size={16} /> Budget</div>
              </div>
            </div>
            <p className={styles.caption}>Conceptual comparison. This is a design direction, not a measured outcome.</p>
          </section>

          <section id="strategy" className={styles.section}>
            <SectionLabel number="03">Discovery & strategy</SectionLabel>
            <div className={styles.splitLead}>
              <h2>Start with an honest hypothesis, then design the riskiest interaction.</h2>
              <div>
                <p className={styles.lead}>
                  No primary interview study is documented for this concept.
                  The work began from an exploratory product hypothesis and a
                  requirements-led review of common trip-planning behaviors.
                </p>
                <p>
                  Instead of presenting assumptions as findings, the case study
                  records what informed the design, what the prototype can prove,
                  and what still needs research.
                </p>
              </div>
            </div>

            <div className={styles.researchLedger}>
              <article><Eye size={20} /><span>Observed in product ecology</span><strong>Planning spans maps, messages, notes and booking sites.</strong></article>
              <article><CircleDashed size={20} /><span>Assumption to test</span><strong>Travelers will value impact review more than full regeneration.</strong></article>
              <article><Check size={20} /><span>Verified in prototype</span><strong>One revision model can keep plan, map and budget synchronized.</strong></article>
            </div>

            <div className={styles.hmw}>
              <span>HOW MIGHT WE</span>
              <blockquote>
                Make planning a trip with others feel organized, collaborative
                and enjoyable instead of fragmented and overwhelming?
              </blockquote>
            </div>

            <div className={styles.principles}>
              {principles.map(([title, text], i) => (
                <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </section>

          <section id="architecture" className={`${styles.section} ${styles.sandSection}`}>
            <SectionLabel number="04">Information architecture & flows</SectionLabel>
            <h2>A shallow structure keeps planning context close.</h2>
            <p className={styles.sectionIntro}>
              The implemented architecture moves from product entry to trip setup,
              then holds the traveler inside one Goa context across Overview, Plan and Budget.
            </p>
            <div className={styles.ia}>
              <div className={styles.iaRoot}><strong>YATRA</strong><small>Product entry</small></div>
              <div className={styles.iaLine} />
              <div className={styles.iaColumns}>
                <article><span>ENTRY</span><strong>Landing</strong><strong>Sign up / Log in</strong><strong>Trips home</strong></article>
                <article><span>CREATE</span><strong>Trip brief</strong><strong>Review</strong><strong>Generation</strong></article>
                <article><span>TRIP CONTEXT</span><strong>Overview</strong><strong>Plan · Timeline / Map</strong><strong>Budget</strong></article>
              </div>
              <p><EvidenceBadge tone="future">Future layer</EvidenceBadge> Invitations, permissions and shared activity are not implemented.</p>
            </div>

            <div className={styles.flowBlock}>
              <div className={styles.flowHeading}><span>SIGNATURE FLOW</span><h3>Move a café without losing the plan.</h3></div>
              <ol className={styles.flow}>
                {["Select café", "Choose Day 2", "Preview impact", "See 20 min conflict", "Choose resolution", "Apply revision", "Undo if needed"].map((step, i) => (
                  <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
                ))}
              </ol>
            </div>

            <div className={styles.journeyMap}>
              <div className={styles.flowHeading}><span>HYPOTHESIZED JOURNEY</span><h3>Four friends plan a long weekend.</h3></div>
              <div className={styles.journeyGrid}>
                {["Decide", "Collect", "Organize", "Review", "Prepare"].map((stage, i) => (
                  <article key={stage}>
                    <span>0{i + 1}</span><h4>{stage}</h4>
                    <p>{[
                      "Align on destination, pace and budget.",
                      "Bring saved places into one context.",
                      "Shape ideas into days and routes.",
                      "Resolve conflicts and understand spend.",
                      "Return to one accepted plan before travel.",
                    ][i]}</p>
                  </article>
                ))}
              </div>
              <p className={styles.caption}>Proposed scenario for usability testing; no emotional scores or participant claims are implied.</p>
            </div>
          </section>

          <section id="decisions" className={styles.section}>
            <SectionLabel number="05">Key UX decisions</SectionLabel>
            <h2>The product’s intelligence stays visible, reversible and under user control.</h2>
            <div className={styles.decisionList}>
              {decisions.map((decision) => (
                <article key={decision.number}>
                  <span className={styles.decisionNumber}>{decision.number}</span>
                  <div>
                    <h3>{decision.title}</h3>
                    <dl>
                      <div><dt>Challenge</dt><dd>{decision.challenge}</dd></div>
                      <div><dt>Solution</dt><dd>{decision.solution}</dd></div>
                      <div><dt>Evidence</dt><dd>{decision.evidence}</dd></div>
                      <div><dt>Limitation</dt><dd>{decision.limitation}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="solution" className={`${styles.section} ${styles.showcase}`}>
            <SectionLabel number="06">Final solution</SectionLabel>
            <h2>Travel editorial meets a precise planning workspace.</h2>
            <p className={styles.sectionIntro}>The product moves from inspiration to structured decision-making without switching visual identities.</p>

            <div className={styles.showcaseRow}>
              <div className={styles.showcaseCopy}><span>01 · DISCOVER</span><h3>Begin with possibility.</h3><p>Destination photography and selective serif typography make the entry feel like travel, while one primary action keeps the path clear.</p></div>
              <figure><Image src="/case-study/landing-desktop.png" alt="YATRA landing page" width={1440} height={1000} /><figcaption>Editorial entry · direct route into planning</figcaption></figure>
            </div>

            <div className={`${styles.showcaseRow} ${styles.reverse}`}>
              <div className={styles.showcaseCopy}><span>02 · FRAME THE TRIP</span><h3>Turn a loose wish into a useful brief.</h3><p>The Goa fixture combines travelers, budget, pace and interests before generation. The plan remains explicitly editable.</p></div>
              <figure><Image src="/case-study/create-desktop.png" alt="YATRA create trip screen" width={1440} height={980} /><figcaption>Deterministic input fixture · ₹40,000 shared budget</figcaption></figure>
            </div>

            <div className={styles.showcaseRow}>
              <div className={styles.showcaseCopy}><span>03 · SEE THE WHOLE TRIP</span><h3>Connect chronology with geography.</h3><p>Desktop places timeline and map side by side. Selecting either surface synchronizes the other; mobile uses a context-preserving switch.</p></div>
              <figure><Image src="/case-study/plan-desktop.png" alt="YATRA timeline and illustrative map workspace" width={1440} height={1000} /><figcaption>Accepted plan · Day 1 · ₹37,600</figcaption></figure>
            </div>

            <div className={`${styles.signaturePanel}`}>
              <div className={styles.signatureCopy}>
                <span>04 · MANAGE CHANGE</span>
                <h3>Show the ripple before asking for commitment.</h3>
                <p>The café move is the requested change. Timing, route and budget are consequences. A walk is an optional suggestion. The interface never mixes them.</p>
                <ul>
                  <li><Clock3 size={17} /> Café ends 5:00 pm · 20 min travel · 5:00 pm reservation</li>
                  <li><Wallet size={17} /> ₹37,600 → ₹38,000 · +₹400 estimated transport</li>
                  <li><Route size={17} /> Accepted route remains visible until Apply</li>
                </ul>
              </div>
              <figure><Image src="/case-study/conflict-desktop.png" alt="YATRA Impact Review showing a 20-minute reservation conflict" width={1440} height={1000} /><figcaption>Impact Review · unresolved proposal</figcaption></figure>
            </div>

            <div className={styles.mobileShowcase}>
              <div className={styles.mobileCopy}><span>05 · PLAN ANYWHERE</span><h3>Focused tasks, not a compressed desktop.</h3><p>Timeline and map become switchable views. Impact Review becomes a full-screen decision task while selection and proposal state remain intact.</p></div>
              <div className={styles.phone}><Image src="/case-study/plan-mobile.png" alt="Mobile YATRA timeline" width={390} height={844} /></div>
              <div className={`${styles.phone} ${styles.phoneLift}`}><Image src="/case-study/conflict-mobile.png" alt="Mobile YATRA conflict review" width={390} height={844} /></div>
              <div className={styles.phone}><Image src="/case-study/map-mobile.png" alt="Mobile YATRA illustrative map" width={390} height={844} /></div>
            </div>

            <div className={`${styles.showcaseRow} ${styles.reverse}`}>
              <div className={styles.showcaseCopy}><span>06 · CLOSE THE LOOP</span><h3>Make spend part of the plan.</h3><p>Daily and category totals reconcile to one trip estimate. After Apply, the budget explains that the café moved rather than being charged twice.</p></div>
              <figure><Image src="/case-study/budget-desktop.png" alt="YATRA budget view after the itinerary change" width={1440} height={1000} /><figcaption>Budget consequence · transport delta explained</figcaption></figure>
            </div>
          </section>

          <section id="system" className={`${styles.section} ${styles.systemSection}`}>
            <SectionLabel number="07">Visual system & accessibility</SectionLabel>
            <div className={styles.splitLead}>
              <h2>A warm editorial identity, disciplined by product semantics.</h2>
              <p className={styles.lead}>Instrument Serif is reserved for destination moments. Manrope carries every functional decision. Photography supplies most of the color; forest green signals brand and action.</p>
            </div>
            <div className={styles.palette} aria-label="YATRA color system">
              {[
                ["Canvas", "#F7F5EF"], ["Paper", "#FCFBF7"], ["Sand", "#EDE4D2"],
                ["Forest", "#1F513F"], ["Ink", "#20211D"], ["Warning", "#95601D"],
              ].map(([name, hex]) => <div key={name} style={{ "--swatch": hex } as React.CSSProperties}><span /><strong>{name}</strong><code>{hex}</code></div>)}
            </div>
            <div className={styles.typeSpecimen}>
              <div><span>INSTRUMENT SERIF · EDITORIAL</span><strong>Leave room for the journey.</strong></div>
              <div><span>MANROPE · PRODUCT UI</span><strong>Day 2 · A little local life</strong><p>Clear labels, readable metadata and 44px preferred controls.</p></div>
            </div>
            <div className={styles.accessGrid}>
              {["Visible keyboard focus", "Semantic timeline and dialogs", "Non-drag Move flow", "Text alternatives for the map", "Color plus labels and icons", "Reduced-motion behavior", "390px and 320px reflow checks", "Automated WCAG A/AA scan"].map((item) => <div key={item}><Check size={16} />{item}</div>)}
            </div>
            <p className={styles.disclaimer}>Automated checks passed on the tested journeys. Full WCAG 2.2 AA compliance is not claimed; manual screen-reader, zoom and real-device testing remain.</p>
          </section>

          <section className={styles.section}>
            <SectionLabel number="08">Usability validation plan</SectionLabel>
            <h2>The next milestone is evidence, not more surface area.</h2>
            <div className={styles.validationGrid}>
              {[
                ["Create", "Set up a four-day trip with a shared budget."],
                ["Interpret", "Explain the ₹400 increase without prompting."],
                ["Resolve", "Move the café and protect the reservation."],
                ["Recover", "Undo the accepted change and verify restoration."],
                ["Switch", "Find the selected activity between mobile Timeline and Map."],
              ].map(([title, task], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{task}</p></article>)}
            </div>
            <p className={styles.sectionIntro}>Observe completion, navigation errors, interpretation of preview versus accepted state, confidence in Apply, and discovery of Undo. No participants or outcomes are claimed yet.</p>
          </section>

          <section id="reflection" className={`${styles.section} ${styles.reflection}`}>
            <SectionLabel number="09">Outcomes & reflection</SectionLabel>
            <div className={styles.outcomes}>
              <article><span>DESIGNED</span><strong>End-to-end entry, itinerary and decision architecture</strong></article>
              <article><span>BUILT</span><strong>11 core routes and a synchronized revision prototype</strong></article>
              <article><span>EVALUATED</span><strong>Desktop and mobile automated journeys with accessibility checks</strong></article>
              <article><span>UNPROVEN</span><strong>Recommendation quality, real collaboration and planning efficiency</strong></article>
            </div>
            <blockquote>
              The most useful intelligence was not generating more ideas. It was
              helping a traveler understand the consequence of one decision.
            </blockquote>
            <div className={styles.learningGrid}>
              <article><h3>What I learned</h3><p>Shared planning needs visible ownership and revision boundaries. Explainable proposals create a foundation for collaboration before permissions or real-time presence are added.</p></article>
              <article><h3>What I would change</h3><p>Begin formative testing earlier, especially around transport deltas and the distinction between preview and accepted data. The next iteration should follow observed confusion.</p></article>
              <article><h3>What comes next</h3><p>Test the signature flow, define collaborator roles, and validate whether lightweight voting or proposal review best fits group decisions before building a backend.</p></article>
            </div>
            <div className={styles.endCard}>
              <p>YATRA · A product exploration by Mitali Giri</p>
              <h2>See the planning decision in motion.</h2>
              <div>
                <Link href="/trip/goa/plan" className="button primary">Open the prototype <ArrowUpRight size={17} /></Link>
                <Link href="/" className="button secondary">Visit YATRA</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
