'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Calendar, User, ChevronRight, Quote, ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { cmsApi, getBlogBySlug } from '@/lib/api';

const FALLBACK_BLOG_DETAIL = {
  id: 'ultimate-sri-lanka-travel-guide',
  slug: 'ultimate-sri-lanka-travel-guide',
  title: 'The Ultimate 10-Day Sri Lanka Travel Itinerary',
  excerpt: 'Plan the trip of a lifetime! From ancient rock fortresses in Sigiriya to highland tea estates and wild elephant safaris, here is your complete 10-day guide.',
  author_name: 'Siaga Travels Team',
  published_at: '2026-08-01',
  main_image_url: '/hero-ella.jpg',
  content_data: [
    {
      type: 'text',
      data: {
        text: 'Sri Lanka is an island filled with extraordinary diversity. Within just a few hours of driving, you can travel from warm tropical coastlines to misty mountain tea estates and 2,500-year-old UNESCO ancient cities. This 10-day itinerary brings together the absolute best of Ceylon.'
      }
    },
    {
      type: 'image',
      data: {
        url: '/hero-nuwaraeliya.jpg',
        caption: 'Misty tea plantations in Nuwara Eliya, Sri Lanka highlands.'
      }
    },
    {
      type: 'quote',
      data: {
        text: 'Travel is more than visiting places — it is about experiencing the culture, nature, and smiles of Sri Lanka.',
        author: 'Siaga Travels Founder'
      }
    },
    {
      type: 'text',
      data: {
        text: 'Start your journey in the Cultural Triangle by climbing the iconic Sigiriya Lion Rock Fortress. Rise early at 6:00 AM to catch the morning breeze and avoid the midday heat. Afterwards, head south toward Kandy to visit the sacred Temple of the Tooth Relic.'
      }
    },
    {
      type: 'youtube',
      data: {
        videoId: '5Q8qV4Qk_6s',
        caption: 'Watch the scenic mountain train journey across the Nine Arch Bridge.'
      }
    },
    {
      type: 'text',
      data: {
        text: 'No trip to Sri Lanka is complete without experiencing the world-famous train ride from Kandy to Ella. Grab a window seat as the blue train winds past cascading waterfalls, pine forests, and emerald tea valleys.'
      }
    }
  ]
};

// ─── SMART BLOCK RENDERER COMPONENT ──────────────────────

function BlockRenderer({ block }: { block: any }) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case 'text':
      return (
        <p style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 18,
          color: '#ddd',
          lineHeight: 1.85,
          marginBottom: 32,
        }}>
          {block.data?.text || block.data}
        </p>
      );

    case 'image':
      return (
        <figure style={{ margin: '40px 0' }}>
          <img
            src={block.data?.url || '/hero-ella.jpg'}
            alt={block.data?.caption || 'Blog image'}
            style={{
              width: '100%',
              maxHeight: 520,
              objectFit: 'cover',
              borderRadius: 20,
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            }}
          />
          {block.data?.caption && (
            <figcaption style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 13,
              color: '#888',
              textAlign: 'center',
              marginTop: 12,
            }}>
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote style={{
          margin: '40px 0',
          padding: '28px 36px',
          background: 'rgba(232,106,42,0.08)',
          borderLeft: '4px solid #E86A2A',
          borderRadius: '0 20px 20px 0',
        }}>
          <Quote size={28} style={{ color: '#E86A2A', marginBottom: 12 }} />
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 20,
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1.6,
            margin: '0 0 12px',
          }}>
            "{block.data?.text}"
          </p>
          {block.data?.author && (
            <cite style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#E86A2A', fontStyle: 'normal', fontWeight: 700 }}>
              — {block.data.author}
            </cite>
          )}
        </blockquote>
      );

    case 'youtube':
      const videoId = block.data?.videoId || '5Q8qV4Qk_6s';
      return (
        <div style={{ margin: '40px 0' }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
            />
          </div>
          {block.data?.caption && (
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textAlign: 'center', marginTop: 12 }}>
              {block.data.caption}
            </div>
          )}
        </div>
      );

    case 'package_card':
      return (
        <div style={{
          margin: '40px 0',
          padding: 28,
          background: '#161616',
          borderRadius: 24,
          border: '1px solid rgba(232,106,42,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
        }}>
          <div>
            <div style={{ color: '#E86A2A', fontSize: 12, fontFamily: 'Manrope, sans-serif', fontWeight: 700, marginBottom: 4 }}>
              RECOMMENDED TOUR PACKAGE
            </div>
            <h4 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#fff', margin: '0 0 6px' }}>
              {block.data?.title || 'Sri Lanka Grand Heritage & Coast Discovery'}
            </h4>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa', margin: 0 }}>
              {block.data?.description || '10 Days • Private Vehicle & Personal Driver'}
            </p>
          </div>
          <Link
            href="/packages"
            style={{
              background: '#E86A2A', color: '#fff',
              borderRadius: 12, padding: '12px 24px',
              fontFamily: "'Bebas Neue', cursive", fontSize: 18,
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            VIEW TOUR
          </Link>
        </div>
      );

    default:
      return null;
  }
}

