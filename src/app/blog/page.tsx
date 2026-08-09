'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, BookOpen, Sparkles, Tag } from 'lucide-react';
import { cmsApi } from '@/lib/api';

const FALLBACK_BLOGS = [
  {
    id: 'ultimate-sri-lanka-travel-guide',
    slug: 'ultimate-sri-lanka-travel-guide',
    title: 'The Ultimate 10-Day Sri Lanka Travel Itinerary',
    excerpt: 'Plan the trip of a lifetime! From ancient rock fortresses in Sigiriya to highland tea estates and wild elephant safaris, here is your complete 10-day guide.',
    author_name: 'Siaga Travels Team',
    main_image_url: '/hero-ella.jpg',
    tags: ['Travel Tips', 'Itinerary'],
    published_at: '2026-08-01',
  },
  {
    id: 'scenic-train-kandy-to-ella',
    slug: 'scenic-train-kandy-to-ella',
    title: 'Riding the World’s Most Beautiful Train: Kandy to Ella',
    excerpt: 'Everything you need to know about booking tickets, choosing reserved vs unreserved seats, and catching sunrise views over the Nine Arch Bridge.',
    author_name: 'Ceylon Explorer',
    main_image_url: '/hero-nuwaraeliya.jpg',
    tags: ['Highlands', 'Train Rides'],
    published_at: '2026-07-25',
  },
  {
    id: 'top-safari-parks-sri-lanka',
    slug: 'top-safari-parks-sri-lanka',
    title: 'Leopards & Elephants: A Guide to Yala & Wilpattu Safaris',
    excerpt: 'Discover when to visit Yala National Park for leopard sightings, how to book jeep safaris, and eco-friendly wildlife guidelines.',
    author_name: 'Wildlife Specialist',
    main_image_url: '/exp-wild.jpg',
    tags: ['Wildlife', 'Safaris'],
    published_at: '2026-07-18',
  },
  {
    id: 'galle-fort-colonial-heritage',
    slug: 'galle-fort-colonial-heritage',
    title: 'Wandering Galle Fort: History, Boutique Cafes & Sunsets',
    excerpt: 'Step back in time inside the 17th-century Dutch ramparts. Explore artisan jewelry shops, coastal lighthouses, and ocean-view dining.',
    author_name: 'Culture Editor',
    main_image_url: '/hero-galle.jpg',
    tags: ['Culture', 'Heritage'],
    published_at: '2026-07-10',
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>(FALLBACK_BLOGS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const TAGS = ['All', 'Travel Tips', 'Itinerary', 'Highlands', 'Wildlife', 'Culture'];

  useEffect(() => {
    setLoading(true);
    cmsApi.getBlogs({ page_size: 50 }).then(res => {
      if (res?.item && res.item.length > 0) {
        setBlogs(res.item);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const title = (b.title || '').toLowerCase();
      const excerpt = (b.excerpt || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch = title.includes(query) || excerpt.includes(query);
      const matchesTag = selectedTag === 'All' || (b.tags && b.tags.some((t: string) => t.toLowerCase().includes(selectedTag.toLowerCase())));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchTerm, selectedTag]);

  const featuredPost = filteredBlogs[0] || FALLBACK_BLOGS[0];
  const remainingPosts = filteredBlogs.slice(1);

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingTop: 100, paddingBottom: 120 }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        padding: '60px 40px 60px',
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
            <BookOpen size={16} /> CEYLON TRAVEL MAGAZINE & STORIES
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(52px, 7vw, 92px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            margin: '0 0 20px',
          }}>
            ISLAND STORIES & GUIDES
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, color: '#aaa', lineHeight: 1.7, margin: 0 }}>
            Insider travel tips, safari guides, cultural deep-dives, and hand-crafted itineraries written by local Sri Lanka experts.
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 30px' }}>
        {/* Filter Bar */}
        <div style={{
          background: '#141414', borderRadius: 24, padding: '24px 30px',
          border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          marginBottom: 50, display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#E86A2A' }} size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search articles by title or keyword (e.g., Train, Safaris, Itinerary)..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
                padding: '16px 20px 16px 52px', color: '#fff',
                fontFamily: 'Manrope, sans-serif', fontSize: 15, outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {TAGS.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                style={{
                  background: selectedTag === t ? '#E86A2A' : 'rgba(255,255,255,0.06)',
                  color: selectedTag === t ? '#fff' : '#aaa',
                  border: selectedTag === t ? '1px solid #E86A2A' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 99, padding: '8px 18px',
                  fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── FEATURED HERO ARTICLE ── */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug || featuredPost.id}`}
            style={{
              textDecoration: 'none', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40,
              background: '#141414', borderRadius: 28, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              marginBottom: 60, transition: 'transform 0.35s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          >
            <div style={{
              height: 420,
              backgroundImage: `url('${featuredPost.main_image_url || featuredPost.image || '/hero-ella.jpg'}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
            <div style={{ padding: '40px 40px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#E86A2A', fontSize: 13, fontFamily: 'Manrope, sans-serif', fontWeight: 600, marginBottom: 12 }}>
                <Sparkles size={16} /> FEATURED STORY
              </div>
              <h2 style={{
                fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 32,
                color: '#fff', margin: '0 0 16px', lineHeight: 1.25,
              }}>
                {featuredPost.title}
              </h2>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: '#aaa', lineHeight: 1.7, margin: '0 0 28px' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E86A2A', fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700 }}>
                Read Full Story <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        )}

        {/* ── ARTICLES GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
          {remainingPosts.map(post => (
            <Link
              key={post.id || post.slug}
              href={`/blog/${post.slug || post.id}`}
              style={{
                textDecoration: 'none', background: '#141414', borderRadius: 24,
                overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                transition: 'transform 0.35s ease, border-color 0.35s ease',
                display: 'flex', flexDirection: 'column',
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
                backgroundImage: `url('${post.main_image_url || post.image || '/hero-colombo.jpg'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#888', fontSize: 12, fontFamily: 'Manrope, sans-serif', marginBottom: 8 }}>
                    By {post.author_name || 'Siaga Travels'}
                  </div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 12px', lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa',
                    lineHeight: 1.6, margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ paddingTop: 20, marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#E86A2A', fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700 }}>
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
