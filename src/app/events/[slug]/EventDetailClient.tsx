'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event } from '@/lib/api';
import {
  Calendar, MapPin, Ticket, Clock, ArrowLeft, Share2, Sparkles, Building,
  ExternalLink, ShieldCheck, CheckCircle2, Phone, Mail, ChevronDown, ChevronUp,
  X, Image as ImageIcon, Users, Navigation, AlertCircle
} from 'lucide-react';

interface EventDetailClientProps {
  event: Event;
}

// ── Countdown Timer Component ──────────────────────────────────────────────
function RegistrationCountdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const target = new Date(deadline).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!timeLeft) return null;

  return (
    <div style={{
      background: 'rgba(232, 106, 42, 0.12)',
      border: '1px solid rgba(232, 106, 42, 0.3)',
      borderRadius: 16, padding: '16px 24px', margin: '24px 0',
      display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E86A2A', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <Clock size={18} /> Registration Cutoff In:
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {[
          { label: 'DAYS', val: timeLeft.days },
          { label: 'HOURS', val: timeLeft.hours },
          { label: 'MINS', val: timeLeft.minutes },
          { label: 'SECS', val: timeLeft.seconds },
        ].map((unit, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#FFF',
              background: 'rgba(10,10,10,0.6)', padding: '4px 10px', borderRadius: 8,
              lineHeight: 1, minWidth: 44,
            }}>
              {String(unit.val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 9, color: '#A3A3A3', marginTop: 4, fontWeight: 700 }}>
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Interactive FAQ Accordion Component ───────────────────────────────────
function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            style={{
              background: '#1A1A1A', borderRadius: 14,
              border: isOpen ? '1px solid rgba(232, 106, 42, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden', transition: 'all 0.3s',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              style={{
                width: '100%', padding: '18px 24px', background: 'none', border: 'none',
                color: '#FFF', textAlign: 'left', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                fontSize: 16, fontWeight: 600,
              }}
            >
              <span>{faq.question}</span>
              {isOpen ? <ChevronUp size={20} color="#E86A2A" /> : <ChevronDown size={20} color="#A3A3A3" />}
            </button>

            {isOpen && (
              <div style={{
                padding: '0 24px 20px', color: '#A3A3A3',
                fontFamily: 'Manrope, sans-serif', fontSize: 14, lineHeight: 1.6,
                borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16,
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('ALL');

  const formatDate = (start?: string, end?: string) => {
    if (!start) return 'Dates To Be Confirmed';
    const sd = new Date(start).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    if (end && end !== start) {
      const ed = new Date(end).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      return `${sd} – ${ed}`;
    }
    return sd;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* ── HERO BANNER SECTION ────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img
          src={event.main_image_url || '/hero-ella.jpg'}
          alt={event.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(19,19,19,1) 0%, rgba(19,19,19,0.7) 50%, rgba(19,19,19,0.3) 100%)',
        }} />

        <div style={{ maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px 50px', position: 'relative', zIndex: 2 }}>
          {/* Back button */}
          <Link
            href="/events"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, color: '#E5E2E1',
              background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(10px)',
              padding: '8px 18px', borderRadius: 99, textDecoration: 'none',
              fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600,
              marginBottom: 24, border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ArrowLeft size={16} /> Back to All Events
          </Link>

          {/* Badges Row */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            {event.badge && (
              <span style={{
                background: 'linear-gradient(135deg, #E86A2A, #C54E14)', color: '#FFF',
                fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 99,
                textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 15px rgba(232,106,42,0.4)',
              }}>
                🔥 {event.badge}
              </span>
            )}
            <span style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              color: '#FFF', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 99,
            }}>
              {event.ticket_type === 'Paid' ? '🎟️ Ticketed Event' : '🎉 Free Admission'}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700, margin: '0 0 20px', color: '#FFF',
            lineHeight: 1.1, textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}>
            {event.name}
          </h1>

          {/* Metadata Row */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#D4D4D4', fontSize: 15, fontFamily: 'Manrope, sans-serif', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFB088' }}>
              <Calendar size={18} color="#E86A2A" /> {formatDate(event.start_date, event.end_date)}
            </span>
            {event.start_time && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={18} color="#E86A2A" /> {event.start_time} {event.end_time ? `– ${event.end_time}` : ''}
              </span>
            )}
            {(event.city || event.venue) && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={18} color="#E86A2A" /> {event.city ? `${event.city}${event.venue ? ` (${event.venue})` : ''}` : event.venue}
              </span>
            )}
          </div>

          {/* Countdown Timer if Registration Cutoff exists */}
          {event.registration_deadline && (
            <RegistrationCountdown deadline={event.registration_deadline} />
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT GRID ──────────────────────────────────────────── */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '60px 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
        
        {/* LEFT COLUMN (2 COLS WEIGHT) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 48 }}>
          
          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16,
            background: '#1A1A1A', borderRadius: 16, padding: 20,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <span style={{ fontSize: 12, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>Venue</span>
              <p style={{ margin: '4px 0 0', fontWeight: 600, fontSize: 14, color: '#FFF' }}>{event.venue || 'TBA'}</p>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>City / Region</span>
              <p style={{ margin: '4px 0 0', fontWeight: 600, fontSize: 14, color: '#FFF' }}>{event.city || 'Sri Lanka'}</p>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>Entry</span>
              <p style={{ margin: '4px 0 0', fontWeight: 600, fontSize: 14, color: '#E86A2A' }}>{event.ticket_type || 'Free'}</p>
            </div>
            {event.capacity && (
              <div>
                <span style={{ fontSize: 12, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>Capacity</span>
                <p style={{ margin: '4px 0 0', fontWeight: 600, fontSize: 14, color: '#FFF' }}>{event.capacity} Attendees</p>
              </div>
            )}
          </div>

          {/* Overview */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: '0 0 16px', color: '#FFF' }}>
              About the Event
            </h2>
            <p style={{ fontFamily: 'Manrope, sans-serif', color: '#A3A3A3', fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {event.description || 'Join us for this special island event featuring traditional celebrations, live music, and authentic cultural heritage.'}
            </p>
          </div>

          {/* Key Attraction Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div style={{ background: 'rgba(232,106,42,0.06)', borderRadius: 20, padding: 28, border: '1px solid rgba(232,106,42,0.2)' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#E86A2A', letterSpacing: '0.05em', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={20} /> EVENT HIGHLIGHTS & KEY ATTRACTIONS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {event.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#FFF', fontSize: 14, fontFamily: 'Manrope, sans-serif' }}>
                    <CheckCircle2 size={18} color="#E86A2A" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Schedule / Agenda Breakdown */}
          {event.agenda && event.agenda.length > 0 && (() => {
            // Annotate sessions with inherited Day key
            let lastSeenDay = 'Day 1';
            const annotatedAgenda = event.agenda.map(session => {
              let assignedDay = session.day ? String(session.day) : null;
              if (!assignedDay) {
                const match = session.title.match(/(Day\s*\d+)/i);
                if (match) {
                  const num = match[1].replace(/\D/g, '');
                  assignedDay = `Day ${num}`;
                  lastSeenDay = assignedDay;
                } else {
                  assignedDay = lastSeenDay;
                }
              } else {
                lastSeenDay = assignedDay;
              }
              return { ...session, computedDay: assignedDay };
            });

            // Group by Day
            const dayGroupsMap = new Map<string, typeof annotatedAgenda>();
            annotatedAgenda.forEach(item => {
              const dk = item.computedDay;
              if (!dayGroupsMap.has(dk)) dayGroupsMap.set(dk, []);
              dayGroupsMap.get(dk)!.push(item);
            });

            const dayKeys = Array.from(dayGroupsMap.keys());
            const hasMultipleDays = dayKeys.length > 1;

            return (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: 0, color: '#FFF' }}>
                      Event Schedule & Timeline
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: '#A3A3A3' }}>
                      Easily browse by day or view the full 3-day timeline below.
                    </p>
                  </div>

                  {/* Day Tabs */}
                  {hasMultipleDays && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setSelectedDay('ALL')}
                        style={{
                          padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                          cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                          background: selectedDay === 'ALL' ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                          color: selectedDay === 'ALL' ? '#FFF' : '#A3A3A3',
                          boxShadow: selectedDay === 'ALL' ? '0 4px 14px rgba(232,106,42,0.3)' : 'none',
                        }}
                      >
                        📅 All Days
                      </button>
                      {dayKeys.map(dk => (
                        <button
                          key={dk}
                          onClick={() => setSelectedDay(dk)}
                          style={{
                            padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                            cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                            background: selectedDay === dk ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                            color: selectedDay === dk ? '#FFF' : '#A3A3A3',
                            boxShadow: selectedDay === dk ? '0 4px 14px rgba(232,106,42,0.3)' : 'none',
                          }}
                        >
                          🚩 {dk}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Day-by-Day Grouped Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {Array.from(dayGroupsMap.entries())
                    .filter(([dayName]) => selectedDay === 'ALL' || dayName === selectedDay)
                    .map(([dayName, sessions]) => (
                      <div key={dayName} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Day Group Header */}
                        {hasMultipleDays && (
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                            background: 'rgba(232, 106, 42, 0.08)', borderLeft: '4px solid #E86A2A',
                            borderRadius: '0 12px 12px 0', marginBottom: 4,
                          }}>
                            <span style={{
                              fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#E86A2A',
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                            }}>
                              🚩 {dayName} PROGRAMME
                            </span>
                            <span style={{ fontSize: 12, color: '#A3A3A3', fontWeight: 600 }}>
                              ({sessions.length} sessions)
                            </span>
                          </div>
                        )}

                        {/* Session Cards for this Day */}
                        {sessions.map((session, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex', gap: 20, background: '#1A1A1A', borderRadius: 16,
                              padding: 20, border: '1px solid rgba(255,255,255,0.08)',
                              alignItems: 'flex-start', transition: 'all 0.2s',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            }}
                          >
                            <div style={{
                              background: 'rgba(232,106,42,0.15)', color: '#E86A2A',
                              fontFamily: "'Bebas Neue', cursive", fontSize: 18, padding: '6px 14px',
                              borderRadius: 8, letterSpacing: '0.05em', whiteSpace: 'nowrap',
                            }}>
                              {session.time || 'Schedule'}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#FFF' }}>
                                  {session.title}
                                </h4>
                                <span style={{
                                  fontSize: 10, fontWeight: 800, background: 'linear-gradient(135deg, #E86A2A, #C54E14)',
                                  color: '#FFF', padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase',
                                  letterSpacing: '0.05em', boxShadow: '0 2px 8px rgba(232,106,42,0.3)',
                                }}>
                                  {session.computedDay}
                                </span>
                              </div>
                              {session.performer && (
                                <span style={{ fontSize: 12, color: '#FFB088', fontWeight: 600, display: 'inline-block', marginTop: 4, marginBottom: 6 }}>
                                  🎭 {session.performer}
                                </span>
                              )}
                              {session.description && (
                                <p style={{ margin: 0, fontSize: 14, color: '#A3A3A3', lineHeight: 1.5 }}>
                                  {session.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            );
          })()}

          {/* Ticket Tiers */}
          {event.ticket_tiers && event.ticket_tiers.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: '0 0 24px', color: '#FFF' }}>
                Ticket Tiers & Passes
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {event.ticket_tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#1A1A1A', borderRadius: 20, padding: 24,
                      border: '1px solid rgba(232,106,42,0.3)', display: 'flex',
                      flexDirection: 'column', justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 12, color: '#A3A3A3', textTransform: 'uppercase', fontWeight: 700 }}>Pass Type</span>
                      <h4 style={{ margin: '4px 0 12px', fontSize: 20, fontWeight: 700, color: '#FFF' }}>{tier.name}</h4>
                      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#E86A2A', margin: '0 0 12px' }}>
                        {tier.currency || 'LKR'} {tier.price.toLocaleString()}
                      </div>
                      {tier.perks && (
                        <p style={{ fontSize: 13, color: '#A3A3A3', lineHeight: 1.5, margin: '0 0 20px' }}>
                          ✓ {tier.perks}
                        </p>
                      )}
                    </div>

                    {tier.booking_url ? (
                      <a
                        href={tier.booking_url} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'block', textAlign: 'center', background: '#E86A2A', color: '#fff',
                          padding: '10px 16px', borderRadius: 99, textDecoration: 'none',
                          fontFamily: "'Bebas Neue', cursive", fontSize: 16, letterSpacing: '0.05em',
                        }}
                      >
                        BOOK TICKET NOW
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        style={{
                          display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.1)', color: '#fff',
                          padding: '10px 16px', borderRadius: 99, textDecoration: 'none',
                          fontFamily: "'Bebas Neue', cursive", fontSize: 16, letterSpacing: '0.05em',
                        }}
                      >
                        INQUIRE TICKETS
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery */}
          {event.gallery_urls && event.gallery_urls.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: '0 0 20px', color: '#FFF' }}>
                Photo Gallery
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
                {event.gallery_urls.map((url, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(url)}
                    style={{
                      height: 140, borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
                    }}
                  >
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {event.faqs && event.faqs.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: '0 0 20px', color: '#FFF' }}>
                Frequently Asked Questions
              </h2>
              <FaqAccordion faqs={event.faqs} />
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR (1 COL WEIGHT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Booking / Action Card */}
          <div style={{
            background: 'linear-gradient(145deg, #1A1A1A, #141414)',
            borderRadius: 20, padding: 28, border: '1px solid rgba(232,106,42,0.3)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#E86A2A', margin: '0 0 8px', letterSpacing: '0.05em' }}>
              ATTEND THIS EVENT
            </h3>
            <p style={{ fontFamily: 'Manrope, sans-serif', color: '#A3A3A3', fontSize: 14, margin: '0 0 20px' }}>
              Need assistance with transport, custom Sri Lanka tour packages, or event VIP access?
            </p>

            {event.website_link ? (
              <a
                href={event.website_link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#E86A2A', color: '#fff', padding: '14px 20px', borderRadius: 99,
                  textDecoration: 'none', fontFamily: "'Bebas Neue', cursive", fontSize: 18,
                  letterSpacing: '0.06em', marginBottom: 12, boxShadow: '0 4px 15px rgba(232,106,42,0.3)',
                }}
              >
                OFFICIAL EVENT WEBSITE <ExternalLink size={18} />
              </a>
            ) : null}

            <Link
              href={`/contact?subject=Inquiry for ${encodeURIComponent(event.name)}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgba(255,255,255,0.08)', color: '#FFF', padding: '14px 20px', borderRadius: 99,
                textDecoration: 'none', fontFamily: "'Bebas Neue', cursive", fontSize: 18,
                letterSpacing: '0.06em', border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              BOOK WITH SIAGA TOUR <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
            </Link>

            <button
              onClick={handleShare}
              style={{
                width: '100%', marginTop: 16, background: 'none', border: 'none',
                color: '#A3A3A3', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6, fontSize: 13, fontFamily: 'Manrope, sans-serif',
              }}
            >
              <Share2 size={14} /> Share Event with Friends
            </button>
          </div>

          {/* Organiser Card */}
          {event.organizer_name && (
            <div style={{ background: '#1A1A1A', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>Event Host</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
                {event.organizer_logo_url ? (
                  <img src={event.organizer_logo_url} alt="" style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(232,106,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={24} color="#E86A2A" />
                  </div>
                )}
                <div>
                  <h4 style={{ margin: 0, fontSize: 16, color: '#FFF', fontWeight: 700 }}>{event.organizer_name}</h4>
                  <span style={{ fontSize: 12, color: '#A3A3A3' }}>Verified Organizer</span>
                </div>
              </div>
            </div>
          )}

          {/* Venue & Directions */}
          {event.google_map_link && (
            <div style={{ background: '#1A1A1A', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, color: '#737373', textTransform: 'uppercase', fontWeight: 700 }}>Location</span>
              <p style={{ margin: '8px 0 16px', color: '#FFF', fontWeight: 600, fontSize: 15 }}>
                {event.venue || event.city}
              </p>
              <a
                href={event.google_map_link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, color: '#E86A2A',
                  fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}
              >
                <Navigation size={16} /> Get Google Maps Directions
              </a>
            </div>
          )}

          {/* Contact Details */}
          {event.contact_details && Object.keys(event.contact_details).length > 0 && (
            <div style={{ background: '#1A1A1A', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, color: '#737373', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 12 }}>Organiser Contacts</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Object.entries(event.contact_details).map(([k, v]) => (
                  <div key={k} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#737373' }}>{k}:</span>
                    <span style={{ color: '#FFF', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

      {/* Lightbox Image Preview Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <img src={activeImage} alt="" style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }} />
          <button style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
