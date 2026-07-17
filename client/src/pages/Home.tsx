/**
 * 霧晨莊園：長卷式歐式水彩喜帖。以信箋留白、非對稱植物框景與古金細線呈現莊重而親密的婚禮儀式感。
 * 全端版本：整合檔案存儲與使用者認證。
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, ChevronDown, MapPin, Navigation } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

const ASSETS = {
  hero: "/manus-storage/wedding-hero-rev2_7ea112bc.jpg",
  venue: "/manus-storage/wedding-venue-rev2_271b07cf.jpg",
  monogram: "/manus-storage/names-handwritten-monogram_accc1de9.png",
  divider: "/manus-storage/botanical-divider-rev2_0775b94f.png",
  flowerLeft: "/manus-storage/flower-bloom-left_c0464393.png",
  flowerRight: "/manus-storage/flower-bloom-right_fb541c9a.png",
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
  const { user, isAuthenticated } = useAuth();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, reduceMotion ? 0 : 18]);
  const [scrolled, setScrolled] = useState(false);
  const [flowerBloom, setFlowerBloom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setFlowerBloom(window.scrollY > 200);
    };
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
      <div className="flower-bloom-container">
        <img
          src={ASSETS.flowerLeft}
          alt=""
          className={`flower-bloom-left ${flowerBloom ? "visible" : ""}`}
          aria-hidden="true"
        />
        <img
          src={ASSETS.flowerRight}
          alt=""
          className={`flower-bloom-right ${flowerBloom ? "visible" : ""}`}
          aria-hidden="true"
        />
      </div>
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
          <div className="hero-arch">
            <span className="arch-flourish">D · E</span>
            <h1>
              <span>David Wong</span>
              <em>&amp;</em>
              <span>Ella Au</span>
            </h1>
          </div>
          <div className="invitation-copy">
            <p lang="en">Cordially invite you to witness and celebrate their wedding</p>
            <p>誠邀您一同見證及慶祝我們的婚禮</p>
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
            <h2>Sunday, January 24, 2027</h2>
            <p>2027年1月24日 星期日</p>
          </div>
          <div className="month-stamp">
            <span>JAN</span>
            <i />
            <span>2027</span>
          </div>
        </motion.div>
        <motion.button className="text-action" onClick={addToCalendar} type="button" {...motionProps}>
          <CalendarPlus size={17} strokeWidth={1.4} />
          <span>Add to calendar</span>
          <small>加入行事曆</small>
        </motion.button>
      </section>

      <div className="botanical-transition" aria-hidden="true">
        <img src={ASSETS.divider} alt="" />
      </div>

      <section className="schedule-section">
        <motion.div className="schedule-header" {...motionProps}>
          <SectionHeading eyebrow="The celebration">Schedule</SectionHeading>
        </motion.div>
        <div className="schedule-grid">
          <motion.article className="schedule-card" {...motionProps}>
            <div className="schedule-time">11:00 AM</div>
            <div className="schedule-event">
              <p className="event-title">Reception</p>
              <p className="event-subtitle">恭候</p>
            </div>
          </motion.article>
          <motion.article className="schedule-card" {...motionProps}>
            <div className="schedule-time">11:30 AM</div>
            <div className="schedule-event">
              <p className="event-title">Ceremony &amp; Luncheon</p>
              <p className="event-subtitle">儀式及午宴</p>
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
          <h2>Harbour View Ballroom<br />Four Seasons Hotel Hong Kong</h2>
          <p className="venue-zh">香港四季酒店 四樓海景禮堂</p>
          <div className="address-rule" />
          <p className="address">8 Finance Street, Central<br /><span>中環金融街8號</span></p>
          <a
            className="map-action"
            href="https://www.google.com/maps/search/?api=1&query=Four+Seasons+Hotel+Hong+Kong+8+Finance+Street+Central"
            target="_blank"
            rel="noreferrer"
          >
            <span className="map-icon"><MapPin size={19} strokeWidth={1.4} /></span>
            <span>View on Google Maps<small>查看婚宴地點</small></span>
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
