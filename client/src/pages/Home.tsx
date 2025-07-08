import React, { useState, useEffect, useRef } from "react";
import Login from "./Login";
import Register from "./Register";

// Example event data (replace with API data as needed)
const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-08-15",
    description: "Join the biggest tech conference of the year with top speakers and workshops.",
    type: "Conference",
    image: "https://images.unsplash.com/photo-1590674680695-8b9efe9b764d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Music Fest",
    date: "2024-09-10",
    description: "Experience live music from world-renowned artists in an open-air venue.",
    type: "Music",
    image: "https://images.unsplash.com/photo-1598519500913-1aa21b78d5ac?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "2024-07-25",
    description: "Watch startups pitch their ideas to investors and network with entrepreneurs.",
    type: "Startup",
    image: "https://images.unsplash.com/photo-1477351583523-5cc479a2c4e5?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Art & Culture Expo",
    date: "2024-10-05",
    description: "A celebration of art, culture, and creativity with exhibitions and performances.",
    type: "Art",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
];

const eventTypes = Array.from(new Set(events.map(e => e.type)));

const Home: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const openLogin = () => {
    setShowRegister(false);
    setShowPopup(true);
  };
  const openRegister = () => {
    setShowRegister(true);
    setShowPopup(true);
  };
  const closePopup = () => setShowPopup(false);

  // Auto-slide logic
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  const goToSlide = (idx: number) => setCurrentSlide(idx);

  // Filtered events for left filter
  const uniqueDates = Array.from(new Set(events.map(e => e.date))).sort();
  const filteredEvents = events.filter(e =>
    (!selectedDate || e.date === selectedDate) &&
    (selectedType === "All" || e.type === selectedType)
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Event Booking Platform</h1>
        <nav>
          <button style={styles.linkBtn} onClick={openLogin}>Login</button>
          <button style={styles.linkBtn} onClick={openRegister}>Register</button>
        </nav>
      </header>
      <section style={styles.sliderSection}>
        <div style={styles.leftFilter}>
          <h3 style={styles.filterTitle}>Upcoming Shows</h3>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>By Date</label>
            <select
              style={styles.filterSelect}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>By Type</label>
            <select
              style={styles.filterSelect}
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div style={styles.filterList}>
            {filteredEvents.map(ev => (
              <div key={ev.id} style={styles.filterEventCard}>
                <div style={styles.filterEventTitle}>{ev.title}</div>
                <div style={styles.filterEventDate}>{new Date(ev.date).toLocaleDateString()}</div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div style={styles.noEvent}>No events found</div>
            )}
          </div>
        </div>
        <div style={styles.sliderWrapper}>
          <div
            style={{
              ...styles.slider,
              transform: `translateX(-${currentSlide * 100}vw)`,
              width: `${events.length * 100}vw`,
            }}
          >
            {events.map((event, idx) => (
              <div key={event.id} style={styles.slide}>
                <img src={event.image} alt={event.title} style={styles.slideImage} />
                <div style={styles.slideContent}>
                  <h2 style={styles.slideTitle}>{event.title}</h2>
                  <div style={styles.slideDate}>{new Date(event.date).toLocaleDateString()}</div>
                  <p style={styles.slideDesc}>{event.description}</p>
                  <a href="/organize-event" style={styles.ctaButton}>Book Now</a>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.sliderNav}>
            {events.map((_, idx) => (
              <button
                key={idx}
                style={{
                  ...styles.sliderDot,
                  background: idx === currentSlide ? "#1976d2" : "#b3c6e0",
                }}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* All Shows Section */}
      <section style={styles.allShowsSection}>
        <h2 style={styles.allShowsTitle}>All Shows</h2>
        <div style={styles.cardGrid}>
          {events.map(ev => (
            <div key={ev.id} style={styles.card}>
              <img src={ev.image} alt={ev.title} style={styles.cardImg} />
              <div style={styles.cardBody}>
                <div style={styles.cardType}>{ev.type}</div>
                <div style={styles.cardTitle}>{ev.title}</div>
                <div style={styles.cardDate}>{new Date(ev.date).toLocaleDateString()}</div>
                <div style={styles.cardDesc}>{ev.description}</div>
                <a href="/organize-event" style={styles.cardBtn}>Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {showPopup && (
        <div style={styles.popupOverlay} onClick={closePopup}>
          <div
            style={{
              ...styles.popup,
              perspective: 1200,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                ...styles.flipCardInner,
                transform: showRegister ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div style={{ ...styles.flipCardFace, ...styles.flipCardFront }}>
                <Login
                  onSwitch={() => setShowRegister(true)}
                  onClose={closePopup}
                />
              </div>
              <div style={{ ...styles.flipCardFace, ...styles.flipCardBack }}>
                <Register
                  onSwitch={() => setShowRegister(false)}
                  onClose={closePopup}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
    position: "relative",
    width: "100vw",
    overflowX: "hidden",
    marginLeft: "-60px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 40px",
    background: "#1976d2",
    width: "100vw",
    boxSizing: "border-box",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    margin: 0,
  },
  linkBtn: {
    color: "#fff",
    marginLeft: 24,
    background: "none",
    border: "none",
    fontWeight: 500,
    fontSize: 18,
    cursor: "pointer",
  },
  sliderSection: {
    width: "100vw",
    minHeight: 440,
    background: "transparent",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: "40px 0 0 0",
    padding: 0,
    overflow: "hidden",
  },
  leftFilter: {
    width: 260,
    minWidth: 220,
    background: "#f5faff",
    borderRadius: 16,
    boxShadow: "0 2px 12px rgba(25,118,210,0.07)",
    padding: "24px 18px",
    margin: "0 24px 0 32px",
    height: 400,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "stretch",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1976d2",
    marginBottom: 10,
    textAlign: "left",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 8,
    textAlign: "center"
  },
  filterLabel: {
    fontWeight: 600,
    color: "#1976d2",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "left",
  },
  filterSelect: {
    padding: "7px 10px",
    borderRadius: 6,
    border: "1.2px solid #b3c6e0",
    fontSize: 15,
    // background: "#fff",
    outline: "none",
    fontWeight: 500,
  },
  filterList: {
    flex: 1,
    overflowY: "auto",
    marginTop: 8,
  },
  filterEventCard: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(25,118,210,0.06)",
    padding: "10px 12px",
    marginBottom: 8,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  filterEventTitle: {
    fontWeight: 600,
    color: "#1976d2",
    fontSize: 15,
  },
  filterEventDate: {
    fontSize: 13,
    color: "#388e3c",
    fontWeight: 500,
  },
  noEvent: {
    color: "#888",
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
  },
  sliderWrapper: {
    width: "calc(100vw - 340px)",
    overflow: "hidden",
    position: "relative",
    margin: 0,
    padding: 0,
  },
  slider: {
    display: "flex",
    transition: "transform 0.8s cubic-bezier(.4,2,.6,1)",
    height: 400,
  },
  slide: {
    width: "calc(100vw - 80px)",
    height: 400,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
    borderRadius: 18,
    // background: "#fff",
  },
  slideImage: {
    // minWidth: 420,
    // maxWidth: 600,
    width: "50vw",
    height: "100%",
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
    filter: "brightness(0.97) saturate(1.05)",
    transition: "filter 0.3s",
  },
  slideContent: {
    position: "absolute",
    right: "4vw",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.97)",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
    padding: "28px 32px",
    minWidth: 300,
    maxWidth: 400,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  slideTitle: {
    fontSize: 32,
    color: "#1976d2",
    fontWeight: 800,
    marginBottom: 8,
    marginTop: 0,
    letterSpacing: 0.5,
  },
  slideDate: {
    fontSize: 17,
    color: "#388e3c",
    fontWeight: 600,
    marginBottom: 12,
  },
  slideDesc: {
    fontSize: 18,
    color: "#444",
    marginBottom: 24,
    fontWeight: 500,
  },
  ctaButton: {
    display: "inline-block",
    padding: "14px 32px",
    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
    color: "#fff",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 600,
    textDecoration: "none",
    transition: "background 0.2s",
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
    letterSpacing: 0.5,
  },
  sliderNav: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 12,
    zIndex: 10,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
    outline: "none",
  },
  allShowsSection: {
    width: "100vw",
    background: "#f5faff",
    padding: "48px 0 60px 0",
    marginTop: 40,
  },
  allShowsTitle: {
    fontSize: 28,
    color: "#1976d2",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(25, 118, 210, 0.10)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minHeight: 420,
    position: "relative",
    transition: "box-shadow 0.2s",
  },
  cardImg: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardBody: {
    padding: "22px 20px 18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  cardType: {
    fontSize: 13,
    color: "#42a5f5",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 20,
    color: "#1976d2",
    fontWeight: 700,
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 15,
    color: "#388e3c",
    fontWeight: 600,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
    fontWeight: 500,
    flex: 1,
  },
  cardBtn: {
    display: "inline-block",
    padding: "10px 0",
    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
    color: "#fff",
    borderRadius: 8,
    fontSize: 17,
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    marginTop: "auto",
    transition: "background 0.2s",
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
    letterSpacing: 0.5,
    border: "none",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    width: 600,
    height: 480,
    background: "transparent",
    borderRadius: 18,
    boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
    position: "relative",
    perspective: 1200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flipCardInner: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 0.6s cubic-bezier(.4,2,.6,1)",
    transformStyle: "preserve-3d",
  },
  flipCardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    borderRadius: 18,
    boxShadow: "none",
    padding: 0,
  },
  flipCardFront: {
    zIndex: 2,
  },
  flipCardBack: {
    transform: "rotateY(180deg)",
    zIndex: 3,
  },
};

export default Home;
