import Metadata from 'next';
import Link from 'next/link';
import { getEvents, Event } from '@/lib/api';
import { Calendar, MapPin, Ticket, Sparkles, Search, Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { EventsClientHub } from './EventsClientHub';

export const metadata = {
  title: 'Island Events & Cultural Festivals | Siaga Travels',
  description: 'Discover vibrant cultural festivals, musical gatherings, traditional processions, and seasonal celebrations across Sri Lanka with Siaga Travels.',
};

export default async function EventsListingPage() {
  // Fetch events from CMS
  const response = await getEvents({ page_size: 50 });
  const rawItems = response?.item || [];
  
  // Transform or filter active events
  const events: Event[] = Array.isArray(rawItems) ? rawItems : [];
  const featuredEvents = events.filter(e => e.is_featured);

  return (
    <main style={{ background: '#131313', color: '#fff', minHeight: '100vh', paddingTop: 90 }}>
      {/* ── HERO BANNER SECTION ────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        padding: '100px 24px 80px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 20%, rgba(232, 106, 42, 0.15) 0%, rgba(19, 19, 19, 1) 70%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}>
        {/* Subtle Ambient Background Elements */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 106, 42, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none', filter: 'blur(50px)',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Badge Pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(232, 106, 42, 0.12)', border: '1px solid rgba(232, 106, 42, 0.3)',
            color: '#E86A2A', padding: '6px 16px', borderRadius: 99,
            fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20,
          }}>
            <Sparkles size={14} /> IMMERSIVE ISLAND GATHERINGS & FESTIVALS
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(48px, 8vw, 84px)',
            letterSpacing: '0.04em',
            margin: '0 0 16px',
            lineHeight: 0.95,
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}>
            DISCOVER <span style={{ color: '#E86A2A' }}>SRI LANKA&apos;S</span> VIBRANT EVENTS
          </h1>

          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: '#A3A3A3',
            maxWidth: 720,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            From ancient sacred processions and grand elephant peraheras to modern beach side music festivals and cultural gatherings across paradise.
          </p>
        </div>
      </section>

      {/* ── CLIENT HUB (SEARCH, FILTERS, FEATURED SPOTLIGHT & GRID) ──── */}
      <EventsClientHub initialEvents={events} featuredEvents={featuredEvents} />
    </main>
  );
}
