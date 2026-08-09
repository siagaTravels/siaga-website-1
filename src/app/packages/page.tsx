'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, SlidersHorizontal, ArrowRight, ShieldCheck, Star, Sparkles, MapPin } from 'lucide-react';
import { cmsApi } from '@/lib/api';

// Fallback packages if API returns empty
const FALLBACK_PACKAGES = [
  {
    id: 'sri-lanka-grand-tour',
    slug: 'sri-lanka-grand-tour',
    title: 'Sri Lanka Grand Heritage & Coast Discovery',
    engaging_description: 'Journey through ancient kingdoms of Sigiriya & Kandy, pristine tea hills of Nuwara Eliya, wild safari in Yala, and sun-kissed Mirissa beaches.',
    main_image_url: '/hero-ella.jpg',
    duration_days: 10,
    duration_nights: 9,
    base_price: 1290,
    category: 'Cultural & Heritage',
  },
  {
    id: 'scenic-highland-tea-trail',
    slug: 'scenic-highland-tea-trail',
    title: 'Highland Tea Trails & Mountain Adventure',
    engaging_description: 'Experience scenic mountain train rides across the Nine Arch Bridge, misty tea estate walks, and breathtaking sunrise treks in Ella.',
    main_image_url: '/hero-nuwaraeliya.jpg',
    duration_days: 5,
    duration_nights: 4,
    base_price: 650,
    category: 'Adventure',
  },
  {
    id: 'southern-coastal-whale-safari',
    slug: 'southern-coastal-whale-safari',
    title: 'Southern Coastal Escape & Wildlife Safari',
    engaging_description: 'Unwind along golden lagoons of Batticaloa, colonial ramparts of Galle Fort, and whale watching off Mirissa beach.',
    main_image_url: '/hero-galle.jpg',
    duration_days: 7,
    duration_nights: 6,
    base_price: 890,
    category: 'Beaches & Wildlife',
  },
];

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>(FALLBACK_PACKAGES);
  const [loading, setLoading] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [maxDays, setMaxDays] = useState<number>(14);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  // Load live packages from CMS
  useEffect(() => {
    setLoading(true);
    cmsApi.getPackages({ page_size: 50 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setPackages(res.item);
      }
    }).catch(() => {}).finally(() => setLoading(false));

    cmsApi.getPackageCategories().then(res => {
      if (res?.item && res.item.length > 0) {
        const catNames = res.item.map((c: any) => c.name);
        setCategories(['All', ...catNames]);
      }
    }).catch(() => {});
  }, []);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const title = (pkg.title || '').toLowerCase();
      const desc = (pkg.engaging_description || pkg.description || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesPrice = (pkg.base_price || 0) <= maxPrice;
      const matchesDays = (pkg.duration_days || 0) <= maxDays;

      const catName = pkg.category || (pkg.categories && pkg.categories[0]?.category?.name) || '';
      const matchesCategory = selectedCategory === 'All' || catName.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesPrice && matchesDays && matchesCategory;
    });
  }, [packages, searchTerm, maxPrice, maxDays, selectedCategory]);

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingTop: 100, paddingBottom: 120 }}>
      {/* ── HEADER HERO ── */}
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
            <Sparkles size={16} /> CURATED SRI LANKA TOURS
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(52px, 7vw, 92px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            margin: '0 0 20px',
          }}>
            FIND YOUR PERFECT JOURNEY
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, color: '#aaa', lineHeight: 1.7, margin: 0 }}>
            Explore hand-crafted tour packages tailored to your schedule, budget, and travel style. Experience authentic Sri Lanka with local experts.
          </p>
        </div>
      </section>

      {/* ── FILTER & CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 30px' }}>
        {/* Search & Instant Filters Bar */}
        <div style={{
          background: '#141414',
          borderRadius: 24,
          padding: '24px 30px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          marginBottom: 50,
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {/* Top Row: Search Input */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#E86A2A' }} size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by tour name, destination, or highlight (e.g., Sigiriya, Wildlife, Tea Hills)..."
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
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#E86A2A')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Bottom Row: Sliders & Categories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
            {/* Price Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontFamily: 'Manrope, sans-serif' }}>
                <span style={{ color: '#888' }}>Max Price:</span>
                <span style={{ color: '#E86A2A', fontWeight: 700 }}>${maxPrice} USD</span>
              </div>
              <input
                type="range"
                min={300}
                max={3000}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#E86A2A', cursor: 'pointer' }}
              />
            </div>

            {/* Duration Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontFamily: 'Manrope, sans-serif' }}>
                <span style={{ color: '#888' }}>Max Duration:</span>
                <span style={{ color: '#E86A2A', fontWeight: 700 }}>{maxDays} Days</span>
              </div>
              <input
                type="range"
                min={2}
                max={21}
                step={1}
                value={maxDays}
                onChange={e => setMaxDays(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#E86A2A', cursor: 'pointer' }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#E86A2A' : 'rgba(255,255,255,0.06)',
                    color: selectedCategory === cat ? '#fff' : '#aaa',
                    border: selectedCategory === cat ? '1px solid #E86A2A' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 99,
                    padding: '8px 16px',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PACKAGES GRID ── */}
        {filteredPackages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#141414', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
            <SlidersHorizontal size={40} style={{ color: '#E86A2A', marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, margin: '0 0 10px' }}>NO PACKAGES FOUND</h3>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#888', margin: '0 0 24px' }}>
              Try adjusting your max price, duration slider, or search term to discover more tours.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setMaxPrice(3000);
                setMaxDays(21);
                setSelectedCategory('All');
              }}
              style={{
                background: '#E86A2A', color: '#fff', border: 'none',
                borderRadius: 12, padding: '12px 28px',
                fontFamily: 'Manrope, sans-serif', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
            {filteredPackages.map(pkg => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug || pkg.id}`}
                style={{
                  textDecoration: 'none',
                  background: '#141414',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  display: 'flex', flexDirection: 'column',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,106,42,0.45)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(232,106,42,0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)';
                }}
              >
                {/* Image & Badges */}
                <div style={{
                  height: 240, position: 'relative',
                  backgroundImage: `url('${pkg.main_image_url || pkg.image || '/hero-ella.jpg'}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(232,106,42,0.95)', color: '#fff',
                    padding: '8px 18px', borderRadius: 99,
                    fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: '0.05em',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}>
                    From ${pkg.base_price || 599} USD
                  </div>
                  {pkg.duration_days && (
                    <div style={{
                      position: 'absolute', bottom: 16, left: 20,
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                      color: '#fff', padding: '6px 14px', borderRadius: 10,
                      fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600,
                    }}>
                      <Clock size={14} style={{ color: '#E86A2A' }} /> {pkg.duration_days} Days / {(pkg.duration_days - 1) || 1} Nights
                    </div>
                  )}
                </div>

                {/* Content Body */}
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
                      {pkg.title}
                    </h3>
                    <p style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 14,
                      color: '#aaa',
                      lineHeight: 1.6,
                      margin: '0 0 24px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {pkg.engaging_description || pkg.description || 'Discover Sri Lanka with our expert tour guides and comfortable private transfers.'}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{
                      color: '#E86A2A', fontFamily: 'Manrope, sans-serif',
                      fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      View Itinerary <ArrowRight size={16} />
                    </span>
                    <span style={{ color: '#666', fontSize: 12, fontFamily: 'Manrope, sans-serif' }}>
                      Siaga Travels Certified
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
