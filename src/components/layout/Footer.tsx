'use client';

import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/contact';

export function Footer() {
  return (
    <footer style={{ background: '#080808', color: '#aaa', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, paddingBottom: 60, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.3)' }}>
                <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#fff', letterSpacing: '0.06em' }}>SIAGA TRAVELS</span>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, lineHeight: 1.7, color: '#888', margin: 0, maxWidth: 300 }}>
              {CONTACT_INFO.slogan} We craft authentic, unforgettable travel experiences across emerald highlands, pristine beaches, and ancient sanctuaries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Discover</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/destinations" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Destinations
              </Link>
              <Link href="/experiences" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Experiences
              </Link>
              <Link href="/packages" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Tour Packages
              </Link>
              <Link href="/blog" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Travel Blog
              </Link>
              <Link href="/contact" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Experiences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/experiences" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Wildlife Safaris
              </Link>
              <Link href="/experiences" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Mountain Trekking
              </Link>
              <Link href="/experiences" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Culture & Temples
              </Link>
              <Link href="/experiences" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                Beaches & Surfing
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Newsletter</h4>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#666', marginBottom: 16 }}>Subscribe for exclusive island deals & travel tips.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Enter email..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 13,
                  fontFamily: 'Manrope, sans-serif', outline: 'none',
                }}
              />
              <button style={{
                background: '#E86A2A', color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 18px', fontFamily: 'Manrope, sans-serif',
                fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#c95c20')}
                onMouseLeave={e => (e.currentTarget.style.background = '#E86A2A')}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#555' }}>
            © {new Date().getFullYear()} Siaga Travels. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#555' }}>Privacy Policy</span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#555' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
