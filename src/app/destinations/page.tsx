'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Compass, ArrowRight, Sun, Mountain, Sparkles } from 'lucide-react';
import { cmsApi } from '@/lib/api';

const FALLBACK_DESTINATIONS = [
  {
    id: 'ella',
    slug: 'ella',
    name: 'Ella',
    subtitle: 'Highland Tea Estates & Nine Arch Bridge',
    description: 'A charming mountain village nestled in Sri Lanka’s central highlands, famous for breathtaking views, tea plantations, and scenic hiking trails.',
    province: 'Uva Province',
    cardImage: '/dest-ella.jpg',
    bgImage: '/hero-ella.jpg',
  },
  {
    id: 'sigiriya',
    slug: 'sigiriya',
    name: 'Sigiriya',
    subtitle: 'Ancient Lion Rock Fortress',
    description: 'An ancient palace complex built atop a massive 200-meter granite rock, renowned for its frescoes, water gardens, and UNESCO World Heritage status.',
    province: 'Central Province',
    cardImage: '/dest-kandy.jpg',
    bgImage: '/dest-kandy.jpg',
  },
  {
    id: 'colombo',
    slug: 'colombo',
    name: 'Colombo',
    subtitle: 'Vibrant Coastal Capital & Lotus Tower',
    description: 'Experience Sri Lanka’s commercial capital featuring colonial architecture, bustling street markets, fine dining, and modern harbor views.',
    province: 'Western Province',
    cardImage: '/dest-colombo.jpg',
    bgImage: '/hero-colombo.jpg',
  },
  {
    id: 'batticaloa',
    slug: 'batticaloa',
    name: 'Batticaloa',
    subtitle: 'Serene Lagoons & Golden Sunsets',
    description: 'Unwind by pristine eastern lagoons, singing fish bays, quiet palm-lined beaches, and historic Dutch forts.',
    province: 'Eastern Province',
    cardImage: '/dest-batticaloa.jpg',
    bgImage: '/hero-batticaloa.jpg',
  },
  {
    id: 'nuwara-eliya',
    slug: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    subtitle: 'Little England & Cool Tea Valleys',
    description: 'Sri Lanka’s cool highland sanctuary surrounded by misty tea gardens, colonial bungalows, and cascading waterfalls.',
    province: 'Central Province',
    cardImage: '/hero-nuwaraeliya.jpg',
    bgImage: '/hero-nuwaraeliya.jpg',
  },
  {
    id: 'galle',
    slug: 'galle',
    name: 'Galle',
    subtitle: 'Historic Dutch Colonial Ramparts',
    description: 'Walk the cobblestone alleys of Galle Fort, an oceanfront fortress filled with boutique hotels, art galleries, and lighthouse views.',
    province: 'Southern Province',
    cardImage: '/hero-galle.jpg',
    bgImage: '/hero-galle.jpg',
  },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>(FALLBACK_DESTINATIONS);
  const [loading, setLoading] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');

  const PROVINCES = ['All', 'Central Province', 'Western Province', 'Uva Province', 'Southern Province', 'Eastern Province'];

  useEffect(() => {
    setLoading(true);
    cmsApi.getDestinations({ page_size: 50 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setDestinations(res.item);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const name = (dest.name || '').toLowerCase();
      const desc = (dest.subtitle || dest.description || '').toLowerCase();
      const prov = (dest.province || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch = name.includes(query) || desc.includes(query) || prov.includes(query);
      const matchesProvince = selectedProvince === 'All' || prov.includes(selectedProvince.toLowerCase());

      return matchesSearch && matchesProvince;
    });
  }, [destinations, searchTerm, selectedProvince]);

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
            <Compass size={16} /> EXPLORE THE PEARL OF THE INDIAN OCEAN
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(52px, 7vw, 92px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            margin: '0 0 20px',
          }}>
            DISCOVER DESTINATIONS
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, color: '#aaa', lineHeight: 1.7, margin: 0 }}>
            From ancient UNESCO sanctuaries and misty tea estates to tropical southern beaches, explore the wonders of Sri Lanka.
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 30px' }}>
        {/* Search & Province Filter Bar */}
        <div style={{
          background: '#141414',
          borderRadius: 24,
          padding: '24px 30px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          marginBottom: 50,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#E86A2A' }} size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search destination by name or province (e.g. Ella, Kandy, Central)..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: '16px 20px 16px 52px',
                color: '#fff',
                fontFamily: 'Manrope, sans-serif',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          {/* Province Pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {PROVINCES.map(prov => (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                style={{
                  background: selectedProvince === prov ? '#E86A2A' : 'rgba(255,255,255,0.06)',
                  color: selectedProvince === prov ? '#fff' : '#aaa',
                  border: selectedProvince === prov ? '1px solid #E86A2A' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 99,
                  padding: '8px 18px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {filteredDestinations.map(dest => (
            <Link
              key={dest.id || dest.slug}
              href={`/destinations/${dest.slug || dest.id}`}
              style={{
                textDecoration: 'none',
                borderRadius: 24,
                overflow: 'hidden',
                display: 'block',
                position: 'relative',
                height: 380,
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.7)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)';
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('${dest.image || dest.cardImage || '/hero-ella.jpg'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
              }} />

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#E86A2A', fontSize: 12, fontFamily: 'Manrope, sans-serif', fontWeight: 600, marginBottom: 8 }}>
                  <MapPin size={14} /> {dest.province || 'Sri Lanka'}
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#fff', letterSpacing: '0.02em', lineHeight: 1, marginBottom: 8 }}>
                  {dest.name}
                </h3>
                <p style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)',
                  margin: 0, lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {dest.subtitle || dest.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