// ─── MAIN BLOG DETAIL PAGE ───────────────────────────────

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFn = cmsApi.getBlogBySlug || getBlogBySlug;
    fetchFn(slug).then(data => {
      const realData = data?.item && !data.title ? data.item : data;
      if (realData && (realData.title || realData.name)) {
        setPost(realData);
      } else {
        setPost(FALLBACK_BLOG_DETAIL);
      }
    }).catch(() => setPost(FALLBACK_BLOG_DETAIL)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#E86A2A' }}>Loading Article...</div>
      </main>
    );
  }

  const currentPost = post || FALLBACK_BLOG_DETAIL;
  const blocks = currentPost.content_data || FALLBACK_BLOG_DETAIL.content_data;

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#fff', paddingBottom: 140 }}>
      {/* ── HEADER ── */}
      <section style={{ paddingTop: 140, paddingBottom: 40, textAlign: 'center' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 30px' }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Link href="/blog" style={{ color: '#E86A2A', textDecoration: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600 }}>
              Travel Blog
            </Link>
            <ChevronRight size={14} style={{ color: '#666' }} />
            <span style={{ color: '#aaa', fontFamily: 'Manrope, sans-serif', fontSize: 13 }}>Article</span>
          </div>

          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            lineHeight: 1.2,
            margin: '0 0 24px',
            color: '#fff',
          }}>
            {currentPost.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, color: '#888', fontFamily: 'Manrope, sans-serif', fontSize: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={16} style={{ color: '#E86A2A' }} /> {currentPost.author_name || 'Siaga Travels Team'}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={16} style={{ color: '#E86A2A' }} /> {currentPost.published_at || 'August 2026'}
            </span>
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      <div style={{ maxWidth: 1040, margin: '0 auto 60px', padding: '0 30px' }}>
        <img
          src={currentPost.main_image_url || currentPost.image || '/hero-ella.jpg'}
          alt={currentPost.title}
          style={{
            width: '100%',
            height: 480,
            objectFit: 'cover',
            borderRadius: 28,
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}
        />
      </div>

      {/* ── ARTICLE READING BODY ── */}
      <article style={{ maxWidth: 800, margin: '0 auto', padding: '0 30px' }}>
        {blocks.map((block: any, idx: number) => (
          <BlockRenderer key={idx} block={block} />
        ))}

        {/* AUTHOR BIO BOX */}
        <div style={{
          marginTop: 60,
          padding: 32,
          background: '#141414',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(232,106,42,0.2)', border: '1px solid #E86A2A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#E86A2A', fontSize: 24, fontWeight: 700, fontFamily: 'Manrope, sans-serif',
          }}>
            ST
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#fff', margin: '0 0 4px' }}>
              WRITTEN BY {currentPost.author_name || 'SIAGA TRAVELS TEAM'}
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa', margin: 0, lineHeight: 1.5 }}>
              Siaga Travels is a Sri Lanka-based travel specialist crafting comfortable, memorable, and stress-free island tours for travelers worldwide.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
