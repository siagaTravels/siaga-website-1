'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { MapPin, Sun, Clock, ChevronRight, CheckCircle2, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { cmsApi, getDestinationBySlug } from '@/lib/api';

const FALLBACK_DEST_DETAIL = {
  id: 'ella',
  slug: 'ella',
  name: 'Ella',
  subtitle: 'Highland Tea Estates & Nine Arch Bridge',
  description: 'Ella is a peaceful mountain village in the central highlands of Sri Lanka, surrounded by cloud forests, endless tea plantations, and dramatic cliffs.',
  long_description: 'Popularly known for the famous Nine Arch Bridge train crossing, Ella offers spectacular trekking to Little Adam’s Peak and Ella Rock. The mountain air is fresh and cool, making it one of Sri Lanka’s favorite destinations for nature lovers, hikers, and scenic train enthusiasts.',
  province: 'Uva Province',
  location: 'Central Highlands',
  best_season: 'December to April',
  travel_time: '5-6 hours from Colombo',
  image: '/hero-ella.jpg',
  highlights: [
    'Nine Arch Bridge railway view',
    'Little Adam\'s Peak sunrise trek',
    'Scenic Nanu Oya to Ella train ride',
    'Ravana Waterfalls and ancient caves',
  ],
  why_visit: 'Unmatched 360-degree mountain vistas, world-class tea estate trails, and cool highland climate.',
  tips: 'Start hikes early by 6:00 AM for clear mountain views before afternoon mist sets in.',
};

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [dest, setDest] = useState<any>(null);
  const [recommendedPackages, setRecommendedPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFn = cmsApi.getDestinationBySlug || getDestinationBySlug;
    fetchFn(slug).then(data => {
      const realData = data?.item && !data.name ? data.item : data;
      if (realData && (realData.name || realData.title)) {
        setDest(realData);
      } else {
        setDest(FALLBACK_DEST_DETAIL);
      }
    }).catch(() => setDest(FALLBACK_DEST_DETAIL)).finally(() => setLoading(false));

    cmsApi.getPackages({ page_size: 3 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setRecommendedPackages(res.item);
      }
    }).catch(() => {});
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#E86A2A' }}>Loading Destination Guide...</div>
      </main>
    );
  }

  const currentDest = dest || FALLBACK_DEST_DETAIL;

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingBottom: 120 }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: 480,
        backgroundImage: `url('${currentDest.image || currentDest.cardImage || '/hero-ella.jpg'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.4) 60%, rgba(0,0,0,0.6) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 40px 50px', width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Link href="/destinations" style={{ color: '#E86A2A', textDecoration: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600 }}>
              Destinations
            </Link>
            <ChevronRight size={14} style={{ color: '#666' }} />
            <span style={{ color: '#aaa', fontFamily: 'Manrope, sans-serif', fontSize: 13 }}>{currentDest.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E86A2A', fontSize: 13, fontFamily: 'Manrope, sans-serif', fontWeight: 700, marginBottom: 8 }}>
            <MapPin size={16} /> {currentDest.province || 'Sri Lanka'}
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(48px, 6vw, 84px)',
            lineHeight: 0.95,
            margin: '0 0 12px',
            letterSpacing: '0.02em',
          }}>
            {currentDest.name}
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 680 }}>
            {currentDest.subtitle || currentDest.description}
          </p>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px 0', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 50 }}>
        {/* LEFT COLUMN: Destination Guide */}
        <div>
          <div style={{ marginBottom: 50 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 16px', letterSpacing: '0.04em' }}>
              ABOUT {(currentDest.name || '').toUpperCase()}
            </h2>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, color: '#ccc', lineHeight: 1.8, margin: '0 0 20px' }}>
              {currentDest.long_description || currentDest.description}
            </p>
          </div>

          {/* Highlights Box */}
          {currentDest.highlights && (
            <div style={{
              background: '#141414', borderRadius: 24, padding: 32,
              border: '1px solid rgba(255,255,255,0.08)', marginBottom: 50,
            }}>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, margin: '0 0 18px', color: '#fff' }}>
                TOP THINGS TO DO IN {(currentDest.name || '').toUpperCase()}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {(Array.isArray(currentDest.highlights) ? currentDest.highlights : String(currentDest.highlights).split('" "')).map((h: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#ddd' }}>
                    <CheckCircle2 size={18} style={{ color: '#E86A2A', flexShrink: 0, marginTop: 2 }} />
                    <span>{h.replace(/"/g, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PHOTO GALLERY SECTION */}
          {(() => {
            let galleryImages: string[] = [];
            if (Array.isArray(currentDest.gallery)) {
              galleryImages = currentDest.gallery.filter(Boolean);
            } else if (typeof currentDest.gallery === 'string') {
              galleryImages = currentDest.gallery.split(' ').map((s: string) => s.trim()).filter(Boolean);
            }

            if (galleryImages.length === 0) return null;

            return (
              <div style={{ marginBottom: 50 }}>
                <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 20px', letterSpacing: '0.04em' }}>
                  PHOTO GALLERY
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                  {galleryImages.map((imgUrl: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        height: 180,
                        borderRadius: 18,
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`${currentDest.name} photo ${i + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.35s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Recommended Tours Section */}
          {recommendedPackages.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#E86A2A', margin: '0 0 24px', letterSpacing: '0.04em' }}>
                TOURS VISITING {(currentDest.name || '').toUpperCase()}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                {recommendedPackages.map(pkg => (
                  <Link
                    key={pkg.id}
                    href={`/packages/${pkg.slug || pkg.id}`}
                    style={{
                      textDecoration: 'none', background: '#141414', borderRadius: 20,
                      overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{
                      height: 160,
                      backgroundImage: `url('${pkg.main_image_url || '/hero-ella.jpg'}')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ color: '#E86A2A', fontSize: 12, fontFamily: 'Manrope, sans-serif', fontWeight: 700, marginBottom: 4 }}>
                        {pkg.duration_days} Days • From ${pkg.base_price} USD
                      </div>
                      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                        {pkg.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Quick Info Card */}
        <div>
          <div style={{
            position: 'sticky', top: 120,
            background: '#141414', borderRadius: 24, padding: 30,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#fff', margin: '0 0 20px' }}>
              TRAVEL FACTS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Manrope, sans-serif', fontSize: 14 }}>
              <div>
                <span style={{ color: '#888', display: 'block', fontSize: 12, marginBottom: 2 }}>PROVINCE</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{currentDest.province || 'Sri Lanka'}</span>
              </div>
              <div>
                <span style={{ color: '#888', display: 'block', fontSize: 12, marginBottom: 2 }}>BEST SEASON TO VISIT</span>
                <span style={{ color: '#E86A2A', fontWeight: 600 }}>
                  {Array.isArray(currentDest.best_season) ? currentDest.best_season.join(', ') : (currentDest.best_season || 'Year Round')}
                </span>
              </div>
              <div>
                <span style={{ color: '#888', display: 'block', fontSize: 12, marginBottom: 2 }}>TRAVEL DISTANCE</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{currentDest.travel_time || 'Accessible by road & train'}</span>
              </div>
            </div>

            <Link
              href="/packages"
              style={{
                display: 'block', textAlign: 'center',
                marginTop: 28, background: '#E86A2A', color: '#fff',
                borderRadius: 14, padding: '14px',
                fontFamily: "'Bebas Neue', cursive", fontSize: 20,
                textDecoration: 'none', letterSpacing: '0.08em',
              }}
            >
              PLAN A TOUR HERE
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
