'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Clock, MapPin, CheckCircle2, ChevronRight,
  Send, X, Sparkles, PhoneCall, Mail, User, Calendar
} from 'lucide-react';
import { cmsApi } from '@/lib/api';

// Fallback Package Detail if slug isn't found in live API
const FALLBACK_DETAIL = {
  id: 'sri-lanka-grand-tour',
  slug: 'sri-lanka-grand-tour',
  title: 'Sri Lanka Grand Heritage & Coast Discovery',
  engaging_description: 'Immerse yourself in 10 unforgettable days exploring ancient UNESCO fortresses, misty tea plantations, thrilling wildlife safaris, and pristine southern beaches.',
  main_image_url: '/hero-ella.jpg',
  duration_days: 10,
  duration_nights: 9,
  base_price: 1290,
  currency: 'USD',
  highlights: [
    'Ascend the iconic Sigiriya Rock Fortress at sunrise',
    'Scenic highland train ride through Ella tea estates',
    'Jeep safari in Yala National Park spotting leopards',
    'Whale watching & relaxation on Mirissa beach',
    'Explore historic Dutch ramparts of Galle Fort',
  ],
  itinerary_days: [
    {
      day_number: 1,
      title: 'Arrival in Colombo & Transfer to Negombo',
      description: 'Welcome to Sri Lanka! Our private driver will greet you at Bandaranaike International Airport and escort you to your seaside resort in Negombo to relax.',
    },
    {
      day_number: 2,
      title: 'Ancient Sigiriya Rock Fortress Ascent',
      description: 'Travel into the Cultural Triangle. Climb the 5th-century Sigiriya Lion Rock Fortress and admire ancient frescoes and panoramic jungle views.',
    },
    {
      day_number: 3,
      title: 'Sacred City of Kandy & Temple of the Tooth',
      description: 'Visit the Dambulla Cave Temple en route to Kandy. Experience a cultural dance show and visit the sacred Temple of the Tooth Relic.',
    },
    {
      day_number: 4,
      title: 'Highland Tea Estates & Nuwara Eliya',
      description: 'Drive through rolling green tea hills. Visit a working tea factory, taste fresh Ceylon tea, and explore "Little England".',
    },
    {
      day_number: 5,
      title: 'Scenic Train to Ella & Nine Arch Bridge',
      description: 'Board one of the world\'s most breathtaking train journeys from Nanu Oya to Ella. Walk along the Nine Arch Bridge for iconic photo ops.',
    },
    {
      day_number: 6,
      title: 'Yala Wildlife Jeep Safari',
      description: 'Descend to the southern plains for an afternoon 4x4 Jeep Safari in Yala National Park, home to the highest density of leopards in Asia.',
    },
    {
      day_number: 7,
      title: 'Mirissa Golden Beaches & Sunset',
      description: 'Transfer to Mirissa coastal resort. Spend the afternoon lounging on tropical beaches and enjoying fresh seafood by the ocean.',
    },
    {
      day_number: 8,
      title: 'Historic Galle Dutch Fort Walk',
      description: 'Explore the cobblestone streets, boutique cafes, and 17th-century ramparts of UNESCO-listed Galle Fort.',
    },
    {
      day_number: 9,
      title: 'Colombo Capital City Highlights',
      description: 'Return to Colombo. Enjoy a guided city tour including Pettah markets, Lotus Tower view, and fine dining.',
    },
    {
      day_number: 10,
      title: 'Departure Transfer',
      description: 'Enjoy breakfast at your hotel before your private airport transfer for your onward journey.',
    },
  ],
  accommodations: [
    { name: 'Cinnamon Citadel Kandy', star_rating: 4, image_url: '/dest-kandy.jpg', location: 'Kandy' },
    { name: '98 Acres Resort & Spa', star_rating: 5, image_url: '/hero-ella.jpg', location: 'Ella' },
    { name: 'Cinnamon Wild Yala', star_rating: 4, image_url: '/exp-wild.jpg', location: 'Yala' },
  ],
};

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: '2',
    notes: '',
  });

  useEffect(() => {
    cmsApi.getPackageBySlug(slug).then(data => {
      const realData = data?.item && !data.title ? data.item : data;
      if (realData && (realData.title || realData.name)) {
        setPkg(realData);
      } else {
        setPkg(FALLBACK_DETAIL);
      }
    }).catch(() => setPkg(FALLBACK_DETAIL)).finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({ name: '', email: '', phone: '', travelDate: '', guests: '2', notes: '' });
    }, 2500);
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#E86A2A' }}>Loading Tour Itinerary...</div>
      </main>
    );
  }

  const currentPkg = pkg || FALLBACK_DETAIL;

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingBottom: 120 }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        height: '65vh',
        minHeight: 520,
        backgroundImage: `url('${currentPkg.main_image_url || '/hero-ella.jpg'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.4) 60%, rgba(0,0,0,0.6) 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 40px 60px', width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Link href="/packages" style={{ color: '#E86A2A', textDecoration: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600 }}>
              Tour Packages
            </Link>
            <ChevronRight size={14} style={{ color: '#666' }} />
            <span style={{ color: '#aaa', fontFamily: 'Manrope, sans-serif', fontSize: 13 }}>{currentPkg.title}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30 }}>
            <div style={{ maxWidth: 760 }}>
              <h1 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(44px, 5.5vw, 76px)',
                lineHeight: 0.95,
                margin: '0 0 16px',
                letterSpacing: '0.02em',
              }}>
                {currentPkg.title}
              </h1>
              <div style={{ display: 'flex', gap: 20, color: '#E86A2A', fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={16} /> {currentPkg.duration_days} Days / {(currentPkg.duration_days - 1) || 1} Nights
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                  <Sparkles size={16} style={{ color: '#E86A2A' }} /> Tailor-Made Private Tour
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              background: 'rgba(20,20,20,0.85)',
              backdropFilter: 'blur(12px)',
              padding: '24px 32px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, color: '#888', fontFamily: 'Manrope, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starting From</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 44, color: '#E86A2A', lineHeight: 1, margin: '4px 0 14px' }}>
                ${currentPkg.base_price || 990} <span style={{ fontSize: 18, color: '#aaa' }}>USD</span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  background: '#E86A2A', color: '#fff', border: 'none',
                  borderRadius: 12, padding: '14px 32px',
                  fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: '0.08em',
                  cursor: 'pointer', boxShadow: '0 8px 24px rgba(232,106,42,0.4)',
                  transition: 'transform 0.2s',
                  width: '100%',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.transform = 'scale(1.02)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.transform = 'none')}
              >
                BOOK / INQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px 0', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 50 }}>
        {/* LEFT COLUMN: Overview & Itinerary */}
        <div>
          {/* Overview Section */}
          <div style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 16px', letterSpacing: '0.04em' }}>
              TOUR OVERVIEW
            </h2>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, color: '#ccc', lineHeight: 1.8, margin: '0 0 30px' }}>
              {currentPkg.engaging_description || currentPkg.description}
            </p>

            {/* Highlights list */}
            {currentPkg.highlights && currentPkg.highlights.length > 0 && (
              <div style={{
                background: '#141414', borderRadius: 20, padding: 30,
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, margin: '0 0 16px', color: '#fff' }}>TRIP HIGHLIGHTS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                  {currentPkg.highlights.map((h: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#ddd' }}>
                      <CheckCircle2 size={18} style={{ color: '#E86A2A', flexShrink: 0, marginTop: 2 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ITINERARY TIMELINE STEPPER */}
          <div style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 24px', letterSpacing: '0.04em' }}>
              DAY-BY-DAY ITINERARY
            </h2>

            <div style={{ position: 'relative', paddingLeft: 30, borderLeft: '2px dashed rgba(232,106,42,0.3)' }}>
              {(currentPkg.itinerary_days || []).map((day: any, idx: number) => (
                <div key={idx} style={{ position: 'relative', marginBottom: 40 }}>
                  {/* Step Circle */}
                  <div style={{
                    position: 'absolute', left: -43, top: 0,
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#E86A2A', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, fontFamily: 'Manrope, sans-serif',
                    boxShadow: '0 0 12px rgba(232,106,42,0.6)',
                  }}>
                    {day.day_number || (idx + 1)}
                  </div>

                  <div style={{
                    background: '#141414', borderRadius: 20, padding: '24px 28px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#fff',
                      margin: '0 0 10px', letterSpacing: '0.02em',
                    }}>
                      DAY {day.day_number || (idx + 1)}: {day.title}
                    </div>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#aaa', lineHeight: 1.65, margin: 0 }}>
                      {day.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACCOMMODATIONS SECTION */}
          {currentPkg.accommodations && currentPkg.accommodations.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 24px', letterSpacing: '0.04em' }}>
                RECOMMENDED STAYS & HOTELS
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                {currentPkg.accommodations.map((acc: any, i: number) => (
                  <div key={i} style={{
                    background: '#141414', borderRadius: 20, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{
                      height: 140,
                      backgroundImage: `url('${acc.image_url || '/dest-kandy.jpg'}')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <div style={{ padding: 18 }}>
                      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#fff', margin: '0 0 4px' }}>
                        {acc.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#E86A2A', fontFamily: 'Manrope, sans-serif' }}>
                        {acc.location} • {acc.star_rating || 4}-Star Luxury
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Booking & Support Card */}
        <div>
          <div style={{
            position: 'sticky', top: 120,
            background: '#141414', borderRadius: 24, padding: 30,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#fff', margin: '0 0 12px' }}>
              NEED A CUSTOM ITINERARY?
            </h3>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa', lineHeight: 1.6, margin: '0 0 24px' }}>
              We specialize in tailor-made Sri Lanka tours. Contact our local travel experts directly to customize hotel tiers, vehicle types, or days.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: '100%',
                background: '#E86A2A', color: '#fff', border: 'none',
                borderRadius: 14, padding: '16px',
                fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: '0.08em',
                cursor: 'pointer', marginBottom: 20,
                boxShadow: '0 8px 24px rgba(232,106,42,0.35)',
              }}
            >
              INQUIRE ABOUT THIS TOUR
            </button>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#ccc', fontFamily: 'Manrope, sans-serif' }}>
                <PhoneCall size={16} style={{ color: '#E86A2A' }} /> +94 77 123 4567
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#ccc', fontFamily: 'Manrope, sans-serif' }}>
                <Mail size={16} style={{ color: '#E86A2A' }} /> info@siagatravels.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOOKING INQUIRY MODAL ── */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: '#161616', borderRadius: 28, padding: '36px 40px',
            maxWidth: 540, width: '100%',
            border: '1px solid rgba(255,255,255,0.12)',
            position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
          }}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute', right: 20, top: 20,
                background: 'rgba(255,255,255,0.06)', border: 'none',
                color: '#fff', borderRadius: '50%', width: 36, height: 36,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={56} style={{ color: '#E86A2A', margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, margin: '0 0 10px' }}>INQUIRY RECEIVED!</h3>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>
                  Thank you, {formData.name}! A Siaga Travels specialist will reach out to you within 2 hours with a custom quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#E86A2A', margin: '0 0 6px' }}>
                  BOOK / INQUIRE TOUR
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa', margin: '0 0 24px' }}>
                  {currentPkg.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Full Name *</label>
                    <input
                      type="text" required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                        padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Email *</label>
                      <input
                        type="email" required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                          padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 890"
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                          padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Expected Travel Date</label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                          padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Number of Guests</label>
                      <select
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: '100%', background: '#222',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                          padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none',
                        }}
                      >
                        <option value="1">1 Person (Solo)</option>
                        <option value="2">2 Persons (Couple)</option>
                        <option value="3-5">3 - 5 Persons (Family/Small Group)</option>
                        <option value="6+">6+ Persons (Large Group)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Manrope, sans-serif', color: '#888', marginBottom: 6 }}>Special Requests / Notes</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Mention any preferred hotels, dietary needs, or extra days..."
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                        padding: '12px 16px', color: '#fff', fontFamily: 'Manrope, sans-serif', outline: 'none', resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: 10,
                      background: '#E86A2A', color: '#fff', border: 'none',
                      borderRadius: 14, padding: '16px',
                      fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: '0.08em',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 8px 24px rgba(232,106,42,0.4)',
                    }}
                  >
                    SUBMIT INQUIRY <Send size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
