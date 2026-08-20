import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { ScrollCue } from "@/components/ScrollCue";
import { SiteHeader } from "@/components/SiteHeader";
import { InstagramGlyph } from "@/components/InstagramGlyph";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PLAY_STORE_URL } from "@/lib/links";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How everyday drives between Kalyani and Kolkata became Rahi—and a growing community built around better roads for everyone.",
};

const chapters = [
  {
    year: "JAN · 2021",
    title: "A road I thought I knew",
    copy: "I left my job in Pune and came home to Kalyani to work independently. In the middle of COVID, work kept taking me between Kalyani and Kolkata in a borrowed Wagon R.",
  },
  {
    year: "THE DAILY DRIVE",
    title: "Kolkata taught me again",
    copy: "I had been driving for years and felt sure of myself. Kolkata—bustling, congested and unforgiving—made me realise that knowing the mechanics of a car is only a small part of driving it well.",
  },
  {
    year: "THE QUESTION",
    title: "What if care was noticed?",
    copy: "Most people around me were driving carefully. A tiny fraction made the road miserable for everyone. I could not stop wondering: how do we recognise and reward the people already making our roads safer?",
  },
  {
    year: "RAHI BEGINS",
    title: "The answer was already with us",
    copy: "Everyone carries a smartphone. What if that phone could recognise the safe drivers among us—and give that care meaning? The idea finally had a way forward. That was the moment Rahi was born.",
  },
];

