'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waves, Mountain, Leaf, Landmark, Zap, UtensilsCrossed, ArrowRight, Sparkles } from 'lucide-react';
import { cmsApi } from '@/lib/api';

const FALLBACK_EXPERIENCES = [
  { id: 'beaches', label: 'BEACHES & WATERSPORTS', description: 'Surfing, whale watching, and relaxing on tropical turquoise shores of Mirissa and Trincomalee.', icon: Waves, image: '/dest-batticaloa.jpg' },
  { id: 'mountains', label: 'MOUNTAIN HIKES & TEA TRAILS', description: 'Scenic train rides through Nuwara Eliya, tea plantation walks, and sunrise mountain climbing.', icon: Mountain, image: '/dest-ella.jpg' },
  { id: 'wildlife', label: 'WILDLIFE & JEEP SAFARIS', description: 'Spot Asia’s highest density of leopards in Yala and wild elephant herds in Minneriya.', icon: Leaf, image: '/exp-wild.jpg' },
  { id: 'culture', label: 'CULTURE & ANCIENT TEMPLES', description: 'Explore 2,500 years of royal heritage across Sigiriya Rock, Kandy Temple, and Anuradhapura.', icon: Landmark, image: '/exp-festive.jpg' },
  { id: 'adventure', label: 'THRILLS & OUTDOOR ADVENTURE', description: 'White water rafting in Kitulgala, rock climbing, and zip-lining over green valleys.', icon: Zap, image: '/exp-thrills.jpg' },
  { id: 'food', label: 'CUISINE & CEYLON SPICES', description: 'Savor aromatic rice and curries, fresh seafood feasts, and authentic street food tours.', icon: UtensilsCrossed, image: '/dest-kandy.jpg' },
];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>(FALLBACK_EXPERIENCES);

  useEffect(() => {
    cmsApi.getExperiences({ page_size: 20 }).then(res => {
      if (res?.item && res.item.length > 0) {
        const mapped = res.item.map((exp: any, idx: number) => {
          const fallback = FALLBACK_EXPERIENCES[idx % FALLBACK_EXPERIENCES.length];
          return {
            id: exp.slug || exp.id,
            label: (exp.name || '').toUpperCase(),
            description: exp.short_description || exp.description || fallback.description,
            icon: fallback.icon,
            image: exp.main_image || exp.image || fallback.image,
          };
        });
        setExperiences(mapped);
      }
    }).catch(() => {});
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingTop: 100, paddingBottom: 120 }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        padding: '60px 40px 80px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 20%, rgba(232,106,42,0.12) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 99,
            background: 'rgba(232,106,42,0.12)', border: '1px solid rgba(232,106,42,0.3)',
            color: '#E86A2A', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600,
            marginBottom: 20,
          }}>
            <Sparkles size={16} /> UNFORGETTABLE ISLAND ACTIVITIES
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(52px, 7vw, 92px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            margin: '0 0 20px',
          }}>
            TRAVEL EXPERIENCES
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, color: '#aaa', lineHeight: 1.7, margin: 0 }}>
            Every smile and location in Sri Lanka tells a unique story. Discover unforgettable activities crafted for every traveler.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
          {experiences.map(exp => {
            const Icon = exp.icon || Sparkles;
            return (
              <div
                key={exp.id}
                style={{
                  background: '#141414',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  transition: 'transform 0.35s ease, border-color 0.35s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,106,42,0.45)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{
                  height: 220, position: 'relative',
                  backgroundImage: `url('${exp.image}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(20,20,20,1) 0%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(232,106,42,0.95)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}>
                    <Icon size={22} />
                  </div>
                </div>

                <div style={{ padding: '24px 26px 30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 30,
                      color: '#fff',
                      margin: '0 0 12px',
                      letterSpacing: '0.02em',
                      lineHeight: 1.1,
                    }}>
                      {exp.label}
                    </h3>
                    <p style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 14,
                      color: '#aaa',
                      lineHeight: 1.65,
                      margin: '0 0 24px',
                    }}>
                      {exp.description}
                    </p>
                  </div>

                  <Link
                    href="/packages"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      color: '#E86A2A', fontFamily: 'Manrope, sans-serif',
                      fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    }}
                  >
                    View Matching Tours <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
