'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Event } from '@/lib/api';
import { Calendar, MapPin, Ticket, Sparkles, Search, Star, Clock, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

interface EventsClientHubProps {
  initialEvents: Event[];
  featuredEvents: Event[];
}

function formatDateDisplay(startDate?: string, endDate?: string, startTime?: string): string {
  if (!startDate) return 'Dates TBA';
  const sd = new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  if (endDate && endDate !== startDate) {
    const ed = new Date(endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${sd} – ${ed}`;
  }
  return startTime ? `${sd} at ${startTime}` : sd;
}

export function EventsClientHub({ initialEvents, featuredEvents }: EventsClientHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [ticketFilter, setTicketFilter] = useState<string>('ALL');

  // Extract unique category tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach(e => {
      e.tags?.forEach(t => set.add(t));
    });
    return Array.from(set);
  }, [initialEvents]);

  // Filtered Events List
  const filteredEvents = useMemo(() => {
    return initialEvents.filter(e => {
      // Search
      const matchesSearch = !searchTerm ||
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.city && e.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.venue && e.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tag filter
      const matchesTag = selectedTag === 'ALL' || (e.tags && e.tags.includes(selectedTag));

      // Ticket filter
      const matchesTicket = ticketFilter === 'ALL' ||
        (ticketFilter === 'FREE' && (e.ticket_type === 'Free' || !e.ticket_type)) ||
        (ticketFilter === 'PAID' && e.ticket_type === 'Paid') ||
        (ticketFilter === 'FEATURED' && e.is_featured);

      return matchesSearch && matchesTag && matchesTicket;
    });
  }, [initialEvents, searchTerm, selectedTag, ticketFilter]);

  const spotlightEvent = featuredEvents[0] || initialEvents[0];

  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px 100px' }}>
      
      {/* ── FEATURED SPOTLIGHT CARD ────────────────────────────────────── */}
      {spotlightEvent && !searchTerm && selectedTag === 'ALL' && ticketFilter === 'ALL' && (
        <div style={{ marginBottom: 60 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
            color: '#E86A2A', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <Star size={16} fill="#E86A2A" /> FEATURED EVENT SPOTLIGHT
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            background: 'linear-gradient(145deg, rgba(26,26,26,0.9), rgba(18,18,18,0.95))',
            borderRadius: 24, border: '1px solid rgba(232, 106, 42, 0.3)',
            overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}>
            {/* Left Image Cover */}
            <div style={{ position: 'relative', minHeight: 340, overflow: 'hidden' }}>
              <img
                src={spotlightEvent.main_image_url || '/hero-ella.jpg'}
                alt={spotlightEvent.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(19,19,19,0.95))',
              }} />

              {spotlightEvent.badge && (
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  background: 'linear-gradient(135deg, #E86A2A, #C54E14)',
                  color: '#fff', padding: '6px 14px', borderRadius: 99,
                  fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(232,106,42,0.4)', textTransform: 'uppercase',
                }}>
                  🔥 {spotlightEvent.badge}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.08)', color: '#E86A2A',
                  padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                }}>
                  {formatDateDisplay(spotlightEvent.start_date, spotlightEvent.end_date, spotlightEvent.start_time)}
                </span>
                {spotlightEvent.city && (
                  <span style={{ color: '#A3A3A3', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={14} color="#E86A2A" /> {spotlightEvent.city}
                  </span>
                )}
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: 700, margin: '0 0 16px', color: '#FFF',
                lineHeight: 1.15,
              }}>
                {spotlightEvent.name}
              </h2>

              <p style={{
                fontFamily: 'Manrope, sans-serif', color: '#A3A3A3',
                fontSize: 15, lineHeight: 1.6, margin: '0 0 24px',
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {spotlightEvent.description || 'Experience the vibrant atmosphere, traditional performances, and cultural glory of this island event.'}
              </p>

              {spotlightEvent.highlights && spotlightEvent.highlights.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                  {spotlightEvent.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} style={{
                      background: 'rgba(232,106,42,0.1)', color: '#FFB088',
                      fontSize: 12, padding: '4px 10px', borderRadius: 6,
                      border: '1px solid rgba(232,106,42,0.2)',
                    }}>
                      ✨ {h}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <Link
                  href={`/events/${spotlightEvent.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: '#E86A2A', color: '#fff', padding: '14px 28px',
                    borderRadius: 99, fontFamily: "'Bebas Neue', cursive", fontSize: 18,
                    letterSpacing: '0.06em', textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(232,106,42,0.35)', transition: 'all 0.3s',
                  }}
                >
                  EXPLORE SPOTLIGHT EVENT <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FILTER & SEARCH BAR ────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(26,26,26,0.8)', backdropFilter: 'blur(12px)',
        borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
        padding: 20, marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: 280, flex: 1 }}>
            <Search size={18} color="#737373" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search event title, venue, or city (e.g. Kandy)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%', background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: 99, padding: '12px 16px 12px 46px',
                fontFamily: 'Manrope, sans-serif', fontSize: 14, outline: 'none',
              }}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setTicketFilter('ALL')}
              style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: ticketFilter === 'ALL' ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                color: ticketFilter === 'ALL' ? '#fff' : '#A3A3A3',
              }}
            >
              All Events ({initialEvents.length})
            </button>
            <button
              onClick={() => setTicketFilter('FEATURED')}
              style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: ticketFilter === 'FEATURED' ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                color: ticketFilter === 'FEATURED' ? '#fff' : '#A3A3A3',
              }}
            >
              ⭐ Featured ({featuredEvents.length})
            </button>
            <button
              onClick={() => setTicketFilter('FREE')}
              style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: ticketFilter === 'FREE' ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                color: ticketFilter === 'FREE' ? '#fff' : '#A3A3A3',
              }}
            >
              Free Entry
            </button>
            <button
              onClick={() => setTicketFilter('PAID')}
              style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: ticketFilter === 'PAID' ? '#E86A2A' : 'rgba(255,255,255,0.08)',
                color: ticketFilter === 'PAID' ? '#fff' : '#A3A3A3',
              }}
            >
              Ticketed / Paid
            </button>
          </div>
        </div>

        {/* Tags Row */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            <span style={{ fontSize: 12, color: '#737373', alignSelf: 'center', whiteSpace: 'nowrap' }}>Filter Tag:</span>
            <button
              onClick={() => setSelectedTag('ALL')}
              style={{
                padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: 'none',
                background: selectedTag === 'ALL' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: selectedTag === 'ALL' ? '#FFF' : '#A3A3A3',
              }}
            >
              All Tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: 'none',
                  background: selectedTag === tag ? 'rgba(232,106,42,0.2)' : 'transparent',
                  color: selectedTag === tag ? '#E86A2A' : '#A3A3A3', whiteSpace: 'nowrap',
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── EVENTS CARDS GRID ────────────────────────────────────────── */}
      {filteredEvents.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 32,
        }}>
          {filteredEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: '#1A1A1A', borderRadius: 20,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img
                  src={event.main_image_url || '/hero-ella.jpg'}
                  alt={event.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(0,0,0,0) 60%)',
                }} />

                {/* Top Badges */}
                <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {event.badge ? (
                    <span style={{
                      background: 'rgba(232, 106, 42, 0.9)', backdropFilter: 'blur(8px)',
                      color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px',
                      borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      {event.badge}
                    </span>
                  ) : <span />}

                  <span style={{
                    background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)',
                    color: event.ticket_type === 'Paid' ? '#FFD700' : '#A7F3D0',
                    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    {event.ticket_type === 'Paid' ? '🎟️ Ticketed' : '🎉 Free Entry'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Date & Location */}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, color: '#A3A3A3', marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ color: '#E86A2A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={14} /> {formatDateDisplay(event.start_date, event.end_date, event.start_time)}
                    </span>
                    {(event.city || event.venue) && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={14} color="#737373" /> {event.city || event.venue}
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22, fontWeight: 700, margin: '0 0 10px',
                    color: '#FFF', lineHeight: 1.3,
                  }}>
                    {event.name}
                  </h3>

                  <p style={{
                    fontFamily: 'Manrope, sans-serif', color: '#8E8E8E',
                    fontSize: 14, lineHeight: 1.5, margin: '0 0 16px',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {event.description || 'Discover key event details, schedules, and venue information.'}
                  </p>

                  {/* Highlights Tags */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                      {event.highlights.slice(0, 2).map((h, i) => (
                        <span key={i} style={{
                          background: 'rgba(255,255,255,0.05)', color: '#D4D4D4',
                          fontSize: 11, padding: '3px 8px', borderRadius: 4,
                        }}>
                          ✨ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#A3A3A3' }}>
                    {event.organizer_name ? `By ${event.organizer_name}` : 'Siaga Verified Event'}
                  </span>

                  <Link
                    href={`/events/${event.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      color: '#E86A2A', fontFamily: 'Manrope, sans-serif',
                      fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    }}
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'rgba(26,26,26,0.5)', borderRadius: 20,
          border: '1px dashed rgba(255,255,255,0.1)',
        }}>
          <Calendar size={48} color="#E86A2A" style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: '0 0 8px' }}>
            No Events Match Your Search
          </h3>
          <p style={{ fontFamily: 'Manrope, sans-serif', color: '#737373', maxWidth: 460, margin: '0 auto 20px' }}>
            Try resetting your filters or search keywords to explore all published Sri Lanka events.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedTag('ALL'); setTicketFilter('ALL'); }}
            style={{
              background: '#E86A2A', color: '#fff', border: 'none',
              padding: '10px 24px', borderRadius: 99, cursor: 'pointer',
              fontFamily: "'Bebas Neue', cursive", fontSize: 16, letterSpacing: '0.05em',
            }}
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
