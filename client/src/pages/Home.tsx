/**
 * 霧晨莊園：長卷式歐式水彩喜帖。以信箋留白、非對稱植物框景與古金細線呈現莊重而親密的婚禮儀式感。
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, ChevronDown, MapPin, Navigation } from "lucide-react";

const ASSETS = {
  hero: "/manus-storage/wedding-hero-rev2_7ea112bc.jpg",
  venue: "/manus-storage/wedding-venue-rev2_271b07cf.jpg",
  monogram: "/manus-storage/names-handwritten-monogram_accc1de9.png",
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
          <div className="hero-arch">
            <span className="arch-flourish">D · E</span>
            <h1>
              <span>Ella Au</span>
              <em>&amp;</em>
              <span>David Wong</span>
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

      <section className="rsvp-section paper-section">
        <motion.div className="rsvp-container" {...motionProps}>
          <SectionHeading eyebrow="Please Respond">RSVP</SectionHeading>
          <form className="rsvp-form" action="https://formspree.io/f/maqrjqyj" method="POST">
            <div className="form-group">
              <label htmlFor="guestName">Your Name *</label>
              <input type="text" id="guestName" name="guestName" required placeholder="Full Name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guestEmail">Email</label>
                <input type="email" id="guestEmail" name="guestEmail" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="guestPhone">Phone</label>
                <input type="tel" id="guestPhone" name="guestPhone" placeholder="+852 XXXX XXXX" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numberOfAdults">Number of Adults *</label>
                <select id="numberOfAdults" name="numberOfAdults" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numberOfChildren">Number of Children</label>
                <select id="numberOfChildren" name="numberOfChildren">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rsvpStatus">Will you be attending? *</label>
              <select id="rsvpStatus" name="rsvpStatus" required>
                <option value="">Please select</option>
                <option value="attending">Yes, I will attend</option>
                <option value="not_attending">No, I cannot attend</option>
                <option value="pending">I will let you know</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
              <input type="text" id="dietaryRestrictions" name="dietaryRestrictions" placeholder="e.g., Vegetarian, Gluten-free" />
            </div>

            <div className="form-group">
              <label htmlFor="specialNotes">Special Notes</label>
              <textarea id="specialNotes" name="specialNotes" placeholder="Any special requests or messages for us..." rows={4} />
            </div>

            <button type="submit" className="rsvp-submit">Submit RSVP</button>
          </form>
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
