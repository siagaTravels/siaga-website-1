'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, ChevronLeft, ChevronRight,
  ArrowRight, MapPin, Clock, Star, Users, Award,
  Waves, Mountain, Leaf, Landmark, Zap, UtensilsCrossed, History, Calendar, BookOpen
} from 'lucide-react';
import { cmsApi, Destination as ApiDestination, Experience as ApiExperience, Package as ApiPackage, Blog as ApiBlog } from '@/lib/api';

// ─── DATA ────────────────────────────────────────────────

const DESTINATIONS = [
  {
    id: 'ella',
    name: 'ELLA',
    description: "Discover the scenic beauty of Ella's lush highlands and the Nine Arch Bridge.",
    cardImage: '/dest-ella.jpg',
    bgImage: '/hero-ella.jpg',
    province: 'Uva Province',
  },
  {
    id: 'sigiriya',
    name: 'SIGIRIYA',
    description: 'Ascend the ancient rock fortress, a UNESCO World Heritage Site.',
    cardImage: '/dest-kandy.jpg',
    bgImage: '/dest-kandy.jpg',
    province: 'Central Province',
  },
  {
    id: 'colombo',
    name: 'COLOMBO',
    description: 'Experience the vibrant capital with its bustling markets and modern skyline.',
    cardImage: '/dest-colombo.jpg',
    bgImage: '/hero-colombo.jpg',
    province: 'Western Province',
  },
  {
    id: 'batticaloa',
    name: 'BATTICALOA',
    description: 'Unwind by serene lagoons and golden beaches with stunning sunsets.',
    cardImage: '/dest-batticaloa.jpg',
    bgImage: '/hero-batticaloa.jpg',
    province: 'Eastern Province',
  },
  {
    id: 'kandy',
    name: 'KANDY',
    description: 'Explore the cultural heart of Sri Lanka and the sacred Temple of the Tooth.',
    cardImage: '/dest-kandy.jpg',
    bgImage: '/dest-kandy.jpg',
    province: 'Central Province',
  },
  {
    id: 'mirissa',
    name: 'MIRISSA',
    description: 'Whale-watch from paradise beaches on the southern coast.',
    cardImage: '/exp-wild.jpg',
    bgImage: '/exp-wild.jpg',
    province: 'Southern Province',
  },
  {
    id: 'nuwara-eliya',
    name: 'NUWARA ELIYA',
    description: 'Misty tea estates and cool highland air in "Little England".',
    cardImage: '/hero-nuwaraeliya.jpg',
    bgImage: '/hero-nuwaraeliya.jpg',
    province: 'Central Province',
  },
  {
    id: 'galle',
    name: 'GALLE',
    description: 'Walk the Dutch colonial ramparts of the historic Galle Fort.',
    cardImage: '/dest-batticaloa.jpg',
    bgImage: '/hero-galle.jpg',
    province: 'Southern Province',
  },
];

const EXPERIENCES = [
  { id: 'beaches', label: 'BEACHES', description: 'Crystal waters and palm-fringed shores.', icon: Waves, image: '/dest-batticaloa.jpg' },
  { id: 'mountains', label: 'MOUNTAINS', description: 'Rolling tea hills and misty peaks.', icon: Mountain, image: '/dest-ella.jpg' },
  { id: 'wildlife', label: 'WILDLIFE', description: 'Leopards, elephants, blue whales.', icon: Leaf, image: '/exp-wild.jpg' },
  { id: 'culture', label: 'CULTURE', description: 'Ancient temples and living traditions.', icon: Landmark, image: '/exp-festive.jpg' },
  { id: 'adventure', label: 'ADVENTURE', description: 'Rafting, surfing, rock climbing.', icon: Zap, image: '/exp-thrills.jpg' },
  { id: 'food', label: 'FOOD', description: 'Aromatic curries and tropical fruits.', icon: UtensilsCrossed, image: '/dest-kandy.jpg' },
  { id: 'history', label: 'HISTORY', description: '2,500 years of kings and kingdoms.', icon: History, image: '/dest-colombo.jpg' },
];

