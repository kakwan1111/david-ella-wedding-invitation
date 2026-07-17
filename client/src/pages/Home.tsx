/**
 * 霧晨莊園：長卷式歐式水彩喜帖。以信箋留白、非對稱植物框景與古金細線呈現莊重而親密的婚禮儀式感。
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, ChevronDown, MapPin, Navigation } from "lucide-react";

const ASSETS = {
  hero: "/manus-storage/wedding-hero-rev2_7ea112bc.jpg",
  venue: "/manus-storage/wedding-venue-rev2_271b07cf.jpg",
  monogram: "/manus-storage/de-monogram-clean_9e658f51.png",
  divider: "/manus-storage/botanical-divider-rev2_0775b94f.png",
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Diamond() {
  return <span className="ornament-diamond" aria-hidden="true" />;
}

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      <div className="heading-rule" aria-hidden="true"><span /><Diamond /><span /></div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, reduceMotion ? 0 : 18]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.24 },
        variants: reveal,
        transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
      };

  const addToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//David and Ella Wedding//EN",
      "BEGIN:VEVENT",
      "UID:david-ella-wedding-20270124@example.com",
      "DTSTAMP:20260717T000000Z",
      "DTSTART:20270124T030000Z",
      "DTEND:20270124T070000Z",
      "SUMMARY:David Wong & Ella Au Wedding",
      "LOCATION:Harbour View Ballroom, 4/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central",
      "DESCRIPTION:Reception at 11:00 AM; Ceremony & Luncheon at 11:30 AM.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "David-Ella-Wedding.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="invitation-shell">
      <header className={`floating-header ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="brand-mark" aria-label="David and Ella wedding invitation">
          <img src={ASSETS.monogram} alt="David 與 Ella 的 D E 字母花押" />
        </a>
        <span className="header-date">24 · 01 · 2027</span>
        <a className="header-place" href="#venue">Hong Kong</a>
      </header>

      <section id="top" className="hero-section">
        <motion.div className="hero-art" style={{ y: heroY, backgroundImage: `url(${ASSETS.hero})` }} />
        <div className="hero-wash" />
        <div className="hero-date-rail" aria-hidden="true">
          <span>Sunday</span><i /><span>Hong Kong</span>
        </div>

        <motion.div
          className="hero-content"
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="family-line">Together with their families</p>
          <p className="family-line-zh">在雙方家長及家人的見證下</p>
          <div className="hero-arch">
            <span className="arch-flourish">D · E</span>
            <h1>
              <span>David Wong</span>
              <em>&amp;</em>
              <span>Ella Au</span>
            </h1>
          </div>
          <div className="invitation-copy">
            <p>誠邀您一同見證及慶祝我們的婚禮</p>
            <p lang="en">Cordially invite you to witness and celebrate their wedding</p>
          </div>
        </motion.div>

        <a className="scroll-cue" href="#date" aria-label="向下查看婚禮詳情">
          <span>Discover</span><ChevronDown size={17} strokeWidth={1.3} />
        </a>
      </section>

      <section id="date" className="date-section paper-section">
        <motion.div className="date-composition" {...motionProps}>
          <div className="date-number" aria-hidden="true">24</div>
          <div className="date-copy">
            <span className="eyebrow">Save the date</span>
            <h2>2027年1月24日 <small>星期日</small></h2>
            <p>Sunday, January 24, 2027</p>
          </div>
          <div className="month-stamp">
            <span>JAN</span>
            <i />
            <span>2027</span>
          </div>
        </motion.div>
        <motion.button className="text-action" onClick={addToCalendar} type="button" {...motionProps}>
          <CalendarPlus size={17} strokeWidth={1.4} />
          <span>加入行事曆</span>
          <small>Add to calendar</small>
        </motion.button>
      </section>

      <div className="botanical-transition" aria-hidden="true">
        <img src={ASSETS.divider} alt="" />
      </div>

      <section className="schedule-section">
        <motion.div {...motionProps}>
          <SectionHeading eyebrow="The celebration">婚禮流程</SectionHeading>
        </motion.div>
        <div className="timeline">
          <motion.article className="timeline-item timeline-item-left" {...motionProps}>
            <div className="time-face"><span>11</span><i /><small>00</small></div>
            <div className="timeline-copy">
              <p className="zh">上午十一時正 恭候</p>
              <p className="en">11:00 AM Reception</p>
            </div>
          </motion.article>
          <div className="timeline-spine" aria-hidden="true"><Diamond /><span /><Diamond /></div>
          <motion.article className="timeline-item timeline-item-right" {...motionProps}>
            <div className="time-face"><span>11</span><i /><small>30</small></div>
            <div className="timeline-copy">
              <p className="zh">上午十一時三十分 儀式及午宴</p>
              <p className="en">11:30 AM Ceremony &amp; Luncheon</p>
            </div>
          </motion.article>
        </div>
      </section>

      <section id="venue" className="venue-section paper-section">
        <motion.div className="venue-art" {...motionProps}>
          <img src={ASSETS.venue} alt="維多利亞港畔的典雅水彩禮堂" />
          <span className="venue-index">04 / F</span>
        </motion.div>
        <motion.div className="venue-copy" {...motionProps}>
          <span className="eyebrow">The venue</span>
          <h2>香港四季酒店<br />四樓海景禮堂</h2>
          <p className="venue-en">Harbour View Ballroom, 4/F,<br />Four Seasons Hotel Hong Kong</p>
          <div className="address-rule" />
          <p className="address">中環金融街8號<br /><span>8 Finance Street, Central</span></p>
          <a
            className="map-action"
            href="https://www.google.com/maps/search/?api=1&query=Four+Seasons+Hotel+Hong+Kong+8+Finance+Street+Central"
            target="_blank"
            rel="noreferrer"
          >
            <span className="map-icon"><MapPin size={19} strokeWidth={1.4} /></span>
            <span>查看婚宴地點<small>View on Google Maps</small></span>
            <Navigation size={16} strokeWidth={1.3} />
          </a>
        </motion.div>
      </section>

      <footer className="invitation-footer">
        <img className="footer-botanical" src={ASSETS.divider} alt="" aria-hidden="true" />
        <img src={ASSETS.monogram} alt="" aria-hidden="true" />
        <p>We look forward to celebrating with you.</p>
        <div className="footer-rule"><span /><Diamond /><span /></div>
        <small>DAVID &amp; ELLA · 24 JANUARY 2027</small>
      </footer>
    </main>
  );
}