export default function About() {
  return (
    <main className={styles.page}>
      <ScrollCue className={styles.scrollCue} />
      <SiteHeader current="about" />

      <section className={styles.hero}>
        <img
          src="/images/about-kolkata-hero.jpg"
          alt="Evening traffic moving through Kolkata after rain"
          fetchPriority="high"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Our story</p>
          <h1>It started with<br /><em>an everyday drive.</em></h1>
          <p>
            Before Rahi was an app, it was a question carried back and forth
            on the road between Kalyani and Kolkata.
          </p>
          <a href="#beginning">Read how it began <span>↓</span></a>
        </div>
        <p className={styles.heroNote}>KALYANI · NEWTOWN · KOLKATA</p>
      </section>

      <section className={styles.letter} id="beginning">
        <div className={styles.letterAside}>
          <p className={styles.eyebrow}>A note from the founder</p>
          <div className={styles.founderMark}>A</div>
          <p>Anirban<br /><span>Founder &amp; developer</span></p>
        </div>
        <div className={styles.letterBody}>
          <p className={styles.salutation}>Hello, fellow traveller.</p>
          <blockquote>
            “The mechanics of the car are only a small part of driving it.”
          </blockquote>
          <p>
            In January 2021, I left my job in Pune and returned home to
            Kalyani. It was the middle of COVID, public transport frightened
            all of us, and my work had me travelling to Kolkata almost every
            day. My father-in-law kindly lent me his Wagon R for those errands.
          </p>
          <p>
            I thought I knew how to drive. I had been behind the wheel for
            years and was quite sure of myself. But those daily journeys
            humbled me quickly—and left me looking at the road, and the people
            sharing it, differently.
          </p>
        </div>
      </section>

      <section className={styles.routeStory} aria-labelledby="route-title">
        <div className={styles.routeHead}>
          <p className={styles.eyebrow}>The road that shaped the idea</p>
          <h2 id="route-title">One route.<br /><span>One persistent thought.</span></h2>
        </div>
        <div className={styles.routeMap}>
          <svg viewBox="0 0 1000 310" role="img" aria-label="An illustrative route connecting Kalyani, Newtown and Kolkata">
            <path className={styles.routeGlow} d="M55 214C188 225 250 106 387 130S573 258 704 189 809 67 950 91" />
            <path className={styles.routeLine} d="M55 214C188 225 250 106 387 130S573 258 704 189 809 67 950 91" />
            <path className={styles.routeTrace} pathLength="1" d="M55 214C188 225 250 106 387 130S573 258 704 189 809 67 950 91" />
            <g transform="translate(55 214)"><circle r="9" /><circle className={styles.routeCore} r="3" /></g>
            <g transform="translate(704 189)"><circle r="9" /><circle className={styles.routeCore} r="3" /></g>
            <g transform="translate(950 91)"><circle r="9" /><circle className={styles.routeCore} r="3" /></g>
            <g className={`${styles.routeEvent} ${styles.eventOne}`} transform="translate(261 170)">
              <circle className={styles.eventHalo} r="7" />
              <circle className={styles.eventDot} r="4" />
              <text x="12" y="-10">EASED EARLY</text>
            </g>
            <g className={`${styles.routeEvent} ${styles.eventTwo}`} transform="translate(492 214)">
              <circle className={styles.eventHalo} r="7" />
              <circle className={styles.eventDot} r="4" />
              <text x="12" y="-10">SMOOTH TURN</text>
            </g>
            <g className={`${styles.routeEvent} ${styles.eventThree}`} transform="translate(824 118)">
              <circle className={styles.eventHalo} r="7" />
              <circle className={styles.eventDot} r="4" />
              <text x="12" y="20">ROAD MEMORY</text>
            </g>
          </svg>
          <span className={styles.kalyani}>KALYANI<small>Home</small></span>
          <span className={styles.newtown}>NEWTOWN<small>The daily crossing</small></span>
          <span className={styles.kolkata}>KOLKATA<small>The city that taught me</small></span>
          <div className={styles.routePulse}><i /> Countless everyday journeys</div>
        </div>
      </section>

      <section className={styles.chapters}>
        <p className={styles.eyebrow}>How a thought became Rahi</p>
        <div className={styles.chapterGrid}>
          {chapters.map((chapter, index) => (
            <article key={chapter.year}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{chapter.year}</small>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.realisation}>
        <img src="/images/about-everyday-road.jpg" alt="An everyday drive through a busy Kolkata street" loading="lazy" />
        <div className={styles.realisationShade} />
        <div className={styles.realisationCopy}>
          <p className={styles.eyebrow}>The idea at the heart of Rahi</p>
          <h2>Good driving is everywhere.<br /><em>It deserves to be seen.</em></h2>
          <p>
            Our roads are not defined by their most aggressive moments. They
            are held together by millions of small, thoughtful choices: easing
            off early, leaving room, staying patient, letting someone through.
          </p>
          <p>
            Rahi exists to recognise that quiet care—and help more of us carry
            it into the next drive.
          </p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryHead}>
          <p className={styles.eyebrow}>From one driver to many</p>
          <h2>The story is no longer<br /><span>mine alone.</span></h2>
          <p>
            Rahi began with one person and a few kilometres. Its first beta
            testers turned that small beginning into roads, memories and
            lessons that keep growing every day.
          </p>
        </div>
        <div className={styles.galleryGrid}>
          <figure className={styles.galleryTall}>
            <img src="/images/about-first-commute.jpg" alt="Kolkata traffic gathering at a city crossing" loading="lazy" />
            <figcaption><small>JANUARY · 2021</small><strong>The road became a classroom</strong></figcaption>
          </figure>
          <figure>
            <img src="/images/about-open-coast.jpg" alt="A car paused beside an open coast under a cloudy sky" loading="lazy" />
            <figcaption><small>BEYOND THE COMMUTE</small><strong>The question kept travelling</strong></figcaption>
          </figure>
          <figure>
            <img src="/images/about-road-bend.jpg" alt="A quiet green road bending through the hills" loading="lazy" />
            <figcaption><small>A WAY FORWARD</small><strong>The idea found its road</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.community}>
        <div className={styles.networkArt} aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
          <svg viewBox="0 0 700 420">
            <path d="M28 322C145 310 132 159 261 170S389 359 492 278 542 87 676 93" />
            <path d="M71 80C174 96 207 262 328 241S442 78 622 154" />
          </svg>
        </div>
        <div className={styles.communityCopy}>
          <p className={styles.eyebrow}>To our first beta testers</p>
          <h2>You are part of<br /><span>Rahi&apos;s beginning.</span></h2>
          <p>
            Thank you for putting your trust in something still finding its
            way. Some of you drive with Rahi every day. Every kilometre you
            share makes it more thoughtful for the next person on the road.
          </p>
          <p className={styles.gratitude}>It means more than I can put into an email.</p>
          <div className={styles.signature}>
            <strong>With gratitude,</strong>
            <span>Anirban</span>
            <small>Founder &amp; Developer · Rahi</small>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>This is only the beginning</p>
        <h2>Come help shape<br /><span>the road ahead.</span></h2>
        <p>Built in India, for Indian roads—and for everyone sharing them.</p>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">Get it on Google Play <span>↗</span></a>
        <a className={styles.communityCta} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <InstagramGlyph size={17} />
          <i>Follow</i>
          {INSTAGRAM_HANDLE}
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className={styles.footer}>
        <a href="/" aria-label="Rahi home"><Wordmark height={22} /></a>
        <p>Drive · Score · Improve</p>
        <div><a href="/">Home</a><a href="/privacy/">Privacy</a><a href="mailto:support@drivewithrahi.com">Contact</a><a className={styles.footerSocial} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramGlyph size={14} />Instagram</a><span>© {new Date().getFullYear()} Rahi</span></div>
      </footer>
    </main>
  );
}