const STATS = [
  { icon: MapPin, value: '50+', label: 'Curated Destinations' },
  { icon: Star, value: '4.9', label: 'Star Rating' },
  { icon: Users, value: '1,200+', label: 'Happy Travelers' },
  { icon: Award, value: '10+', label: 'Years of Expertise' },
];

// ─── NAVBAR ──────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinks = ['Home', 'Destinations', 'Experiences', 'Tours', 'Blog', 'Contact'];

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.4s, padding 0.3s, backdrop-filter 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', transform: 'translateX(-55px)' }}>
          <div style={{
            width: 66, height: 66, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}>
            <img src="/logo.png" alt="Logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 4 }}>
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 32, color: '#FFFFFF', letterSpacing: '0.08em', lineHeight: 1 }}>
              SIAGA
            </span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFFFFF', letterSpacing: '0.35em', marginTop: 5, paddingLeft: 3 }}>
              TRAVELS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <a
              key={link}
              href={link === 'Home' ? '/' : `#${link.toLowerCase()}`}
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#E5E2E1', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 400 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#E5E2E1')}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button aria-label="Search" style={{ background: 'none', border: 'none', color: '#E5E2E1', cursor: 'pointer', padding: 4 }}>
            <Search size={20} />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(p => !p)}
            style={{ background: 'none', border: 'none', color: '#E5E2E1', cursor: 'pointer', padding: 4 }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div style={{
        maxHeight: mobileOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
        background: 'rgba(10,10,10,0.97)',
        borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}>
        <div style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {navLinks.map(link => (
            <a
              key={link}
              href={link === 'Home' ? '/' : `#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, color: '#E5E2E1', textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────

function HeroSection() {
  const [destList, setDestList] = useState(DESTINATIONS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    cmsApi.getDestinations({ page_size: 10 }).then(res => {
      if (res?.item && res.item.length > 0) {
        const liveDestinations = res.item.map((d, idx) => {
          const fallback = DESTINATIONS[idx % DESTINATIONS.length];
          return {
            id: d.slug || d.id,
            name: (d.name || '').toUpperCase(),
            description: d.subtitle || d.description || fallback.description,
            cardImage: d.image || fallback.cardImage,
            bgImage: d.image || fallback.bgImage,
            province: d.province || fallback.province,
          };
        });
        setDestList(liveDestinations);
      }
    }).catch(() => {});
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % destList.length);
  }, [destList.length]);

  const goPrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + destList.length) % destList.length);
  }, [destList.length]);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(goNext, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, goNext]);

  const active = destList[activeIndex] || destList[0];

  // Cards to show: always show 4, starting from activeIndex
  const visibleCards = [0, 1, 2, 3].map(i => destList[(activeIndex + i) % destList.length]);

  return (
    <section
      id="hero"
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 700, overflow: 'hidden' }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* ── BG Image with Ken Burns ── */}
      <div
        key={active.id}
        className="ken-burns"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${active.bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          transition: 'background-image 0.1s',
        }}
      />

      {/* ── Dark Overlay (exact Figma 40%) ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', zIndex: 1 }} />

      {/* ── Giant Watermark text — behind cards ── */}
      <div
        key={`wm-${active.id}`}
        style={{
          position: 'absolute',
          right: '-2vw',
          top: '50%',
          transform: 'translateY(-25%)',
          zIndex: 2,
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(120px, 22vw, 320px)',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.44)',
          textShadow: '-20px 4px 8px rgba(0,0,0,0.28)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '0.02em',
          animation: 'fadeWatermark 0.7s ease',
        }}
      >
        {active.name}
      </div>

      {/* ── Main Content Container ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          maxWidth: 1320, margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 0,
        }}
      >
        {/* LEFT: Headline, copy, button (Shifted further Up & Left) */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 20, transform: 'translate(-55px, -120px)' }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(64px, 8vw, 100px)',
            lineHeight: 0.92,
            color: '#fff',
            margin: 0,
            letterSpacing: '0.01em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}>
            WELCOME<br />TO SRI LANKA
          </h1>

          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: 420,
            margin: 0,
            fontWeight: 400,
          }}>
            Embark on a journey through emerald tea hills, pristine turquoise beaches, and ancient cultural heritage. Experience the authentic warmth of our island paradise.
          </p>

          <div>
            <button
              onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                color: '#fff',
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.65)',
                borderRadius: 9999,
                padding: '13px 40px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Explore
            </button>
          </div>
        </div>

        {/* RIGHT: Cards (Shifted further Down & Right) */}
        <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, transform: 'translate(30px, 200px)' }}>
          {/* Navigation buttons row */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ fn: goPrev, icon: ChevronLeft, label: 'Prev' }, { fn: goNext, icon: ChevronRight, label: 'Next' }].map(({ fn, icon: Icon, label }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>

          {/* 4 Cards Row: Active card is first card in queue */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', minHeight: 280 }}>
            <AnimatePresence mode="popLayout">
              {visibleCards.map((card, idx) => (
                <motion.div
                  key={`${card.id}-${idx}`}
                  layout
                  initial={{ opacity: 0, x: 80, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: 'none',
                  }}
                  exit={{
                    opacity: 0,
                    x: -120,
                    scale: 0.75,
                    filter: 'blur(4px)',
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    width: 175,
                    height: 250,
                    borderRadius: 20,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveIndex(DESTINATIONS.findIndex(d => d.id === card.id))}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url('${card.cardImage}')`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 18px', color: '#fff' }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 22,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      marginBottom: 6,
                    }}>
                      {card.name}
                    </div>
                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.45,
                      fontWeight: 400,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {card.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 6, alignSelf: 'flex-end' }}>
            {destList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  height: 4, width: idx === activeIndex ? 28 : 8,
                  borderRadius: 99,
                  background: idx === activeIndex ? '#E86A2A' : 'rgba(255,255,255,0.3)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fade-in animation keyframe via style tag */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeWatermark {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        .ken-burns { animation: kenBurns 12s ease-in-out infinite alternate; }
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}

// ─── EXPLORE SECTION ──────────────────────────────────────

function ExploreSection() {
  const [expList, setExpList] = useState(EXPERIENCES);
  const [start, setStart] = useState(0);

  useEffect(() => {
    cmsApi.getExperiences({ page_size: 10 }).then(res => {
      if (res?.item && res.item.length > 0) {
        const liveExps = res.item.map((exp, idx) => {
          const fallback = EXPERIENCES[idx % EXPERIENCES.length];
          return {
            id: exp.slug || exp.id,
            label: (exp.name || '').toUpperCase(),
            description: exp.short_description || exp.description || fallback.description,
            icon: fallback.icon,
            image: exp.main_image || exp.image || fallback.image,
          };
        });
        setExpList(liveExps);
      }
    }).catch(() => {});
  }, []);

  const cards = [0, 1, 2].map(i => expList[(start + i) % expList.length]);

  return (
    <section id="discover" style={{ background: '#fff', color: '#111', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'center', gap: 60 }}>
        
        {/* LEFT — 3 Tall Cards with arrows */}
        <div style={{ position: 'relative', flex: '0 0 60%' }}>
          <button
            onClick={() => setStart(p => (p === 0 ? EXPERIENCES.length - 1 : p - 1))}
            aria-label="Previous"
            style={{
              position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)',
              zIndex: 20, width: 44, height: 44, borderRadius: '50%',
              background: '#fff', border: '1px solid #e5e5e5',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#111', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            <ChevronLeft size={20} />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {cards.map((exp, idx) => (
              <div
                key={`${exp.id}-${idx}`}
                style={{
                  height: 480, borderRadius: 24, overflow: 'hidden', position: 'relative',
                  cursor: 'pointer', boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 28px 56px rgba(0,0,0,0.22)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)';
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url('${exp.image}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '28px 24px', color: '#fff',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 42,
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}>
                    {exp.label}
                  </div>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStart(p => (p + 1) % EXPERIENCES.length)}
            aria-label="Next"
            style={{
              position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)',
              zIndex: 20, width: 44, height: 44, borderRadius: '50%',
              background: '#fff', border: '1px solid #e5e5e5',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#111', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* RIGHT — Headline + CTA */}
        <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(64px, 7vw, 96px)',
            lineHeight: 0.9,
            color: '#1B3A2D',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            EXPLORE<br />THE ISLAND
          </h2>
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 17,
            lineHeight: 1.7,
            color: '#555',
            margin: 0,
            maxWidth: 360,
          }}>
            Each place, and each smile in Sri Lanka has a story to tell. We have so much to share with you, so come along to our island in paradise!
          </p>
          <Link
            href="/experiences"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px',
              background: '#1B3A2D', color: '#fff',
              borderRadius: 16,
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 600, fontSize: 15,
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              width: 'fit-content',
              boxShadow: '0 8px 24px rgba(27,58,45,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#27523D';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#1B3A2D';
              (e.currentTarget as HTMLElement).style.transform = 'none';
            }}
          >
            Explore More <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── DESTINATIONS GRID ────────────────────────────────────

function DestinationsSection() {
  const [items, setItems] = useState<any[]>(DESTINATIONS);

  useEffect(() => {
    cmsApi.getDestinations({ page_size: 8 }).then(res => {
      if (res?.item && res.item.length > 0) {
        const liveItems = res.item.map((d, idx) => ({
          id: d.slug || d.id,
          name: (d.name || '').toUpperCase(),
          description: d.subtitle || d.description || 'Explore the breathtaking wonder of Sri Lanka.',
          cardImage: d.image || DESTINATIONS[idx % DESTINATIONS.length].cardImage,
          bgImage: d.image || DESTINATIONS[idx % DESTINATIONS.length].bgImage,
          province: d.province || 'Sri Lanka',
        }));
        setItems(liveItems);
      }
    }).catch(() => {});
  }, []);

  return (
    <section id="destinations" style={{ background: '#0e0e0e', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>EXPLORE DESTINATIONS</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 5vw, 72px)',
              color: '#fff', margin: 0, lineHeight: 0.92, letterSpacing: '0.02em',
            }}>
              MUST-VISIT PLACES
            </h2>
          </div>
          <Link href="/destinations" style={{
            color: '#E86A2A', textDecoration: 'none',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s',
          }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {items.slice(0, 8).map((dest, idx) => (
            <Link
              key={`${dest.id}-${idx}`}
              href={`/destinations/${dest.id}`}
              style={{
                textDecoration: 'none',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'block',
                position: 'relative',
                height: 320,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(0,0,0,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('${dest.cardImage}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#E86A2A', fontSize: 11, fontFamily: 'Manrope, sans-serif', marginBottom: 6 }}>
                  <MapPin size={12} /> {dest.province}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#fff', letterSpacing: '0.02em', lineHeight: 1, marginBottom: 6 }}>
                  {dest.name}
                </div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {dest.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCES SECTION ──────────────────────────────────

function ExperiencesSection() {
  const [items, setItems] = useState<any[]>(EXPERIENCES);

  useEffect(() => {
    cmsApi.getExperiences({ page_size: 10 }).then(res => {
      if (res?.item && res.item.length > 0) {
        const liveItems = res.item.map((exp, idx) => {
          const fallback = EXPERIENCES[idx % EXPERIENCES.length];
          return {
            id: exp.slug || exp.id,
            label: (exp.name || '').toUpperCase(),
            description: exp.short_description || exp.description || fallback.description,
            icon: fallback.icon,
            image: exp.main_image || exp.image || fallback.image,
          };
        });
        setItems(liveItems);
      }
    }).catch(() => {});
  }, []);

  return (
    <section id="experiences" style={{ background: '#131313', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 12 }}>TRAVEL EXPERIENCES</div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 5vw, 72px)',
            color: '#fff', margin: 0, lineHeight: 0.92, letterSpacing: '0.02em',
          }}>
            WHAT TO EXPERIENCE
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {items.map(exp => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                style={{
                  borderRadius: 20, overflow: 'hidden', position: 'relative',
                  height: 280, cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url('${exp.image}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(232,106,42,0.2)', border: '1px solid rgba(232,106,42,0.4)',
                    color: '#E86A2A', marginBottom: 8,
                  }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#fff', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 6 }}>
                    {exp.label}
                  </div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED PACKAGES SECTION ────────────────────────────

function PackagesSection() {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    cmsApi.getPackages({ page_size: 3 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setPackages(res.item);
      }
    }).catch(() => {});
  }, []);

  if (packages.length === 0) return null;

  return (
    <section id="tours" style={{ background: '#0a0a0a', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>POPULAR TOURS</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 5vw, 72px)',
              color: '#fff', margin: 0, lineHeight: 0.92, letterSpacing: '0.02em',
            }}>
              FEATURED PACKAGES
            </h2>
          </div>
          <Link href="/packages" style={{
            color: '#E86A2A', textDecoration: 'none',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s',
          }}>
            View All Packages <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {packages.map(pkg => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug || pkg.id}`}
              style={{
                textDecoration: 'none',
                background: '#141414',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,106,42,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <div style={{
                height: 220, position: 'relative',
                backgroundImage: `url('${pkg.main_image_url || pkg.image || '/hero-ella.jpg'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}>
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(232,106,42,0.92)', color: '#fff',
                  padding: '6px 14px', borderRadius: 99,
                  fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: '0.05em',
                }}>
                  ${pkg.base_price || 499}
                </div>
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 14, color: '#E86A2A', fontSize: 13, fontFamily: 'Manrope, sans-serif', fontWeight: 600, marginBottom: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={14} /> {pkg.duration_days || 5} Days
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#fff', margin: '0 0 10px', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                  {pkg.title}
                </h3>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {pkg.engaging_description || pkg.description || 'Experience the finest curated itinerary in Sri Lanka.'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BLOG SECTION ─────────────────────────────────────────

function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    cmsApi.getBlogs({ page_size: 3 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setBlogs(res.item);
      }
    }).catch(() => {});
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section id="blog" style={{ background: '#111', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>TRAVEL STORIES</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 5vw, 72px)',
              color: '#fff', margin: 0, lineHeight: 0.92, letterSpacing: '0.02em',
            }}>
              LATEST FROM OUR BLOG
            </h2>
          </div>
          <Link href="/blog" style={{
            color: '#E86A2A', textDecoration: 'none',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s',
          }}>
            Read All Stories <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {blogs.map(blog => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug || blog.id}`}
              style={{
                textDecoration: 'none',
                background: '#181818',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div style={{
                height: 200, position: 'relative',
                backgroundImage: `url('${blog.main_image_url || blog.image || '/hero-colombo.jpg'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ padding: 24 }}>
                <div style={{ color: '#888', fontSize: 12, fontFamily: 'Manrope, sans-serif', marginBottom: 8 }}>
                  By {blog.author_name || 'Siaga Travels'}
                </div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 10px', lineHeight: 1.35 }}>
                  {blog.title}
                </h3>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {blog.excerpt || 'Discover Sri Lanka through our authentic travel guides.'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY VISIT SRI LANKA ──────────────────────────────────

function WhySection() {
  const features = [
    { icon: Waves, title: 'Beautiful Beaches', desc: 'Over 1,600km of coastline with pristine tropical beaches, world-class surfing, and coral reefs teeming with life.' },
    { icon: Landmark, title: 'Rich Culture', desc: '2,500 years of history, 8 UNESCO World Heritage Sites, and vibrant festivals that bring traditions to life.' },
    { icon: Leaf, title: 'Amazing Wildlife', desc: 'Spot leopards, blue whales, and herds of wild elephants across 22 national parks and nature reserves.' },
    { icon: Mountain, title: 'Scenic Mountains', desc: 'Mist-covered tea estates, breathtaking train rides through hills, and the highest peaks of Adam\'s Peak.' },
  ];

  return (
    <section style={{ background: '#fff', color: '#111', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 12 }}>WHY CHOOSE SRI LANKA</div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 5vw, 72px)',
            color: '#1B3A2D', margin: 0, lineHeight: 0.92, letterSpacing: '0.02em',
          }}>
            A PARADISE FOR EVERY TRAVELER
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 32 }}>
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={{
                padding: 36, borderRadius: 20,
                border: '1px solid rgba(27,58,45,0.1)',
                background: '#f9f9f7',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(27,58,45,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(27,58,45,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#1B3A2D', marginBottom: 20,
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, color: '#1B3A2D', margin: '0 0 12px' }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#666', lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── STATS STRIP ─────────────────────────────────────────

function StatsStrip() {
  return (
    <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '56px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(232,106,42,0.1)',
                border: '1px solid rgba(232,106,42,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#E86A2A',
              }}>
                <Icon size={22} />
              </div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 48, color: '#E86A2A', lineHeight: 1, letterSpacing: '0.02em' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────

function CTASection() {
  return (
    <section style={{
      position: 'relative', padding: '140px 40px',
      backgroundImage: "url('/hero-ella.jpg')",
      backgroundSize: 'cover', backgroundPosition: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(48px, 6vw, 84px)',
          color: '#fff', lineHeight: 0.92, letterSpacing: '0.02em', margin: '0 0 24px',
        }}>
          YOUR SRI LANKAN ADVENTURE STARTS HERE
        </h2>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, margin: '0 0 40px' }}>
          Let us craft the perfect island experience for you — from serene tea hill retreats to thrilling wildlife safaris.
        </p>
        <Link
          href="/packages"
          style={{
            display: 'inline-block',
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 22, letterSpacing: '0.1em',
            color: '#fff', background: '#E86A2A',
            padding: '18px 56px', borderRadius: 9999,
            textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(232,106,42,0.45)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.02)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(232,106,42,0.55)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'none';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(232,106,42,0.45)';
          }}
        >
          PLAN YOUR TRIP
        </Link>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────

function FooterComp() {
  return (
    <footer style={{ background: '#080808', color: '#aaa', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, paddingBottom: 60, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#fff', letterSpacing: '0.06em' }}>SIAGA TRAVELS</span>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
              Your trusted gateway to Sri Lanka. We craft authentic, unforgettable travel experiences across the Pearl of the Indian Ocean.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Discover</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Destinations', 'Experiences', 'Tour Packages', 'Events'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Experiences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Adventure', 'Wildlife', 'Culture', 'Culinary'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Newsletter</h4>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#666', marginBottom: 16 }}>Subscribe for exclusive travel deals and island stories.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Enter email..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 13,
                  fontFamily: 'Manrope, sans-serif', outline: 'none',
                }}
              />
              <button style={{
                background: '#E86A2A', color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 18px', fontFamily: 'Manrope, sans-serif',
                fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#c95c20')}
                onMouseLeave={e => (e.currentTarget.style.background = '#E86A2A')}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#555' }}>
            © {new Date().getFullYear()} Siaga Travels. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#aaa')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────

export default function HomePage() {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#131313' }}>
      <HeroSection />
      <ExploreSection />
      <DestinationsSection />
      <ExperiencesSection />
      <PackagesSection />
      <BlogSection />
      <WhySection />
      <StatsStrip />
      <CTASection />
    </main>
  );
}
